import type { Metadata } from 'next'
import VakalarClient from './VakalarClient'

export const metadata: Metadata = {
  title: 'Vaka Çalışmaları | Fatih Emin Çakıroğlu',
  description: 'Before/after verilerle SEO başarı hikayeleri. Gerçek müşteriler.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/vakalar' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <VakalarClient />
}
