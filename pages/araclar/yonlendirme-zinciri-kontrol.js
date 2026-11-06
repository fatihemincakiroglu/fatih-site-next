import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { adresTemizle, satirlariOku, adimTuru, zinciriAnalizEt, genelSeviye, yonlendirmeMi, KALICI_KODLAR, EN_FAZLA_ADRES, EN_FAZLA_ADIM, ORNEK_SONUC } from '../../lib/yonlendirme-kontrol'

// Yönlendirme zinciri ve HTTP durum kodu kontrolü.
// TR: /yonlendirme-zinciri-kontrol   EN: /en/redirect-checker
// İstekler sunucuda gönderilir (pages/api/yonlendirme-kontrol.js, her adımda SSRF korumalı).
// Toplu modda adresler sırayla, tek tek gönderilir; sonuçlar geldikçe gösterilir.

const SEVIYE_RENK = {
  hata: { renk: '#b91c1c', zemin: '#fef2f2', isaret: '✗' },
  uyari: { renk: '#b45309', zemin: '#fffbeb', isaret: '!' },
  bilgi: { renk: '#1d4ed8', zemin: '#eff6ff', isaret: 'i' },
  iyi: { renk: '#15803d', zemin: '#f0fdf4', isaret: '✓' },
}
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function durumRengi(kod) {
  if (kod == null) return { renk: '#6b7280', zemin: '#f3f4f6' }
  if (kod >= 200 && kod < 300) return { renk: '#15803d', zemin: '#f0fdf4' }
  if (KALICI_KODLAR.includes(kod)) return { renk: '#1d4ed8', zemin: '#eff6ff' }
  if (kod >= 300 && kod < 400) return { renk: '#b45309', zemin: '#fffbeb' }
  return { renk: '#b91c1c', zemin: '#fef2f2' }
}

function Rozet({ kod, metin }) {
  const r = durumRengi(kod)
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: r.zemin, color: r.renk, border: `1px solid ${r.renk}33`, borderRadius: '6px', padding: '2px 8px', fontSize: '12.5px', fontWeight: 700, fontFamily: MONO, whiteSpace: 'nowrap' }}>
      {kod ?? '?'}{metin ? <span style={{ fontWeight: 500, fontFamily: 'var(--font-body)' }}>{metin}</span> : null}
    </span>
  )
}

const csvHucre = (v) => { const s = String(v ?? ''); return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s }

export default function YonlendirmeZinciriKontrol(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [mod, setMod] = useState('tek')
  const [url, setUrl] = useState('')
  const [toplu, setToplu] = useState('')
  const [sonuclar, setSonuclar] = useState([])
  const [durum, setDurum] = useState(null)

  const topluOku = useMemo(() => satirlariOku(toplu, EN_FAZLA_ADRES), [toplu])
  const ornekMi = sonuclar.length === 0
  const gosterilen = ornekMi ? [{ istenen: ORNEK_SONUC.baslangic, sonuc: ORNEK_SONUC, bulgular: zinciriAnalizEt(ORNEK_SONUC) }] : sonuclar

  const kontrolEt = async () => {
    const liste = mod === 'tek' ? [adresTemizle(url)].filter(Boolean) : topluOku.adresler
    if (!liste.length) {
      setDurum({ hata: t('Geçerli bir adres yazın (ör. https://www.ornek.com/sayfa).', 'Enter a valid address (e.g. https://www.example.com/page).') })
      return
    }
    setSonuclar([])
    setDurum({ yukleniyor: true, sira: 0, toplam: liste.length })
    const yeni = []
    for (let i = 0; i < liste.length; i++) {
      setDurum({ yukleniyor: true, sira: i + 1, toplam: liste.length })
      let kayit
      try {
        const r = await fetch(`/api/yonlendirme-kontrol?url=${encodeURIComponent(liste[i])}`)
        if (r.status === 429) {
          setDurum({ hata: t('Çok fazla istek. Bir dakika sonra kalan adresleri tekrar deneyin.', 'Too many requests. Try the remaining addresses again in a minute.') })
          return
        }
        const j = await r.json()
        if (r.status === 400) kayit = { istenen: liste[i], hata: t('Geçersiz adres.', 'Invalid address.') }
        else if (!j.ok) kayit = { istenen: liste[i], hata: t('Adres kontrol edilemedi.', 'The address could not be checked.') }
        else kayit = { istenen: liste[i], sonuc: j.sonuc, bulgular: zinciriAnalizEt(j.sonuc) }
      } catch {
        kayit = { istenen: liste[i], hata: t('Bağlantı hatası.', 'Connection error.') }
      }
      yeni.push(kayit)
      setSonuclar([...yeni])
    }
    setDurum({ bitti: true, toplam: liste.length })
  }

  const kisaUrl = (u) => String(u || '').replace(/^https?:\/\//, '')
  const turEtiketleri = (a, b) => {
    const r = adimTuru(a, b)
    const e = []
    if (r.httpsYukseltme) e.push('http → https')
    if (r.httpsDusurme) e.push('https → http')
    if (r.wwwEkleme) e.push(t('www eklendi', 'adds www'))
    if (r.wwwKaldirma) e.push(t('www kaldırıldı', 'removes www'))
    if (r.egikEkleme) e.push(t('sona / eklendi', 'adds trailing slash'))
    if (r.egikKaldirma) e.push(t('sondaki / kaldırıldı', 'removes trailing slash'))
    if (r.harfDuzeltme) e.push(t('büyük/küçük harf', 'letter case'))
    if (r.alanDegisti) e.push(t('başka alan adı', 'different domain'))
    else if (r.yolDegisti) e.push(t('farklı yol', 'different path'))
    if (r.sorguDegisti) e.push(t('parametre değişti', 'query changed'))
    return e
  }

  const hataMetni = (kod, detay) => {
    switch (kod) {
      case 'dogrulama': return isEn ? 'The address was not checked: it could not be resolved or points to a private or internal network address.' : `Adres kontrol edilmedi${detay ? ` (${detay})` : ''}. Alan adı çözülemedi ya da özel veya iç ağ adresine gidiyor.`
      case 'zaman-asimi': return t('Sunucu zamanında yanıt vermedi (zaman aşımı).', 'The server did not respond in time (timeout).')
      case 'baglanti': return t(`Bağlantı kurulamadı${detay ? ` (${detay})` : ''}.`, `Could not connect${detay ? ` (${detay})` : ''}.`)
      case 'location-yok': return t('Yönlendirme yanıtında Location başlığı yok; tarayıcılar ve botlar hedefi bilemez.', 'The redirect response has no Location header, so browsers and bots cannot know the target.')
      case 'location-gecersiz': return t('Location başlığı geçerli bir http(s) adresi değil.', 'The Location header is not a valid http(s) address.')
      default: return kod
    }
  }

  const bulguMetni = (b) => {
    switch (b.kod) {
      case 'dongu': return t(`Yönlendirme döngüsü: zincir ${b.url} adresine geri dönüyor. Tarayıcılar "çok fazla yönlendirme" hatası verir, Google sayfayı dizine ekleyemez.`, `Redirect loop: the chain returns to ${b.url}. Browsers show a "too many redirects" error and Google cannot index the page.`)
      case 'sinir': return t(`${b.sinir} adımdan sonra hâlâ yönlendirme var. Googlebot da en fazla 10 adım izler; zinciri kısaltın.`, `Still redirecting after ${b.sinir} hops. Googlebot also follows at most 10 hops; shorten the chain.`)
      case 'hata-dogrulama': case 'hata-zaman-asimi': case 'hata-baglanti': case 'hata-location-yok': case 'hata-location-gecersiz':
        return hataMetni(b.kod.slice(5), b.detay)
      case 'zincir': return t(`${b.adim} adımlı yönlendirme zinciri. Her ek adım kullanıcıyı yavaşlatır ve tarama bütçesini harcar.`, `Redirect chain with ${b.adim} hops. Every extra hop slows users down and uses crawl budget.`)
      case 'https-dusurme': return t(`${b.no}. adım https'ten http'ye düşürüyor. Güvenli olmayan sürüme yönlendirmek hem kullanıcı hem SEO için sorundur.`, `Hop ${b.no} downgrades from https to http. Redirecting to the insecure version is a problem for users and SEO.`)
      case 'gecici-kalici-gibi': return t(`${b.no}. adım ${b.durum} (geçici) kullanıyor ama bu bir kalıcı taşıma gibi görünüyor (ör. http → https, www ya da alan adı değişikliği). Kontrol edin; kalıcıysa 301 ya da 308 kullanın.`, `Hop ${b.no} uses ${b.durum} (temporary), but this looks like a permanent move (e.g. http → https, www or a domain change). Check it; if it is permanent, use 301 or 308.`)
      case 'gecici': return t(`${b.no}. adım ${b.durum} (geçici). Kampanya ya da kısa süreli bir yönlendirmeyse doğru; sayfa kalıcı taşındıysa 301 kullanın.`, `Hop ${b.no} is a ${b.durum} (temporary). Fine for a campaign or short-term redirect; if the page moved for good, use 301.`)
      case 'http-https': return t(`${b.no}. adım http'den https'e yönlendiriyor. Bu doğru; iç linkleri ve site haritasını doğrudan https adrese güncelleyin.`, `Hop ${b.no} redirects http to https. That is correct; update internal links and the sitemap to the https address directly.`)
      case 'www': return t(`${b.no}. adım ${b.ekleme ? 'www ekliyor' : 'www kaldırıyor'}. Tercih edilen sürüme tutarlı yönlendirme iyi; iç linkler doğrudan o sürümü kullanmalı.`, `Hop ${b.no} ${b.ekleme ? 'adds' : 'removes'} www. A consistent redirect to the preferred version is good; internal links should use it directly.`)
      case 'egik': return t(`${b.no}. adım sondaki eğik çizgiyi ${b.ekleme ? 'ekliyor' : 'kaldırıyor'}. İç linklerde aynı biçimi kullanırsanız bu adım hiç çalışmaz.`, `Hop ${b.no} ${b.ekleme ? 'adds' : 'removes'} the trailing slash. If internal links use the same format, this hop never runs.`)
      case 'harf': return t(`${b.no}. adım büyük/küçük harf düzeltiyor. Linklerde küçük harfli adresi kullanın.`, `Hop ${b.no} fixes letter case. Use the lowercase address in links.`)
      case 'alan': return t(`${b.no}. adım başka bir alan adına (${kisaUrl(b.sonraki)}) gidiyor.`, `Hop ${b.no} goes to another domain (${kisaUrl(b.sonraki)}).`)
      case 'kanonik-birlestir': return t(`Zincirde ${b.adet} ayrı biçim düzeltmesi var (https, www, sondaki /). Bunları sunucuda tek bir kurala birleştirerek doğrudan son adrese yönlendirin.`, `The chain has ${b.adet} separate format fixes (https, www, trailing slash). Combine them into one server rule that redirects straight to the final address.`)
      case 'son-200': return b.yonSayisi ? t('Son adres 200 OK döndürüyor.', 'The final address returns 200 OK.') : t('Yönlendirme yok, adres doğrudan 200 OK döndürüyor.', 'No redirect; the address returns 200 OK directly.')
      case 'son-2xx': return t(`Son adres ${b.durum} döndürüyor; 200 beklenirdi.`, `The final address returns ${b.durum}; 200 would be expected.`)
      case 'son-404': return b.yonSayisi ? t('Yönlendirme 404 (bulunamadı) sayfasında bitiyor. Hedefi düzeltin ya da en yakın ilgili sayfaya yönlendirin.', 'The redirect ends on a 404 (not found) page. Fix the target or redirect to the closest relevant page.') : t('Adres 404 (bulunamadı) döndürüyor. Sayfa taşındıysa 301 ekleyin; kalıcı olarak kaldırıldıysa 410 da kullanılabilir.', 'The address returns 404 (not found). If the page moved, add a 301; if it was removed for good, 410 is also an option.')
      case 'son-410': return b.yonSayisi ? t('Yönlendirme 410 (kalıcı olarak kaldırıldı) sayfasında bitiyor. Kaldırılmış bir sayfaya yönlendirmek yerine eski adres doğrudan 410 dönmeli ya da canlı bir sayfaya gitmeli.', 'The redirect ends on a 410 (gone) page. Instead of redirecting to a removed page, return 410 on the old address or point it to a live page.') : t('Adres 410 (kalıcı olarak kaldırıldı) döndürüyor. Sayfa bilerek kaldırıldıysa doğru.', 'The address returns 410 (gone). Correct if the page was removed on purpose.')
      case 'son-erisim': return t(`Son adres ${b.durum} döndürüyor (erişim engeli). Herkese açık bir sayfaysa bot erişimini engelleyen kuralı kontrol edin.`, `The final address returns ${b.durum} (access denied). If this is a public page, check the rule blocking bot access.`)
      case 'son-429': return t('Son adres 429 (çok fazla istek) döndürüyor. Sunucu ya da CDN botları sınırlıyor olabilir; biraz sonra tekrar deneyin.', 'The final address returns 429 (too many requests). The server or CDN may be rate limiting bots; try again later.')
      case 'son-5xx': return t(`Son adres ${b.durum} (sunucu hatası) döndürüyor. Sürerse Google taramayı yavaşlatır ve sayfa dizinden düşebilir.`, `The final address returns ${b.durum} (server error). If it persists, Google slows crawling and the page may drop out of the index.`)
      case 'son-4xx': return t(`Son adres ${b.durum} döndürüyor.`, `The final address returns ${b.durum}.`)
      case 'son-diger': return t(`Son yanıt ${b.durum}; beklenen bir son durum değil.`, `The final response is ${b.durum}, which is not an expected final status.`)
      case 'meta-refresh': return t(`Son sayfada meta refresh var (${b.sure} sn${b.url ? `, hedef ${kisaUrl(b.url)}` : ''}). Google anında meta refresh'i kalıcı, gecikmeliyi geçici yönlendirme gibi değerlendirir; mümkünse sunucu tarafında 301 kullanın.`, `The final page has a meta refresh (${b.sure} s${b.url ? `, target ${kisaUrl(b.url)}` : ''}). Google treats an instant meta refresh as permanent and a delayed one as temporary; use a server side 301 where possible.`)
      case 'yavas': return t(`${b.adet} adım 1 saniyeden uzun sürdü (en yavaşı ${b.enYavas} ms).`, `${b.adet} hop(s) took over 1 second (slowest ${b.enYavas} ms).`)
      default: return b.kod
    }
  }

  // Öneriler: bulgulardan yapılacaklar (tekrarsız, önem sırasıyla)
  const oneriler = (s, bulgular) => {
    const k = new Set(bulgular.map(b => b.kod))
    const o = []
    if (k.has('dongu')) o.push(t('Döngüye giren kuralı bulun: genellikle iki kural birbirini geri çevirir (ör. sondaki / ekleyen ve kaldıran kurallar). Birini kaldırın.', 'Find the rule causing the loop: usually two rules undo each other (e.g. one adds and one removes the trailing slash). Remove one of them.'))
    if (k.has('zincir') || k.has('sinir')) {
      const son = s.sonUrl
      o.push(son
        ? t(`${kisaUrl(s.baslangic)} adresini tek adımda, 301 ile doğrudan ${kisaUrl(son)} adresine yönlendirin.`, `Redirect ${kisaUrl(s.baslangic)} in a single 301 hop straight to ${kisaUrl(son)}.`)
        : t('Her eski adresi tek adımda son hedefe yönlendirin.', 'Redirect every old address to its final target in a single hop.'))
      o.push(t('İç linkleri, canonical etiketlerini ve site haritasını yönlendirmesiz son adrese güncelleyin.', 'Update internal links, canonical tags and the sitemap to the final address so no redirect is needed.'))
    }
    if (k.has('kanonik-birlestir')) o.push(t('https, www ve sondaki / düzeltmelerini sunucuda tek kurala birleştirin.', 'Merge the https, www and trailing slash fixes into one server rule.'))
    if (k.has('gecici-kalici-gibi')) o.push(t('Kalıcı taşımalarda 302 ya da 307 yerine 301 ya da 308 kullanın.', 'For permanent moves, use 301 or 308 instead of 302 or 307.'))
    if (k.has('https-dusurme')) o.push(t('https adresini asla http\'ye yönlendirmeyin; kuralı tersine çevirin.', 'Never redirect https to http; reverse the rule.'))
    if (k.has('son-404') || (k.has('son-410') && bulgular.find(b => b.kod === 'son-410').yonSayisi)) o.push(t('Yönlendirme hedefini canlı ve ilgili bir sayfaya değiştirin.', 'Change the redirect target to a live, relevant page.'))
    if (k.has('son-5xx')) o.push(t('Sunucu hatasını giderin; sorun sürerse barındırma ve CDN kayıtlarına bakın.', 'Fix the server error; if it persists, check hosting and CDN logs.'))
    if (k.has('meta-refresh')) o.push(t('Meta refresh yerine sunucu tarafında 301 yönlendirmesi kullanın.', 'Use a server side 301 redirect instead of a meta refresh.'))
    return o
  }

  const seviyeAd = (s) => ({ hata: t('Sorun var', 'Problem'), uyari: t('Kontrol edin', 'Check'), iyi: t('Sorun yok', 'OK') }[s])

  const csvIndir = () => {
    const baslik = isEn ? ['Requested URL', 'Hops', 'Status chain', 'Final URL', 'Final status', 'Result', 'Findings'] : ['İstenen adres', 'Adım', 'Durum zinciri', 'Son adres', 'Son durum', 'Sonuç', 'Bulgular']
    const satirlar = [baslik, ...sonuclar.map(r => {
      if (!r.sonuc) return [r.istenen, '', '', '', '', t('hata', 'error'), r.hata]
      const yon = r.sonuc.adimlar.filter(a => yonlendirmeMi(a.durum)).length
      return [r.istenen, yon, r.sonuc.adimlar.map(a => a.durum ?? '?').join(' > '), r.sonuc.sonUrl || '', r.sonuc.sonDurum ?? '', seviyeAd(genelSeviye(r.bulgular)), r.bulgular.filter(b => b.seviye === 'hata' || b.seviye === 'uyari').map(b => bulguMetni(b)).join(' | ')]
    })]
    const blob = new Blob(['﻿' + satirlar.map(s => s.map(csvHucre).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = isEn ? 'redirect-check.csv' : 'yonlendirme-kontrol.csv'
    a.click()
    setTimeout(() => URL.revokeObjectURL(a.href), 1000)
  }

  const icerik = isEn ? {
    baslik: 'Redirect Chain and HTTP Status Checker',
    metaBaslik: 'Redirect Chain Checker | Free SEO Tool',
    metaDesc: 'Trace redirects hop by hop. See status codes and response times, and find loops, long chains, 302s that should be 301s and broken final URLs.',
    giris: 'Follow the redirects of any address hop by hop and see the HTTP status code, Location header and response time of each step. The tool flags loops, chains longer than one hop, temporary redirects that look permanent and final pages that return 404 or 5xx, and tells you what to fix. To write the rules use the [301 redirect generator](/en/redirect-generator); for the difference between redirect types see [301 vs 302 redirects](/en/301-302-yonlendirme), and for the full process see the [site migration SEO guide](/en/site-tasima-seo).',
    adimlar: [
      'Enter an address and press **Check**. Switch to **Bulk** to check up to 10 addresses at once, one per line.',
      'Read the timeline: each hop shows its status code, the Location header it returned and how long it took. Blue badges are permanent redirects, amber ones are temporary.',
      'Fix the red and amber findings first. The recommendations tell you where each address should point in a single hop.',
      'After changing the rules, check again. Update internal links and the sitemap to the final addresses so no redirect is needed at all.',
    ],
    sss: [
      { s: 'What is the difference between 301 and 302, and which should I use?', c: '301 (and 308) mean the page has moved permanently; Google treats them as a strong signal that the target should be the canonical address. 302 (and 303, 307) are temporary and a weak signal. Use 301 for migrations, URL changes and http to https or www moves, and 302 only for genuinely temporary situations. The details are in the [301 vs 302 redirect article](/en/301-302-yonlendirme).' },
      { s: 'Do redirect chains hurt SEO?', c: 'Googlebot follows up to 10 hops, so a short chain does not stop indexing, but every hop adds delay for users, uses crawl budget and is one more rule that can break. The safest approach is a single hop from every old address to the final address, with internal links pointing straight to the final address. In a migration, plan this with the [site migration SEO guide](/en/site-tasima-seo).' },
      { s: 'What are 307 and 308?', c: '307 is a temporary and 308 a permanent redirect; unlike 302 and 301 they require the browser to keep the request method (for example POST). Google treats 308 like 301 and 307 like 302. If your browser shows a "307 Internal Redirect" for http to https, that is usually HSTS working inside the browser; bots do not see it, so this tool shows what the server really returns.' },
      { s: 'Does the tool detect meta refresh and JavaScript redirects?', c: 'It detects a meta refresh tag in the HTML of the final page. Google treats an instant meta refresh as a permanent and a delayed one as a temporary redirect. JavaScript redirects only run after rendering, so the tool cannot see them. Server side 301 redirects are the most reliable option for both users and search engines.' },
      { s: 'Why do I see a different result in my browser?', c: 'Redirects can depend on the user agent, country, language, cookies or a cache. Your browser may also remember an earlier 301 or an HSTS rule. The tool sends requests from a server with a bot user agent and no cookies, which is closer to what search engine bots see. A CDN or firewall may also treat bot requests differently.' },
      { s: 'What are the limits?', c: 'Up to 10 addresses per run, up to 10 hops per address and about 30 addresses per minute. Private or internal network addresses are never checked, for security reasons. For thousands of addresses use a crawler in list mode, and generate the rules with the [redirect generator](/en/redirect-generator).' },
    ],
  } : {
    baslik: 'Yönlendirme Zinciri ve HTTP Durum Kodu Kontrolü',
    metaBaslik: 'Yönlendirme Zinciri Kontrolü | Ücretsiz SEO Aracı',
    metaDesc: 'Yönlendirmeleri adım adım izleyin. Durum kodlarını ve süreleri görün, döngüleri, uzun zincirleri, geçici 302\'leri ve 404 ile biten adresleri bulun.',
    giris: 'Bir adresin yönlendirmelerini adım adım izleyin; her adımın HTTP durum kodunu, Location başlığını ve yanıt süresini görün. Araç döngüleri, birden uzun zincirleri, kalıcı görünen geçici yönlendirmeleri ve 404 ya da 5xx ile biten sayfaları işaretler, neyi düzeltmeniz gerektiğini söyler. Kuralları yazmak için [301 yönlendirme oluşturucuyu](/yonlendirme-olusturucu), yönlendirme türlerinin farkı için [301 ve 302 yönlendirme yazısını](/301-302-yonlendirme), sürecin tamamı için [site taşıma SEO rehberini](/site-tasima-seo) kullanın.',
    adimlar: [
      'Adresi yazıp **Kontrol et**\'e basın. Aynı anda en fazla 10 adres için **Toplu** sekmesine geçip her satıra bir adres yazın.',
      'Zaman çizelgesini okuyun: her adımda durum kodu, dönen Location başlığı ve süre görünür. Mavi rozetler kalıcı, sarı rozetler geçici yönlendirmedir.',
      'Önce kırmızı ve sarı bulguları düzeltin. Öneriler, her adresin tek adımda nereye gitmesi gerektiğini söyler.',
      'Kuralları değiştirdikten sonra yeniden kontrol edin. İç linkleri ve site haritasını son adreslere güncelleyin ki hiç yönlendirme gerekmesin.',
    ],
    sss: [
      { s: '301 ile 302 arasındaki fark nedir, hangisini kullanmalıyım?', c: '301 (ve 308) sayfanın kalıcı olarak taşındığını söyler; Google bunu hedef adresin canonical olması gerektiğine dair güçlü bir sinyal sayar. 302 (ve 303, 307) geçicidir ve zayıf bir sinyaldir. Site taşıma, adres değişikliği, http\'den https\'e ya da www geçişlerinde 301, yalnızca gerçekten geçici durumlarda 302 kullanın. Ayrıntılar [301 ve 302 yönlendirme yazısında](/301-302-yonlendirme).' },
      { s: 'Yönlendirme zinciri SEO\'ya zarar verir mi?', c: 'Googlebot en fazla 10 adım izler; kısa bir zincir dizine eklemeyi durdurmaz. Ama her adım kullanıcıya gecikme ekler, tarama bütçesini harcar ve bozulabilecek bir kural daha demektir. En güvenli yol, her eski adresi tek adımda son adrese yönlendirmek ve iç linkleri doğrudan son adrese vermektir. Taşıma sırasında bunu [site taşıma SEO rehberiyle](/site-tasima-seo) planlayın.' },
      { s: '307 ve 308 nedir?', c: '307 geçici, 308 kalıcı yönlendirmedir; 302 ve 301\'den farkı, tarayıcının istek yöntemini (ör. POST) korumak zorunda olmasıdır. Google 308\'i 301 gibi, 307\'yi 302 gibi değerlendirir. Tarayıcınız http\'den https\'e geçişte "307 Internal Redirect" gösteriyorsa bu genellikle tarayıcı içinde çalışan HSTS\'dir; botlar bunu görmez. Bu araç sunucunun gerçekte ne döndürdüğünü gösterir.' },
      { s: 'Araç meta refresh ve JavaScript yönlendirmelerini görür mü?', c: 'Son sayfanın HTML\'indeki meta refresh etiketini bulur. Google anında çalışan meta refresh\'i kalıcı, gecikmeli olanı geçici yönlendirme gibi değerlendirir. JavaScript yönlendirmeleri ancak sayfa işlendikten sonra çalıştığı için araç onları göremez. Kullanıcı ve arama motoru için en güvenilir yöntem sunucu tarafında 301 yönlendirmesidir.' },
      { s: 'Tarayıcımda neden farklı bir sonuç görüyorum?', c: 'Yönlendirmeler tarayıcı kimliğine, ülkeye, dile, çerezlere ya da önbelleğe göre değişebilir. Tarayıcınız daha önceki bir 301\'i ya da HSTS kuralını da hatırlıyor olabilir. Araç istekleri sunucudan, bot kimliğiyle ve çerezsiz gönderir; bu, arama motoru botlarının gördüğüne daha yakındır. CDN ya da güvenlik duvarı bot isteklerine farklı davranabilir.' },
      { s: 'Sınırlar neler?', c: 'Bir seferde en fazla 10 adres, adres başına en fazla 10 adım ve dakikada yaklaşık 30 adres. Güvenlik nedeniyle özel ya da iç ağ adresleri hiçbir zaman kontrol edilmez. Binlerce adres için liste modunda bir tarama aracı kullanın; kuralları [301 yönlendirme oluşturucuyla](/yonlendirme-olusturucu) üretin.' },
    ],
  }

  const seviyeRozeti = (s) => {
    const r = SEVIYE_RENK[s]
    return <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: r.renk, fontWeight: 700, fontSize: '13px' }}><span aria-hidden="true" style={{ width: '18px', height: '18px', borderRadius: '50%', background: r.renk, color: '#fff', fontSize: '11px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{r.isaret}</span>{seviyeAd(s)}</span>
  }

  // Bileşen değil, düz fonksiyon: her çizimde yeniden bağlanıp <details> durumunu kaybetmesin
  const sonucGoster = (r, acik, key) => {
    if (!r.sonuc) {
      return <div key={key} role="alert" style={{ border: '1px solid #fecaca', background: '#fef2f2', borderRadius: '10px', padding: '12px 14px', fontSize: '13.5px', color: '#b91c1c', overflowWrap: 'anywhere' }}><strong>{kisaUrl(r.istenen)}</strong> · {r.hata}</div>
    }
    const s = r.sonuc
    const yonSayisi = s.adimlar.filter(a => yonlendirmeMi(a.durum) && a.sonraki).length
    const seviye = genelSeviye(r.bulgular)
    const o = oneriler(s, r.bulgular)
    return (
      <details key={key} open={acik} style={{ border: '1px solid #eee', borderRadius: '12px', background: '#fff' }}>
        <summary style={{ cursor: 'pointer', padding: '12px 14px' }}>
          <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px 14px', alignItems: 'center', verticalAlign: 'middle', width: 'calc(100% - 24px)' }}>
            <span style={{ fontFamily: MONO, fontSize: '13px', color: '#111', overflowWrap: 'anywhere', flex: '1 1 240px' }}>{kisaUrl(s.baslangic)}</span>
            {seviyeRozeti(seviye)}
            <span style={{ fontSize: '12.5px', color: '#555' }}>{t(`${yonSayisi} yönlendirme`, `${yonSayisi} redirect${yonSayisi === 1 ? '' : 's'}`)} · {s.toplamSureMs} ms</span>
            {s.sonDurum != null && <Rozet kod={s.sonDurum} />}
          </span>
        </summary>
        <div style={{ padding: '4px 14px 16px', display: 'grid', gap: '16px' }}>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }} aria-label={t('Yönlendirme adımları', 'Redirect hops')}>
            {s.adimlar.map((a, i) => {
              const sonAdim = i === s.adimlar.length - 1
              const etiketler = a.sonraki ? turEtiketleri(a.url, a.sonraki) : []
              return (
                <li key={i} style={{ position: 'relative', paddingLeft: '34px', paddingBottom: sonAdim ? 0 : '14px' }}>
                  {!sonAdim && <span aria-hidden="true" style={{ position: 'absolute', left: '11px', top: '24px', bottom: 0, width: '2px', background: '#e5e7eb' }} />}
                  <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '1px', width: '24px', height: '24px', borderRadius: '50%', background: durumRengi(a.durum).renk, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', alignItems: 'center' }}>
                    {a.durum != null ? <Rozet kod={a.durum} metin={a.durumMetni} /> : <Rozet kod={null} metin={t('yanıt yok', 'no response')} />}
                    {a.sureMs != null && <span style={{ fontSize: '12px', color: '#777', fontVariantNumeric: 'tabular-nums' }}>{a.sureMs} ms · {a.yontem}</span>}
                    {etiketler.map(e => <span key={e} style={{ fontSize: '11.5px', color: '#555', background: '#f5f5f4', borderRadius: '999px', padding: '2px 8px' }}>{e}</span>)}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: '12.5px', color: '#222', marginTop: '4px', overflowWrap: 'anywhere' }}>{a.url}</div>
                  {a.location != null && (
                    <div style={{ fontSize: '12.5px', color: '#666', marginTop: '2px', overflowWrap: 'anywhere' }}>
                      Location: <span style={{ fontFamily: MONO }}>{a.location}</span>
                      {a.sonraki && a.sonraki !== a.location && <span> → <span style={{ fontFamily: MONO }}>{a.sonraki}</span></span>}
                    </div>
                  )}
                  {a.hata && <div style={{ fontSize: '12.5px', color: '#b91c1c', marginTop: '2px' }}>{hataMetni(a.hata, a.detay)}</div>}
                </li>
              )
            })}
          </ol>
          {s.sonUrl && yonSayisi > 0 && (
            <p style={{ margin: 0, fontSize: '13px', color: '#444', overflowWrap: 'anywhere' }}>{t('Son adres', 'Final address')}: <strong style={{ fontFamily: MONO, fontWeight: 600 }}>{s.sonUrl}</strong></p>
          )}

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', margin: '0 0 8px' }}>{t('Bulgular', 'Findings')}</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>
              {r.bulgular.map((b, i) => {
                const c = SEVIYE_RENK[b.seviye]
                return (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: c.zemin, borderRadius: '8px', padding: '8px 12px', fontSize: '13.5px', color: '#333', lineHeight: 1.6, overflowWrap: 'anywhere' }}>
                    <span aria-hidden="true" style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%', background: c.renk, color: '#fff', fontSize: '12px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>{c.isaret}</span>
                    <span><span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{b.seviye === 'hata' ? t('Hata', 'Error') : b.seviye === 'uyari' ? t('Uyarı', 'Warning') : b.seviye === 'iyi' ? t('Tamam', 'OK') : t('Bilgi', 'Info')}. </span>{bulguMetni(b)}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {o.length > 0 && (
            <div style={{ background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '10px', padding: '12px 14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#111', margin: '0 0 6px' }}>{t('Öneriler', 'Recommendations')}</h3>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#333', lineHeight: 1.7, overflowWrap: 'anywhere' }}>
                {o.map((x, i) => <li key={i}>{x}</li>)}
              </ul>
              {(r.bulgular.some(b => b.kod === 'zincir' || b.kod === 'gecici-kalici-gibi' || b.kod === 'son-404')) && (
                <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#555' }}>
                  {t('Sunucu kurallarını hazırlamak için', 'To prepare the server rules, use the')}{' '}
                  <Link href={isEn ? '/en/redirect-generator' : '/yonlendirme-olusturucu'} style={{ color: 'var(--orange)', fontWeight: 600 }}>{t('301 yönlendirme oluşturucuyu kullanın', '301 redirect generator')}</Link>.
                </p>
              )}
            </div>
          )}
        </div>
      </details>
    )
  }

  const yukleniyor = !!durum?.yukleniyor

  return (
    <AracSayfa isEn={isEn} yol="/yonlendirme-zinciri-kontrol" yolEn="/en/redirect-checker" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['site-tasima-seo', 'teknik-seo', 'seo-raporlama']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div role="radiogroup" aria-label={t('Kontrol türü', 'Check type')} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[['tek', t('Tek adres', 'Single address')], ['toplu', t(`Toplu (en fazla ${EN_FAZLA_ADRES})`, `Bulk (up to ${EN_FAZLA_ADRES})`)]].map(([id, ad]) => (
            <button key={id} type="button" role="radio" aria-checked={mod === id} onClick={() => setMod(id)}
              style={{ ...F.ikincil, ...(mod === id ? { background: 'var(--orange)', color: '#fff', borderColor: 'var(--orange)' } : {}) }}>{ad}</button>
          ))}
        </div>

        {mod === 'tek' ? (
          <div>
            <label htmlFor="yk-url" style={F.etiket}>{t('Adres', 'Address')}</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input id="yk-url" value={url} onChange={ev => setUrl(ev.target.value)} onKeyDown={ev => { if (ev.key === 'Enter' && !yukleniyor) kontrolEt() }}
                placeholder="http://ornek.com/eski-sayfa" inputMode="url" style={{ ...F.girdi, flex: '1 1 260px', width: 'auto' }} />
              <button type="button" onClick={kontrolEt} style={F.buton} disabled={yukleniyor}>{yukleniyor ? t('Kontrol ediliyor…', 'Checking…') : t('Kontrol et', 'Check')}</button>
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="yk-toplu" style={F.etiket}>{t('Adresler (her satıra bir tane)', 'Addresses (one per line)')}</label>
            <textarea id="yk-toplu" value={toplu} onChange={ev => setToplu(ev.target.value)} rows={7} spellCheck={false}
              placeholder={'http://ornek.com/\nhttps://ornek.com/eski-kategori\nornek.com/hakkimizda'}
              style={{ ...F.girdi, fontFamily: MONO, fontSize: '13px', lineHeight: 1.6, resize: 'vertical' }} />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
              <button type="button" onClick={kontrolEt} style={F.buton} disabled={yukleniyor || !topluOku.adresler.length}>{yukleniyor ? t(`Kontrol ediliyor (${durum.sira}/${durum.toplam})…`, `Checking (${durum.sira}/${durum.toplam})…`) : t(`${topluOku.adresler.length} adresi kontrol et`, `Check ${topluOku.adresler.length} address${topluOku.adresler.length === 1 ? '' : 'es'}`)}</button>
              {topluOku.fazla > 0 && <span style={{ fontSize: '12.5px', color: '#b45309' }}>{t(`İlk ${EN_FAZLA_ADRES} adres kontrol edilir, ${topluOku.fazla} adres atlandı.`, `Only the first ${EN_FAZLA_ADRES} addresses are checked; ${topluOku.fazla} skipped.`)}</span>}
              {topluOku.gecersiz.length > 0 && <span style={{ fontSize: '12.5px', color: '#b91c1c', overflowWrap: 'anywhere' }}>{t('Geçersiz satır', 'Invalid line')}: {topluOku.gecersiz.slice(0, 3).join(', ')}{topluOku.gecersiz.length > 3 ? '…' : ''}</span>}
            </div>
          </div>
        )}
        {durum?.hata && <p role="alert" style={{ color: '#b91c1c', fontSize: '13px', margin: 0 }}>{durum.hata}</p>}
        <p style={{ color: '#888', fontSize: '12.5px', margin: 0 }}>{t(`Adres başına en fazla ${EN_FAZLA_ADIM} adım izlenir. İstekler sunucumuzdan bot kimliğiyle ve çerezsiz gönderilir; özel ve iç ağ adresleri kontrol edilmez.`, `Up to ${EN_FAZLA_ADIM} hops are followed per address. Requests are sent from our server with a bot user agent and no cookies; private and internal network addresses are not checked.`)}</p>

        <div aria-live="polite" style={{ display: 'grid', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: 0 }}>{t('Sonuç', 'Result')}{ornekMi ? t(' (örnek)', ' (sample)') : sonuclar.length > 1 ? ` (${sonuclar.length})` : ''}</h2>
            {!ornekMi && sonuclar.length > 1 && !yukleniyor && <button type="button" onClick={csvIndir} style={F.ikincil}>{t('CSV indir', 'Download CSV')}</button>}
          </div>
          {ornekMi && <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{t('Aşağıda örnek bir zincir gösteriliyor. Kendi adresinizi yazıp Kontrol et\'e basın.', 'Below is a sample chain. Enter your own address and press Check.')}</p>}

          {!ornekMi && sonuclar.length > 1 && (
            <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '13px', minWidth: '560px' }}>
                <thead>
                  <tr style={{ background: '#faf9f7' }}>
                    {[t('Adres', 'Address'), t('Durum zinciri', 'Status chain'), t('Sonuç', 'Result')].map(b => <th key={b} scope="col" style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid #eee' }}>{b}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {sonuclar.map((r, i) => (
                    <tr key={i}>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6', fontFamily: MONO, fontSize: '12.5px', overflowWrap: 'anywhere' }}>{kisaUrl(r.istenen)}</td>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6' }}>
                        {r.sonuc ? <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>{r.sonuc.adimlar.map((a, j) => <span key={j} style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>{j > 0 && <span aria-hidden="true" style={{ color: '#bbb' }}>→</span>}<Rozet kod={a.durum} /></span>)}</span> : <span style={{ color: '#b91c1c' }}>{r.hata}</span>}
                      </td>
                      <td style={{ padding: '8px 10px', borderBottom: '1px solid #f0ece6' }}>{r.sonuc ? seviyeRozeti(genelSeviye(r.bulgular)) : seviyeRozeti('hata')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {gosterilen.map((r, i) => sonucGoster(r, gosterilen.length === 1 || i === 0, `${r.istenen}-${i}`))}
        </div>

        <p style={{ fontSize: '12.5px', color: '#666', margin: 0, lineHeight: 1.6 }}>
          {t('Rozet renkleri: yeşil 2xx (başarılı), mavi 301 ve 308 (kalıcı), sarı 302, 303 ve 307 (geçici), kırmızı 4xx ve 5xx (hata). HEAD isteğini desteklemeyen sunucularda araç aynı adresi GET ile yeniden dener.', 'Badge colours: green 2xx (success), blue 301 and 308 (permanent), amber 302, 303 and 307 (temporary), red 4xx and 5xx (error). For servers that do not support HEAD, the tool retries the same address with GET.')}
        </p>
      </div>
    </AracSayfa>
  )
}
