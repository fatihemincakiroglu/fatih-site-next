# fatihemincakiroglu.com

Fatih Emin Çakıroğlu'nun SEO & GEO danışmanlık sitesi. Next.js 14 **Pages Router**,
TR/EN iki dilli, headless CMS yok — içerik doğrudan sayfa dosyalarında.

## Kurulum

```bash
npm install
npm run dev     # http://localhost:3000
```

Üretim derlemesi:

```bash
npm run build
npm start
```

## Ortam değişkenleri

`.env.local` içine (örnek için `.env.local.example`):

| Değişken | Açıklama |
|---|---|
| `GMAIL_USER` | İletişim formunun gönderen adresi |
| `GMAIL_APP_PASSWORD` | Google hesabı **uygulama şifresi** (normal şifre değil) |
| `CONTACT_TO_EMAIL` | Opsiyonel. Mesajların iletileceği adres |

## Mimari

```
pages/            TR sayfaları (kanonik içerik burada)
pages/en/         EN sayfaları — TR bileşenini __forceLocale="en" ile sarar
pages/api/        contact (form) ve seo-audit (mini denetim aracı)
components/       Navbar, Footer, arama, popup'lar vb.
lib/urls.js       TR↔EN URL eşlemesi + getAlternates() (hreflang kaynağı)
lib/content-index.js  Yayındaki blog/rehber slug'ları — TEK KAYNAK
lib/safe-fetch.js     SSRF korumalı dış istek yardımcısı
lib/rate-limit.js     Basit in-memory rate limiter
```

### İki dillilik

`next-i18next` **kullanılmıyor**. EN sayfaları TR sayfa bileşenini içe aktarıp
`__forceLocale="en"` prop'u ile render eder; metinler bileşen içinde
`isEn ? ... : ...` şeklinde seçilir.

Yeni bir sayfa çifti eklerken `lib/urls.js` içindeki `URL_MAP`'e de ekleyin —
hreflang ve dil değiştirici oradan besleniyor.

### İçerik yayınlama

Blog ve rehber sayfaları `lib/content-index.js` tarafından kontrol edilir.
Bu listelerde olmayan bir slug listelenmez, sitemap'e girmez ve 404 döner.

Yeni yazı yayına almak için:

1. `pages/blog/[slug].js` → `ICERIKLER` objesine gerçek içeriği ekleyin
   (rehber için `pages/rehber/[slug].js` → `TÜM_REHBERLER`).
2. Slug'ı `lib/content-index.js` içindeki ilgili listeye ekleyin.

> Şablon/dolgu metniyle sayfa yayınlamayın. Birbirinin aynısı onlarca URL
> thin-content sinyali yaratır ve site geneli kalite skorunu düşürür.

### Render stratejisi

Sayfaların tamamına yakını statik üretilir. `getServerSideProps` yalnızca
sitemap rotalarında kullanılır; sayfalara **veri çekmeden** eklemeyin,
aksi hâlde statik üretim kapanır.

## SEO notları

- **canonical:** her sayfa kendi `<Head>`'inde tanımlar.
- **hreflang:** `pages/_app.js` merkezî olarak basar, sayfalara eklemeyin.
- **sitemap:** `pages/sitemap.xml.js`, slug listelerini `content-index`'ten alır.
- **noindex:** gizlilik, kullanım koşulları ve hata sayfalarında.

## Bilinen teknik borç

- `npm audit` 2 açık bildiriyor (`next`, `postcss`); yalnızca Next 16'ya
  geçilerek kapanıyor. İlgili uyarıların çoğu App Router / Server Components
  özelinde ve bu projede kullanılmıyor.
- Blog 4, rehber 2 yazıda. Kalan başlıklar `TUM_YAZILAR` /
  `TUM_REHBERLER_LISTE` içinde metadata olarak duruyor.
