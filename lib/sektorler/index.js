// ─────────────────────────────────────────────────────────────
// SEKTÖR HİZMET SAYFALARI
// TR: /sektorler/<slug>   EN: /en/industries/<slug_en>
// İçerik: lib/sektorler/<slug>.json (alanlar: slug, slug_en, ad_tr/en, h1_tr/en,
// alt_tr/en, meta_baslik_tr/en, meta_desc_tr/en, ozet_tr/en, hizmetler_tr/en,
// rehberler[], ilceler[], bolumler_tr/en, sss_tr/en). Blok tipleri:
// components/IcerikBlok.js. Yalnızca getStaticProps içinde okunur.
// Yeni sektör: JSON'u ekleyin, aşağıya kaydedin, lib/sektor-liste.js'e satır ekleyin.
// ─────────────────────────────────────────────────────────────
import klinik from './klinik-seo.json'
import avukat from './avukat-seo.json'
import eticaret from './e-ticaret-seo-danismanligi.json'
import turizm from './otel-turizm-seo.json'
import b2b from './b2b-uretici-seo.json'

export const SEKTORLER = [klinik, avukat, eticaret, turizm, b2b]

export const sektorBulTr = (slug) => SEKTORLER.find(s => s.slug === slug) || null
export const sektorBulEn = (slug) => SEKTORLER.find(s => s.slug_en === slug) || null

// Yalnızca istenen dilin alanları (props küçük kalsın)
export function sektorVerisi(s, lang) {
  const diger = lang === 'en' ? '_tr' : '_en'
  return Object.fromEntries(Object.entries(s).filter(([k]) => !k.endsWith(diger)))
}
