import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Performans ve Growth | Fatih Emin Çakıroğlu',
  description: 'Trafik, dönüşüm ve büyüme hedeflerini veri odaklı optimize etme.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/performans' }
}

const PerformansClient = dynamic(() => import('./PerformansClient'), { ssr: false })

export default function Page() {
  return <PerformansClient />
}
