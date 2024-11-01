import type { NextApiRequest, NextApiResponse } from 'next'
import type { Params } from "~/types/notion";

import {
  fetchPages,
  fetchBlocksByPageId,
} from '~/utils/expiredImage'

const ApiArticle = async function(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'GET') {
    res.status(405).json({ error: "Method Not Allowed", allowedMethods: ['GET'] });

    return;
  }

  const { slug } = req.query as Params;

  if (!slug) {
    res.status(400).json({ error: "Slug is required" });

    return;
  }

  try {
    const post = await fetchPages({ slug: slug });
    if (!post.results || post.results.length === 0) {
      res.status(404).json({ error: "Page not found" });

      return;
    }
    const page = post.results[0];
    const { results: blocks } = await fetchBlocksByPageId(page.id);

    const articleParts = { page, blocks };

    res.status(200).json(articleParts);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Error during API processing:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default ApiArticle