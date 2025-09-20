import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CVBoost AI - Optimisez votre CV avec l\'IA',
  description: 'Transformez votre CV avec l\'intelligence artificielle. Obtenez des conseils personnalisés, optimisez vos compétences et augmentez vos chances d\'être recruté.',
  generator: 'CVBoost AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
