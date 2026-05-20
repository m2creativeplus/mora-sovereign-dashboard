import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // If the host environment does not match our production canonical domain, disallow all crawling
  const isProduction = process.env.NEXT_PUBLIC_SITE_URL === 'https://portal.mora.gov.sl';
  
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      }
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
    sitemap: 'https://portal.mora.gov.sl/sitemap.xml',
  };
}
