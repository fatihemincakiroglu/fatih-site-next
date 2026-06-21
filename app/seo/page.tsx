import type { Metadata } from 'next'
import SeoClient from './SeoClient'

export const metadata: Metadata = {
  title: 'SEO Danışmanlığı | Fatih Emin Çakıroğlu',
  description: 'Teknik SEO, içerik ve backlink stratejisiyle organik büyüme sağlıyorum.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/seo' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <SeoClient />
}
