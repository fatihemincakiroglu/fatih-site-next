import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'GEO Rehberi | Fatih Emin Çakıroğlu',
  description: 'AI aramasında görünürlük için kapsamlı GEO rehberleri.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/geo-rehberi' }
}

const GeorehberiClient = dynamic(() => import('./GeorehberiClient'), { ssr: false })

export default function Page() {
  return <GeorehberiClient />
}
