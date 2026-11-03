// İndirilebilir kontrol listeleri (PDF, TR + EN). İçerikler scratchpad'deki JSON'lardan
// tools/pdf_uret.py ile üretildi; PDF'ler public/downloads/ altında.
// components/LeadMagnet.js ve /kaynaklar kullanır. Blog yazıları ve rehberler, aşağıdaki
// eşleşmeye göre sonlarında ilgili listeyi gösterir (eşleşme yoksa teknik SEO listesi).

export const KONTROL_LISTELERI = [
  {
    "id": "teknik-seo-denetim",
    "tr": {
      "baslik": "Teknik SEO Denetim Kontrol Listesi",
      "aciklama": "Taranabilirlikten hreflang'e kadar 10 alanda, sitenizin Google tarafından sorunsuz taranıp dizine eklenmesi için uygulanabilir kontroller.",
      "pdf": "/downloads/teknik-seo-denetim-kontrol-listesi.pdf"
    },
    "en": {
      "baslik": "Technical SEO Audit Checklist",
      "aciklama": "Actionable checks across 10 areas, from crawlability to hreflang, to make sure Google can crawl and index your site without friction.",
      "pdf": "/downloads/teknik-seo-denetim-checklist-en.pdf"
    },
    "madde": 48,
    "bolum": 8
  },
  {
    "id": "site-tasima",
    "tr": {
      "baslik": "Site Taşıma (Migrasyon) SEO Kontrol Listesi",
      "aciklama": "Alan adı, altyapı veya URL yapısı değişikliğinde organik trafiği korumak için taşıma öncesinden ilk aya kadar adım adım kontroller.",
      "pdf": "/downloads/site-tasima-kontrol-listesi.pdf"
    },
    "en": {
      "baslik": "Site Migration SEO Checklist",
      "aciklama": "Step-by-step checks from pre-launch to the first month to protect organic traffic when changing domain, platform or URL structure.",
      "pdf": "/downloads/site-tasima-checklist-en.pdf"
    },
    "madde": 42,
    "bolum": 7
  },
  {
    "id": "e-ticaret-seo",
    "tr": {
      "baslik": "E-ticaret SEO Kontrol Listesi",
      "aciklama": "Kategori ve ürün sayfalarından filtrelemeye, stok dışı ürünlere, kampanya URL'lerine ve ürün verisine kadar online mağazanız için 40 somut kontrol.",
      "pdf": "/downloads/e-ticaret-seo-kontrol-listesi.pdf"
    },
    "en": {
      "baslik": "E-commerce SEO Checklist",
      "aciklama": "40 concrete checks for your online store, from category and product pages to faceted navigation, out-of-stock items, campaign URLs and product data.",
      "pdf": "/downloads/e-ticaret-seo-checklist-en.pdf"
    },
    "madde": 40,
    "bolum": 6
  },
  {
    "id": "yerel-seo",
    "tr": {
      "baslik": "Yerel SEO Kontrol Listesi",
      "aciklama": "Google Business Profile, NAP tutarlılığı, yorumlar, yerel sayfalar ve ölçüm için haritada ve yerel aramada görünürlüğü artıran kontroller.",
      "pdf": "/downloads/yerel-seo-kontrol-listesi.pdf"
    },
    "en": {
      "baslik": "Local SEO Checklist",
      "aciklama": "Checks for Google Business Profile, NAP consistency, reviews, local pages and measurement to improve visibility in Maps and local search.",
      "pdf": "/downloads/yerel-seo-checklist-en.pdf"
    },
    "madde": 39,
    "bolum": 7
  },
  {
    "id": "geo-ai-gorunurluk",
    "tr": {
      "baslik": "GEO ve Yapay Zekâ Görünürlüğü Kontrol Listesi",
      "aciklama": "Google AI Overviews, AI Mode ve sohbet asistanlarında kaynak gösterilme ihtimalinizi artıran 40 kontrol: teknik temel, varlık netliği, içerik yapısı, botlar ve ölçüm.",
      "pdf": "/downloads/geo-ai-gorunurluk-kontrol-listesi.pdf"
    },
    "en": {
      "baslik": "GEO and AI Visibility Checklist",
      "aciklama": "40 checks to improve your chances of being cited in Google AI Overviews, AI Mode and chat assistants: technical basics, entity clarity, content, bots and measurement.",
      "pdf": "/downloads/geo-ai-gorunurluk-checklist-en.pdf"
    },
    "madde": 40,
    "bolum": 6
  },
  {
    "id": "icerik-yayin-oncesi",
    "tr": {
      "baslik": "İçerik Yayın Öncesi SEO Kontrol Listesi",
      "aciklama": "Bir yazıyı veya sayfayı yayınlamadan önce arama niyeti, başlıklar, E-E-A-T, iç linkler, görseller ve yapısal veri için 41 on-page kontrol.",
      "pdf": "/downloads/icerik-yayin-oncesi-kontrol-listesi.pdf"
    },
    "en": {
      "baslik": "Pre-Publish Content SEO Checklist",
      "aciklama": "41 on-page checks to run before you publish an article or page: search intent, headings, E-E-A-T, internal links, images and structured data.",
      "pdf": "/downloads/icerik-yayin-oncesi-checklist-en.pdf"
    },
    "madde": 41,
    "bolum": 7
  }
]

const SAYFA_LISTE = {
  "teknik-seo": "teknik-seo-denetim",
  "crawl-butcesi": "teknik-seo-denetim",
  "robots-txt": "teknik-seo-denetim",
  "javascript-seo": "teknik-seo-denetim",
  "url-yapisi-seo": "teknik-seo-denetim",
  "mobil-seo": "teknik-seo-denetim",
  "seo-audit-araclari": "teknik-seo-denetim",
  "search-console-rehberi": "teknik-seo-denetim",
  "tarandi-dizine-eklenmemis": "teknik-seo-denetim",
  "core-web-vitals-2025": "teknik-seo-denetim",
  "google-sitelinks": "teknik-seo-denetim",
  "yoast-mu-rank-math-mi": "teknik-seo-denetim",
  "cekirdek-guncelleme-trafik-dususu": "teknik-seo-denetim",
  "seo-trendleri-2026": "teknik-seo-denetim",
  "site-tasima-seo": "site-tasima",
  "301-302-yonlendirme": "site-tasima",
  "hreflang-uluslararasi-seo": "site-tasima",
  "e-ticaret-altyapisi-seo-karsilastirma": "site-tasima",
  "yerel-seo": "yerel-seo",
  "saglik-seo": "yerel-seo",
  "google-business-profile": "yerel-seo",
  "google-yorumlarina-cevap": "yerel-seo",
  "dis-klinikleri-yerel-seo": "yerel-seo",
  "avukatlar-icin-seo": "yerel-seo",
  "sesli-arama-seo": "yerel-seo",
  "e-ticaret-seo": "e-ticaret-seo",
  "shopify-seo": "e-ticaret-seo",
  "woocommerce-seo": "e-ticaret-seo",
  "e-ticaret-urun-aciklamasi": "e-ticaret-seo",
  "black-friday-seo": "e-ticaret-seo",
  "trendyol-urun-sirasi": "e-ticaret-seo",
  "hepsiburada-urun-sayfasi": "e-ticaret-seo",
  "trendyol-magazasi-mi-kendi-site-mi": "e-ticaret-seo",
  "programatik-seo": "e-ticaret-seo",
  "cro-ve-seo": "e-ticaret-seo",
  "google-ads-butce-optimizasyonu": "e-ticaret-seo",
  "meta-ads-ve-seo": "e-ticaret-seo",
  "geo-uygulama": "geo-ai-gorunurluk",
  "schema-yapisal-veri": "geo-ai-gorunurluk",
  "google-ai-overview-optimizasyonu": "geo-ai-gorunurluk",
  "entity-seo": "geo-ai-gorunurluk",
  "zero-click-arama": "geo-ai-gorunurluk",
  "chatgpt-marka-gorunurlugu": "geo-ai-gorunurluk",
  "perplexity-kaynak-gosterilme": "geo-ai-gorunurluk",
  "llms-txt-rehberi": "geo-ai-gorunurluk",
  "marka-bahsi-brand-mention": "geo-ai-gorunurluk",
  "google-ai-mode-turkiye": "geo-ai-gorunurluk",
  "ga4-yapay-zeka-trafigi": "geo-ai-gorunurluk",
  "geo-ajansi-nasil-secilir": "geo-ai-gorunurluk",
  "turkiye-en-iyi-10-geo-ajansi-2026": "geo-ai-gorunurluk",
  "turkiye-en-iyi-15-geo-ajansi-2026": "geo-ai-gorunurluk",
  "icerik-stratejisi": "icerik-yayin-oncesi",
  "anahtar-kelime-arastirmasi": "icerik-yayin-oncesi",
  "backlink-dijital-pr": "icerik-yayin-oncesi",
  "seo-raporlama": "icerik-yayin-oncesi",
  "topical-authority": "icerik-yayin-oncesi",
  "ic-linkleme": "icerik-yayin-oncesi",
  "content-pruning": "icerik-yayin-oncesi",
  "featured-snippet-serp-ozellikleri": "icerik-yayin-oncesi",
  "eeat-icin-icerik": "icerik-yayin-oncesi",
  "chatgpt-ile-seo": "icerik-yayin-oncesi",
  "yapay-zeka-icerik-google-politikasi": "icerik-yayin-oncesi",
  "video-seo": "icerik-yayin-oncesi",
  "anchor-text": "icerik-yayin-oncesi",
  "toksik-backlink-disavow": "icerik-yayin-oncesi",
  "ga4-seo-takibi": "icerik-yayin-oncesi",
  "seo-roi-olcumu": "icerik-yayin-oncesi",
  "seo-strateji-plani": "icerik-yayin-oncesi",
  "rakip-analizi-seo": "icerik-yayin-oncesi"
}

export const listeBul = (id) => KONTROL_LISTELERI.find(l => l.id === id) || KONTROL_LISTELERI[0]
export const sayfaninListesi = (slug) => listeBul(SAYFA_LISTE[slug])
export const LISTE_IDLERI = KONTROL_LISTELERI.map(l => l.id)
