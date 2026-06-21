import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Kaynaklar | Fatih Emin Çakıroğlu',
  description: 'SEO rehberleri, GEO rehberi, AI sözlük ve SSS. Ücretsiz kaynaklar.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/kaynaklar' }
}

const KaynaklarClient = dynamic(() => import('./KaynaklarClient'), { ssr: false })

export default function Page() {
  return <KaynaklarClient />
}
