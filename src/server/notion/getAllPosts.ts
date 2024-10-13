import type {
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { NotionPostMeta } from '~/types/notion';

import { notionResponseToPost } from '~/utils/notionResponseToPost';

import { notion } from './client';

/**
 * slug取得用
 * かなるsからのコピー
 */
export const getAllPosts = async (): Promise<NotionPostMeta[]> => {
  const allResults: (PageObjectResponse | PartialPageObjectResponse)[] = [];
  let hasMore = true;
  while (hasMore) {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'UpdatedAt',
          direction: 'descending',
        },
      ],
      page_size: 100,
    });
    hasMore = res.has_more;
    allResults.push(...res.results);
  }

  const allPosts = allResults
    .map(notionResponseToPost)
    .filter((v): v is NotionPostMeta => Boolean(v));

  return allPosts;
};
