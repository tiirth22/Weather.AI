import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Climate Data Analytics Dashboard',
  description: 'Comprehensive global climate data analysis with interactive visualizations, statistical insights, and predictive modeling',
  keywords: ['climate data', 'data science', 'analytics', 'visualization', 'environment', 'sustainability'],
  authors: [{ name: 'Data Science Portfolio' }],
  openGraph: {
    title: 'Climate Data Analytics Dashboard',
    description: 'Interactive climate data analysis and visualization platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          {children}
        </div>
      </body>
    </html>
  )
}
