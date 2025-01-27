import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs/promises'
import path from 'path'

import { getServerSideSitemap } from 'next-sitemap'

import { staticPages, sitemapConfig } from '~/config/sitemapConfig'
import { getAllPosts } from '~/server/notion/getAllPosts'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // 記事ページと静的ページのフィールドを生成
    const posts = await getAllPosts()
    const postFields = posts.map((post) => ({
      loc: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${post.slug}`,
      lastmod: new Date(post.updatedAt).toISOString(),
      changefreq: sitemapConfig.defaultChangefreq,
      priority: sitemapConfig.defaultPriority
    }))

    const now = new Date().toISOString()
    const staticFields = staticPages.map(page => ({
      loc: `${process.env.NEXT_PUBLIC_BASE_URL}${page}`,
      lastmod: now,
      changefreq: sitemapConfig.defaultChangefreq,
      priority: page === '' ? sitemapConfig.topPagePriority : sitemapConfig.defaultPriority
    }))

    // サイトマップの生成と保存
    const fields = [...staticFields, ...postFields]
    const response = await getServerSideSitemap(fields)
    const sitemap = await response.text()
    
    const publicDir = path.join(process.cwd(), 'public')
    await fs.writeFile(path.join(publicDir, 'sitemap-0.xml'), sitemap)

    // インデックスファイルの更新
    const indexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>${process.env.NEXT_PUBLIC_BASE_URL}/sitemap-0.xml</loc></sitemap>
</sitemapindex>`
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), indexContent)

    res.setHeader('Content-Type', 'application/xml')
    res.send(sitemap)
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.error('Sitemap generation error:', error)
    
    return res.status(500).json({ 
      message: 'Error updating sitemap',
      error: process.env.NODE_ENV === 'development' 
        ? error instanceof Error ? error.message : String(error)
        : undefined
    })
  }
} 