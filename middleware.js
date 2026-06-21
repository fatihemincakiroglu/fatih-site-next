import { NextResponse } from 'next/server'

const EN_TO_TR = {
  '/en/tools':              '/en/araclar',
  '/en/contact':            '/en/iletisim',
  '/en/about':              '/en/hakkimda',
  '/en/services':           '/en/hizmetler',
  '/en/resources':          '/en/kaynaklar',
  '/en/guides':             '/en/rehber',
  '/en/blog':               '/en/blog',
  '/en/pricing':            '/en/fiyatlandirma',
  '/en/faq':                '/en/sss',
  '/en/testimonials':       '/en/referanslar',
  '/en/case-studies':       '/en/vakalar',
  '/en/book-a-call':        '/en/randevu',
  '/en/seo-consulting':     '/en/seo',
  '/en/geo-consulting':     '/en/geo',
  '/en/content-strategy':   '/en/icerik',
  '/en/backlink-digital-pr':'/en/backlink',
  '/en/performance-growth': '/en/performans',
  '/en/seo-guide':          '/en/seo-rehberi',
  '/en/geo-guide':          '/en/geo-rehberi',
  '/en/ai-glossary':        '/en/ai-sozluk',
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if this EN slug needs to be rewritten to TR slug
  const trPath = EN_TO_TR[pathname]
  if (trPath) {
    const url = request.nextUrl.clone()
    url.pathname = trPath
    // Rewrite (not redirect) so URL stays as /en/tools but serves /en/araclar
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/en/tools', '/en/contact', '/en/about', '/en/services',
    '/en/resources', '/en/guides', '/en/pricing', '/en/faq',
    '/en/testimonials', '/en/case-studies', '/en/book-a-call',
    '/en/seo-consulting', '/en/geo-consulting', '/en/content-strategy',
    '/en/backlink-digital-pr', '/en/performance-growth',
    '/en/seo-guide', '/en/geo-guide', '/en/ai-glossary',
  ]
}
