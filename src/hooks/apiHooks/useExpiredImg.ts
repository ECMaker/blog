import type { NotionPost } from '~/types/notion';

import axios from 'axios';
import useSWR from 'swr';

import { toMetaDescription, toPostMeta } from '~/utils/meta';

const fetchArticleParts = async (slug: string): Promise<NotionPost> => {
  try {
    const response = await axios.get(`/api/notion-blog/article?slug=${slug}`);
    if (!response.data) {
      // eslint-disable-next-line no-console
      console.log("!U No data received from API");

      return {} as NotionPost;
    }

    const { page, blocks } = response.data;

    // blocks を NotionPost の children 形式に変換: refer to getAllBlocks.ts
    const formattedBlocks = blocks.reduce((acc: any[], block: any) => {
      const lastBlock = acc.length > 0 ? acc[acc.length - 1] : null;

      if (block.type === 'bulleted_list_item') {
        if (lastBlock && lastBlock.type === 'bulleted_list') {
          lastBlock.bulleted_list.children.push(block);
        } else {
          acc.push({
            id: block.id,
            type: 'bulleted_list',
            bulleted_list: { children: [block] },
          });
        }
      } else if (block.type === 'numbered_list_item') {
        if (lastBlock && lastBlock.type === 'numbered_list') {
          lastBlock.numbered_list.children.push(block);
        } else {
          acc.push({
            id: block.id,
            type: 'numbered_list',
            numbered_list: { children: [block] },
          });
        }
      } else if (block.type === 'to_do') {
        if (lastBlock && lastBlock.type === 'to_do_list') {
          lastBlock.to_do_list.children.push(block);
        } else {
          acc.push({
            id: block.id,
            type: 'to_do_list',
            to_do_list: { children: [block] },
          });
        }
      } else {
        acc.push(block);
      }

      return acc;
    }, []);

    const post: NotionPost = {
      ...toPostMeta(page),
      description: toMetaDescription(formattedBlocks),
      children: formattedBlocks,
    };

    return post;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("fetchArticleParts Error!");
    // eslint-disable-next-line no-console
    console.log(error);

    return {} as NotionPost;
  }
}

const includeExpiredImage = (post: NotionPost): boolean => {
  const now = Date.now();
  const blocks = post.children;

  return blocks.some(block => {
    if (block.type === 'image' && block.image.type === 'file') {
      const image = block.image.file;
      if (image && image.expiry_time && Date.parse(image.expiry_time) < now) {
        // eslint-disable-next-line no-console
        console.log(image.expiry_time);
        // eslint-disable-next-line no-console
        console.log("有効期限切れ 記事画像更新！");

        return true;
      }
    }

    return false;
  });
}

export const useExpiredImg = (post: NotionPost) => {
  const { data: postImg , error} = useSWR(includeExpiredImage(post) && post.slug, fetchArticleParts,{ fallbackData: post });

  if (postImg) {
    const newPost = {
      ...post,
      image: postImg.image
    };

    const updatedImages = postImg.children.filter(
      (block: any) => block.type === "image"
    );

    const mergedChildren = post.children.map((block) => {
      if (block.type === "image") {
        const updatedImage = updatedImages.find(
          (updatedBlock) => updatedBlock.id === block.id
        );

        return updatedImage || block;
      }

      return block;
    });

    return { data: { ...newPost, children: mergedChildren }, error };
  }

  return { data: postImg, error };
};
