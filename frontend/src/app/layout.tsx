import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/Toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'Interactive Syllabus | RRB Technician Gr I Signal',
  description: 'Interactive syllabus for RRB Technician Grade I Signal exam preparation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        </head>
        <body className="antialiased">
          <ToastProvider>
            {children}
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
