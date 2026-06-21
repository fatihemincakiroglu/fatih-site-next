import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Backlink ve Dijital PR | Fatih Emin Çakıroğlu',
  description: 'Editoryal linkler ve dijital PR ile domain otoritesi inşası.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/backlink' }
}

const BacklinkClient = dynamic(() => import('./BacklinkClient'), { ssr: false })

export default function Page() {
  return <BacklinkClient />
}
