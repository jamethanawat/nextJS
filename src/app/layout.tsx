import React from 'react'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './css/globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import ServiceWorkerRegister from '@/app/components/service-worker/ServiceWorkerRegister'

const rawEnv = process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "development";
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'PTT LNG Price Announcement'+'-'+rawEnv,
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' type='image/x-icon' />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5d87ff" />
      </head>
      <body className={`${dmSans.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange>
          {/* <ServiceWorkerRegister /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
