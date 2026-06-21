import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useState, useEffect, createContext, useContext } from 'react'
import Head from 'next/head'

export const LocaleContext = createContext('tr')
export function useLocale() { return useContext(LocaleContext) }

// Cookie Banner
function CookieBanner({ isEn }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const accepted = localStorage.getItem('cookie_accepted')
    if (!accepted) setVisible(true)
  }, [])
  const accept = () => { localStorage.setItem('cookie_accepted', '1'); setVisible(false) }
  if (!visible) return null
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: '#111', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', boxShadow: '0 -4px 24px rgba(0,0,0,0.2)' }}>
      <p style={{ color: '#ccc', fontSize: '14px', margin: 0, flex: 1 }}>
        {isEn
          ? 'We use cookies to improve your experience and analyze site traffic. '
          : 'Deneyiminizi geliştirmek ve site trafiğini analiz etmek için çerezler kullanıyoruz. '}
        <a href={isEn ? '/en/privacy' : '/gizlilik'} style={{ color: 'var(--orange)' }}>
          {isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}
        </a>
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setVisible(false)} style={{ padding: '8px 16px', borderRadius: '6px', background: 'transparent', color: '#888', border: '1px solid #333', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
          {isEn ? 'Decline' : 'Reddet'}
        </button>
        <button onClick={accept} style={{ padding: '8px 20px', borderRadius: '6px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
          {isEn ? 'Accept' : 'Kabul Et'}
        </button>
      </div>
    </div>
  )
}

// WhatsApp Button
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/905XXXXXXXXX?text=Merhaba%2C%20SEO%20dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
      target="_blank" rel="noreferrer"
      style={{ position: 'fixed', bottom: '80px', right: '24px', zIndex: 998, width: '52px', height: '52px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', transition: 'transform 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      aria-label="WhatsApp ile iletişim"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.886a.5.5 0 0 0 .613.635l6.163-1.616A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 0 1-5.17-1.438l-.37-.22-3.825 1.003 1.02-3.726-.242-.385A10 10 0 1 1 12 22z"/>
      </svg>
    </a>
  )
}

// Reading Progress Bar
function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const isBlog = router.pathname.includes('/blog/') && router.pathname !== '/blog'
  
  useEffect(() => {
    if (!isBlog) return
    const update = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [isBlog])

  if (!isBlog) return null
  return (
    <div style={{ position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 999, height: '3px', background: '#eee' }}>
      <div style={{ height: '100%', background: 'var(--orange)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
    </div>
  )
}

// Back to top button
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  if (!visible) return null
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Yukarı çık"
      style={{ position: 'fixed', bottom: '144px', right: '24px', zIndex: 997, width: '44px', height: '44px', borderRadius: '50%', background: '#fff', border: '1px solid #eee', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >↑</button>
  )
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const locale = router.pathname.startsWith('/en/') || router.pathname === '/en' ? 'en' : 'tr'
  const isEn = locale === 'en'
  const canonicalBase = 'https://fatihemincakiroglu.com'
  const fullUrl = `${canonicalBase}${router.asPath}`

  return (
    <LocaleContext.Provider value={locale}>
      <Head>
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fatih Emin Çakıroğlu" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={isEn ? 'Fatih Emin Çakıroğlu | SEO & GEO Consulting' : 'Fatih Emin Çakıroğlu | SEO ve GEO Danışmanlığı'} />
        <meta property="og:description" content={isEn ? '8+ years of experience growing organic visibility for 150+ businesses through SEO, GEO and digital marketing.' : '8+ yıllık deneyimle 150+ işletmenin organik ve yapay zekâ arama görünürlüğünü artırıyorum.'} />
        <meta property="og:image" content={`${canonicalBase}/og-image.jpg`} />
        <meta property="og:locale" content={isEn ? 'en_US' : 'tr_TR'} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isEn ? 'Fatih Emin Çakıroğlu | SEO & GEO Consulting' : 'Fatih Emin Çakıroğlu | SEO ve GEO Danışmanlığı'} />
        <meta name="twitter:description" content={isEn ? '8+ years of SEO & GEO consulting expertise.' : '8+ yıllık SEO ve GEO danışmanlığı deneyimi.'} />
        <meta name="twitter:image" content={`${canonicalBase}/og-image.jpg`} />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', { page_path: window.location.pathname });
        `}} />
        {/* Vercel Speed Insights */}
        <script dangerouslySetInnerHTML={{ __html: `
          if (typeof window !== 'undefined') {
            import('@vercel/speed-insights').then(({injectSpeedInsights}) => injectSpeedInsights()).catch(() => {});
          }
        `}} />
      </Head>
      <ReadingProgress />
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner isEn={isEn} />
    </LocaleContext.Provider>
  )
}
