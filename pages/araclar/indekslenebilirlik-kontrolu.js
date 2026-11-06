import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { renderInline } from '../../components/IcerikBlok'
import { adresTemizle, EN_FAZLA_ADIM } from '../../lib/yonlendirme-kontrol'
import { analizEt, ORNEK_GIRDI, ORNEK_GIRDI_EN } from '../../lib/indekslenebilirlik'

// İndekslenebilirlik kontrolü.
// TR: /indekslenebilirlik-kontrolu   EN: /en/indexability-checker
// İstek sunucuda gönderilir (pages/api/indekslenebilirlik.js, her yönlendirme adımında SSRF korumalı).
// Analiz lib/indekslenebilirlik.js'te; örnek sonuç aynı fonksiyonla ağa çıkmadan üretilir.

const SEVIYE_RENK = {
  hata: { renk: '#b91c1c', zemin: '#fef2f2', isaret: '✗' },
  uyari: { renk: '#b45309', zemin: '#fffbeb', isaret: '!' },
  bilgi: { renk: '#1d4ed8', zemin: '#eff6ff', isaret: 'i' },
  iyi: { renk: '#15803d', zemin: '#f0fdf4', isaret: '✓' },
}
const KARAR_RENK = { engel: SEVIYE_RENK.hata, dikkat: SEVIYE_RENK.uyari, uygun: SEVIYE_RENK.iyi }
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
const GRUP_SIRASI = ['durum', 'yonlendirme', 'robots-txt', 'x-robots', 'meta-robots', 'canonical', 'hreflang', 'meta-refresh', 'icerik-turu', 'celiski']
// Örnek sonuçtaki unavailable_after ve benzeri tarih kontrolleri sunucu ile tarayıcıda aynı çıksın diye sabit
const ORNEK_ZAMAN = Date.parse('2026-11-06T00:00:00Z')

export default function IndekslenebilirlikKontrolu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [url, setUrl] = useState('')
  const [kayit, setKayit] = useState(null)
  const [durum, setDurum] = useState(null)

  const ornek = useMemo(() => { const g = isEn ? ORNEK_GIRDI_EN : ORNEK_GIRDI; return { zincir: g.sonuc, analiz: analizEt(g, { simdi: ORNEK_ZAMAN }) } }, [isEn])
  const ornekMi = !kayit
  const gosterilen = kayit || ornek

  const kontrolEt = async () => {
    const hedef = adresTemizle(url)
    if (!hedef) {
      setDurum({ hata: t('Geçerli bir adres yazın (ör. https://www.ornek.com/sayfa).', 'Enter a valid address (e.g. https://www.example.com/page).') })
      return
    }
    setDurum({ yukleniyor: true })
    try {
      const r = await fetch(`/api/indekslenebilirlik?url=${encodeURIComponent(hedef)}`)
      if (r.status === 429) { setDurum({ hata: t('Çok fazla istek. Bir dakika sonra tekrar deneyin.', 'Too many requests. Try again in a minute.') }); return }
      if (r.status === 400) { setDurum({ hata: t('Geçersiz adres.', 'Invalid address.') }); return }
      const j = await r.json()
      if (!j.ok) { setDurum({ hata: t('Adres kontrol edilemedi.', 'The address could not be checked.') }); return }
      setKayit({ zincir: j.zincir, analiz: j.analiz })
      setDurum(null)
    } catch {
      setDurum({ hata: t('Bağlantı hatası.', 'Connection error.') })
    }
  }

  const kisa = (u) => String(u || '').replace(/^https?:\/\//, '')
  const kod = (s) => `"${s}"`

  const grupAdi = (g) => ({
    durum: t('HTTP durum kodu', 'HTTP status code'),
    yonlendirme: t('Yönlendirme', 'Redirects'),
    'robots-txt': 'robots.txt',
    'x-robots': t('X-Robots-Tag başlığı', 'X-Robots-Tag header'),
    'meta-robots': t('Meta robots etiketi', 'Meta robots tag'),
    canonical: t('Canonical etiketi', 'Canonical tag'),
    hreflang: 'hreflang',
    'meta-refresh': 'Meta refresh',
    'icerik-turu': t('İçerik türü', 'Content type'),
    celiski: t('Çelişkili sinyaller', 'Conflicting signals'),
  }[g] || g)

  const nedenMetni = (n, detay) => ({
    dongu: t('yönlendirme döngüsü var', 'there is a redirect loop'),
    sinir: t(`${EN_FAZLA_ADIM} adımdan sonra hâlâ yönlendiriyor`, `still redirecting after ${EN_FAZLA_ADIM} hops`),
    dogrulama: t('alan adı çözülemedi ya da özel veya iç ağ adresine gidiyor', 'the domain could not be resolved or points to a private or internal network address'),
    'zaman-asimi': t('sunucu zamanında yanıt vermedi', 'the server did not respond in time'),
    baglanti: t(`bağlantı kurulamadı${detay ? ` (${detay})` : ''}`, `could not connect${detay ? ` (${detay})` : ''}`),
    'location-yok': t('yönlendirme yanıtında Location başlığı yok', 'a redirect response has no Location header'),
    'location-gecersiz': t('Location başlığı geçerli bir adres değil', 'the Location header is not a valid address'),
  }[n] || t('bilinmeyen hata', 'unknown error'))

  const farkMetni = (f) => ({
    egik: t('yalnızca sondaki / farklı', 'only the trailing slash differs'),
    protokol: t('http ve https farkı', 'http vs https'),
    www: t('www farkı', 'www difference'),
    harf: t('büyük ve küçük harf farkı', 'letter case differs'),
    sorgu: t('parametre farkı', 'query string differs'),
    yol: t('farklı bir sayfa', 'a different page'),
  }[f] || f)

  const kuralMetni = (k) => k ? `${k.tip === 'allow' ? 'Allow' : 'Disallow'}: ${k.yol}` : ''

  // Her kontrol için [kısa mesaj, ne anlama gelir ve nasıl düzeltilir]
  const metin = (k) => {
    switch (k.kod) {
      case 'erisilemedi': return [
        t(`Adrese ulaşılamadı: ${nedenMetni(k.neden, k.detay)}.`, `The address could not be reached: ${nedenMetni(k.neden, k.detay)}.`),
        t(`Google da ulaşamazsa sayfayı dizine ekleyemez. Adresi tarayıcıda açın, sunucu ve güvenlik duvarı kayıtlarına bakın. Yönlendirme sorunlarını [yönlendirme zinciri kontrolüyle](/yonlendirme-zinciri-kontrol) adım adım görün.`, `If Google cannot reach it either, the page cannot be indexed. Open the address in a browser and check server and firewall logs. See redirect problems hop by hop with the [redirect checker](/en/redirect-checker).`),
      ]
      case 'durum-200': return [t('Son adres 200 OK döndürüyor.', 'The final address returns 200 OK.'), t('Dizine eklenmenin ilk şartı sağlanıyor.', 'The first requirement for indexing is met.')]
      case 'durum-2xx': return [t(`Son adres ${k.durum} döndürüyor; 200 beklenirdi.`, `The final address returns ${k.durum}; 200 would be expected.`), t('204 gibi içeriksiz yanıtlar dizine eklenmez. Sayfa içerik sunuyorsa 200 döndürmelidir.', 'Responses without content such as 204 are not indexed. A page that serves content should return 200.')]
      case 'durum-404': return [t('Adres 404 (bulunamadı) döndürüyor.', 'The address returns 404 (not found).'), t('404 dönen sayfa dizine eklenmez, eklenmişse zamanla düşer. Sayfa taşındıysa 301 ile yeni adrese yönlendirin; bilerek kaldırıldıysa bu doğru davranıştır.', 'A page returning 404 is not indexed, and drops out over time if it was. If the page moved, add a 301 to the new address; if it was removed on purpose, this is correct.')]
      case 'durum-410': return [t('Adres 410 (kalıcı olarak kaldırıldı) döndürüyor.', 'The address returns 410 (gone).'), t('410, sayfanın bilerek kaldırıldığını söyler ve dizinden 404\'ten biraz daha hızlı düşer. Sayfa yayında olmalıysa sunucu kuralını kontrol edin.', '410 says the page was removed on purpose and drops out slightly faster than 404. If the page should be live, check the server rule.')]
      case 'durum-erisim': return [t(`Adres ${k.durum} (erişim engeli) döndürüyor.`, `The address returns ${k.durum} (access denied).`), t('Googlebot giriş isteyen ya da engellenen sayfayı göremez. Herkese açık bir sayfaysa sunucunun, CDN\'in ya da güvenlik eklentisinin bot isteklerini engelleyip engellemediğine bakın.', 'Googlebot cannot see pages behind a login or a block. If this is a public page, check whether the server, CDN or a security plugin blocks bot requests.')]
      case 'durum-429': return [t('Adres 429 (çok fazla istek) döndürüyor.', 'The address returns 429 (too many requests).'), t('Sürekli 429 dönerse Google taramayı yavaşlatır. Biraz sonra tekrar deneyin; sürerse sunucu ya da CDN hız sınırını kontrol edin.', 'If 429 persists, Google slows down crawling. Try again later; if it continues, check the server or CDN rate limit.')]
      case 'durum-5xx': return [t(`Adres ${k.durum} (sunucu hatası) döndürüyor.`, `The address returns ${k.durum} (server error).`), t('Sunucu hatası sürerse Google taramayı azaltır ve sayfa dizinden düşebilir. Sunucu ve uygulama kayıtlarına bakın.', 'If server errors persist, Google crawls less and the page may drop out of the index. Check server and application logs.')]
      case 'durum-4xx': return [t(`Adres ${k.durum} döndürüyor.`, `The address returns ${k.durum}.`), t('4xx yanıt veren sayfalar dizine eklenmez.', 'Pages returning 4xx are not indexed.')]
      case 'durum-diger': return [t(`Son yanıt ${k.durum}; beklenen bir durum değil.`, `The final response is ${k.durum}, which is not expected.`), t('Dizine eklenecek sayfa 200 döndürmelidir.', 'A page meant for the index should return 200.')]

      case 'yonlendirme-yok': return [t('İstenen adres yönlendirme yapmıyor.', 'The requested address does not redirect.'), '']
      case 'yonlendirme-var': return [
        t(`İstenen adres ${k.adim} adımda ${kisa(k.sonUrl)} adresine yönlendiriyor. Diğer kontroller son adres için yapıldı.`, `The requested address redirects to ${kisa(k.sonUrl)} in ${k.adim} hop${k.adim === 1 ? '' : 's'}. The other checks apply to the final address.`),
        t('Yönlendiren adres dizine eklenmez; Google son adresi değerlendirir. Yönlendirme bilerek yapıldıysa sorun yok, iç linkleri ve site haritasını doğrudan son adrese güncelleyin. Zinciri [yönlendirme zinciri kontrolüyle](/yonlendirme-zinciri-kontrol) ayrıntılı görün.', 'A redirecting address is not indexed; Google evaluates the final address. If the redirect is intentional that is fine; update internal links and the sitemap to the final address. See the chain in detail with the [redirect checker](/en/redirect-checker).'),
      ]

      case 'tur-html': return [t(`HTML sayfası (${k.tur}).`, `HTML page (${k.tur}).`), '']
      case 'tur-diger': return [t(`İçerik türü ${k.tur}.`, `Content type is ${k.tur}.`), t('Meta etiketler yalnızca HTML\'de çalışır. PDF ve görsel gibi dosyalarda noindex için X-Robots-Tag, canonical için HTTP Link başlığı kullanılır.', 'Meta tags only work in HTML. For files such as PDFs and images, use the X-Robots-Tag header for noindex and the HTTP Link header for canonical.')]
      case 'tur-yok': return [t('Sunucu Content-Type başlığı göndermiyor.', 'The server sends no Content-Type header.'), t('Google içeriği yine de tanıyabilir, ama doğru türü (ör. text/html; charset=utf-8) göndermek tutarlı işlemeyi sağlar.', 'Google may still recognise the content, but sending the correct type (e.g. text/html; charset=utf-8) ensures consistent processing.')]

      case 'robots-izin': return [
        t(`robots.txt Googlebot'un bu adresi taramasına izin veriyor${k.kural ? ` (eşleşen kural ${kuralMetni(k.kural)})` : ''}.`, `robots.txt allows Googlebot to crawl this address${k.kural ? ` (matching rule ${kuralMetni(k.kural)})` : ''}.`),
        t('Tarama izni dizine eklemeyi garanti etmez ama ön koşuldur.', 'Permission to crawl does not guarantee indexing, but it is a prerequisite.'),
      ]
      case 'robots-engel': return [
        t(`robots.txt bu adresi Googlebot'a kapatıyor. Kural ${kuralMetni(k.kural)}${k.kural?.satir ? ` (${k.kural.satir}. satır` : ''}${k.ajan ? `, User-agent ${k.ajan})` : k.kural?.satir ? ')' : ''}.`, `robots.txt blocks this address for Googlebot. Rule ${kuralMetni(k.kural)}${k.kural?.satir ? ` (line ${k.kural.satir}` : ''}${k.ajan ? `, User-agent ${k.ajan})` : k.kural?.satir ? ')' : ''}.`),
        t('Google engelli sayfayı tarayamaz; içeriğini, meta robots ve canonical etiketlerini göremez. Adres başka yerlerden link alıyorsa içeriksiz olarak dizinde görünebilir. Sayfa dizine girmeliyse kuralı kaldırın; dizinden çıkmalıysa engeli kaldırıp noindex kullanın. Kuralı [robots.txt test aracında](/robots-txt-test) deneyin.', 'Google cannot crawl a blocked page, so it cannot see its content, meta robots or canonical tags. If the address has links pointing to it, it can still appear in the index without content. If the page should be indexed, remove the rule; if it should leave the index, remove the block and use noindex. Try the rule in the [robots.txt tester](/en/robots-txt-tester).'),
      ]
      case 'robots-yok': return [t(`robots.txt bulunamadı (${k.durum}).`, `No robots.txt found (${k.durum}).`), t('Google 4xx dönen robots.txt\'yi "kısıtlama yok" sayar; tüm adresler taranabilir.', 'Google treats a robots.txt returning 4xx as "no restrictions"; every address can be crawled.')]
      case 'robots-5xx': return [t(`robots.txt ${k.durum} (sunucu hatası) döndürüyor.`, `robots.txt returns ${k.durum} (server error).`), t('Google robots.txt\'ye sunucu hatası nedeniyle ulaşamadığında siteyi geçici olarak tamamen engelli sayar ve taramayı durdurur. Hatayı giderin; dosya yoksa 404 döndürmesi yeterlidir.', 'When Google cannot read robots.txt because of a server error, it treats the whole site as temporarily blocked and stops crawling. Fix the error; if there is no file, returning 404 is enough.')]
      case 'robots-429': return [t('robots.txt 429 (çok fazla istek) döndürüyor.', 'robots.txt returns 429 (too many requests).'), t('Google 429\'u sunucu hatası gibi değerlendirir ve sürerse taramayı durdurur. Bot isteklerini sınırlayan kuralı robots.txt için gevşetin.', 'Google treats 429 like a server error and stops crawling if it persists. Relax the rate limit for robots.txt.')]
      case 'robots-okunamadi': return [t(`robots.txt okunamadı${k.detay ? ` (${k.detay})` : ''}.`, 'robots.txt could not be read.'), t('Zaman aşımı ya da bağlantı sorunu olabilir. Google da okuyamazsa taramayı kısıtlar. Dosyayı tarayıcıda açıp kontrol edin.', 'This may be a timeout or connection problem. If Google cannot read it either, it restricts crawling. Open the file in a browser to check.')]

      case 'xrobots-yok': return [t('X-Robots-Tag başlığı yok.', 'No X-Robots-Tag header.'), t('Sorun değil; çoğu site robots kurallarını meta etiketle verir.', 'That is fine; most sites set robots rules with a meta tag.')]
      case 'xrobots-index': return [t(`X-Robots-Tag var ve dizine eklemeyi engellemiyor (${k.deger}).`, `X-Robots-Tag is present and does not block indexing (${k.deger}).`), '']
      case 'xrobots-noindex': return [
        t(`X-Robots-Tag başlığı noindex içeriyor${k.bot ? ` (${k.bot} için)` : ''}. Değer ${kod(k.deger)}.`, `The X-Robots-Tag header contains noindex${k.bot ? ` (for ${k.bot})` : ''}. Value ${kod(k.deger)}.`),
        t('Google bu adresi dizine eklemez. Başlık genellikle sunucu ya da CDN ayarından (.htaccess, Nginx, Vercel ya da Netlify başlık kuralları) gelir; sayfa kaynağında görünmediği için gözden kaçar. İstenmiyorsa kuralı kaldırın.', 'Google will not index this address. The header usually comes from a server or CDN setting (.htaccess, Nginx, Vercel or Netlify header rules) and is easy to miss because it is not in the page source. Remove the rule if it is not intended.'),
      ]
      case 'xrobots-diger': return [t(`X-Robots-Tag başka yönergeler içeriyor: ${k.direktifler.join(', ')}.`, `X-Robots-Tag contains other directives: ${k.direktifler.join(', ')}.`), t('Bunlar dizine eklemeyi engellemez; snippet, önbellek ya da link takibini etkiler. nofollow varsa Google sayfadaki linkleri izlemez.', 'These do not block indexing; they affect snippets, caching or link following. With nofollow, Google does not follow the links on the page.')]
      case 'xrobots-baska-bot': return [t(`X-Robots-Tag başka botlar için noindex içeriyor (${k.botlar.join(', ')}).`, `X-Robots-Tag contains noindex for other bots (${k.botlar.join(', ')}).`), t('Googlebot\'u etkilemez.', 'This does not affect Googlebot.')]
      case 'unavailable-gecmis': return [t(`unavailable_after tarihi geçmiş (${k.deger}).`, `The unavailable_after date has passed (${k.deger}).`), t('Google bu tarihten sonra sayfayı dizinden çıkarır. Süreli bir kampanya sayfası değilse yönergeyi kaldırın.', 'Google removes the page from the index after this date. Unless this is a time-limited campaign page, remove the directive.')]
      case 'unavailable-gelecek': return [t(`unavailable_after tanımlı (${k.deger}).`, `unavailable_after is set (${k.deger}).`), t('Bu tarihten sonra Google sayfayı dizinden çıkarır. Bilerek eklenmediyse kaldırın.', 'After this date Google removes the page from the index. Remove it if that is not intended.')]
      case 'unavailable-gecersiz': return [t(`unavailable_after değeri tarih olarak okunamadı (${k.deger}).`, `The unavailable_after value is not a readable date (${k.deger}).`), t('Google ISO 8601 ya da RFC 822 ve RFC 850 biçimindeki tarihleri kabul eder.', 'Google accepts dates in ISO 8601 or RFC 822 and RFC 850 format.')]

      case 'meta-yok': return [t('Meta robots etiketi yok.', 'No meta robots tag.'), t('Varsayılan davranış geçerli (index, follow); ayrıca etiket eklemeye gerek yok.', 'The default (index, follow) applies; there is no need to add a tag.')]
      case 'meta-index': return [t(`Meta robots dizine eklemeye izin veriyor (${k.icerik}).`, `Meta robots allows indexing (${k.icerik}).`), '']
      case 'meta-noindex': return [
        t(`<meta name="${k.ad}"> etiketi noindex içeriyor. Değer ${kod(k.icerik)}.`, `The <meta name="${k.ad}"> tag contains noindex. Value ${kod(k.icerik)}.`),
        t('Google sayfayı taradığında bu etiketi görür ve dizine eklemez. CMS\'te "arama motorlarından gizle" gibi bir ayar ya da SEO eklentisinin sayfa ayarı açık olabilir. Sayfa dizine girmeliyse etiketi kaldırın, sonra Search Console URL Denetimi ile dizine eklenmesini isteyin.', 'When Google crawls the page it sees this tag and does not index it. A CMS setting such as "discourage search engines" or an SEO plugin page setting may be on. If the page should be indexed, remove the tag, then request indexing with the Search Console URL Inspection tool.'),
      ]
      case 'meta-diger': return [t(`Meta robots dizine eklemeyi engellemiyor; ek yönergeler var (${k.direktifler.join(', ')}).`, `Meta robots does not block indexing; it has extra directives (${k.direktifler.join(', ')}).`), t('nosnippet, max-snippet ve benzerleri arama sonucundaki görünümü etkiler; nofollow sayfadaki linklerin izlenmesini durdurur.', 'nosnippet, max-snippet and similar directives change how the result looks; nofollow stops links on the page from being followed.')]
      case 'meta-celisen': return [t(`Birden fazla meta robots etiketi farklı değerler içeriyor (${k.degerler.join(' | ')}).`, `Several meta robots tags have different values (${k.degerler.join(' | ')}).`), t('Google bunları birleştirir ve en kısıtlayıcı olanı uygular. Genellikle tema ve SEO eklentisi ikisi birden etiket basar; tek etiket bırakın.', 'Google combines them and applies the most restrictive one. Usually the theme and an SEO plugin both print a tag; keep only one.')]
      case 'meta-govdede': return [t(`Meta robots etiketi <head> bölümünün dışında${k.kirilma ? ` (<${k.kirilma}> etiketi head'i erken kapatıyor)` : ''}.`, `The meta robots tag is outside <head>${k.kirilma ? ` (a <${k.kirilma}> tag closes the head early)` : ''}.`), t('Etiketin güvenilir okunması için head içinde ve geçersiz etiketlerden önce olması gerekir.', 'For the tag to be read reliably it must be inside head and before any invalid elements.')]
      case 'meta-baska-bot': return [t(`Başka botlara özel noindex var (${k.botlar.join(', ')}).`, `There is a noindex for other bots (${k.botlar.join(', ')}).`), t('Googlebot\'u etkilemez.', 'This does not affect Googlebot.')]
      case 'meta-uygulanmaz': return [t('HTML olmayan dosyada meta etiket olmaz; yalnızca X-Robots-Tag başlığı geçerlidir.', 'Files that are not HTML have no meta tags; only the X-Robots-Tag header applies.'), '']
      case 'meta-okunamadi': return [t('Sayfanın HTML\'i okunamadı; meta etiketler kontrol edilemedi.', 'The page HTML could not be read, so meta tags were not checked.'), t('Sunucu gövdeyi geç ya da hiç göndermemiş olabilir. Biraz sonra tekrar deneyin.', 'The server may have sent the body late or not at all. Try again later.')]

      case 'canonical-yok': return [t('Canonical etiketi yok.', 'No canonical tag.'), t('Zorunlu değil; Google kopyalar arasından kendisi seçer. Parametreli adresler, www ya da sondaki / gibi kopyalar oluşabiliyorsa sayfaya kendisini gösteren bir canonical eklemek önerilir. Ayrıntılar [canonical etiketi yazısında](/canonical-etiket-nedir).', 'Not required; Google picks among duplicates itself. If duplicates can appear (query parameters, www, trailing slash), adding a self-referencing canonical is recommended. Details in the [canonical tag article](/en/canonical-etiket-nedir).')]
      case 'canonical-kendisi': return [t(`Canonical sayfanın kendisini gösteriyor${k.kaynak === 'baslik' ? ' (HTTP Link başlığı)' : ''}.`, `The canonical points to the page itself${k.kaynak === 'baslik' ? ' (HTTP Link header)' : ''}.`), t('Doğru kurulum. Canonical bir öneridir; Google başka sinyaller görürse farklı bir adres seçebilir.', 'This is the correct setup. Canonical is a hint; Google may choose a different address if other signals disagree.')]
      case 'canonical-baska': return [
        t(`Canonical başka bir adresi gösteriyor: ${k.url} (${farkMetni(k.fark)}).`, `The canonical points to another address: ${k.url} (${farkMetni(k.fark)}).`),
        t('Google bunu "asıl sürüm şu" sinyali sayar ve büyük olasılıkla bu adresi değil canonical adresi dizine ekler. Bilerek yapıldıysa (ör. parametreli kopya) doğru; değilse canonical\'ı sayfanın kendi adresine çevirin. Search Console\'da bu durum "Kopya, Google kullanıcıdan farklı bir standart sayfa seçti" ya da "Uygun standart etiketi olan alternatif sayfa" olarak görünür.', 'Google treats this as "the main version is over there" and will most likely index the canonical address instead of this one. Fine if intended (e.g. a parameter duplicate); otherwise change the canonical to the page\'s own address. In Search Console this shows up as "Alternate page with proper canonical tag" or a duplicate status.'),
      ]
      case 'canonical-alan': return [t(`Canonical başka bir alan adını gösteriyor: ${k.url}.`, `The canonical points to another domain: ${k.url}.`), t('Alan adları arası canonical, aynı içerik başka sitede de yayınlandığında kullanılır. Yanlışlıkla eklendiyse (test ortamı ya da eski alan adı gibi) sayfa dizinden düşer; düzeltin.', 'A cross-domain canonical is used when the same content is published on another site. If it was added by mistake (a staging or old domain), the page drops out of the index; fix it.')]
      case 'canonical-coklu': return [t(`Birden fazla farklı canonical var: ${k.urller.join(', ')}.`, `There are several different canonicals: ${k.urller.join(', ')}.`), t('Google çelişen canonical etiketlerini yok sayar ve kendisi seçer. Genellikle tema ve SEO eklentisi ikisi birden etiket basar; birini kapatın.', 'Google ignores conflicting canonical tags and chooses on its own. Usually the theme and an SEO plugin both print one; turn one off.')]
      case 'canonical-baslik-celiski': return [t(`HTTP Link başlığındaki canonical ile HTML'deki canonical farklı: ${k.urller.join(', ')}.`, `The canonical in the HTTP Link header differs from the one in the HTML: ${k.urller.join(', ')}.`), t('Google çelişen sinyalleri yok sayabilir. İkisini aynı adrese eşitleyin ya da birini kaldırın.', 'Google may ignore conflicting signals. Make both point to the same address or remove one.')]
      case 'canonical-coklu-ayni': return [t(`Canonical ${k.adet} kez tanımlanmış, hepsi aynı adresi gösteriyor.`, `The canonical is declared ${k.adet} times, all pointing to the same address.`), t('Zararsız ama gereksiz; tek etiket bırakın.', 'Harmless but redundant; keep one tag.')]
      case 'canonical-goreli': return [t(`Canonical göreli adres kullanıyor (${k.ham}).`, `The canonical uses a relative address (${k.ham}).`), t('Google göreli adresi çözer, ama sayfa başka bir alan adına (ör. test ortamı) kopyalanırsa yanlış adresi gösterir. Tam adres (https://...) kullanın.', 'Google resolves relative addresses, but if the page is copied to another host (e.g. staging) it points to the wrong place. Use a full address (https://...).')]
      case 'canonical-gecersiz': return [t(`Canonical değeri geçerli bir adres değil${k.ham.filter(Boolean).length ? ` (${k.ham.filter(Boolean).join(', ')})` : ' (boş)'}.`, `The canonical value is not a valid address${k.ham.filter(Boolean).length ? ` (${k.ham.filter(Boolean).join(', ')})` : ' (empty)'}.`), t('Boş ya da hatalı href yok sayılır. Sayfanın tam adresini yazın.', 'An empty or broken href is ignored. Use the full page address.')]
      case 'canonical-govdede': return [t(`Canonical etiketi <head> bölümünün dışında${k.kirilma ? ` (<${k.kirilma}> etiketi head'i erken kapatıyor)` : ''}.`, `The canonical tag is outside <head>${k.kirilma ? ` (a <${k.kirilma}> tag closes the head early)` : ''}.`), t('Google body içindeki rel=canonical etiketini yok sayar. Etiketi head\'in başına taşıyın; head\'i erken kapatan img, iframe ya da div gibi etiketleri body\'ye alın.', 'Google ignores rel=canonical in the body. Move the tag to the top of head and move elements such as img, iframe or div that close the head early into the body.')]
      case 'canonical-http': return [t('Canonical http adresini gösteriyor, sayfa ise https.', 'The canonical points to an http address while the page is https.'), t('Google genellikle https sürümünü tercih eder ama çelişkili bir sinyal oluşur. Canonical\'ı https adrese güncelleyin.', 'Google usually prefers https, but this sends a mixed signal. Update the canonical to the https address.')]

      case 'hreflang-yok': return [t('hreflang etiketi yok.', 'No hreflang tags.'), t('Tek dilli sitelerde gerekmez. Sayfanın başka dil ya da ülke sürümleri varsa ekleyin; [hreflang oluşturucu](/hreflang-olusturucu) kodu hazırlar.', 'Not needed on single-language sites. If the page has other language or country versions, add them; the [hreflang generator](/en/hreflang-generator) prepares the code.')]
      case 'hreflang-var': return [t(`${k.adet} hreflang alternatifi bulundu (${k.dilSayisi} dil ya da bölge${k.xDefault ? ', x-default dahil' : ''}).`, `${k.adet} hreflang alternate${k.adet === 1 ? '' : 's'} found (${k.dilSayisi} language or region code${k.dilSayisi === 1 ? '' : 's'}${k.xDefault ? ', including x-default' : ''}).`), t('Araç karşılıklılığı (diğer sürümlerin de bu sayfayı göstermesi) kontrol etmez; her sürümü ayrıca kontrol edin.', 'The tool does not check reciprocity (whether the other versions point back); check each version separately.')]
      case 'hreflang-kod': return [t(`Hatalı dil ya da bölge kodu: ${k.hatalar.map(h => h.oneri ? `${h.ham} (doğrusu ${h.oneri})` : h.ham).join(', ')}.`, `Invalid language or region code: ${k.hatalar.map(h => h.oneri ? `${h.ham} (should be ${h.oneri})` : h.ham).join(', ')}.`), t('Google geçersiz kodlu satırları yok sayar. Dil ISO 639-1, bölge ISO 3166-1 Alpha 2 olmalı (ör. en-GB; en-UK değil).', 'Google ignores entries with invalid codes. Language must be ISO 639-1 and region ISO 3166-1 Alpha 2 (e.g. en-GB, not en-UK).')]
      case 'hreflang-kendisi-yok': return [t('hreflang listesinde sayfanın kendisi yok.', 'The hreflang list does not include the page itself.'), k.seviye === 'bilgi' ? t('Canonical başka bir adresi gösterdiği için bu beklenen bir durum olabilir.', 'Because the canonical points elsewhere, this may be expected.') : t('Her sürüm, kendisi dahil tüm sürümleri listelemeli. Eksik olduğunda Google grubu yanlış yorumlayabilir.', 'Each version should list all versions, including itself. Without it, Google may misread the set.')]
      case 'hreflang-xdefault-yok': return [t('x-default tanımlı değil.', 'No x-default is set.'), t('Zorunlu değil; listede olmayan dillerdeki kullanıcılar için varsayılan sayfayı belirtmek önerilir.', 'Not required; it is recommended to name a default page for users whose language is not listed.')]
      case 'hreflang-tekrar': return [t(`Aynı kod birden fazla farklı adrese gidiyor: ${k.kodlar.join(', ')}.`, `The same code points to several different addresses: ${k.kodlar.join(', ')}.`), t('Her kod tek bir adrese gitmeli; Google tekrar eden kodları güvenilir bulmaz.', 'Each code should point to one address; Google does not trust repeated codes.')]
      case 'hreflang-goreli': return [t(`${k.adet} hreflang adresi göreli.`, `${k.adet} hreflang address${k.adet === 1 ? ' is' : 'es are'} relative.`), t('Google hreflang için tam adres (https://...) ister; göreli adresler yok sayılabilir.', 'Google requires fully qualified addresses (https://...) for hreflang; relative ones may be ignored.')]
      case 'hreflang-canonical': return [t('Sayfada hreflang var ama canonical başka bir adresi gösteriyor.', 'The page has hreflang but its canonical points to another address.'), t('hreflang yalnızca canonical sürümler arasında kurulmalı. Canonical\'ı düzeltin ya da hreflang\'i canonical sayfaya taşıyın.', 'hreflang should only connect canonical versions. Fix the canonical or move hreflang to the canonical page.')]
      case 'hreflang-govdede': return [t('Bazı hreflang etiketleri <head> bölümünün dışında.', 'Some hreflang tags are outside <head>.'), t('Google hreflang link etiketlerini yalnızca head içinde okur.', 'Google only reads hreflang link tags inside head.')]

      case 'refresh-yok': return [t('Meta refresh yok.', 'No meta refresh.'), '']
      case 'refresh-var': return [t(`Sayfada meta refresh var (${k.sure} sn${k.url ? `, hedef ${kisa(k.url)}` : ''}).`, `The page has a meta refresh (${k.sure} s${k.url ? `, target ${kisa(k.url)}` : ''}).`), t('Google anında çalışan meta refresh\'i yönlendirme sayar; bu sayfa yerine hedef dizine girebilir. Gerçek bir taşımaysa sunucu tarafında 301 kullanın.', 'Google treats an instant meta refresh as a redirect, so the target may be indexed instead of this page. For a real move, use a server side 301.')]

      case 'noindex-canonical': return [t(`Sayfada hem noindex hem de başka adrese canonical var (${kisa(k.url)}).`, `The page has both noindex and a canonical to another address (${kisa(k.url)}).`), t('Biri "dizine ekleme", diğeri "sinyalleri şu adrese aktar" der; Google ikisinin birlikte kullanılmasını önermez. Kopya sayfaysa yalnızca canonical, dizinden çıkacaksa yalnızca noindex kullanın.', 'One says "do not index", the other "pass signals to that address"; Google advises against combining them. Use only canonical for a duplicate, or only noindex for a page that should leave the index.')]
      case 'robots-engel-gorunmez': return [t(`robots.txt engeli yüzünden Google bu sayfadaki ${k.noindex ? 'noindex' : 'canonical'} etiketini göremez.`, `Because of the robots.txt block, Google cannot see the ${k.noindex ? 'noindex' : 'canonical'} tag on this page.`), t('Sayfayı dizinden çıkarmak istiyorsanız robots.txt engelini kaldırın ki Google noindex\'i okuyabilsin; engel kalırsa adres içeriksiz olarak dizinde kalabilir.', 'If you want the page out of the index, lift the robots.txt block so Google can read the noindex; with the block in place, the address can stay indexed without content.')]
      case 'head-kirildi': return [t(`<${k.etiket}> etiketi <head> bölümünü erken kapatıyor; sonraki SEO etiketleri gövdede kalıyor.`, `A <${k.etiket}> tag closes <head> early; the SEO tags after it end up in the body.`), t('head içine yalnızca meta, link, title, script, style ve base koyun. Geçersiz etiketleri body\'ye taşıyın ya da SEO etiketlerini onlardan önceye alın.', 'Only put meta, link, title, script, style and base inside head. Move invalid elements to the body or place the SEO tags before them.')]
      default: return [k.kod, '']
    }
  }

  const kararMetni = {
    uygun: [t('Dizine eklenebilir görünüyor', 'Looks indexable'), t('Teknik bir engel bulunmadı. Dizine eklenip eklenmeyeceğine yine de Google karar verir.', 'No technical blocker was found. Whether the page is indexed is still Google\'s decision.')],
    dikkat: [t('Dikkat', 'Check this'), t('Kesin bir engel yok ama Google\'ın bu adresi dizine eklememesine yol açabilecek sinyaller var.', 'There is no hard blocker, but some signals may lead Google not to index this address.')],
    engel: [t('Engel var', 'Blocked'), t('Bu adres şu hâliyle dizine eklenemez. Kırmızı işaretli maddeleri düzeltin.', 'This address cannot be indexed as it is. Fix the items marked red.')],
  }

  const botNotu = (id) => ({
    googlebot: t('Google Arama', 'Google Search'),
    bingbot: t('Bing ve Bing verisini kullanan aramalar', 'Bing and search engines using Bing data'),
    gptbot: t('OpenAI model eğitimi; ChatGPT aramasını etkilemez', 'OpenAI model training; does not affect ChatGPT search'),
    'google-extended': t('Gemini eğitimi; Google Arama\'yı etkilemez', 'Gemini training; does not affect Google Search'),
  }[id])

  const icerik = isEn ? {
    baslik: 'Indexability Checker',
    metaBaslik: 'Indexability Checker | Free SEO Tool',
    metaDesc: 'Find what stops a page from being indexed. Check the status code, robots.txt, noindex, X-Robots-Tag, canonical and hreflang in one place.',
    giris: 'Enter a URL and see every technical signal that decides whether Google can index it: the final status code after redirects, robots.txt rules for Googlebot, noindex in the X-Robots-Tag header or meta robots tag, the canonical tag, hreflang alternates and meta refresh. Each item explains what it means and how to fix it. For pages that Google crawled but did not index, read [crawled, currently not indexed](/en/tarandi-dizine-eklenmemis); to test rules use the [robots.txt tester](/en/robots-txt-tester).',
    adimlar: [
      'Enter the full address of the page and press **Check**. If the address redirects, the tool follows the redirects and checks the final page.',
      'Read the verdict at the top: green means no technical blocker, amber means there are signals to review and red means the page cannot be indexed as it is.',
      'Go through the checklist. Open **What it means and how to fix it** on red and amber items; the raw values table shows exactly what the server returned.',
      'After fixing, check again, then open the URL Inspection tool in Search Console, run a live test and request indexing.',
    ],
    sss: [
      { s: 'Does "indexable" mean the page is indexed?', c: 'No. The tool only checks technical blockers. Even a page with no blocker may not be indexed because of quality, duplication or crawl priority. Only the URL Inspection tool in Search Console shows Google\'s own decision; see [crawled, currently not indexed](/en/tarandi-dizine-eklenmemis) and the [Search Console guide](/en/search-console-rehberi).' },
      { s: 'What is the difference between noindex and a robots.txt block?', c: 'robots.txt controls crawling: a blocked page is not fetched, but it can still appear in the index without content if other pages link to it. noindex controls indexing: Google must be able to crawl the page to see it. To remove a page from the index, allow crawling and use noindex. You can test rules with the [robots.txt tester](/en/robots-txt-tester).' },
      { s: 'What happens if the canonical points to another address?', c: 'Google treats it as a strong hint that the other address is the main version and usually indexes that one instead. This is correct for duplicates such as parameter URLs, but a mistaken canonical (a staging domain, the home page, a missing trailing slash) quietly removes pages from the index. More in the [canonical tag article](/en/canonical-etiket-nedir).' },
      { s: 'What is X-Robots-Tag and why can I not see it in the page source?', c: 'It is an HTTP response header that carries the same rules as the meta robots tag, and it works for files such as PDFs too. It is set by the server, CDN or hosting configuration, so it does not appear in the HTML. That is why a forgotten "X-Robots-Tag: noindex" on a staging configuration often ends up in production unnoticed.' },
      { s: 'Does the tool see tags added with JavaScript?', c: 'No. It reads the raw HTML the server returns, without running JavaScript. Google renders pages and may see a canonical or meta robots tag added later by JavaScript. If a framework or tag manager changes these tags, compare with the rendered HTML in the URL Inspection tool. Keeping SEO tags in the server HTML is the safest option.' },
      { s: 'What are the limits?', c: 'One address per check and about 15 checks per minute. Up to 10 redirects are followed and the first 512 KB of HTML is read. Requests come from our server with a bot user agent and no cookies; private and internal network addresses are never fetched. To trace redirects in bulk, use the [redirect checker](/en/redirect-checker).' },
    ],
  } : {
    baslik: 'İndekslenebilirlik Kontrolü',
    metaBaslik: 'İndekslenebilirlik Kontrolü | Ücretsiz SEO Aracı',
    metaDesc: 'Bir sayfanın dizine eklenmesini engelleyen sinyalleri bulun. Durum kodu, robots.txt, noindex, X-Robots-Tag, canonical ve hreflang tek ekranda.',
    giris: 'Adresi yazın; Google\'ın sayfayı dizine ekleyip ekleyemeyeceğini belirleyen teknik sinyallerin hepsini görün. Yönlendirmelerden sonraki son durum kodu, Googlebot için robots.txt kuralları, X-Robots-Tag başlığında ya da meta robots etiketinde noindex, canonical etiketi, hreflang alternatifleri ve meta refresh tek tek kontrol edilir; her madde ne anlama geldiğini ve nasıl düzeltileceğini söyler. Google\'ın taradığı ama dizine eklemediği sayfalar için [tarandı ama dizine eklenmedi yazısını](/tarandi-dizine-eklenmemis), kuralları denemek için [robots.txt test aracını](/robots-txt-test) kullanın.',
    adimlar: [
      'Sayfanın tam adresini yazıp **Kontrol et**\'e basın. Adres yönlendiriyorsa araç yönlendirmeleri izler ve son sayfayı kontrol eder.',
      'Üstteki karara bakın: yeşil teknik engel yok, sarı incelenmesi gereken sinyaller var, kırmızı sayfa bu hâliyle dizine eklenemez demektir.',
      'Kontrol listesini okuyun. Kırmızı ve sarı maddelerde **Ne anlama gelir, nasıl düzeltilir?** bölümünü açın; ham değerler tablosu sunucunun tam olarak ne döndürdüğünü gösterir.',
      'Düzelttikten sonra yeniden kontrol edin, ardından Search Console\'da URL Denetimi aracını açıp canlı testi çalıştırın ve dizine eklenmesini isteyin.',
    ],
    sss: [
      { s: 'İndekslenebilir olmak dizine eklenmiş olmak demek mi?', c: 'Hayır. Araç yalnızca teknik engelleri kontrol eder. Engeli olmayan bir sayfa da kalite, kopya içerik ya da tarama önceliği nedeniyle dizine eklenmeyebilir. Google\'ın kendi kararını yalnızca Search Console\'daki URL Denetimi gösterir; [tarandı ama dizine eklenmedi yazısına](/tarandi-dizine-eklenmemis) ve [Search Console rehberine](/search-console-rehberi) bakın.' },
      { s: 'noindex ile robots.txt engeli arasındaki fark nedir?', c: 'robots.txt taramayı kontrol eder: engelli sayfa getirilmez, ama başka sayfalardan link alıyorsa içeriksiz olarak dizinde görünebilir. noindex dizine eklemeyi kontrol eder ve Google\'ın etiketi görmesi için sayfayı tarayabilmesi gerekir. Bir sayfayı dizinden çıkarmak için taramaya izin verip noindex kullanın. Kuralları [robots.txt test aracıyla](/robots-txt-test) deneyebilirsiniz.' },
      { s: 'Canonical başka bir adresi gösteriyorsa ne olur?', c: 'Google bunu diğer adresin asıl sürüm olduğuna dair güçlü bir ipucu sayar ve genellikle onu dizine ekler. Parametreli adresler gibi kopyalar için doğrudur; ama yanlış bir canonical (test alan adı, ana sayfa, eksik sondaki /) sayfaları sessizce dizinden düşürür. Ayrıntılar [canonical etiketi yazısında](/canonical-etiket-nedir).' },
      { s: 'X-Robots-Tag nedir, neden sayfa kaynağında göremiyorum?', c: 'Meta robots etiketiyle aynı kuralları taşıyan bir HTTP yanıt başlığıdır ve PDF gibi dosyalarda da çalışır. Sunucu, CDN ya da barındırma ayarıyla eklendiği için HTML\'de görünmez. Test ortamında unutulan bir "X-Robots-Tag: noindex" ayarının fark edilmeden canlıya taşınması bu yüzden sık görülür.' },
      { s: 'Araç JavaScript ile eklenen etiketleri görür mü?', c: 'Hayır. Sunucunun döndürdüğü ham HTML\'i JavaScript çalıştırmadan okur. Google sayfayı işler ve JavaScript ile sonradan eklenen bir canonical ya da meta robots etiketini görebilir. Bir çatı ya da etiket yöneticisi bu etiketleri değiştiriyorsa URL Denetimi\'ndeki işlenmiş HTML ile karşılaştırın. SEO etiketlerini sunucu HTML\'inde tutmak en güvenli yoldur.' },
      { s: 'Sınırlar neler?', c: 'Her kontrolde bir adres ve dakikada yaklaşık 15 kontrol. En fazla 10 yönlendirme izlenir ve HTML\'in ilk 512 KB\'ı okunur. İstekler sunucumuzdan bot kimliğiyle ve çerezsiz gönderilir; özel ve iç ağ adresleri hiçbir zaman getirilmez. Yönlendirmeleri toplu izlemek için [yönlendirme zinciri kontrolünü](/yonlendirme-zinciri-kontrol) kullanın.' },
    ],
  }

  const seviyeEtiketi = (s) => ({ hata: t('Hata', 'Error'), uyari: t('Uyarı', 'Warning'), bilgi: t('Bilgi', 'Info'), iyi: t('Tamam', 'OK') }[s])

  const a = gosterilen.analiz
  const z = gosterilen.zincir
  const kr = KARAR_RENK[a.karar]
  const gruplar = GRUP_SIRASI.map(g => [g, a.kontroller.filter(k => k.grup === g)]).filter(([, l]) => l.length)
  const sayac = { hata: 0, uyari: 0 }
  a.kontroller.forEach(k => { if (k.seviye in sayac) sayac[k.seviye]++ })

  const h = a.ham
  const hamSatirlar = [
    [t('İstenen adres', 'Requested URL'), h.istenenUrl],
    [t('Son adres', 'Final URL'), h.sonUrl || t('(ulaşılamadı)', '(not reached)')],
    [t('Durum zinciri', 'Status chain'), (z?.adimlar || []).map(x => x.durum ?? '?').join(' → ')],
    [t('HTTP durum', 'HTTP status'), h.durum ?? ''],
    ['Content-Type', h.icerikTuru || ''],
    ['X-Robots-Tag', h.xRobotsTag || t('(yok)', '(none)')],
    [t('Link başlığı', 'Link header'), h.link || t('(yok)', '(none)')],
    ['<title>', h.title || ''],
    ...(h.metaRobots.length ? h.metaRobots.map(m => [`<meta name="${m.ad}">`, `${m.icerik}${m.konum === 'govde' ? t(' (head dışında)', ' (outside head)') : ''}`]) : [['meta robots', t('(yok)', '(none)')]]),
    ...(h.canonicallar.length ? h.canonicallar.map(c => ['canonical' + (c.kaynak === 'baslik' ? t(' (Link başlığı)', ' (Link header)') : ''), `${c.ham || t('(boş)', '(empty)')}${c.url && c.url !== c.ham ? ` → ${c.url}` : ''}${c.konum === 'govde' ? t(' (head dışında)', ' (outside head)') : ''}`]) : [['canonical', t('(yok)', '(none)')]]),
    ['hreflang', h.hreflanglar.length ? h.hreflanglar.map(x => `${x.kod} → ${x.url || x.ham}`).join('\n') : t('(yok)', '(none)')],
    ...(h.baseHref ? [['<base href>', h.baseHref]] : []),
    ['meta refresh', h.metaRefresh ? `${h.metaRefresh.sure} ${t('sn', 's')}${h.metaRefresh.url ? ` → ${h.metaRefresh.url}` : ''}` : t('(yok)', '(none)')],
    ['robots.txt', h.robotsUrl ? `${h.robotsUrl}${h.robotsDurum != null ? ` (${h.robotsDurum})` : ''}` : ''],
  ]

  const yukleniyor = !!durum?.yukleniyor
  const ilgili = [
    [t('/robots-txt-test', '/en/robots-txt-tester'), t('robots.txt test aracı', 'robots.txt tester')],
    [t('/yonlendirme-zinciri-kontrol', '/en/redirect-checker'), t('Yönlendirme zinciri kontrolü', 'Redirect chain checker')],
    [t('/canonical-etiket-nedir', '/en/canonical-etiket-nedir'), t('Canonical etiketi nedir?', 'What is a canonical tag?')],
    [t('/tarandi-dizine-eklenmemis', '/en/tarandi-dizine-eklenmemis'), t('Tarandı ama dizine eklenmedi', 'Crawled, currently not indexed')],
    [t('/search-console-rehberi', '/en/search-console-rehberi'), t('Search Console rehberi', 'Search Console guide')],
  ]

  return (
    <AracSayfa isEn={isEn} yol="/indekslenebilirlik-kontrolu" yolEn="/en/indexability-checker" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['teknik-seo', 'site-tasima-seo', 'seo-raporlama']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div>
          <label htmlFor="ik-url" style={F.etiket}>{t('Sayfa adresi', 'Page URL')}</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input id="ik-url" value={url} onChange={ev => setUrl(ev.target.value)} onKeyDown={ev => { if (ev.key === 'Enter' && !yukleniyor) kontrolEt() }}
              placeholder={t('https://www.ornek.com/sayfa', 'https://www.example.com/page')} inputMode="url" style={{ ...F.girdi, flex: '1 1 260px', width: 'auto' }} />
            <button type="button" onClick={kontrolEt} style={F.buton} disabled={yukleniyor}>{yukleniyor ? t('Kontrol ediliyor…', 'Checking…') : t('Kontrol et', 'Check')}</button>
          </div>
        </div>
        {durum?.hata && <p role="alert" style={{ color: '#b91c1c', fontSize: '13px', margin: 0 }}>{durum.hata}</p>}
        <p style={{ color: '#888', fontSize: '12.5px', margin: 0 }}>{t('İstekler sunucumuzdan bot kimliğiyle, çerezsiz ve JavaScript çalıştırılmadan gönderilir. Özel ve iç ağ adresleri kontrol edilmez.', 'Requests are sent from our server with a bot user agent, without cookies and without running JavaScript. Private and internal network addresses are not checked.')}</p>

        <div aria-live="polite" style={{ display: 'grid', gap: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: 0 }}>{t('Sonuç', 'Result')}{ornekMi ? t(' (örnek)', ' (sample)') : ''}</h2>
          {ornekMi && <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{t('Aşağıda örnek bir sayfanın sonucu gösteriliyor. Kendi adresinizi yazıp Kontrol et\'e basın.', 'Below is the result for a sample page. Enter your own address and press Check.')}</p>}

          {/* Karar */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: kr.zemin, border: `1px solid ${kr.renk}33`, borderRadius: '12px', padding: '16px 18px' }}>
            <span aria-hidden="true" style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: kr.renk, color: '#fff', fontSize: '18px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{kr.isaret}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: kr.renk, lineHeight: 1.3 }}>{kararMetni[a.karar][0]}</div>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#333', lineHeight: 1.6 }}>{kararMetni[a.karar][1]}</p>
              <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#555', overflowWrap: 'anywhere' }}>
                {a.sonUrl ? <>{t('Kontrol edilen adres', 'Checked address')}: <span style={{ fontFamily: MONO }}>{a.sonUrl}</span></> : <span style={{ fontFamily: MONO }}>{h.istenenUrl}</span>}
                {(sayac.hata || sayac.uyari) ? ` · ${t(`${sayac.hata} hata, ${sayac.uyari} uyarı`, `${sayac.hata} error${sayac.hata === 1 ? '' : 's'}, ${sayac.uyari} warning${sayac.uyari === 1 ? '' : 's'}`)}` : ''}
              </p>
            </div>
          </div>

          {/* Kontrol listesi */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t('Kontrol listesi', 'Checklist')}</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {gruplar.map(([g, liste]) => (
                <div key={g} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '12px 14px', background: '#fff' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#777', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>{grupAdi(g)}</div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>
                    {liste.map((k, i) => {
                      const c = SEVIYE_RENK[k.seviye]
                      const [mesaj, nasil] = metin(k)
                      return (
                        <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: c.zemin, borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', color: '#333', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                          <span aria-hidden="true" style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: c.renk, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>{c.isaret}</span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{seviyeEtiketi(k.seviye)}. </span>
                            <span>{renderInline(mesaj)}</span>
                            {nasil && (
                              <details style={{ marginTop: '4px' }} open={!ornekMi && (k.seviye === 'hata')}>
                                <summary style={{ cursor: 'pointer', fontSize: '12.5px', color: c.renk, fontWeight: 600 }}>{t('Ne anlama gelir, nasıl düzeltilir?', 'What it means and how to fix it')}</summary>
                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#444', lineHeight: 1.7 }}>{renderInline(nasil)}</p>
                              </details>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* robots.txt bot tablosu */}
          {a.robots?.botlar?.length > 0 && (
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>{t('robots.txt erişimi', 'robots.txt access')}</h3>
              <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px', minWidth: '520px' }}>
                  <thead>
                    <tr style={{ background: '#faf9f7' }}>
                      {[t('Bot', 'Bot'), t('Tarama', 'Crawling'), t('Kararı veren kural', 'Deciding rule'), t('Ne için', 'Used for')].map(x => <th key={x} scope="col" style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #eee' }}>{x}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {a.robots.botlar.map(bt => (
                      <tr key={bt.id}>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', fontWeight: bt.ana ? 700 : 500 }}>{bt.ad}</td>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', color: bt.izin ? '#15803d' : '#b91c1c', fontWeight: 700 }}>{bt.izin == null ? '?' : bt.izin ? t('İzinli', 'Allowed') : t('Engelli', 'Blocked')}</td>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', fontFamily: MONO, fontSize: '12.5px' }}>{bt.kural ? `${kuralMetni(bt.kural)}${bt.ajan ? ` (UA ${bt.ajan})` : ''}` : (a.robots.durumTuru === 'var' ? t('eşleşen kural yok', 'no matching rule') : a.robots.durumTuru === 'yok' ? t('robots.txt yok', 'no robots.txt') : t('sunucu hatası', 'server error'))}</td>
                        <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', color: '#666' }}>{botNotu(bt.id)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Ham değerler */}
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>{t('Ham değerler', 'Raw values')}</h3>
            <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px' }}>
                <tbody>
                  {hamSatirlar.map(([ad, deger], i) => (
                    <tr key={i}>
                      <th scope="row" style={{ textAlign: 'left', verticalAlign: 'top', padding: '7px 10px', borderBottom: '1px solid #f0ece6', background: '#faf9f7', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: ad.startsWith('<') ? MONO : 'inherit', fontSize: ad.startsWith('<') ? '12px' : '13px' }}>{ad}</th>
                      <td style={{ padding: '7px 10px', borderBottom: '1px solid #f0ece6', fontFamily: MONO, fontSize: '12.5px', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap' }}>{String(deger)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '12px', padding: '14px 16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', margin: '0 0 6px' }}>{t('Bu araç neyi göremez?', 'What this tool cannot see')}</h3>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#444', lineHeight: 1.7 }}>
            {renderInline(t(
              'Google\'ın kendi kararını. Teknik olarak uygun bir sayfayı da Google içerik kalitesi, kopya içerik ya da tarama önceliği nedeniyle dizine eklemeyebilir. Kesin durumu yalnızca Search Console\'daki **URL Denetimi** aracı gösterir: "URL Google\'da" ya da "Tarandı, şu anda dizine eklenmiş değil" gibi sonuçlar oradadır. Araç JavaScript çalıştırmaz; etiketler sonradan JavaScript ile ekleniyorsa URL Denetimi\'ndeki işlenmiş HTML\'e bakın. Ayrıntılar [tarandı ama dizine eklenmedi](/tarandi-dizine-eklenmemis) yazısında ve [Search Console rehberinde](/search-console-rehberi).',
              'Google\'s own decision. Google may skip a technically indexable page because of content quality, duplication or crawl priority. Only the **URL Inspection** tool in Search Console shows the actual status, such as "URL is on Google" or "Crawled, currently not indexed". The tool does not run JavaScript; if tags are added later by JavaScript, check the rendered HTML in URL Inspection. More in [crawled, currently not indexed](/en/tarandi-dizine-eklenmemis) and the [Search Console guide](/en/search-console-rehberi).'
            ))}
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>{t('İlgili araçlar ve yazılar', 'Related tools and articles')}</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ilgili.map(([href, ad]) => (
              <Link key={href} href={href} style={{ fontSize: '13px', fontWeight: 600, color: 'var(--orange)', border: '1px solid #f3d9c9', background: '#fff', borderRadius: '999px', padding: '6px 12px' }}>{ad} →</Link>
            ))}
          </div>
        </div>
      </div>
    </AracSayfa>
  )
}
