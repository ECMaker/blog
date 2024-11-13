import type { PageType } from "~/types/notion"

import axios from "axios"

import { notion } from "~/server/notion/client";

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
                        property: "Published",
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
export const reFetchPage = async (slug: string): Promise<PageType> => {
    try {
      const { data: page } = await axios.get(`/api/page?slug=${slug}`)

      return page as PageType
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("fetechPage")
      // eslint-disable-next-line no-console
      console.log(error)

      return {} as PageType
    }
}

export const reFetchPages = async (): Promise<PageType[]> => {
    try {
      const { data: pages } = await axios.get("/api/pages")

      return pages as PageType[]
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log("reFetechPages error!")
      // eslint-disable-next-line no-console
      console.log(error)

      return [] as PageType[]
    }
}
export const includeExpiredFeaturedImages = (pages: PageType[]): boolean => {
    const now = Date.now()
    // eslint-disable-next-line no-console
    console.log("アイキャッチ画像の有効期限チェック！")
    
    return pages.some((page) => {
        if (page.cover) {
            if (page.cover.type === 'file') {
                const image = page.cover
                if(image.file) {
                    // eslint-disable-next-line no-console
                    console.log(image.file.expiry_time);
                }            
                if (image.file && image.file.expiry_time && Date.parse(image.file.expiry_time) < now) {
                    // eslint-disable-next-line no-console
                    console.log("有効期限切れ アイキャッチ画像更新！")
    
                    return true
                }
            }
        }
    
        return false
    })
}
  