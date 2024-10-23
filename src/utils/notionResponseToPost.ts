import type {
  PartialPageObjectResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { NotionPostMeta } from '~/types/notion';

import { richTextToString } from './richTextToString';

/**
 * NotionのPageObjectResponseをPostMetaに変換
 */
export const notionResponseToPost = (
  page: PageObjectResponse | PartialPageObjectResponse,
): NotionPostMeta | null => {
    if (!('properties' in page)) return null;
  
    const { id, icon, properties, created_time, last_edited_time } = page;

  if (icon !== null && icon.type !== 'emoji')
    throw new Error('Icon is not emoji');
  if (properties.Title.type !== 'title') throw new Error('Title is not title');
  if (properties.Category.type !== 'select')
    throw new Error('Category is not select');
  if (properties.Tags.type !== 'multi_select')
    throw new Error('Tags is not multi_select');
  if (properties.Likes.type !== 'number')
    throw new Error('Likes is not number');

  const title = properties.Title.title.length > 0
                ? properties.Title.title[0].plain_text
                : '';
  const category = properties.Category.select || {
    id: '',
    name: 'カテゴリなし',
    color: 'default',
  };
  const createdAt = created_time.substring(0, 10);
  const updatedAt = last_edited_time.substring(0, 10);
  const tags = properties.Tags.multi_select;
  const likes = properties.Likes.number || 0;
  const slug = properties.Slug?.type === 'rich_text' &&
                properties.Slug.rich_text.length > 0
                ? richTextToString(properties.Slug.rich_text)
                : '0';
  const image =  properties.Image?.type === 'files' &&
                 properties.Image.files[0]?.type === 'file'
                   ? properties.Image.files[0].file.url
                   : '/logos/900^2_tomei_textBlack.gif';
  
  return {
    id,
    icon: icon?.emoji || '📄',
    title,
    category,
    createdAt,
    updatedAt,
    tags,
    likes,
    slug,
    image,
  };
};


