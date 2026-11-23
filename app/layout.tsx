import type { Metadata, Viewport } from 'next';
import './globals.css';
import { content } from '@/content/surprise';

export const metadata: Metadata = {
  metadataBase: new URL(content.meta.url),
  title: content.meta.title,
  description: content.meta.description,
  openGraph: {
    title: content.meta.title,
    description: content.meta.description,
    url: content.meta.url,
    siteName: 'ถึงเธอ',
    images: [
      {
        url: content.meta.ogImage,
        width: 1200,
        height: 630,
        alt: 'ถึงเธอ 💌 สุขสันต์วันเกิด',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: content.meta.title,
    description: content.meta.description,
    images: [content.meta.ogImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1A1412',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="candle-bg">{children}</body>
    </html>
  );
}
