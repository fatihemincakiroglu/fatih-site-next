// Blog RSS feed'i.
//
// Kaynak: pages/blog.js -> YAZILAR (yalnızca lib/content-index.js'te
// yayında işaretlenmiş yazılar). Yeni yazı yayına alınınca feed'e de
// otomatik düşer, ayrıca bakım gerekmez.
//
// Feed sayfa <head>'inde <link rel="alternate" type="application/rss+xml">
// ile duyuruluyor (pages/_app.js).

import { YAZILAR } from './blog'

const BASE = 'https://fatihemincakiroglu.com'

// XML'de & < > " ' karakterleri kaçırılmalı, yoksa feed geçersiz olur.
const esc = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

function buildFeed() {
  const now = new Date().toUTCString()

  const items = YAZILAR.map(y => {
    const url = `${BASE}/blog/${y.slug}`
    const baslik = y.tr?.baslik || y.slug
    const ozet = y.tr?.ozet || ''
    // Yazıda tarih alanı yoksa yayın tarihi olarak bugünü vermiyoruz;
    // yanlış tarih, feed okuyucularda yanlış sıralamaya yol açar.
    const tarih = y.tarih ? new Date(y.tarih).toUTCString() : null

    return `    <item>
      <title>${esc(baslik)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(ozet)}</description>${tarih ? `
      <pubDate>${tarih}</pubDate>` : ''}
    </item>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fatih Emin Çakıroğlu — Blog</title>
    <link>${BASE}/blog</link>
    <description>SEO, GEO ve dijital pazarlama üzerine yazılar.</description>
    <language>tr</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`
}

export default function Rss() { return null }

export async function getServerSideProps({ res }) {
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(buildFeed())
  res.end()
  return { props: {} }
}
