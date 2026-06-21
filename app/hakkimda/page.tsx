import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Hakkımda | Fatih Emin Çakıroğlu',
  description: '8+ yıllık deneyimli SEO uzmanı Fatih Emin Çakıroğlu hakkında bilgi.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/hakkimda' }
}

const HakkimdaClient = dynamic(() => import('./HakkimdaClient'), { ssr: false })

export default function Page() {
  return <HakkimdaClient />
}
