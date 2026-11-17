import type { Metadata } from 'next';
import './globals.css';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://operateservices.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'OperateServices Staffing & Services | Recruiting & Staffing Agency',
    template: '%s | OperateServices',
  },
  description:
    'Recruiting & Staffing Agency — Powering Businesses & Advancing Careers across manufacturing, engineering, logistics, and skilled trades.',
  keywords: [
    'OperateServices',
    'staffing agency',
    'recruiting agency',
    'workforce solutions',
    'manufacturing staffing',
    'skilled trades staffing',
    'logistics staffing',
    'engineering staffing',
    'industrial maintenance mechanic',
    'MIG welders',
    'contract-to-hire',
    'direct placement staffing',
  ],
  authors: [{ name: 'OperateServices, Inc.' }],
  creator: 'OperateServices',
  publisher: 'OperateServices',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/favicon-32x32.png?v=2', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png?v=2', type: 'image/png', sizes: '16x16' },
      { url: '/images/icon-192.png?v=2', type: 'image/png', sizes: '192x192' },
      { url: '/images/icon-512.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=2',
  },
  manifest: '/manifest.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteBaseUrl,
    siteName: 'OperateServices',
    title: 'OperateServices Staffing & Services',
    description:
      'Recruiting & Staffing Agency — Powering Businesses & Advancing Careers across manufacturing, engineering, logistics, and skilled trades.',
    images: [
      {
        url: '/images/hero_workforce_team_1794749051365.jpg',
        width: 1200,
        height: 630,
        alt: 'OperateServices Staffing & Workforce Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OperateServices Staffing & Services',
    description:
      'Powering Businesses & Advancing Careers across manufacturing, engineering, logistics, and skilled trades.',
    images: ['/images/hero_workforce_team_1794749051365.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'EmploymentAgency'],
        '@id': `${siteBaseUrl}/#organization`,
        name: 'OperateServices',
        url: siteBaseUrl,
        logo: `${siteBaseUrl}/images/operateservices_logo.png`,
        description:
          'Recruiting & Staffing Agency — Powering Businesses & Advancing Careers across manufacturing, engineering, logistics, and skilled trades.',
        telephone: '(888) 237-6835',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '7301 Parkway Drive',
          addressLocality: 'Hanover',
          addressRegion: 'MD',
          postalCode: '21076',
          addressCountry: 'US',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteBaseUrl}/#website`,
        url: siteBaseUrl,
        name: 'OperateServices',
        publisher: {
          '@id': `${siteBaseUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-[#081C31] antialiased selection:bg-[#F09200]/20 selection:text-[#001C36]">
        {children}
      </body>
    </html>
  );
}
