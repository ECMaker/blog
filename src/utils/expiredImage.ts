import type {
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';
import type {
  NotionPageObjectResponse,
} from '~/types/notion';

import axios from 'axios';

import { notion } from '~/server/notion/client';
import { getDatabaseContentsAll } from '~/server/notion/databases';
import { blogDatabaseId } from '~/server/notion/ids';

type NotionFilter = Exclude<QueryDatabaseParameters['filter'], undefined>;
type FilterWithAnd = Extract<NotionFilter, { and: unknown }>;
type NotionFilterArray = FilterWithAnd['and'];


export const fetchPages = async ({
  slug,
  tag,
  category,
}: {
  slug?: string;
  tag?: string;
  category?: string;
}) => {
  const andConditions: NotionFilterArray = [
    {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    {
      property: 'Slug',
      rich_text: {
        is_not_empty: true,
      },
    },
  ];

  if (slug) {
    andConditions.push({
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    });
  }

  if (tag) {
    andConditions.push({
      property: 'Tags',
      multi_select: {
        contains: tag,
      },
    });
  }

  if (category) {
    andConditions.push({
      property: 'Categories',
      select: {
        equals: category,
      },
    });
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE ?? '',
      filter: {
        and: andConditions,
      },
      sorts: [
        {
          property: 'UpdatedAt',
          direction: 'descending',
        },
      ],
    });

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching pages:', error);

    return { results: [] };
  }
};


/**
 * fetchArrayPages: getDatabaseContentsAll の戻り値を
 * NotionPageObjectResponse[][] にアサート
 */
export const fetchArrayPages = async (): Promise<NotionPageObjectResponse[][]> => {
  const pages = await getDatabaseContentsAll({
    database_id: blogDatabaseId,
    page_size: 12,
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
  });

  return pages as NotionPageObjectResponse[][];
};

/**
 * reFetchIndexPages: /api/notion-blog/indexPages から再取得
 */
export const reFetchIndexPages = async (): Promise<NotionPageObjectResponse[]> => {
  try {
    const { data: pages } = await axios.get('/api/notion-blog/indexPages');

    return pages as NotionPageObjectResponse[];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('reFetechPages error!');
    // eslint-disable-next-line no-console
    console.error(error);

    return [];
  }
};

/**
 * reFetchArrayPages: /api/notion-blog/arrayPages から再取得
 */
export const reFetchArrayPages = async (): Promise<NotionPageObjectResponse[][]> => {
  try {
    const { data: pages } = await axios.get('/api/notion-blog/arrayPages');

    return pages as NotionPageObjectResponse[][];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('reFetechPages error!');
    // eslint-disable-next-line no-console
    console.error(error);

    return [];
  }
};

/**
 * 単一配列: アイキャッチ画像に有効期限切れがあるかどうか
 */
export const includeExpiredIndexImages = (
  posts: NotionPageObjectResponse[],
): boolean => {
  const now = Date.now();

  return posts.some((page) => {
    if (page.properties.Image && page.properties.Image.type === 'files') {
      const files = page.properties.Image.files;

      return files.some((file) => {
        if (
          file.type === 'file' &&
          file.file &&
          file.file.expiry_time &&
          Date.parse(file.file.expiry_time) < now
        ) {
          // eslint-disable-next-line no-console
          // console.log('Expired cover image updated.');

          return true;
        }

        return false;
      });
    }

    return false;
  });
};

/**
 * 二次元配列: アイキャッチ画像に有効期限切れがあるかどうか
 */
export const includeExpiredArrayImages = (
  postsArray: NotionPageObjectResponse[][],
): boolean => {
  const now = Date.now();

  return postsArray.some((pages) => {
    return pages.some((page) => {
      if (page.properties.Image && page.properties.Image.type === 'files') {
        const files = page.properties.Image.files;

        return files.some((file) => {
          if (
            file.type === 'file' &&
            file.file &&
            file.file.expiry_time &&
            Date.parse(file.file.expiry_time) < now
          ) {
            // eslint-disable-next-line no-console
            // console.log('Expired cover image updated.');

            return true;
          }

          return false;
        });
      }

      return false;
    });
  });
};
  