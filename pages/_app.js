import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'

export const LocaleContext = createContext('tr')
export function useLocale() { return useContext(LocaleContext) }

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const locale = router.pathname.startsWith('/en/') || router.pathname === '/en' ? 'en' : 'tr'
  
  return (
    <LocaleContext.Provider value={locale}>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </LocaleContext.Provider>
  )
}
