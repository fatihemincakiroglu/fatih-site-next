import type { Metadata } from 'next'
import HizmetlerClient from './HizmetlerClient'

export const metadata: Metadata = {
  title: 'SEO Hizmetleri | Fatih Emin Çakıroğlu',
  description: 'SEO, içerik, GEO ve backlink danışmanlık hizmetleri. 8+ yıl deneyim.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/hizmetler' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <HizmetlerClient />
}
