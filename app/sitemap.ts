import type { MetadataRoute } from 'next'

const categories = [
  'html', 'css', 'javascript', 'typescript', 'react',
  'nextjs', 'state-management', 'nodejs', 'golang',
  'database', 'devops', 'testing', 'performance', 'security', 'seo',
  'system-design', 'design-patterns', 'kafka', 'redis',
  'network', 'operating-system', 'aws-cloud',
  'backend-api', 'career',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://luyenphongvan.online'
  const now = new Date()

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { vi: baseUrl, en: baseUrl } },
    },
    {
      url: `${baseUrl}/interview`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map(cat => ({
    url: `${baseUrl}/?category=${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...mainPages, ...categoryPages]
}
