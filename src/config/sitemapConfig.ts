export const staticPages = [
  '',  // トップページ
  '/contact',
  '/login',
  '/posts',
  '/sandbox',
  '/sandbox/input-file-list',
  '/sandbox/nextjs-ssr',
  '/sandbox/notion-blocks-preview',
  '/sandbox/react-hook-form',
  '/sandbox/react-memo',
  '/sandbox/react-use-memo',
  '/sandbox/rive',
  '/sandbox/shape-by-css',
  '/sandbox/svgr',
  '/sandbox/swr',
  '/sandbox/touch-event',
  '/sandbox/view-transitions-api',
  '/sandbox/view-transitions-api/other',
  '/sandbox/worldcoin',
  '/terms',
  '/privacy-policy',
  '/about'
] as const

export type StaticPage = typeof staticPages[number]

export type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export const sitemapConfig = {
  defaultChangefreq: 'daily' as Changefreq,
  defaultPriority: 0.7,
  topPagePriority: 1.0,
} as const
