/* eslint-disable no-console */
import type { NotionPost } from '~/types/notion';

import axios from 'axios';
import useSWR from 'swr';

const fetchArticleParts = async (slug: string): Promise<NotionPost> => {
  try {
    const { data: articleParts } = await axios.get(`/api/notion-blog/article?slug=${slug}`)

    return articleParts as NotionPost
  } catch (error) {
    console.log("fetchArticleParts Error!")
    console.log(error)

    return {} as NotionPost
  }
}

const includeExpiredImage = (post: NotionPost): boolean => {
  const now = Date.now();
  const blocks = post.children;

  return blocks.some(block => {
    if (block.type === 'image' && block.image.type === 'file') {
      const image = block.image.file;
      if (image && image.expiry_time && Date.parse(image.expiry_time) < now) {
        console.log(image.expiry_time);
        console.log("有効期限切れ 記事画像更新！");

        return true;
      }
    }

    return false;
  });
}

export const useExpiredImg = (post: NotionPost) => {
  const { data: postImg, error } = useSWR(includeExpiredImage(post) && post.slug, fetchArticleParts, { fallbackData: post });

  return { data: postImg, error };
};