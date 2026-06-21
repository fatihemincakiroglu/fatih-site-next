import type { Metadata } from 'next'
import AraclarClient from './AraclarClient'

export const metadata: Metadata = {
  title: 'Ücretsiz SEO Araçları | Fatih Emin Çakıroğlu',
  description: 'Meta tag analizi, anahtar kelime araştırması ve SEO skor hesaplayıcı.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/araclar' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <AraclarClient />
}
