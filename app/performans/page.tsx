import type { Metadata } from 'next'
import PerformansClient from './PerformansClient'

export const metadata: Metadata = {
  title: 'Performans ve Growth | Fatih Emin Çakıroğlu',
  description: 'Trafik, dönüşüm ve büyüme hedeflerini veri odaklı optimize etme.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/performans' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <PerformansClient />
}
