import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { renderInline } from '../../components/IcerikBlok'
import { dogrula, ORNEKLER, ORNEKLER_EN } from '../../lib/schema-dogrula'

// Schema (JSON-LD) doğrulayıcı: tamamen tarayıcıda çalışır, kod sunucuya gönderilmez.
// TR: /schema-dogrulayici   EN: /en/schema-validator
// Mantık lib/schema-dogrula.js'te; burada yalnızca metinler ve görünüm var.

const SEVIYE_RENK = {
  hata: { renk: '#b91c1c', zemin: '#fef2f2', isaret: '✗' },
  uyari: { renk: '#b45309', zemin: '#fffbeb', isaret: '!' },
  bilgi: { renk: '#1d4ed8', zemin: '#eff6ff', isaret: 'i' },
  iyi: { renk: '#15803d', zemin: '#f0fdf4', isaret: '✓' },
}
const DURUM_RENK = { uygun: SEVIYE_RENK.iyi, eksik: SEVIYE_RENK.hata, 'zengin-yok': SEVIYE_RENK.uyari, 'ozellik-yok': { renk: '#6b7280', zemin: '#f3f4f6', isaret: '·' }, tipsiz: SEVIYE_RENK.hata, referans: { renk: '#6b7280', zemin: '#f3f4f6', isaret: '·' } }
const SIRA = { hata: 0, uyari: 1, bilgi: 2 }
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

// İç içe nesnede @type eksik olduğunda önerilecek tür
const IC_TUR = { offers: 'Offer', author: 'Person', address: 'PostalAddress', aggregateRating: 'AggregateRating', review: 'Review', reviewRating: 'Rating', location: 'Place', publisher: 'Organization', geo: 'GeoCoordinates', brand: 'Brand', itemListElement: 'ListItem', acceptedAnswer: 'Answer', suggestedAnswer: 'Answer', openingHoursSpecification: 'OpeningHoursSpecification', contactPoint: 'ContactPoint', hiringOrganization: 'Organization', jobLocation: 'Place', baseSalary: 'MonetaryAmount', nutrition: 'NutritionInformation', priceSpecification: 'UnitPriceSpecification', shippingDetails: 'OfferShippingDetails', hasMerchantReturnPolicy: 'MerchantReturnPolicy', provider: 'Organization', organizer: 'Organization', performer: 'Person', creator: 'Person', interactionStatistic: 'InteractionCounter', itemReviewed: 'Product', containsPlace: 'Accommodation', mainEntity: 'Question', hasPart: 'WebPageElement' }

export default function SchemaDogrulayici(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const ornekler = isEn ? ORNEKLER_EN : ORNEKLER
  const [metin, setMetin] = useState(ornekler.urun)
  const ertelenmis = useDeferredValue(metin)
  const sonuc = useMemo(() => dogrula(ertelenmis), [ertelenmis])
  // Schema oluşturucudan "doğrulayıcıda kontrol et" ile gelindiyse oluşturulan kodu al
  useEffect(() => {
    try {
      const gelen = sessionStorage.getItem('schemaDogrula')
      if (gelen) { sessionStorage.removeItem('schemaDogrula'); setMetin(gelen) }
    } catch { /* sessionStorage kapalı olabilir */ }
  }, [])

  const kuralAdi = (id) => ({
    article: t('Makale (Article)', 'Article'),
    breadcrumb: t('Breadcrumb (içerik yolu)', 'Breadcrumb'),
    carousel: t('Carousel (ItemList)', 'Carousel (ItemList)'),
    product: t('Ürün (ürün snippet\'i ve satıcı listeleri)', 'Product (snippets and merchant listings)'),
    localbusiness: t('Yerel işletme', 'Local business'),
    organization: t('Kurum (Organization)', 'Organization'),
    event: t('Etkinlik (Event)', 'Event'),
    recipe: t('Tarif (Recipe)', 'Recipe'),
    video: 'Video',
    jobposting: t('İş ilanı (JobPosting)', 'Job posting'),
    course: t('Kurs listesi (Course)', 'Course list'),
    dataset: t('Veri kümesi (Dataset)', 'Dataset'),
    forum: t('Tartışma forumu', 'Discussion forum'),
    qa: t('Soru ve cevap (QAPage)', 'Q&A (QAPage)'),
    profile: t('Profil sayfası', 'Profile page'),
    software: t('Yazılım uygulaması', 'Software app'),
    employerrating: t('İşveren puanı', 'Employer aggregate rating'),
    review: t('Yorum snippet\'i (Review)', 'Review snippet'),
    aggregaterating: t('Yorum snippet\'i (AggregateRating)', 'Review snippet (AggregateRating)'),
    movie: t('Film (Movie)', 'Movie'),
    image: t('Görsel meta verisi', 'Image metadata'),
    vacationrental: t('Tatil kiralama', 'Vacation rental'),
    website: t('Site adı (WebSite)', 'Site name (WebSite)'),
  }[id] || id)

  const durumAdi = (d) => ({
    uygun: t('Zengin sonuç alanları tamam', 'Rich result fields complete'),
    eksik: t('Zorunlu alan eksik ya da hatalı', 'Required field missing or invalid'),
    'zengin-yok': t('Zengin sonuç göstermez', 'Shows no rich result'),
    'ozellik-yok': t('Google zengin sonucu yok', 'No Google rich result'),
    tipsiz: t('Tür yok', 'No type'),
    referans: t('@id referansı', '@id reference'),
  }[d] || d)

  const nedenMetni = (n) => ({
    faq: t('Google 7 Mayıs 2026\'dan beri SSS (FAQ) zengin sonucu göstermiyor. İşaretleme geçerli kalabilir ve Google sayfayı anlamak için kullanabilir; kaldırmak zorunlu değil, ama arama sonucunda açılır sorular görünmez.', 'Since 7 May 2026 Google no longer shows FAQ rich results. The markup can stay valid and Google may still use it to understand the page; removing it is not required, but no expandable questions appear in search results.'),
    howto: t('HowTo zengin sonucu 2023\'te kaldırıldı. İşaretleme zarar vermez ama arama sonucunda adımlar gösterilmez.', 'The HowTo rich result was removed in 2023. The markup does no harm, but no steps are shown in search results.'),
    claimreview: t('Doğruluk kontrolü (ClaimReview) zengin sonucu Google\'ın 2025 sadeleştirmesiyle kaldırıldı.', 'The fact check (ClaimReview) rich result was removed in Google\'s 2025 simplification.'),
    specialannouncement: t('Özel duyuru (SpecialAnnouncement) zengin sonucu 2025\'te kaldırıldı.', 'The special announcement rich result was removed in 2025.'),
    'tahmini-maas': t('Tahmini maaş (Occupation) zengin sonucu 2025\'te kaldırıldı.', 'The estimated salary (Occupation) rich result was removed in 2025.'),
    arac: t('Araç ilanı (Vehicle) zengin sonucu 2025\'te kaldırıldı.', 'The vehicle listing rich result was removed in 2025.'),
  }[n] || '')

  const jsonHataMetni = (h) => {
    const k = h.karakter ? ` (${h.karakter})` : ''
    switch (h.kod) {
      case 'sondaki-virgul': return t('Son öğeden sonra virgül var. JSON sondaki virgüle izin vermez; virgülü silin.', 'There is a comma after the last item. JSON does not allow trailing commas; delete it.')
      case 'tek-tirnak': return t('Tek tırnak kullanılmış. JSON\'da anahtarlar ve metinler çift tırnak (") içinde olmalı.', 'Single quotes are used. In JSON, keys and strings must use double quotes (").')
      case 'akilli-tirnak': return t(`Akıllı tırnak${k} var. Word ya da not uygulamasından kopyalarken oluşur; düz çift tırnak (") kullanın.`, `There is a curly quote${k}. It appears when copying from Word or a notes app; use straight double quotes (").`)
      case 'tirnaksiz-anahtar': return t('Anahtar tırnak içinde değil. Doğru yazım "name" gibi çift tırnaklıdır.', 'A key is not quoted. Keys must be in double quotes, like "name".')
      case 'yorum': return t('JSON yorum (// ya da /* */) içeremez; yorumu silin.', 'JSON cannot contain comments (// or /* */); delete the comment.')
      case 'virgul-bekleniyor': return t(`Burada virgül bekleniyordu${k}. Önceki değerin sonunda virgül eksik olabilir.`, `A comma was expected here${k}. The previous value may be missing a comma.`)
      case 'iki-nokta-bekleniyor': return t(`Anahtardan sonra iki nokta üst üste bekleniyordu${k}.`, `A colon was expected after the key${k}.`)
      case 'kontrol-karakteri': return t('Metin içinde kaçışsız satır sonu ya da sekme var. Satır sonu için \\n yazın ya da metni tek satıra alın.', 'A string contains an unescaped line break or tab. Write \\n for a line break or keep the text on one line.')
      case 'gecersiz-kacis': return t(`Geçersiz kaçış dizisi${k}. Ters eğik çizgiyi \\\\ olarak yazın.`, `Invalid escape sequence${k}. Write a backslash as \\\\.`)
      case 'gecersiz-sayi': return t('Geçersiz sayı. Başta sıfır ya da sonda nokta olamaz; metin olarak yazmak için tırnak kullanın.', 'Invalid number. No leading zeros or trailing dot; use quotes to write it as text.')
      case 'gecersiz-deger': return t(`Tanınmayan değer${k}. JSON\'da true, false ve null küçük harfle yazılır; metinler tırnak içinde olmalı.`, `Unknown value${k}. In JSON, true, false and null are lowercase and strings must be quoted.`)
      case 'fazla-icerik': return t('JSON değeri bittikten sonra metin devam ediyor. İki nesneyi yan yana yapıştırdıysanız bir diziye ([ {...}, {...} ]) alın ya da ayrı script bloklarına koyun.', 'Text continues after the JSON value ends. If you pasted two objects side by side, wrap them in an array ([ {...}, {...} ]) or put them in separate script blocks.')
      case 'beklenmeyen-son': return t('Metin beklenmedik şekilde bitti. Kapanmamış bir { ya da [ var.', 'The text ended unexpectedly. A { or [ is not closed.')
      case 'kapanmayan-dize': return t('Kapanmamış bir tırnak var.', 'A quote is not closed.')
      default: return t(`Beklenmeyen karakter${k}.`, `Unexpected character${k}.`)
    }
  }

  const liste = (a) => a.join(', ')
  const bulguMetni = (b) => {
    switch (b.kod) {
      case 'blok-yok': return t('HTML\'de application/ld+json türünde script bloğu bulunamadı. Sayfa JSON-LD yerine mikroveri kullanıyor olabilir ya da şema JavaScript ile sonradan ekleniyor olabilir.', 'No application/ld+json script block was found in the HTML. The page may use microdata instead, or the schema may be added later by JavaScript.')
      case 'mikrodata': return t('Sayfada mikroveri ya da RDFa işaretlemesi de var. Bu araç yalnızca JSON-LD bloklarını denetler.', 'The page also contains microdata or RDFa. This tool only checks JSON-LD blocks.')
      case 'context-yok': return t('@context yok. "@context": "https://schema.org" olmadan Google türleri tanıyamaz.', 'No @context. Without "@context": "https://schema.org" Google cannot recognise the types.')
      case 'context-yabanci': return t(`@context schema.org değil (${b.deger}).`, `@context is not schema.org (${b.deger}).`)
      case 'tip-yok': return t('@type yok. Her öğenin bir türü olmalı (ör. "@type": "Organization").', 'No @type. Every item needs a type (e.g. "@type": "Organization").')
      case 'tip-gecersiz': return t('@type metin ya da metin dizisi olmalı.', '@type must be a string or an array of strings.')
      case 'tip-harf': return t(`"${b.deger}" türü yanlış yazılmış; doğrusu "${b.dogru}". Tür adları büyük ve küçük harfe duyarlıdır, Google yanlış yazımı tanımaz.`, `The type "${b.deger}" is misspelled; it should be "${b.dogru}". Type names are case sensitive and Google does not recognise the wrong spelling.`)
      case 'tip-onekli': return t(`"${b.deger}" yerine kısaca "${b.dogru}" yazabilirsiniz.`, `You can simply write "${b.dogru}" instead of "${b.deger}".`)
      case 'tip-bilinmeyen': return t(`"${b.deger}" bilinen bir schema.org türü değil ya da bu aracın listesinde yok. Yazımını schema.org\'da kontrol edin.`, `"${b.deger}" is not a known schema.org type or is not in this tool's list. Check the spelling on schema.org.`)
      case 'nesne-degil': return t('Dizide nesne olmayan bir değer var; her öğe { } içinde bir nesne olmalı.', 'The array contains a value that is not an object; every item must be an object in { }.')
      case 'zorunlu-eksik': return t(`Zorunlu alan eksik: ${b.ozellik}.`, `Required field missing: ${b.ozellik}.`)
      case 'zorunlu-birini': return t(`Şunlardan en az biri zorunlu: ${liste(b.ozellikler)}.`, `At least one of these is required: ${liste(b.ozellikler)}.`)
      case 'onerilen-eksik': return t(`Önerilen alanlar eksik: ${liste(b.ozellikler)}. Zorunlu değiller, ama eklemek sonucu zenginleştirir.`, `Recommended fields missing: ${liste(b.ozellikler)}. Not required, but adding them makes the result richer.`)
      case 'ic-zorunlu-eksik': return t(`${b.ust} içinde zorunlu alan eksik: ${b.ozellik}.`, `Required field missing in ${b.ust}: ${b.ozellik}.`)
      case 'ic-onerilen-eksik': return t(`${b.ust} içinde önerilen alanlar eksik: ${liste(b.ozellikler)}.`, `Recommended fields missing in ${b.ust}: ${liste(b.ozellikler)}.`)
      case 'ic-tip-yok': return t(`${b.ozellik} nesnesinde @type yok${IC_TUR[b.ozellik] ? ` (ör. "@type": "${IC_TUR[b.ozellik]}")` : ''}. İç içe öğelerin türünü belirtin.`, `The ${b.ozellik} object has no @type${IC_TUR[b.ozellik] ? ` (e.g. "@type": "${IC_TUR[b.ozellik]}")` : ''}. Give nested items a type.`)
      case 'yazar-metin': return t(`author düz metin ("${b.deger}"). Google Person ya da Organization nesnesi önerir: { "@type": "Person", "name": "...", "url": "..." }.`, `author is plain text ("${b.deger}"). Google recommends a Person or Organization object: { "@type": "Person", "name": "...", "url": "..." }.`)
      case 'adres-metin': return t('address düz metin. PostalAddress nesnesi kullanın (streetAddress, addressLocality, postalCode, addressCountry).', 'address is plain text. Use a PostalAddress object (streetAddress, addressLocality, postalCode, addressCountry).')
      case 'konum-gecersiz': return t(`${b.ozellik} geçersiz (${b.deger}). Enlem -90 ile 90, boylam -180 ile 180 arasında bir sayı olmalı.`, `${b.ozellik} is invalid (${b.deger}). Latitude must be between -90 and 90, longitude between -180 and 180.`)
      case 'kendi-yorumu': return t('İşletmenin kendi sitesinde kendisi hakkındaki puan ve yorumlar (LocalBusiness ya da Organization üzerinde) yıldız olarak gösterilmez. İşaretleme hatalı değildir.', 'Ratings and reviews a business publishes about itself on its own site (on LocalBusiness or Organization) are not shown as stars. The markup is not invalid.')
      case 'breadcrumb-tek': return t('BreadcrumbList tek öğeli. İçerik yolu en az iki adımda anlamlıdır.', 'The BreadcrumbList has one item. A breadcrumb trail makes sense with at least two steps.')
      case 'breadcrumb-sira': return t(`${b.no}. öğenin position değeri ${b.deger}; ${b.no} olmalı. Sıra 1'den başlayıp birer artmalı.`, `Item ${b.no} has position ${b.deger}; it should be ${b.no}. Positions start at 1 and go up by one.`)
      case 'liste-ogesi-eksik': return t(`${b.no}. öğede ${b.ozellik} eksik.`, `Item ${b.no} is missing ${b.ozellik}.`)
      case 'liste-ogesi-tip': return t(`${b.no}. öğenin türü ListItem değil.`, `Item ${b.no} is not of type ListItem.`)
      case 'is-konumu-eksik': return t('jobLocation eksik. Uzaktan çalışma ilanlarında jobLocationType "TELECOMMUTE" ile applicantLocationRequirements birlikte kullanılabilir.', 'jobLocation is missing. For remote jobs, use jobLocationType "TELECOMMUTE" together with applicantLocationRequirements.')
      case 'dataset-aciklama': return t(`Dataset açıklaması ${b.uzunluk} karakter; Google 50 ile 5000 karakter arası ister.`, `The Dataset description is ${b.uzunluk} characters; Google requires 50 to 5000.`)
      case 'odeme-duvari': return t('isAccessibleForFree false ama ödeme duvarlı bölümü gösteren hasPart (isAccessibleForFree false ve cssSelector) yok. Google gizlenen içeriği cloaking sanabilir.', 'isAccessibleForFree is false but there is no hasPart (with isAccessibleForFree false and a cssSelector) marking the paywalled section. Google may mistake hidden content for cloaking.')
      case 'arama-kutusu': return t('SearchAction ile site içi arama kutusu Google\'da 2024\'ten beri gösterilmiyor. Bu bölüm zararsız; WebSite işaretlemesi site adı için kullanılmaya devam ediyor.', 'The sitelinks search box (SearchAction) has not been shown by Google since 2024. The part is harmless; WebSite markup is still used for the site name.')
      case 'zengin-sonuc-yok': return nedenMetni(b.neden)
      case 'url-goreli': return t(`${b.ozellik} göreli adres (${b.deger}). Tam adres (https://...) kullanın.`, `${b.ozellik} is a relative address (${b.deger}). Use a full address (https://...).`)
      case 'url-gecersiz': return t(`${b.ozellik} geçerli bir adres değil (${b.deger}).`, `${b.ozellik} is not a valid address (${b.deger}).`)
      case 'tarih-gecersiz': return t(`${b.ozellik} ISO 8601 biçiminde değil (${b.deger}). Örnek 2026-11-06 ya da 2026-11-06T09:30:00+03:00.`, `${b.ozellik} is not in ISO 8601 format (${b.deger}). Example 2026-11-06 or 2026-11-06T09:30:00+03:00.`)
      case 'tarih-saat-dilimi': return t(`${b.ozellik} saat içeriyor ama saat dilimi yok (${b.deger}). +03:00 gibi bir dilim ekleyin, yoksa saat yanlış yorumlanabilir.`, `${b.ozellik} has a time but no time zone (${b.deger}). Add an offset such as +03:00, otherwise the time may be misread.`)
      case 'sure-gecersiz': return t(`${b.ozellik} ISO 8601 süre biçiminde değil (${b.deger}). Örnek PT30M (30 dakika) ya da PT1H15M.`, `${b.ozellik} is not an ISO 8601 duration (${b.deger}). Example PT30M (30 minutes) or PT1H15M.`)
      case 'fiyat-gecersiz': return t(`${b.ozellik} sayı değil (${b.deger}). Para birimi ve simge olmadan, ondalık için nokta kullanarak yazın ("249.90"); para birimini priceCurrency ile verin.`, `${b.ozellik} is not a number (${b.deger}). Write it without currency or symbols, with a dot for decimals ("249.90"), and give the currency in priceCurrency.`)
      case 'fiyat-virgul': return t(`${b.ozellik} virgül içeriyor (${b.deger}). Ondalık için nokta kullanın, binlik ayırıcı koymayın ("1299.90").`, `${b.ozellik} contains a comma (${b.deger}). Use a dot for decimals and no thousands separator ("1299.90").`)
      case 'para-birimi-gecersiz': return t(`Para birimi ISO 4217 kodu olmalı (${b.deger})${b.oneri ? `; "${b.oneri}" kullanın` : ''}.`, `The currency must be an ISO 4217 code (${b.deger})${b.oneri ? `; use "${b.oneri}"` : ''}.`)
      case 'puan-gecersiz': return t(`ratingValue sayı değil (${b.deger}).`, `ratingValue is not a number (${b.deger}).`)
      case 'puan-virgul': return t(`ratingValue ondalık virgül kullanıyor (${b.deger}); nokta kullanın (4.5).`, `ratingValue uses a decimal comma (${b.deger}); use a dot (4.5).`)
      case 'puan-aralik': return t(`ratingValue ${b.deger}, ama ölçek ${b.enKotu} ile ${b.enIyi} arasında. Farklı bir ölçek kullanıyorsanız bestRating ve worstRating ekleyin.`, `ratingValue is ${b.deger}, but the scale is ${b.enKotu} to ${b.enIyi}. If you use a different scale, add bestRating and worstRating.`)
      case 'puan-olcek': return t(`bestRating (${b.enIyi}) worstRating değerinden (${b.enKotu}) büyük olmalı.`, `bestRating (${b.enIyi}) must be greater than worstRating (${b.enKotu}).`)
      case 'sayi-gecersiz': return t(`${b.ozellik} sıfır ya da pozitif bir tam sayı olmalı (${b.deger}).`, `${b.ozellik} must be a whole number of zero or more (${b.deger}).`)
      case 'sayi-sifir': return t(`${b.ozellik} sıfır. Puanı ya da yorumu olmayan bir öğeye aggregateRating eklemeyin.`, `${b.ozellik} is zero. Do not add aggregateRating to an item without ratings or reviews.`)
      case 'deger-bilinmeyen': return t(`${b.ozellik} değeri tanınmıyor (${b.deger}). Geçerli değerler ${b.gecerli.slice(0, 6).join(', ')}${b.gecerli.length > 6 ? ' ve diğerleri' : ''}.`, `The ${b.ozellik} value is not recognised (${b.deger}). Valid values are ${b.gecerli.slice(0, 6).join(', ')}${b.gecerli.length > 6 ? ' and others' : ''}.`)
      case 'telefon-ulke': return t(`telephone ülke kodu içermiyor (${b.deger}). +90 ile başlayan uluslararası biçim önerilir.`, `telephone has no country code (${b.deger}). The international format (e.g. +90...) is recommended.`)
      case 'bos-deger': return t(`${b.ozellik} boş metin. Değer yoksa alanı tamamen kaldırın.`, `${b.ozellik} is an empty string. If there is no value, remove the field.`)
      case 'bos-blok': return t('Bu application/ld+json bloğu boş.', 'This application/ld+json block is empty.')
      case 'yinelenen-anahtar': return t(`"${b.anahtar}" aynı nesnede iki kez var; yalnızca sonuncusu geçerli olur.`, `"${b.anahtar}" appears twice in the same object; only the last one counts.`)
      default: return b.kod
    }
  }

  const o = sonuc.ozet
  const jsonHatasi = sonuc.bloklar.some(b => b.hata)
  const genelDurum = sonuc.tur === 'bos' ? null : (o.hata > 0 ? 'hata' : o.uyari > 0 ? 'uyari' : 'iyi')
  const genelBaslik = { hata: t('Hata var', 'Errors found'), uyari: t('Geçerli, uyarılar var', 'Valid with warnings'), iyi: t('Hata bulunmadı', 'No errors found') }

  const bulguSatiri = (b, i) => {
    const c = SEVIYE_RENK[b.seviye]
    return (
      <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: c.zemin, borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', color: '#333', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
        <span aria-hidden="true" style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: c.renk, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>{c.isaret}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{b.seviye === 'hata' ? t('Hata', 'Error') : b.seviye === 'uyari' ? t('Uyarı', 'Warning') : t('Bilgi', 'Info')}. </span>
          {bulguMetni(b)}
        </span>
        {b.satir ? <span style={{ flexShrink: 0, fontSize: '11.5px', color: '#777', fontFamily: MONO, whiteSpace: 'nowrap' }}>{t('satır', 'line')} {b.satir}</span> : null}
      </li>
    )
  }

  const icerik = isEn ? {
    baslik: 'Schema Validator (JSON-LD)',
    metaBaslik: 'Schema Validator | Free SEO Tool',
    metaDesc: 'Paste your JSON-LD and check syntax errors, missing required fields and Google rich result eligibility instantly, right in your browser.',
    giris: 'Paste JSON-LD code, one or more script blocks or the full source of a page. The tool finds JSON syntax errors with their line and column, checks @context, @type and @graph, and compares every item with the required and recommended properties Google documents for rich results. It also checks values: full URLs, ISO 8601 dates, numeric prices with a currency and ratings within their scale. To create markup use the [schema generator](/en/schema-generator); for the basics read [what is schema markup](/en/schema-markup-nedir).',
    adimlar: [
      'Paste the code into the box: raw JSON-LD, <script type="application/ld+json"> blocks or the whole page source (view-source in your browser). The result updates as you type.',
      'If there is a JSON syntax error, fix it first; the tool shows the line, the column and the likely cause.',
      'Each item card shows which Google feature it matches and its status. Fix red items first (required fields and invalid values), then review amber warnings.',
      'Generate missing markup with the [schema generator](/en/schema-generator). After publishing, test the live page with Google\'s Rich Results Test and follow the enhancement reports in Search Console.',
    ],
    sss: [
      { s: 'Does this replace Google\'s Rich Results Test?', c: 'No. This tool checks the markup you paste against the properties Google documents, without sending it anywhere. The Rich Results Test renders your live page the way Googlebot does, including schema added by JavaScript, and shows exactly which rich results Google detects. Use this tool while writing and editing, and the Rich Results Test before and after publishing.' },
      { s: 'Should I remove FAQ markup now that FAQ rich results are gone?', c: 'There is no need to rush. Since 7 May 2026 Google no longer shows FAQ rich results, but FAQPage markup is not an error and Google can still use it to understand the page. If your CMS adds it automatically you can leave it; just do not expect expandable questions in search results. More context in [what is schema markup](/en/schema-markup-nedir).' },
      { s: 'What is the difference between required and recommended properties?', c: 'Without the required properties the item is not eligible for the rich result at all. Recommended properties are optional, but they add information (price, rating, image, date) and can make the result more useful. Red findings are required fields or invalid values; amber ones are recommendations or values worth checking.' },
      { s: 'JSON-LD, microdata or RDFa?', c: 'Google supports all three but recommends JSON-LD, because it sits in a separate block and is easier to maintain. This tool only checks JSON-LD; if you paste a page that uses microdata, it tells you so. The [schema and structured data guide](/en/schema-yapisal-veri) explains the setup step by step.' },
      { s: 'Is the code I paste sent anywhere?', c: 'No. Validation runs entirely in your browser; nothing is sent to a server or stored. You can safely paste markup from staging or unpublished pages.' },
      { s: 'There are no errors, so why is there no rich result?', c: 'Valid markup makes a page eligible, but Google does not guarantee a rich result. Content quality, whether the markup matches what is visible on the page, structured data policies and the search query all play a role. Check the enhancement reports and the URL Inspection tool in Search Console, and see the [schema and structured data guide](/en/schema-yapisal-veri).' },
    ],
  } : {
    baslik: 'Schema Doğrulayıcı (JSON-LD)',
    metaBaslik: 'Schema Doğrulayıcı | Ücretsiz SEO Aracı',
    metaDesc: 'JSON-LD şemanızı yapıştırın. Sözdizimi hatalarını, eksik zorunlu alanları ve Google zengin sonuç uygunluğunu tarayıcıda anında görün.',
    giris: 'JSON-LD kodunu, bir ya da daha fazla script bloğunu ya da sayfanın tüm kaynak kodunu yapıştırın. Araç JSON sözdizimi hatalarını satır ve sütunuyla bulur, @context, @type ve @graph yapısını kontrol eder ve her öğeyi Google\'ın zengin sonuçlar için belgelediği zorunlu ve önerilen alanlarla karşılaştırır. Değerleri de denetler: tam URL, ISO 8601 tarih, para birimiyle birlikte sayısal fiyat ve ölçeğe uygun puan. İşaretleme üretmek için [schema oluşturucuyu](/schema-olusturucu), temeller için [schema markup nedir yazısını](/schema-markup-nedir) kullanın.',
    adimlar: [
      'Kodu kutuya yapıştırın: ham JSON-LD, <script type="application/ld+json"> blokları ya da sayfanın tüm kaynağı (tarayıcıda kaynağı görüntüle). Sonuç siz yazdıkça güncellenir.',
      'JSON sözdizimi hatası varsa önce onu düzeltin; araç satırı, sütunu ve olası nedeni gösterir.',
      'Her öğe kartı hangi Google özelliğine karşılık geldiğini ve durumunu gösterir. Önce kırmızı maddeleri (zorunlu alanlar ve geçersiz değerler), sonra sarı uyarıları düzeltin.',
      'Eksik işaretlemeyi [schema oluşturucuyla](/schema-olusturucu) üretin. Yayından sonra canlı sayfayı Google\'ın Zengin Sonuçlar Testi ile deneyin ve Search Console\'daki geliştirme raporlarını izleyin.',
    ],
    sss: [
      { s: 'Bu araç Google\'ın Zengin Sonuçlar Testi\'nin yerine geçer mi?', c: 'Hayır. Bu araç yapıştırdığınız işaretlemeyi hiçbir yere göndermeden Google\'ın belgelediği alanlarla karşılaştırır. Zengin Sonuçlar Testi ise canlı sayfanızı Googlebot gibi işler, JavaScript ile eklenen şemayı da görür ve Google\'ın hangi zengin sonuçları algıladığını tam olarak gösterir. Bu aracı yazarken ve düzenlerken, Zengin Sonuçlar Testi\'ni yayından önce ve sonra kullanın.' },
      { s: 'SSS zengin sonucu kalktı, FAQ işaretlemesini silmeli miyim?', c: 'Acele etmeye gerek yok. Google 7 Mayıs 2026\'dan beri SSS zengin sonucu göstermiyor, ama FAQPage işaretlemesi hata değildir ve Google sayfayı anlamak için kullanmaya devam edebilir. CMS\'iniz otomatik ekliyorsa bırakabilirsiniz; yalnızca arama sonucunda açılır sorular beklemeyin. Ayrıntılar [schema markup nedir yazısında](/schema-markup-nedir).' },
      { s: 'Zorunlu ve önerilen alan arasındaki fark nedir?', c: 'Zorunlu alanlar olmadan öğe zengin sonuca hiç uygun olmaz. Önerilen alanlar isteğe bağlıdır, ama fiyat, puan, görsel ve tarih gibi bilgiler ekleyerek sonucu daha yararlı hâle getirebilir. Kırmızı bulgular zorunlu alan ya da geçersiz değer, sarı olanlar öneri ya da kontrol edilmesi gereken değerlerdir.' },
      { s: 'JSON-LD mi, mikroveri mi, RDFa mı?', c: 'Google üçünü de destekler ama ayrı bir blokta durduğu ve bakımı kolay olduğu için JSON-LD önerir. Bu araç yalnızca JSON-LD denetler; mikroveri kullanan bir sayfa yapıştırırsanız bunu söyler. Kurulumu adım adım [schema ve yapısal veri rehberinde](/schema-yapisal-veri) anlattım.' },
      { s: 'Yapıştırdığım kod bir yere gönderiliyor mu?', c: 'Hayır. Doğrulama tamamen tarayıcınızda çalışır; hiçbir şey sunucuya gönderilmez ya da kaydedilmez. Test ortamındaki ya da yayınlanmamış sayfaların işaretlemesini rahatça yapıştırabilirsiniz.' },
      { s: 'Hata yok, neden zengin sonuç çıkmıyor?', c: 'Geçerli işaretleme sayfayı uygun hâle getirir, ama Google zengin sonucu garanti etmez. İçerik kalitesi, işaretlemenin sayfada görünen içerikle uyumu, yapısal veri politikaları ve arama sorgusu da rol oynar. Search Console\'daki geliştirme raporlarına ve URL Denetimi aracına bakın; ayrıntılar [schema ve yapısal veri rehberinde](/schema-yapisal-veri).' },
    ],
  }

  const ornekDugmeleri = [
    ['urun', t('Örnek ürün', 'Sample product')],
    ['makale', t('Makale ve breadcrumb', 'Article and breadcrumb')],
    ['sss', t('SSS (FAQ)', 'FAQ')],
    ['hatali', t('Hatalı JSON', 'Broken JSON')],
  ]
  const ilgili = [
    [t('/schema-olusturucu', '/en/schema-generator'), t('Schema oluşturucu', 'Schema generator')],
    [t('/schema-markup-nedir', '/en/schema-markup-nedir'), t('Schema markup nedir?', 'What is schema markup?')],
    [t('/schema-yapisal-veri', '/en/schema-yapisal-veri'), t('Schema ve yapısal veri rehberi', 'Schema and structured data guide')],
    [t('/meta-etiket-olusturucu', '/en/meta-tag-generator'), t('Meta etiket oluşturucu', 'Meta tag generator')],
  ]

  return (
    <AracSayfa isEn={isEn} yol="/schema-dogrulayici" yolEn="/en/schema-validator" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['schema-yapisal-veri', 'teknik-seo', 'yerel-seo']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <label htmlFor="sd-kod" style={{ ...F.etiket, marginBottom: 0 }}>{t('JSON-LD, script blokları ya da sayfa kaynağı', 'JSON-LD, script blocks or page source')}</label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {ornekDugmeleri.map(([id, ad]) => (
                <button key={id} type="button" onClick={() => setMetin(ornekler[id])} style={{ ...F.ikincil, padding: '5px 10px', fontSize: '12.5px' }}>{ad}</button>
              ))}
              <button type="button" onClick={() => setMetin('')} style={{ ...F.ikincil, padding: '5px 10px', fontSize: '12.5px' }}>{t('Temizle', 'Clear')}</button>
            </div>
          </div>
          <textarea id="sd-kod" value={metin} onChange={e => setMetin(e.target.value)} rows={14} spellCheck={false} autoCapitalize="off" autoCorrect="off"
            placeholder={'<script type="application/ld+json">\n{ "@context": "https://schema.org", "@type": "Organization", ... }\n</script>'}
            style={{ ...F.girdi, fontFamily: MONO, fontSize: '12.5px', lineHeight: 1.55, resize: 'vertical', whiteSpace: 'pre', overflowWrap: 'normal', overflowX: 'auto' }} />
          <p style={{ color: '#888', fontSize: '12.5px', margin: '6px 0 0' }}>{t('Kod tarayıcınızda doğrulanır, hiçbir yere gönderilmez.', 'The code is validated in your browser and is not sent anywhere.')}</p>
        </div>

        <div aria-live="polite" style={{ display: 'grid', gap: '14px' }}>
          {genelDurum ? (
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: SEVIYE_RENK[genelDurum].zemin, border: `1px solid ${SEVIYE_RENK[genelDurum].renk}33`, borderRadius: '12px', padding: '14px 16px' }}>
              <span aria-hidden="true" style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', background: SEVIYE_RENK[genelDurum].renk, color: '#fff', fontSize: '16px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{SEVIYE_RENK[genelDurum].isaret}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 800, color: SEVIYE_RENK[genelDurum].renk }}>{genelBaslik[genelDurum]}</div>
                <p style={{ margin: '4px 0 0', fontSize: '13.5px', color: '#333' }}>
                  {t(`${o.blok} blok, ${o.varlik} öğe, ${o.hata} hata, ${o.uyari} uyarı.`, `${o.blok} block${o.blok === 1 ? '' : 's'}, ${o.varlik} item${o.varlik === 1 ? '' : 's'}, ${o.hata} error${o.hata === 1 ? '' : 's'}, ${o.uyari} warning${o.uyari === 1 ? '' : 's'}.`)}
                  {o.uygun.length > 0 && <> {t('Zengin sonuç alanları tamam olanlar', 'Rich result fields complete for')}: <strong>{o.uygun.map(kuralAdi).join(', ')}</strong>.</>}
                  {jsonHatasi && <> {t('JSON hatası olan bloklar denetlenemedi.', 'Blocks with JSON errors could not be checked.')}</>}
                </p>
              </div>
            </div>
          ) : (
            <p style={{ color: '#888', fontSize: '13.5px', margin: 0 }}>{t('Doğrulamak için kodu yukarıya yapıştırın ya da bir örnek yükleyin.', 'Paste code above or load a sample to validate it.')}</p>
          )}

          {sonuc.genel.length > 0 && <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>{sonuc.genel.map(bulguSatiri)}</ul>}

          {sonuc.bloklar.map(b => (
            <div key={b.no} style={{ display: 'grid', gap: '10px' }}>
              {(sonuc.bloklar.length > 1 || sonuc.tur === 'html') && (
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#777', letterSpacing: '1px', textTransform: 'uppercase', margin: '4px 0 0' }}>{t(`Blok ${b.no}`, `Block ${b.no}`)} · {t('satır', 'line')} {b.satir}</h3>
              )}
              {b.bos && <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>{bulguSatiri({ seviye: 'uyari', kod: 'bos-blok' }, 0)}</ul>}
              {b.hata && (
                <div role="alert" style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: '10px', padding: '12px 14px', display: 'grid', gap: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#b91c1c' }}>{t('JSON sözdizimi hatası', 'JSON syntax error')} · {t('satır', 'line')} {b.hata.satir}, {t('sütun', 'column')} {b.hata.sutun}</div>
                  <div style={{ fontSize: '13.5px', color: '#333', lineHeight: 1.6 }}>{jsonHataMetni(b.hata)}</div>
                  <pre style={{ ...F.kod, fontSize: '12.5px', padding: '10px 12px', maxHeight: 'none' }}><code>{`${String(b.hata.satir).padStart(4)} | ${b.hata.satirMetni}\n${' '.repeat(7 + Math.max(0, b.hata.sutun - 1))}^`}</code></pre>
                </div>
              )}
              {b.uyarilar.length > 0 && <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>{b.uyarilar.map(bulguSatiri)}</ul>}
              {b.varliklar.filter(v => v.durum !== 'referans').map((v, i) => {
                const dr = DURUM_RENK[v.durum]
                const bulgular = [...v.bulgular].sort((x, y) => SIRA[x.seviye] - SIRA[y.seviye])
                return (
                  <div key={i} style={{ border: '1px solid #eee', borderRadius: '12px', background: '#fff', padding: '12px 14px', display: 'grid', gap: '10px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 12px', alignItems: 'center' }}>
                      <span style={{ fontFamily: MONO, fontSize: '14px', fontWeight: 700, color: '#111' }}>{v.tipler.length ? v.tipler.join(', ') : t('(tür yok)', '(no type)')}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: dr.zemin, color: dr.renk, border: `1px solid ${dr.renk}33`, borderRadius: '999px', padding: '2px 10px', fontSize: '12px', fontWeight: 700 }}>
                        <span aria-hidden="true">{dr.isaret}</span>{durumAdi(v.durum)}
                      </span>
                      {v.kural && <span style={{ fontSize: '12.5px', color: '#555' }}>{t('Google özelliği', 'Google feature')}: {kuralAdi(v.kural)}</span>}
                    </div>
                    {(v.ad || v.yol || v.satir) && (
                      <div style={{ fontSize: '12.5px', color: '#666', overflowWrap: 'anywhere' }}>
                        {v.ad && <span>{`"${v.ad}"`}</span>}
                        {v.yol && <span style={{ fontFamily: MONO }}>{v.ad ? ' · ' : ''}{v.yol}</span>}
                        {v.satir && <span>{v.ad || v.yol ? ' · ' : ''}{t('satır', 'line')} {v.satir}</span>}
                      </div>
                    )}
                    {v.icTurler.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', fontSize: '12px', color: '#666' }}>
                        <span>{t('İç içe türler', 'Nested types')}:</span>
                        {v.icTurler.map(x => <span key={x} style={{ fontFamily: MONO, background: '#f5f5f4', borderRadius: '999px', padding: '2px 8px', color: '#444' }}>{x}</span>)}
                      </div>
                    )}
                    {bulgular.length > 0
                      ? <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>{bulgular.map(bulguSatiri)}</ul>
                      : <p style={{ margin: 0, fontSize: '13px', color: '#15803d' }}>{t('Bu öğede sorun bulunmadı.', 'No issues found in this item.')}</p>}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        <div style={{ background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '12px', padding: '14px 16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', margin: '0 0 6px' }}>{t('Bu araç neyin yerini tutmaz?', 'What this tool does not replace')}</h3>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#444', lineHeight: 1.7 }}>
            {t(
              'Bu araç Google\'ın Zengin Sonuçlar Testi\'nin yerini tutmaz. Google\'ın Kasım 2026 itibarıyla belgelediği zorunlu ve önerilen alanları kontrol eder; ama sayfanızın Googlebot tarafından nasıl işlendiğini, JavaScript ile eklenen şemayı, işaretlemenin sayfada görünen içerikle uyumunu ve yapısal veri politikalarını göremez. Yayından önce ve sonra Google\'ın Zengin Sonuçlar Testi ile, genel schema.org uyumu için Schema Markup Validator ile de kontrol edin.',
              'This tool does not replace Google\'s Rich Results Test. It checks the required and recommended properties Google documents as of November 2026, but it cannot see how Googlebot renders your page, schema added by JavaScript, whether the markup matches the visible content or structured data policy issues. Before and after publishing, also check with Google\'s Rich Results Test, and with the Schema Markup Validator for general schema.org conformance.'
            )}
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>{t('İlgili araçlar ve yazılar', 'Related tools and articles')}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ilgili.map(([href, ad]) => (
              <Link key={href} href={href} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--orange)', border: '1px solid #f3d9c9', background: '#fff', borderRadius: '999px', padding: '6px 12px' }}>{ad} →</Link>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: '#555', margin: '10px 0 0', lineHeight: 1.6 }}>{renderInline(t('Bir sayfanın dizine eklenmesini engelleyen sinyalleri görmek için [indekslenebilirlik kontrolünü](/indekslenebilirlik-kontrolu) kullanın.', 'To see the signals that keep a page out of the index, use the [indexability checker](/en/indexability-checker).'))}</p>
        </div>
      </div>
    </AracSayfa>
  )
}
