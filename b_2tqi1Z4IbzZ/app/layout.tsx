import type { Metadata, Viewport } from 'next'
import { Oswald, Rajdhani, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const oswald = Oswald({ 
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700']
})

const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600']
})

export const metadata: Metadata = {
  title: 'TP Hunters — Stop Losing. Start Hunting.',
  description: 'Professional trading signals and mentorship for XAUUSD & NASDAQ 100. Real-time WhatsApp delivery. Transparent results. First trade covered.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${rajdhani.variable} ${inter.variable}`}>
      <body className="font-inter antialiased bg-black text-white">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
