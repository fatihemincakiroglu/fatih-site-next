// SERP önizleme - piksel genişliği ölçümü ve kısaltma simülasyonu.
// pages/araclar/serp-onizleme.js kullanır.
//
// Google başlık ve açıklama için resmi bir karakter ya da piksel sınırı yayınlamaz; uzun metni
// cihaz genişliğine göre "…" ile keser ve bazen metni kendisi yeniden yazar. Buradaki sınırlar
// sektörde yaygın kullanılan YAKLAŞIK değerlerdir (Arial ile ölçülür).

export const SINIRLAR = {
  masaustu: { baslik: { font: '20px Arial, sans-serif', px: 580 }, aciklama: { font: '14px Arial, sans-serif', px: 920 } },
  mobil: { baslik: { font: '18px Arial, sans-serif', px: 520 }, aciklama: { font: '14px Arial, sans-serif', px: 680 } },
}

let tuval = null
// Tarayıcıda canvas ile ölçer; canvas yoksa (sunucu, test) karakter başına ortalama genişlikle tahmin eder.
export function genislik(metin, font) {
  if (!metin) return 0
  if (typeof document !== 'undefined') {
    try {
      tuval = tuval || document.createElement('canvas')
      const ctx = tuval.getContext('2d')
      ctx.font = font
      return Math.round(ctx.measureText(metin).width)
    } catch { /* tahmine düş */ }
  }
  const boy = parseFloat(font) || 16
  return Math.round(metin.length * boy * 0.5)
}

// Metni piksel sınırına sığacak şekilde kelime sınırından keser ve " ..." ekler.
export function kisalt(metin, font, sinirPx) {
  const s = (metin || '').trim()
  if (genislik(s, font) <= sinirPx) return { metin: s, kesildi: false }
  const ek = ' ...'
  const kelimeler = s.split(/\s+/)
  let sonuc = ''
  for (const k of kelimeler) {
    const deneme = sonuc ? `${sonuc} ${k}` : k
    if (genislik(deneme + ek, font) > sinirPx) break
    sonuc = deneme
  }
  if (!sonuc) { // tek uzun kelime: karakter karakter kes
    for (const ch of s) { if (genislik(sonuc + ch + ek, font) > sinirPx) break; sonuc += ch }
  }
  return { metin: sonuc.replace(/[\s,.;:\u2013-]+$/, '') + ek, kesildi: true }
}

// Bir alanın durumu: 'bos' | 'iyi' | 'sinirda' (sınırın %90-100'ü) | 'uzun'
export function durum(px, sinir) {
  if (!px) return 'bos'
  if (px > sinir) return 'uzun'
  if (px > sinir * 0.9) return 'sinirda'
  return 'iyi'
}

// Görünen URL: alan adı › yol › parçaları (Google'ın breadcrumb biçimine benzer)
export function gorunenUrl(url) {
  try {
    const u = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`)
    const parcalar = u.pathname.split('/').filter(Boolean).map(p => { try { return decodeURIComponent(p) } catch { return p } })
    return { alan: u.hostname.replace(/^www\./, ''), tam: `${u.protocol}//${u.hostname}`, parcalar }
  } catch {
    return { alan: url || 'ornek.com', tam: '', parcalar: [] }
  }
}

// Ek kontroller: tamamı büyük harf, tekrar eden kelime, marka ayırıcı vb.
export function ipuclari(baslik, aciklama) {
  const u = []
  const b = (baslik || '').trim()
  if (b && b === b.toLocaleUpperCase('tr-TR') && /[a-zçğıöşü]/i.test(b)) u.push('buyuk-harf')
  const kel = b.toLocaleLowerCase('tr-TR').match(/[\p{L}\p{N}]+/gu) || []
  const sayac = {}
  for (const k of kel) if (k.length > 3) sayac[k] = (sayac[k] || 0) + 1
  const tekrar = Object.entries(sayac).filter(([, n]) => n >= 3).map(([k]) => k)
  if (tekrar.length) u.push({ kod: 'tekrar', kelimeler: tekrar })
  if (aciklama && aciklama.trim().length < 70) u.push('aciklama-kisa')
  if (b && b.length < 20) u.push('baslik-kisa')
  return u
}
