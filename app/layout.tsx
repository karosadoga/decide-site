import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Decide — Arquitectura de decisiones organizacionales',
  description:
    'La estrategia no falla. Falla el sistema que toma decisiones. Diagnóstico y rediseño de sistemas de decisión para organizaciones en crecimiento.',
  openGraph: {
    title: 'Decide — Arquitectura de decisiones organizacionales',
    description: 'La estrategia no falla. Falla el sistema que toma decisiones.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  )
}
