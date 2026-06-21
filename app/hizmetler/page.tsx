import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'SEO Hizmetleri | Fatih Emin Çakıroğlu',
  description: 'SEO, içerik, GEO ve backlink danışmanlık hizmetleri. 8+ yıl deneyim.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/hizmetler' }
}

const HizmetlerClient = dynamic(() => import('./HizmetlerClient'), { ssr: false })

export default function Page() {
  return <HizmetlerClient />
}
