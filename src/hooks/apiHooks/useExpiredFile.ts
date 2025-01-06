import type { NotionPost, ExpandedBlockObjectResponse, NotionPageObjectResponse, MediaBlockTypes } from '~/types/notion';

import axios from 'axios';
import useSWR from 'swr';

import { toMetaDescription, toPostMeta } from '~/utils/meta';

const mediaTypes: MediaBlockTypes[] = ['image', 'file', 'audio', 'video', 'pdf'];

/**
 * ブロックから file 情報を取り出すヘルパー
 */
function getExpiredBlockFile(
  block: ExpandedBlockObjectResponse
): { url: string; expiry_time: string } | undefined {
  switch (block.type) {
    case 'image':
      return block.image.type === 'file' && block.image.file
        ? block.image.file
        : undefined;
    case 'file':
      return block.file.type === 'file' && block.file.file
      ? block.file.file
      : undefined;
    case 'audio':
      return block.audio.type === 'file' && block.audio.file
        ? block.audio.file
        : undefined;
    case 'video':
      return block.video.type === 'file' && block.video.file
        ? block.video.file
        : undefined;
    case 'pdf':
      return block.pdf.type === 'file' && block.pdf.file
        ? block.pdf.file
        : undefined;
    default:
      return undefined;
  }
}

/**
 * ブロックをグループ化する関数
 */
function groupListBlocks(
  blocks: ExpandedBlockObjectResponse[],
): ExpandedBlockObjectResponse[] {
  return blocks.reduce<ExpandedBlockObjectResponse[]>((acc, block) => {
    const lastBlock = acc[acc.length - 1] ?? null;

    if (block.type === 'bulleted_list_item') {
      if (lastBlock && lastBlock.type === 'bulleted_list') {
        lastBlock.bulleted_list.children?.push(block);
      } else {
        acc.push({
          id: block.id,
          type: 'bulleted_list',
          bulleted_list: { children: [block] },
        });
      }
    } else if (block.type === 'numbered_list_item') {
      if (lastBlock && lastBlock.type === 'numbered_list') {
        lastBlock.numbered_list.children?.push(block);
      } else {
        acc.push({
          id: block.id,
          type: 'numbered_list',
          numbered_list: { children: [block] },
        });
      }
    } else if (block.type === 'to_do') {
      if (lastBlock && lastBlock.type === 'to_do_list') {
        lastBlock.to_do_list.children?.push(block);
      } else {
        acc.push({
          id: block.id,
          type: 'to_do_list',
          to_do_list: { children: [block] },
        });
      }
    } else {
      // それ以外のタイプならそのまま push
      acc.push(block);
    }

    return acc;
  }, []);
}

const fetchArticleParts = async (slug: string): Promise<NotionPost> => {
  try {
    const response = await axios.get(`/api/notion-blog/article?slug=${slug}`);
    if (!response.data) {

      // eslint-disable-next-line no-console
      console.log("!U No data received from API");

      return {} as NotionPost;
    }

    const { page, blocks } = response.data as {
      page: NotionPageObjectResponse; // ここは適宜 PageType としてもOK
      blocks: ExpandedBlockObjectResponse[];
    };

    // getAllBlocks.ts と同様のグルーピング
    const formattedBlocks = groupListBlocks(blocks);

    const post: NotionPost = {
      ...toPostMeta(page),
      description: toMetaDescription(formattedBlocks),
      children: formattedBlocks,
    };

    return post;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("fetchArticleParts Error!", error);

    return {} as NotionPost;
  }
}

const includeExpiredFile = (post: NotionPost): boolean => {
  const now = Date.now();

  return post.children.some((block) => {
    const file = getExpiredBlockFile(block);
    if (file && file.expiry_time && Date.parse(file.expiry_time) < now) {
      // eslint-disable-next-line no-console
      console.log(file.expiry_time);
      // eslint-disable-next-line no-console
      console.log("有効期限切れ 記事ファイル更新！");

      return true;
    }

    return false;
  });
}

export const useExpiredFile = (post: NotionPost) => {
  // includeExpiredImage(post) が true => 再取得
  // そのときキー = post.slug
  const { data: postImg, error } = useSWR(
    includeExpiredFile(post) && post.slug,
    fetchArticleParts,
    { fallbackData: post }
  );

  if (postImg) {
    const newPost = {
      ...post,
      image: postImg.image,
    };

    // eslint-disable-next-line no-console
    console.log("!U postImg", postImg);

    // 更新されたメディアブロックのみを抽出
    const updatedMediaBlocks = postImg.children.filter(
      (block) =>
        mediaTypes.includes(block.type as MediaBlockTypes)
    );

    // 既存のブロックと更新されたブロックをマージ
    const mergedChildren = post.children.map((block) => {
      if (mediaTypes.includes(block.type as MediaBlockTypes)) {
        const updated = updatedMediaBlocks.find((b) => b.id === block.id);

        return updated || block;
      }

      return block;
    });

    return { data: { ...newPost, children: mergedChildren }, error };
  }

  return { data: postImg, error };
};
