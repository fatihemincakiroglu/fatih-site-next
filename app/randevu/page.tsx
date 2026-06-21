import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Randevu Al | Fatih Emin Çakıroğlu',
  description: 'Ücretsiz SEO keşif görüşmesi için randevu alın.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/randevu' }
}

const RandevuClient = dynamic(() => import('./RandevuClient'), { ssr: false })

export default function Page() {
  return <RandevuClient />
}
