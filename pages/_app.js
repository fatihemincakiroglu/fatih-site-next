import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useState, useEffect, createContext, useContext } from 'react'
import Head from 'next/head'

export const LocaleContext = createContext('tr')
export function useLocale() { return useContext(LocaleContext) }

// ── DARK MODE ──────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }
  return [dark, toggle]
}

// ── GLOBAL SEARCH ──────────────────────────────────────────
const SEARCH_INDEX = [
  { title: 'SEO Danışmanlığı', title_en: 'SEO Consulting', href: '/seo', href_en: '/en/seo-consulting', cat: 'Hizmet' },
  { title: 'GEO Danışmanlığı', title_en: 'GEO Consulting', href: '/geo', href_en: '/en/geo-consulting', cat: 'Hizmet' },
  { title: 'İçerik Stratejisi', title_en: 'Content Strategy', href: '/icerik', href_en: '/en/content-strategy', cat: 'Hizmet' },
  { title: 'Backlink & Dijital PR', title_en: 'Backlink & Digital PR', href: '/backlink', href_en: '/en/backlink-digital-pr', cat: 'Hizmet' },
  { title: 'Performans & Growth', title_en: 'Performance & Growth', href: '/performans', href_en: '/en/performance-growth', cat: 'Hizmet' },
  { title: 'Hakkımda', title_en: 'About', href: '/hakkimda', href_en: '/en/about', cat: 'Sayfa' },
  { title: 'Referanslar', title_en: 'Testimonials', href: '/referanslar', href_en: '/en/testimonials', cat: 'Sayfa' },
  { title: 'Vaka Çalışmaları', title_en: 'Case Studies', href: '/vakalar', href_en: '/en/case-studies', cat: 'Sayfa' },
  { title: 'Fiyatlandırma', title_en: 'Pricing', href: '/fiyatlandirma', href_en: '/en/pricing', cat: 'Sayfa' },
  { title: 'İletişim', title_en: 'Contact', href: '/iletisim', href_en: '/en/contact', cat: 'Sayfa' },
  { title: 'Randevu', title_en: 'Book a Call', href: '/randevu', href_en: '/en/book-a-call', cat: 'Sayfa' },
  { title: 'Blog', title_en: 'Blog', href: '/blog', href_en: '/en/blog', cat: 'Kaynak' },
  { title: 'SEO Rehberi', title_en: 'SEO Guide', href: '/seo-rehberi', href_en: '/en/seo-guide', cat: 'Rehber' },
  { title: 'GEO Rehberi', title_en: 'GEO Guide', href: '/geo-rehberi', href_en: '/en/geo-guide', cat: 'Rehber' },
  { title: 'AI Sözlük', title_en: 'AI Glossary', href: '/ai-sozluk', href_en: '/en/ai-glossary', cat: 'Kaynak' },
  { title: 'Araçlar', title_en: 'Tools', href: '/araclar', href_en: '/en/tools', cat: 'Kaynak' },
  { title: 'SSS', title_en: 'FAQ', href: '/sss', href_en: '/en/faq', cat: 'Kaynak' },
  { title: 'Core Web Vitals Rehberi', title_en: 'Core Web Vitals Guide', href: '/blog/core-web-vitals-2025', href_en: '/en/blog/core-web-vitals-2025', cat: 'Blog' },
  { title: 'GEO Nedir?', title_en: 'What is GEO?', href: '/blog/geo-nedir-rehber', href_en: '/en/blog/geo-nedir-rehber', cat: 'Blog' },
  { title: 'Teknik SEO Rehberi', title_en: 'Technical SEO Guide', href: '/rehber/teknik-seo', href_en: '/en/guides/teknik-seo', cat: 'Rehber' },
  { title: 'İçerik Stratejisi Rehberi', title_en: 'Content Strategy Guide', href: '/rehber/icerik-stratejisi', href_en: '/en/guides/icerik-stratejisi', cat: 'Rehber' },
]

function GlobalSearch({ isEn, onClose }) {
  const [q, setQ] = useState('')
  const router = useRouter()
  const results = q.length > 1
    ? SEARCH_INDEX.filter(item => {
        const title = isEn ? item.title_en : item.title
        return title.toLowerCase().includes(q.toLowerCase())
      }).slice(0, 8)
    : []

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const go = (item) => {
    router.push(isEn ? item.href_en : item.href)
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px', padding: '80px 16px 16px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'var(--card-bg)', borderRadius: '16px', width: '100%', maxWidth: '560px', border: '1px solid var(--card-border)', boxShadow: '0 24px 80px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '18px', color: 'var(--text3)' }}>🔍</span>
          <input autoFocus type="text" value={q} onChange={e => setQ(e.target.value)}
            placeholder={isEn ? 'Search pages, guides, blog...' : 'Sayfa, rehber, blog ara...'}
            style={{ flex: 1, border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', fontFamily: 'var(--font-body)', color: 'var(--text)' }} />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text3)', padding: '4px' }}>✕</button>
        </div>
        {/* Results */}
        {results.length > 0 ? (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {results.map((item, i) => (
              <button key={i} onClick={() => go(item)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-body)', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--input-bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--orange)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(232,86,10,0.3)', flexShrink: 0 }}>
                  {item.cat}
                </span>
                <span style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 600 }}>
                  {isEn ? item.title_en : item.title}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '16px', color: 'var(--text3)' }}>→</span>
              </button>
            ))}
          </div>
        ) : q.length > 1 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text3)', fontSize: '14px' }}>
            {isEn ? 'No results found.' : 'Sonuç bulunamadı.'}
          </div>
        ) : (
          <div style={{ padding: '20px 20px 16px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text3)', fontWeight: 700, letterSpacing: '1px', marginBottom: '10px' }}>{isEn ? 'POPULAR' : 'POPÜLER'}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['SEO', 'GEO', 'Core Web Vitals', 'Backlink', isEn ? 'Pricing' : 'Fiyatlandırma', 'Blog'].map(tag => (
                <button key={tag} onClick={() => setQ(tag)}
                  style={{ padding: '6px 14px', borderRadius: '20px', background: 'var(--input-bg)', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text2)', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '16px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text3)' }}>↑↓ {isEn ? 'navigate' : 'gezin'}</span>
          <span style={{ fontSize: '11px', color: 'var(--text3)' }}>↵ {isEn ? 'open' : 'aç'}</span>
          <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Esc {isEn ? 'close' : 'kapat'}</span>
        </div>
      </div>
    </div>
  )
}

// ── COOKIE BANNER ──────────────────────────────────────────
function CookieBanner({ isEn }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { if (!localStorage.getItem('cookie_accepted')) setVisible(true) }, [])
  const accept = () => { localStorage.setItem('cookie_accepted', '1'); setVisible(false) }
  if (!visible) return null
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: '#111', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', boxShadow: '0 -4px 24px rgba(0,0,0,0.2)' }}>
      <p style={{ color: '#ccc', fontSize: '13px', margin: 0, flex: 1 }}>
        {isEn ? 'We use cookies to improve your experience. ' : 'Deneyiminizi geliştirmek için çerezler kullanıyoruz. '}
        <a href={isEn ? '/en/privacy' : '/gizlilik'} style={{ color: 'var(--orange)' }}>{isEn ? 'Privacy Policy' : 'Gizlilik Politikası'}</a>
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setVisible(false)} style={{ padding: '7px 14px', borderRadius: '6px', background: 'transparent', color: '#888', border: '1px solid #333', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)' }}>
          {isEn ? 'Decline' : 'Reddet'}
        </button>
        <button onClick={accept} style={{ padding: '7px 18px', borderRadius: '6px', background: 'var(--orange)', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
          {isEn ? 'Accept' : 'Kabul Et'}
        </button>
      </div>
    </div>
  )
}

// ── WHATSAPP ──────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a href="https://wa.me/905412650585?text=Merhaba%2C%20SEO%20dan%C4%B1%C5%9Fmanl%C4%B1%C4%9F%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
      target="_blank" rel="noreferrer" aria-label="WhatsApp"
      style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 998, width: '52px', height: '52px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', transition: 'transform 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.522 5.847L.057 23.886a.5.5 0 0 0 .613.635l6.163-1.616A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 0 1-5.17-1.438l-.37-.22-3.825 1.003 1.02-3.726-.242-.385A10 10 0 1 1 12 22z"/>
      </svg>
    </a>
  )
}

// ── READING PROGRESS ──────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const show = router.pathname.includes('/blog/') || router.pathname.includes('/rehber/') || router.pathname.includes('/guides/') || router.pathname.includes('/en/blog/')
  useEffect(() => {
    if (!show) return
    const update = () => {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [show])
  if (!show) return null
  return (
    <div style={{ position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 999, height: '3px', background: 'var(--border)' }}>
      <div style={{ height: '100%', background: 'var(--orange)', width: `${progress}%`, transition: 'width 0.1s linear' }} />
    </div>
  )
}

// ── BACK TO TOP ───────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  if (!visible) return null
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Yukarı"
      style={{ position: 'fixed', bottom: '144px', right: '20px', zIndex: 997, width: '44px', height: '44px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--card-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s', color: 'var(--text)' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>↑</button>
  )
}

// ── APP ───────────────────────────────────────────────────
export default function App({ Component, pageProps }) {
  const router = useRouter()
  const locale = router.pathname.startsWith('/en/') || router.pathname === '/en' ? 'en' : 'tr'
  const isEn = locale === 'en'
  const [dark, toggleDark] = useDarkMode()
  const [searchOpen, setSearchOpen] = useState(false)

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(s => !s)
      }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  // Restore scroll position after language switch
  useEffect(() => {
    const saved = sessionStorage.getItem('scrollY')
    if (saved) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(saved), behavior: 'instant' })
        sessionStorage.removeItem('scrollY')
      }, 100)
    }
  }, [router.pathname])

  return (
    <LocaleContext.Provider value={locale}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Fatih Emin Çakıroğlu" />
        <meta property="og:image" content="https://fatihemincakiroglu.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://fatihemincakiroglu.com/og-image.jpg" />
        {/* GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');` }} />
      </Head>
      <ReadingProgress />
      <Navbar dark={dark} toggleDark={toggleDark} onSearchOpen={() => setSearchOpen(true)} isEn={isEn} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner isEn={isEn} />
      {searchOpen && <GlobalSearch isEn={isEn} onClose={() => setSearchOpen(false)} />}
    </LocaleContext.Provider>
  )
}
