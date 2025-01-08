import type { NotionPost, ExpandedBlockObjectResponse, NotionPageObjectResponse } from '~/types/notion';

import axios from 'axios';
import useSWR from 'swr';

import { toMetaDescription, toPostMeta } from '~/utils/meta';

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
      console.error('No data received from API');

      return {} as NotionPost;
    }

    const { page, blocks } = response.data as {
      page: NotionPageObjectResponse;
      blocks: ExpandedBlockObjectResponse[];
    };
    const expandedBlocks = groupListBlocks(blocks); // getAllBlocks.ts と同様にListsをグルーピング
    const post: NotionPost = {
      ...toPostMeta(page),
      description: toMetaDescription(expandedBlocks),
      children: expandedBlocks,
    };

    return post;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('fetchArticleParts Error!', error);
    
    return {} as NotionPost;
  }
};

/**
 * ブロックとその子ブロックから有効期限切れのファイルを再帰的にチェック
 */
function checkExpiredFileInBlock(
  block: ExpandedBlockObjectResponse,
  now: number
): boolean {
  // まず、現在のブロックのファイルをチェック
  const file = getExpiredBlockFile(block);
  if (file?.expiry_time && Date.parse(file.expiry_time) < now) {
    return true;
  }

  // 次に、ブロックタイプに応じて子ブロックをチェック
  switch (block.type) {
    case 'bulleted_list':
      return block.bulleted_list.children?.some(child => 
        checkExpiredFileInBlock(child, now)
      ) ?? false;
    
    case 'numbered_list':
      return block.numbered_list.children?.some(child => 
        checkExpiredFileInBlock(child, now)
      ) ?? false;
    
    case 'to_do_list':
      return block.to_do_list.children?.some(child => 
        checkExpiredFileInBlock(child, now)
      ) ?? false;

    // bulleted_list_item などで children を持つ場合
    default:
      if ('children' in block && Array.isArray(block.children)) {
        return block.children.some(child => 
          checkExpiredFileInBlock(child, now)
        );
      }
      
      return false;
  }
}

const includeExpiredFile = (post: NotionPost): boolean => {
  const now = Date.now();

  return post.children.some((block) => {
    return checkExpiredFileInBlock(block, now);
  });
}

export const useExpiredFile = (post: NotionPost) => {
  const { data: fetchPost, error } = useSWR(
    includeExpiredFile(post) && post.slug,
    fetchArticleParts,
    { fallbackData: post }
  );

  return { data: fetchPost, error };
};
