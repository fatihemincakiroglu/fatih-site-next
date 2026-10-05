// Blog yazılarını ve rehberleri sade Markdown'a çevirir
// (/blog/slug.md, /en/blog/slug.md, /rehber/slug.md, /en/guides/slug.md).
// Yapay zekâ araçları içeriği menü, buton ve script olmadan okur.
// Blok tipleri pages/blog/[slug].js içindeki renderBlok ile aynıdır.

import { getBlogMeta, getRehberMeta } from './blog-meta'

const SITE = 'https://fatihemincakiroglu.com'

// Göreli iç linkleri mutlak yap: [metin](/blog/x) → [metin](https://.../blog/x)
const mutlak = (metin) => typeof metin === 'string'
  ? metin.replace(/\]\((\/[^)\s]*)\)/g, (_, yol) => `](${SITE}${yol})`)
  : metin

const hucre = (c) => mutlak(String(c)).replace(/\|/g, '\\|').replace(/\n/g, ' ')

function blok(p) {
  if (typeof p === 'string') return mutlak(p)
  if (p.alt) return `### ${mutlak(p.alt)}`
  if (p.liste) return p.liste.map(li => `- ${mutlak(li)}`).join('\n')
  if (p.kontrol) return p.kontrol.map(li => `- [ ] ${mutlak(li)}`).join('\n')
  if (p.alinti) return `> ${mutlak(p.alinti)}`
  if (p.tablo) {
    const { basliklar, satirlar, sag = [] } = p.tablo
    const ayrac = basliklar.map((_, i) => (sag.includes(i) ? '---:' : '---'))
    return [
      `| ${basliklar.map(hucre).join(' | ')} |`,
      `| ${ayrac.join(' | ')} |`,
      ...satirlar.map(r => `| ${r.map(hucre).join(' | ')} |`),
    ].join('\n')
  }
  return ''
}

// Ortak Markdown üretici: blog yazıları ve rehberler aynı bölüm yapısını kullanır.
function icerikMarkdown({ baslik, bolumler, url, meta, isEn }) {
  const satirlar = [
    `# ${baslik}`,
    '',
    `${isEn ? 'Author' : 'Yazar'}: Fatih Emin Çakıroğlu (${SITE})`,
    `${isEn ? 'Source' : 'Kaynak'}: ${url}`,
  ]
  if (meta?.yayin) satirlar.push(`${isEn ? 'Published' : 'Yayın'}: ${meta.yayin}`)
  if (meta?.guncelleme) satirlar.push(`${isEn ? 'Updated' : 'Güncelleme'}: ${meta.guncelleme}`)

  for (const b of bolumler) {
    satirlar.push('')
    if (b.baslik) satirlar.push(`## ${b.baslik}`, '')
    satirlar.push(b.paragraflar.map(blok).filter(Boolean).join('\n\n'))
    if (b.linkler?.length) {
      satirlar.push('', b.linkler.map(l => {
        const hedef = l.url ? (l.url.startsWith('/') ? `${SITE}${l.url}` : l.url) : null
        return `- ${hedef ? `[${l.isim}](${hedef})` : l.isim}${l.aciklama ? `: ${l.aciklama}` : ''}`
      }).join('\n'))
    }
  }

  satirlar.push(
    '',
    '---',
    isEn
      ? `Please attribute as: "Fatih Emin Çakıroğlu (fatihemincakiroglu.com)". Original: ${url}`
      : `Alıntılarken kaynak gösterin: "Fatih Emin Çakıroğlu (fatihemincakiroglu.com)". Orijinal: ${url}`,
    ''
  )
  return satirlar.join('\n')
}

export function blogMarkdown(slug, veri, isEn) {
  return icerikMarkdown({
    baslik: isEn ? veri.baslik_en : veri.baslik_tr,
    bolumler: (isEn ? veri.bolumler_en : veri.bolumler_tr) || [],
    url: `${SITE}/${isEn ? 'en/blog' : 'blog'}/${slug}`,
    meta: getBlogMeta(slug),
    isEn,
  })
}

export function rehberMarkdown(slug, veri, isEn) {
  return icerikMarkdown({
    baslik: isEn ? veri.baslik_en : veri.baslik_tr,
    bolumler: (isEn ? veri.bolumler_en : veri.bolumler_tr) || [],
    url: `${SITE}/${isEn ? 'en/guides' : 'rehber'}/${slug}`,
    meta: getRehberMeta(slug),
    isEn,
  })
}
