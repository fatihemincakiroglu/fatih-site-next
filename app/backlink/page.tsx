import type { Metadata } from 'next'
import BacklinkClient from './BacklinkClient'

export const metadata: Metadata = {
  title: 'Backlink ve Dijital PR | Fatih Emin Çakıroğlu',
  description: 'Editoryal linkler ve dijital PR ile domain otoritesi inşası.',
  alternates: { canonical: 'https://fatihemincakiroglu.com/backlink' }
}

export const dynamic = 'force-dynamic'

export default function Page() {
  return <BacklinkClient />
}
