import type { NotionPageObjectResponse } from "~/types/notion"

import axios from "axios"

import { notion } from "~/server/notion/client";
import { getDatabaseContentsAll } from "~/server/notion/databases";
import { blogDatabaseId } from "~/server/notion/ids";

export const fetchPages = async ({
    slug,
    tag,
    category,
}: {
    slug?: string;
    tag?: string;
    category?: string;
}) => {
    const and: any = [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
            property: "Slug",
            rich_text: {
              is_not_empty: true,
            },
        },
    ];

    if (slug) {
        and.push({
            property: "Slug",
            rich_text: {
            equals: slug,
            },
        });
    }

    if (tag) {
        and.push({
            property: "Tags",
            multi_select: {
            contains: tag,
            },
        });
    }

    if (category) {
        and.push({
            property: "Categories",
            select: {
            equals: category,
            },
        });
    }

    try {
        const response = await notion.databases.query({
                database_id: process.env.NOTION_DATABASE,
                filter: {
                    and: and,
                },
                sorts: [
                    {
                        property: 'UpdatedAt',
                        direction: "descending",
                    },
                ],
        });

        return response;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("!U Error fetching pages:", error);

        return { results: [] };
    }
};

export const fetchArrayPages = async () => {
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

    return pages as unknown as NotionPageObjectResponse[][];
}

export const fetchBlocksByPageId = async (pageId: string) => {
    const data = [];
    let cursor = undefined;
    while (true) {
        const { results, next_cursor }: any = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        });
        data.push(...results);
        if (!next_cursor) break;
        cursor = next_cursor;
    }
    
    return { results: data };
}

export const reFetchIndexPages = async (): Promise<NotionPageObjectResponse[]> => {
    try {
      const { data: pages } = await axios.get("/api/notion-blog/indexPages")

      return pages as NotionPageObjectResponse[]
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("reFetechPages error!")
      // eslint-disable-next-line no-console
      console.log(error)

      return [] as NotionPageObjectResponse[]
    }
}

export const reFetchArrayPages = async (): Promise<NotionPageObjectResponse[][]> => {
    try {
      const { data: pages } = await axios.get("/api/notion-blog/arrayPages")

      return pages as NotionPageObjectResponse[][]
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("reFetechPages error!")
      // eslint-disable-next-line no-console
      console.log(error)

      return [] as NotionPageObjectResponse[][]
    }
}

export const includeExpiredIndexImages = (posts: NotionPageObjectResponse[]): boolean => {
    const now = Date.now();
    // eslint-disable-next-line no-console
    console.log("アイキャッチ画像の有効期限チェック！");
    
    return posts.some((page) => {
        if (page.properties.Image && page.properties.Image.type === 'files') {
            const files = page.properties.Image.files;

            return files.some((file) => {
                if (file.type === 'file' && file.file && file.file.expiry_time && Date.parse(file.file.expiry_time) < now) {
                    // eslint-disable-next-line no-console
                    console.log("有効期限切れ アイキャッチ画像更新！");

                    return true;
                }

                return false;
            });
        }

        return false;
    });
}
export const includeExpiredArrayImages = (postsArray: NotionPageObjectResponse[][]): boolean => {
    const now = Date.now();
    // eslint-disable-next-line no-console
    console.log("アイキャッチ画像の有効期限チェック！");
    
    return postsArray.some((pages) => {
        return pages.some((page) => {
            if (page.properties.Image && page.properties.Image.type === 'files') {
                const files = page.properties.Image.files;

                return files.some((file) => {
                    if (file.type === 'file' && file.file && file.file.expiry_time && Date.parse(file.file.expiry_time) < now) {
                        // eslint-disable-next-line no-console
                        console.log("有効期限切れ アイキャッチ画像更新！");

                        return true;
                    }

                    return false;
                });
            }

            return false;
        });
    });
}