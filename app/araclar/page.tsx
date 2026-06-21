import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Ücretsiz SEO Araçları | Fatih Emin Çakıroğlu',
  description: 'Meta tag analizi, anahtar kelime araştırması ve SEO skor hesaplayıcı.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/araclar' }
}

const AraclarClient = dynamic(() => import('./AraclarClient'), { ssr: false })

export default function Page() {
  return <AraclarClient />
}
