import type { Metadata } from 'next'
import RandevuClient from './RandevuClient'

export const metadata: Metadata = {
  title: 'Randevu Al | Fatih Emin Çakıroğlu',
  description: 'Ücretsiz SEO keşif görüşmesi için randevu alın.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/randevu' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <RandevuClient />
}
