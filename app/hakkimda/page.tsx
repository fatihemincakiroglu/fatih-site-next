import type { Metadata } from 'next'
import HakkimdaClient from './HakkimdaClient'

export const metadata: Metadata = {
  title: 'Hakkımda | Fatih Emin Çakıroğlu',
  description: '8+ yıllık deneyimli SEO uzmanı Fatih Emin Çakıroğlu hakkında bilgi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/hakkimda' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <HakkimdaClient />
}
