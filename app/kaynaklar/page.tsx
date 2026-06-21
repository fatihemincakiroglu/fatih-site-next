import type { Metadata } from 'next'
import KaynaklarClient from './KaynaklarClient'

export const metadata: Metadata = {
  title: 'Kaynaklar | Fatih Emin Çakıroğlu',
  description: 'SEO rehberleri, GEO rehberi, AI sözlük ve SSS. Ücretsiz kaynaklar.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/kaynaklar' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <KaynaklarClient />
}
