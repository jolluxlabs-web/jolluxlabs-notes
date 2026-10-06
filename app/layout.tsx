import type { Metadata } from 'next'
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
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}
