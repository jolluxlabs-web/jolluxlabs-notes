import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { site } from '@/content/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: '美國生活筆記｜Notes',
    template: '%s｜美國生活筆記',
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: '/',
    title: site.name,
    description: site.description,
    images: [{ url: site.logo, width: 512, height: 512, alt: site.name }],
  },
  twitter: { card: 'summary', title: site.name, description: site.description, images: [site.logo] },
  verification: site.googleSiteVerification ? { google: site.googleSiteVerification } : undefined,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <head>
        {/* 字體：提早連線並直接載入，不用等 CSS 下載完才開始抓 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Huninn&family=Nunito:wght@500;600;700;800&family=Noto+Sans+TC:wght@400;500;700&display=swap" />
      </head>
      <body>
        {children}
        {/* Vercel Web Analytics */}
        <Analytics />
        {site.gaId && (
          <>
            {/* Google Analytics（gtag.js） */}
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
