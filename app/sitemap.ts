import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'
import { ARTISTS } from '@/lib/artist-data'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: '', priority: 1, changeFrequency: 'monthly' as const },
    { url: '/artists', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/events', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/ecosystem', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.6, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const artistPages = ARTISTS.map((artist) => ({
    url: `/artists/${artist.slug}`,
    priority: 0.9 as const,
    changeFrequency: 'weekly' as const,
    lastModified: new Date(),
  }))

  return [
    ...staticPages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...artistPages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ]
}
