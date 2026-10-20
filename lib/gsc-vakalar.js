// Google Search Console ekran görüntülerinden gerçek proje sonuçları.
// Kullanan yerler: pages/vakalar.js (tümü) ve components/SektorSayfasi.js (sektor alanı eşleşenler).
//
// sektor: lib/sektorler altındaki sektör slug'ı ('klinik-seo', 'avukat-seo', 'e-ticaret-seo-danismanligi',
//         'otel-turizm-seo', 'b2b-uretici-seo') ya da null. Doldurulunca proje o sektör sayfasında da görünür.
// kismi:  önceki dönemin bir kısmında veri yoksa (site/mülk yeni) true. Bu durumda "×N" çarpanı gösterilmez,
//         çünkü kısmi dönemle kıyaslamak artışı olduğundan büyük gösterir.
// ne_yapildi_tr / ne_yapildi_en: isteğe bağlı kısa açıklama (madde listesi).
// Yeni proje: görseli public/images/vakalar/ altına WebP olarak koyup buraya bir kayıt ekleyin.

export const GSC_PROJELER = [
  {
    id: 'p3', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 6, gorsel: '/images/vakalar/gsc-p3-6ay.webp', w: 1538, h: 509, kismi: true,
        tik: [12500, 125000], gos: [123000, 2190000], to: [10.1, 5.7], konum: [12.1, 9.5] },
      { donem: 3, gorsel: '/images/vakalar/gsc-p3-3ay.webp', w: 1535, h: 517,
        tik: [49600, 75500], gos: [741000, 1450000], to: [6.7, 5.2], konum: [10.1, 9.1] },
    ],
  },
  {
    id: 'p7', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 3, gorsel: '/images/vakalar/gsc-p7-3ay.webp', w: 1541, h: 518, kismi: true,
        tik: [2860, 16000], gos: [37700, 313000], to: [7.6, 5.1], konum: [16.4, 25.8] },
    ],
  },
  {
    id: 'p6', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 3, gorsel: '/images/vakalar/gsc-p6-3ay.webp', w: 1538, h: 518,
        tik: [36000, 55000], gos: [744000, 1210000], to: [4.8, 4.5], konum: [19, 16.7] },
    ],
  },
  {
    id: 'p4', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 6, gorsel: '/images/vakalar/gsc-p4-6ay.webp', w: 1537, h: 512,
        tik: [1110, 2690], gos: [7770, 120000], to: [14.2, 2.2], konum: [14.3, 19.7] },
      { donem: 3, gorsel: '/images/vakalar/gsc-p4-3ay.webp', w: 1536, h: 515,
        tik: [950, 1740], gos: [10800, 109000], to: [8.8, 1.6], konum: [18.5, 19.8] },
    ],
  },
  {
    id: 'p2', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 6, gorsel: '/images/vakalar/gsc-p2-6ay.webp', w: 1535, h: 515,
        tik: [707, 1120], gos: [12400, 34100], to: [5.7, 3.3], konum: [19.4, 14.2] },
    ],
  },
  {
    id: 'p5', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 3, gorsel: '/images/vakalar/gsc-p5-3ay.webp', w: 1542, h: 521,
        tik: [202, 350], gos: [3440, 30100], to: [5.9, 1.2], konum: [23.1, 29.4] },
    ],
  },
  {
    id: 'p1', sektor: null, ne_yapildi_tr: [], ne_yapildi_en: [],
    gorunumler: [
      { donem: 3, gorsel: '/images/vakalar/gsc-p1-3ay.webp', w: 1538, h: 521, kismi: true,
        tik: [19, 104], gos: [465, 5360], to: [4.1, 1.9], konum: [14.9, 35.7] },
      { donem: 6, gorsel: '/images/vakalar/gsc-p1-6ay.webp', w: 1539, h: 519,
        tik: [97, 123], gos: [678, 5820], to: [14.3, 2.1], konum: [13.4, 34] },
    ],
  },
]

export const sektorProjeleri = (slug) => GSC_PROJELER.filter(p => p.sektor === slug)

// 125000 → "125 bin" / "125K"; 2190000 → "2,19 milyon" / "2.19M"
export function kisaSayi(n, isEn) {
  const [bolen, tr, en] = n >= 1e6 ? [1e6, ' milyon', 'M'] : n >= 1e4 ? [1e3, ' bin', 'K'] : [1, '', '']
  const x = n / bolen
  const ondalik = bolen === 1 ? 0 : x >= 100 ? 0 : x >= 10 ? 1 : 2
  const s = new Intl.NumberFormat(isEn ? 'en-US' : 'tr-TR', { maximumFractionDigits: ondalik }).format(x)
  return s + (isEn ? en : tr)
}

export function artisMetni([once, sonra], isEn) {
  const oran = sonra / once
  if (oran >= 2) return `×${new Intl.NumberFormat(isEn ? 'en-US' : 'tr-TR', { maximumFractionDigits: oran >= 10 ? 0 : 1 }).format(oran)}`
  const yuzde = Math.round((oran - 1) * 100)
  return isEn ? `+${yuzde}%` : `+%${yuzde}`
}
