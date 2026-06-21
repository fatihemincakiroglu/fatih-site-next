import type { Metadata } from 'next'
import IletisimClient from './IletisimClient'

export const metadata: Metadata = {
  title: 'İletişim | Fatih Emin Çakıroğlu',
  description: 'SEO danışmanlığı için iletişime geçin. İlk görüşme tamamen ücretsiz.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/iletisim' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <IletisimClient />
}
