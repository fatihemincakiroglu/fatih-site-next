// SEO ROI hesaplayıcı: saf hesap mantığı (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/seo-roi-hesaplayici.js kullanır.
//
// Model (tamamen kullanıcının varsayımlarına dayanır, sektör ortalaması içermez):
// • SEO olmasa organik trafik mevcut seviyede sabit kalır (karşılaştırma tabanı).
// • Beklenen artış, dönem boyunca DOĞRUSAL olarak ulaşılır: m. ayda ek oran = artış × m / ay.
// • Ek dönüşüm = ek oturum × dönüşüm oranı; ek gelir = ek dönüşüm × ortalama değer;
//   ek brüt kâr = ek gelir × brüt marj.
// • Maliyet = her ay aylık SEO maliyeti + 1. ayda tek seferlik kurulum maliyeti.
// • ROI = (toplam ek brüt kâr - toplam maliyet) / toplam maliyet.
// • Geri ödeme ayı: kümülatif ek brüt kârın kümülatif maliyete ilk ulaştığı ay (dönem içinde).

export const VARSAYILAN = {
  oturum: 20000,
  artis: 40,
  ay: 12,
  donusum: 2,
  deger: 1500,
  marj: 40,
  aylikMaliyet: 25000,
  kurulum: 0,
}

export const PARA_BIRIMLERI = ['TRY', 'USD', 'EUR']

const sayi = (x, min, max) => {
  const n = typeof x === 'string' ? parseFloat(x.replace(',', '.')) : Number(x)
  if (!Number.isFinite(n)) return min
  return Math.min(max, Math.max(min, n))
}

// Girdileri güvenli aralıklara çeker. Boş ya da geçersiz alanlar alt sınıra düşer.
export function girdiTemizle(g = {}) {
  return {
    oturum: sayi(g.oturum, 0, 1e9),
    artis: sayi(g.artis, 0, 10000),
    ay: Math.round(sayi(g.ay, 1, 60)),
    donusum: sayi(g.donusum, 0, 100),
    deger: sayi(g.deger, 0, 1e9),
    marj: sayi(g.marj, 0, 100),
    aylikMaliyet: sayi(g.aylikMaliyet, 0, 1e9),
    kurulum: sayi(g.kurulum, 0, 1e10),
  }
}

/**
 * @returns {{
 *   girdi: object,
 *   aylar: {ay: number, ekOturum: number, ekDonusum: number, ekGelir: number, ekBrut: number, maliyet: number, net: number, kumulatifNet: number}[],
 *   toplam: {ekOturum: number, ekDonusum: number, ekGelir: number, ekBrut: number, maliyet: number, net: number},
 *   roi: number|null, geriOdemeAyi: number|null, donemSonuAylikEkOturum: number, donemSonuAylikNet: number
 * }}
 */
export function seoRoiHesapla(girdi) {
  const g = girdiTemizle(girdi)
  const aylar = []
  const toplam = { ekOturum: 0, ekDonusum: 0, ekGelir: 0, ekBrut: 0, maliyet: 0, net: 0 }
  let kumBrut = 0
  let kumMaliyet = 0
  let geriOdemeAyi = null
  for (let m = 1; m <= g.ay; m++) {
    const ekOturum = g.oturum * (g.artis / 100) * (m / g.ay)
    const ekDonusum = ekOturum * (g.donusum / 100)
    const ekGelir = ekDonusum * g.deger
    const ekBrut = ekGelir * (g.marj / 100)
    const maliyet = g.aylikMaliyet + (m === 1 ? g.kurulum : 0)
    const net = ekBrut - maliyet
    kumBrut += ekBrut
    kumMaliyet += maliyet
    if (geriOdemeAyi === null && kumMaliyet > 0 && kumBrut >= kumMaliyet) geriOdemeAyi = m
    toplam.ekOturum += ekOturum
    toplam.ekDonusum += ekDonusum
    toplam.ekGelir += ekGelir
    toplam.ekBrut += ekBrut
    toplam.maliyet += maliyet
    aylar.push({ ay: m, ekOturum, ekDonusum, ekGelir, ekBrut, maliyet, net, kumulatifNet: kumBrut - kumMaliyet })
  }
  toplam.net = toplam.ekBrut - toplam.maliyet
  const roi = toplam.maliyet > 0 ? (toplam.net / toplam.maliyet) * 100 : null
  const son = aylar[aylar.length - 1]
  return {
    girdi: g,
    aylar,
    toplam,
    roi,
    geriOdemeAyi,
    // Dönem sonunda ulaşılan aylık seviye (artış tamamlandıktan sonra, maliyet aynı kalırsa)
    donemSonuAylikEkOturum: son.ekOturum,
    donemSonuAylikNet: son.ekBrut - g.aylikMaliyet,
  }
}
