// Sektör, ilçe ve merkez sayfalarında gösterilen yazı kartlarının verisi.
// YALNIZCA getStaticProps içinde kullanın: blog içeriklerinin tamamını içe
// aktardığı için istemci paketine girmemeli. Sayfaya yalnızca kart alanları gider.
import { ICERIKLER } from './blog-icerikler'
import { getBlogKapak } from './blog-kapaklar'
import { isYayindaBlog } from './content-index'

export function yaziKartlari(sluglar = [], lang = 'tr') {
  const en = lang === 'en'
  return sluglar
    .filter(s => ICERIKLER[s] && isYayindaBlog(s))
    .map(s => {
      const v = ICERIKLER[s]
      return {
        slug: s,
        href: en ? `/en/${s}` : `/${s}`,
        baslik: (en ? v.baslik_en : v.baslik_tr) || '',
        ozet: (en ? (v.ozet_en || v.meta_desc_en) : (v.ozet_tr || v.meta_desc_tr)) || '',
        kapak: getBlogKapak(s, en),
      }
    })
}

// Sektörel "10 SEO taktiği" yazıları (sektör sayfası olmayan alanlar)
export const SEKTOREL_YAZILAR = [
  'emlak-seo', 'restoran-kafe-seo', 'guzellik-merkezi-seo', 'egitim-kurumu-seo',
  'oto-galeri-seo', 'saas-b2b-seo', 'muhasebe-burosu-seo', 'mimarlik-ofisi-seo',
]

// Sektör sayfası → ilgili yazılar
export const SEKTOR_YAZILARI = {
  'klinik-seo': ['guzellik-merkezi-seo', 'dis-klinikleri-yerel-seo', 'eeat-icin-icerik'],
  'avukat-seo': ['avukatlar-icin-seo', 'muhasebe-burosu-seo', 'mimarlik-ofisi-seo'],
  'e-ticaret-seo-danismanligi': ['e-ticaret-altyapisi-seo-karsilastirma', 'oto-galeri-seo', 'trendyol-magazasi-mi-kendi-site-mi'],
  'otel-turizm-seo': ['restoran-kafe-seo', 'kucuk-isletme-yerel-seo', 'hreflang-uluslararasi-seo'],
  'b2b-uretici-seo': ['saas-b2b-seo', 'landing-page-seo', 'rakip-analizi-seo'],
}

// İlçe sayfaları: ilçe adına göre sabit (her derlemede aynı) ama ilçeden ilçeye değişen seçim
const YEREL_HAVUZ = [
  'restoran-kafe-seo', 'guzellik-merkezi-seo', 'emlak-seo', 'egitim-kurumu-seo', 'oto-galeri-seo',
  'muhasebe-burosu-seo', 'mimarlik-ofisi-seo', 'dis-klinikleri-yerel-seo', 'google-yorumlarina-cevap',
  'google-business-profile', 'avukatlar-icin-seo',
]
const GEO_HAVUZ = [
  'chatgpt-marka-gorunurlugu', 'google-ai-mode-turkiye', 'knowledge-graph-nedir', 'rag-nedir',
  'perplexity-kaynak-gosterilme', 'entity-seo', 'google-ai-overview-optimizasyonu', 'marka-bahsi-brand-mention',
]
function ozet(s) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }
function sec(havuz, adet, anahtar) {
  const bas = ozet(anahtar) % havuz.length
  return Array.from({ length: adet }, (_, i) => havuz[(bas + i * 3) % havuz.length])
    .filter((x, i, a) => a.indexOf(x) === i)
}
export function ilceYazilari(ilceSlug, tip) {
  if (tip === 'seo') return ['kucuk-isletme-yerel-seo', ...sec(YEREL_HAVUZ, 2, ilceSlug)]
  return [...sec(GEO_HAVUZ, 2, ilceSlug), ...sec(YEREL_HAVUZ, 1, ilceSlug)]
}
