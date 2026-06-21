import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Vaka Çalışmaları | Fatih Emin Çakıroğlu',
  description: 'Before/after verilerle SEO başarı hikayeleri. Gerçek müşteriler.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/vakalar' }
}

const VakalarClient = dynamic(() => import('./VakalarClient'), { ssr: false })

export default function Page() {
  return <VakalarClient />
}
