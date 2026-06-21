import type { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Blog | Fatih Emin Çakıroğlu — SEO & Dijital Pazarlama',
  description: 'SEO, teknik SEO, e-ticaret ve dijital pazarlama hakkında 50+ güncel yazı ve strateji rehberi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/blog' }
}

export const dynamic = 'force-dynamic'

export default function BlogPage() {
  return <BlogClient />
}
