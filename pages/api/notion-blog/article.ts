import type { NextApiRequest, NextApiResponse } from 'next'
import type { ArticleRequestParams } from "~/types/notion";

import { getAllBlocks } from '~/server/notion/getAllBlocks';
import { fetchPages } from '~/utils/expiredImage';

const ApiArticle = async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.status(405).json({ error: "Method Not Allowed", allowedMethods: ['GET'] });

    return;
  }

  const { slug } = req.query as ArticleRequestParams;

  try {
    const post = await fetchPages({ slug: slug });
    if (!post.results || post.results.length === 0) {
      res.status(404).json({ error: "Page not found" });

      return;
    }
    const page = post.results[0];
    const page_id = page.id;
    const blocks = await getAllBlocks(page_id);
    const articleParts = { page, blocks };

    res.status(200).json(articleParts);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error during API processing:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default ApiArticle