// 301 yönlendirme oluşturucu — saf mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/yonlendirme-olusturucu.js kullanır.
//
// Girdi: her satırda "eski  yeni" çifti (sekme, virgül, noktalı virgül veya boşlukla ayrılmış;
// Excel/Sheets'ten iki sütun kopyalayıp yapıştırmak sekmeyle ayrılmış metin üretir).

export const FORMATLAR = [
  { id: 'apache', ad: 'Apache (.htaccess)', dosya: '.htaccess' },
  { id: 'nginx', ad: 'Nginx', dosya: 'redirects.conf' },
  { id: 'vercel', ad: 'Vercel (vercel.json)', dosya: 'vercel.json' },
  { id: 'nextjs', ad: 'Next.js (next.config)', dosya: 'redirects.js' },
  { id: 'netlify', ad: 'Netlify (_redirects)', dosya: '_redirects' },
]

// URL'yi { yol, sorgu, tam } parçalarına ayırır. Göreli yollar da kabul edilir.
export function ayristir(ham, kaynakAlanAdi) {
  const s = (ham || '').trim()
  if (!s) return null
  try {
    const u = new URL(s, 'https://yer-tutucu.invalid')
    const goreli = u.hostname === 'yer-tutucu.invalid'
    return {
      host: goreli ? null : u.host.toLowerCase(),
      yol: u.pathname || '/',
      sorgu: u.search.replace(/^\?/, ''),
      tam: goreli ? `${u.pathname}${u.search}` : `${u.protocol}//${u.host}${u.pathname}${u.search}`,
      ayniAlan: goreli || (kaynakAlanAdi && u.host.toLowerCase() === kaynakAlanAdi),
    }
  } catch {
    return null
  }
}

export function satirlariOku(metin) {
  const sonuc = []
  const hatalar = []
  ;(metin || '').split(/\r?\n/).forEach((satir, i) => {
    const t = satir.trim()
    if (!t || t.startsWith('#')) return
    const parca = t.split(/\t|,|;|\s+/).map(x => x.trim()).filter(Boolean)
    if (parca.length < 2) { hatalar.push({ satir: i + 1, kod: 'eksik', metin: t }); return }
    sonuc.push({ satir: i + 1, eski: parca[0], yeni: parca[1] })
  })
  return { ciftler: sonuc, hatalar }
}

// Kontroller: tekrar, kendine yönlendirme, zincir, döngü. Gerekirse zincirleri nihai hedefe bağlar.
export function analizEt(ciftler, { zincirCoz = true } = {}) {
  const uyarilar = []
  const ilk = new Map()
  const tekil = []
  // Karşılaştırma anahtarı: "alan|yol?sorgu". Göreli bir hedef, kuralın eski adresiyle
  // aynı alanda kabul edilir. Böylece eskisite.com/iletisim → yenisite.com/iletisim gibi
  // alan adı taşımaları "kendine yönlendirme" ya da döngü sanılmaz.
  const anahtar = (x, varsayilanAlan = '') => {
    const p = ayristir(x)
    if (!p) return x
    return `${p.host || varsayilanAlan}|${p.yol.replace(/\/$/, '') || '/'}${p.sorgu ? '?' + p.sorgu : ''}`
  }
  const alanOf = (x) => ayristir(x)?.host || ''
  for (const c of ciftler) {
    const alan = alanOf(c.eski)
    const k = anahtar(c.eski)
    if (k === anahtar(c.yeni, alan)) { uyarilar.push({ satir: c.satir, kod: 'kendine', eski: c.eski }); continue }
    if (ilk.has(k)) {
      const onceki = ilk.get(k)
      uyarilar.push({ satir: c.satir, kod: onceki.yeni === c.yeni ? 'tekrar' : 'celiski', eski: c.eski, onceki: onceki.satir })
      continue
    }
    ilk.set(k, c)
    tekil.push({ ...c })
  }
  // zincir / döngü
  const harita = new Map(tekil.map(c => [anahtar(c.eski), c]))
  for (const c of tekil) {
    let hedef = c.yeni
    let hedefAlan = alanOf(c.eski)
    const gorulen = new Set([anahtar(c.eski)])
    let adim = 0
    while (harita.has(anahtar(hedef, hedefAlan))) {
      const k = anahtar(hedef, hedefAlan)
      if (gorulen.has(k)) { uyarilar.push({ satir: c.satir, kod: 'dongu', eski: c.eski }); c.dongu = true; break }
      gorulen.add(k)
      const sonraki = harita.get(k)
      hedefAlan = alanOf(sonraki.eski)
      hedef = sonraki.yeni
      adim++
      if (adim > 20) break
    }
    if (adim > 0 && !c.dongu) {
      uyarilar.push({ satir: c.satir, kod: zincirCoz ? 'zincir-cozuldu' : 'zincir', eski: c.eski, nihai: hedef })
      if (zincirCoz) c.yeni = hedef
    }
  }
  return { kurallar: tekil.filter(c => !c.dongu), uyarilar }
}

const regexKacis = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// path-to-regexp (Vercel/Next) özel karakterleri
const p2rKacis = (s) => s.replace(/([:()*+?{}])/g, '\\$1')
const nginxTirnak = (s) => `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`

function hedefMetni(yeni) {
  const p = ayristir(yeni)
  return p ? p.tam : yeni
}

export function uret(kurallar, format, { kod = 301 } = {}) {
  const satirlar = []
  if (format === 'apache') {
    satirlar.push('# 301 yönlendirmeleri — fatihemincakiroglu.com/araclar/yonlendirme-olusturucu', 'RewriteEngine On', '')
    for (const k of kurallar) {
      const e = ayristir(k.eski)
      if (!e) continue
      const yol = e.yol.replace(/^\//, '')
      const hedef = hedefMetni(k.yeni)
      const sorguVar = hedef.includes('?')
      if (e.sorgu) satirlar.push(`RewriteCond %{QUERY_STRING} ^${regexKacis(e.sorgu)}$`)
      // Hedefte sorgu yoksa sondaki "?" eski sorguyu taşımaz; QSD ile aynı etki.
      satirlar.push(`RewriteRule ^${regexKacis(yol)}/?$ ${hedef}${!sorguVar && e.sorgu ? '?' : ''} [R=${kod},L]`)
    }
    return satirlar.join('\n')
  }
  if (format === 'nginx') {
    satirlar.push(
      '# http { } bloğuna:',
      'map $request_uri $yeni_adres {',
      '    default "";',
    )
    for (const k of kurallar) {
      const e = ayristir(k.eski)
      if (!e) continue
      satirlar.push(`    ${nginxTirnak(e.yol + (e.sorgu ? '?' + e.sorgu : ''))} ${nginxTirnak(hedefMetni(k.yeni))};`)
    }
    satirlar.push('}', '', '# server { } bloğuna:', `if ($yeni_adres) {`, `    return ${kod} $yeni_adres;`, '}')
    return satirlar.join('\n')
  }
  if (format === 'vercel' || format === 'nextjs') {
    const liste = kurallar.map(k => {
      const e = ayristir(k.eski)
      if (!e) return null
      const r = { source: p2rKacis(e.yol), destination: hedefMetni(k.yeni), statusCode: kod }
      if (e.sorgu) {
        r.has = [...new URLSearchParams(e.sorgu).entries()].map(([key, value]) => (value ? { type: 'query', key, value } : { type: 'query', key }))
      }
      return r
    }).filter(Boolean)
    if (format === 'vercel') return JSON.stringify({ redirects: liste }, null, 2)
    return [
      '// next.config.js / next.config.mjs içinde:',
      'async redirects() {',
      `  return ${JSON.stringify(liste, null, 2).split('\n').join('\n  ')}`,
      '}',
    ].join('\n')
  }
  if (format === 'netlify') {
    if (kurallar.some(k => ayristir(k.eski)?.sorgu)) {
      satirlar.push('# Not: Netlify sorgu parametresi eşleştirmesi sınırlıdır; sorgu içeren kuralları dağıtımdan sonra mutlaka test edin.')
    }
    for (const k of kurallar) {
      const e = ayristir(k.eski)
      if (!e) continue
      const sorgu = e.sorgu ? ' ' + [...new URLSearchParams(e.sorgu).entries()].map(([a, b]) => `${a}=${b}`).join(' ') : ''
      satirlar.push(`${e.yol}${sorgu}  ${hedefMetni(k.yeni)}  ${kod}`)
    }
    return satirlar.join('\n')
  }
  return ''
}
