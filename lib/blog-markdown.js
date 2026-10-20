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
  if (p.kod) return '```\n' + p.kod + '\n```'
  // Görsel bloklar düz metne çevrilir
  if (p.akis) return [p.akis.baslik ? `**${mutlak(p.akis.baslik)}**` : null,
    ...p.akis.adimlar.map((a, i) => (typeof a === 'string' ? `${i + 1}. ${mutlak(a)}` : `${i + 1}. **${mutlak(a.baslik)}**${a.metin ? `: ${mutlak(a.metin)}` : ''}`)),
  ].filter(Boolean).join('\n')
  if (p.kartlar) return p.kartlar.map(k => `- **${mutlak(k.baslik)}**: ${mutlak(k.metin)}`).join('\n')
  if (p.karsilastir) return [p.karsilastir.sol, p.karsilastir.sag]
    .map(t => `**${mutlak(t.baslik)}**\n` + t.maddeler.map(m => `- ${mutlak(m)}`).join('\n')).join('\n\n')
  if (p.agac) return [`- ${mutlak(p.agac.kok)}`, ...p.agac.dallar.flatMap(d => [`  - ${mutlak(d.ad)}`, ...(d.alt || []).map(a => `    - ${mutlak(a)}`)])].join('\n')
  if (p.cubuk) return [p.cubuk.baslik ? `**${mutlak(p.cubuk.baslik)}**` : null,
    ...p.cubuk.veriler.map(v => `- ${mutlak(v.etiket)}: ${v.deger}${p.cubuk.birim || ''}`),
    p.cubuk.not ? `_${mutlak(p.cubuk.not)}_` : null,
  ].filter(Boolean).join('\n')
  if (p.kutu) return `> **${mutlak(p.kutu.baslik || '')}** ${mutlak(p.kutu.metin)}`.replace('> **** ', '> ')
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
function icerikMarkdown({ baslik, bolumler, url, meta, isEn, sss = [] }) {
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

  if (sss.length) {
    satirlar.push('', `## ${isEn ? 'Frequently Asked Questions' : 'Sıkça Sorulan Sorular'}`)
    for (const f of sss) satirlar.push('', `### ${f.s}`, '', mutlak(f.c))
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
    sss: (isEn ? veri.sss_en : veri.sss_tr) || [],
  })
}

export function rehberMarkdown(slug, veri, isEn) {
  return icerikMarkdown({
    baslik: isEn ? veri.baslik_en : veri.baslik_tr,
    bolumler: (isEn ? veri.bolumler_en : veri.bolumler_tr) || [],
    url: `${SITE}/${isEn ? 'en/guides' : 'rehber'}/${slug}`,
    meta: getRehberMeta(slug),
    isEn,
    sss: (isEn ? veri.sss_en : veri.sss_tr) || [],
  })
}
