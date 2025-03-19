import type { Metadata } from 'next'
import './globals.scss'

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
      <body>{children}</body>
    </html>
  )
}
