import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Blog | Fatih Emin Çakıroğlu — SEO & Dijital Pazarlama',
  description: 'SEO, teknik SEO, e-ticaret ve dijital pazarlama hakkında 50+ güncel yazı ve strateji rehberi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/blog' }
}

const BlogClient = dynamic(() => import('./BlogClient'), { ssr: false })

export default function Page() {
  return <BlogClient />
}
