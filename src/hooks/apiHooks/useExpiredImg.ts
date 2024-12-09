import type { NotionPost } from '~/types/notion';

import axios from 'axios';
import useSWR from 'swr';

import { setOgp } from '~/server/utils/ogp';
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

    const childrenWithOgp = await setOgp(formattedBlocks);

    const post: NotionPost = {
      ...toPostMeta(page),
      description: toMetaDescription(formattedBlocks),
      children: childrenWithOgp,
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
    const fileTypes = ["image", "file", "audio", "video", "pdf"];
    if (fileTypes.includes(block.type)) {
      const file = (block as any)[block.type]?.file;
      if (file && file.expiry_time && Date.parse(file.expiry_time) < now) {
        // eslint-disable-next-line no-console
        console.log(file.expiry_time);
        // eslint-disable-next-line no-console
        console.log("有効期限切れ 記事ファイル更新！");

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

    // eslint-disable-next-line no-console
    console.log("!U postImg", postImg);

    const updatedImages = postImg.children.filter(
      (block) => block.type === "image" || block.type === "file" || block.type === "audio" || block.type === "video" || block.type === "pdf"
    );

    const mergedChildren = post.children.map((block) => {
      if (["image", "file", "audio", "video", "pdf"].includes(block.type)) {
        const updatedBlock = updatedImages.find(
          (updatedBlock) => updatedBlock.id === block.id
        );

        return updatedBlock || block;
      }

      return block;
    });

    return { data: { ...newPost, children: mergedChildren }, error };
  }

  return { data: postImg, error };
};
