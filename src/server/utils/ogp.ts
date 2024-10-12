import type { BookmarkBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type { ExpandedBlockObjectResponse } from '~/types/notion';
import type { Ogp } from '~/types/ogp';

import ogpParser from 'ogp-parser';

/* OGPを取得する（Node.jsで使用を想定） */
export const getOgp = async (url: string): Promise<Ogp> => {
  try {
    const encodeURL = encodeURI(url);
    const { title, ogp } = await ogpParser(encodeURL);

    return {
      url: encodeURL,
      title: title,
      description:
        ogp['og:description']?.length > 0 ? ogp['og:description'][0] : '',
      imageUrl: ogp['og:image']?.length > 0 ? ogp['og:image'][0] : '',
      faviconUrl: `https://www.google.com/s2/favicons?domain=${encodeURL}`,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(url,'OPGの取得に失敗しました');

    return {
      url: url,
      title: '',
      description: '',
      imageUrl: '',
      faviconUrl: '',
    };
  }
};

/* ブックマークデータを再帰的に検索し、各ブックマークに OGP を設定する */
const findeBookmark = async (
  data: ExpandedBlockObjectResponse | ExpandedBlockObjectResponse[]
): Promise<ExpandedBlockObjectResponse | ExpandedBlockObjectResponse[]> => {
  if (Array.isArray(data)) return await Promise.all(data.map(findeBookmark)) as ExpandedBlockObjectResponse[];
  if (typeof data !== 'object' || data === null) return data;
  for (const key in data) {
    if (data.type !== 'bookmark') {
      (data as any)[key] = await findeBookmark((data as any)[key]);
      continue;
    }
    const url = (data as ExpandedBlockObjectResponse & { bookmark: { url: string } }).bookmark.url;
    const ogp = await getOgp(url);
    
    return {
      ...data,
      ogp,
    } as BookmarkBlockObjectResponse & { ogp: Ogp };
  }

  return data;
};

/* NotionBlockObjectのBookmarkにOGP情報を差し込む */
export const setOgp = async (
  children: ExpandedBlockObjectResponse[]
): Promise<ExpandedBlockObjectResponse[]> => {
  return (await Promise.all(children.map(findeBookmark))) as ExpandedBlockObjectResponse[];
};