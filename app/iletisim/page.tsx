import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'İletişim | Fatih Emin Çakıroğlu',
  description: 'SEO danışmanlığı için iletişime geçin. İlk görüşme tamamen ücretsiz.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/iletisim' }
}

const IletisimClient = dynamic(() => import('./IletisimClient'), { ssr: false })

export default function Page() {
  return <IletisimClient />
}
