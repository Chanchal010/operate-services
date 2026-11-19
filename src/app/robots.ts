import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const baseUrl =
    envUrl && !envUrl.includes('localhost')
      ? envUrl.replace(/\/$/, '')
      : 'https://operateservices.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/*?q=',
          '/*?filter=',
          '/*?sort=',
          '/*?page=',
          '/*?search=',
        ],
      },
      {
        // Generative Engine & AI Search Bots (Perplexity, ChatGPT, Claude, Gemini)
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot',
          'Google-Extended',
          'Amazonbot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
