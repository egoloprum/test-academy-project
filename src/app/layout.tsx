import type { Metadata } from 'next'

import './globals.scss'
import { ToastProvider } from '@/shared/ui/Toast'

export const metadata: Metadata = {
  title: 'Academy platform',
  description: 'Blah blah yada yada'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
