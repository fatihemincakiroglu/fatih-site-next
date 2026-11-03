import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { HAZIR, olustur } from '../../lib/utm'

// UTM link oluşturucu — tamamen tarayıcıda çalışır.
// TR: /araclar/utm-olusturucu   EN: /en/tools/utm-builder

const ALAN_BILGI = [
  { k: 'utm_source', tr: 'Kaynak (utm_source)', en: 'Source (utm_source)', ornek: 'instagram, newsletter, google', zorunlu: true },
  { k: 'utm_medium', tr: 'Araç (utm_medium)', en: 'Medium (utm_medium)', ornek: 'social, email, cpc, referral', zorunlu: true },
  { k: 'utm_campaign', tr: 'Kampanya (utm_campaign)', en: 'Campaign (utm_campaign)', ornek: 'kasim-indirimi-2026' },
  { k: 'utm_id', tr: 'Kampanya kimliği (utm_id)', en: 'Campaign ID (utm_id)', ornek: 'k2026-11' },
  { k: 'utm_term', tr: 'Terim (utm_term)', en: 'Term (utm_term)', ornek: 'seo-danismani' },
  { k: 'utm_content', tr: 'İçerik (utm_content)', en: 'Content (utm_content)', ornek: 'hikaye-1, banner-ust' },
]

export default function UtmOlusturucu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [urller, setUrller] = useState('https://www.ornek.com/kampanya')
  const [d, setD] = useState({ utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'kasim-indirimi-2026', utm_id: '', utm_term: '', utm_content: '' })
  const [ayar, setAyar] = useState({ kucukHarf: true, bosluk: '-', ascii: true })
  const [kopya, setKopya] = useState(-1)

  const tabanlar = useMemo(() => urller.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 50), [urller])
  const sonuclar = useMemo(() => tabanlar.map(u => olustur(u, d, ayar)), [tabanlar, d, ayar])
  const ilk = sonuclar[0]
  const ortakUyari = ilk?.uyarilar || []

  const kopyala = async (metin, i) => { try { await navigator.clipboard.writeText(metin); setKopya(i); setTimeout(() => setKopya(-1), 1800) } catch {} }
  const uyariMetni = (u) => {
    switch (u.kod) {
      case 'kampanya-yok': return t('utm_campaign boş. Zorunlu değil ama raporda kampanyaları ayırt etmek için önerilir.', 'utm_campaign is empty. Optional, but recommended to tell campaigns apart in reports.')
      case 'buyuk-harf': return t(`${u.alan} büyük harf içeriyor. GA4 büyük/küçük harfe duyarlıdır; "Instagram" ve "instagram" ayrı kaynak sayılır.`, `${u.alan} contains capitals. GA4 is case-sensitive; "Instagram" and "instagram" count as different sources.`)
      case 'bosluk': return t(`${u.alan} boşluk içeriyor; linkte %20 olarak görünür.`, `${u.alan} contains spaces; they show up as %20 in the link.`)
      case 'turkce': return t(`${u.alan} Türkçe karakter içeriyor. GA4 doğru gösterir ama link kodlanmış ve uzun görünür.`, `${u.alan} has Turkish characters. GA4 shows them correctly, but the link looks encoded and long.`)
      case 'mevcut-utm': return t(`Adreste zaten ${u.alanlar.join(', ')} var; yeni değerlerle değiştirildi.`, `The URL already had ${u.alanlar.join(', ')}; replaced with the new values.`)
      case 'google-ads': return t('Google Ads için UTM yerine otomatik etiketleme (gclid) önerilir; ikisi birlikte kullanılırsa ayarlara dikkat edin.', 'For Google Ads, auto-tagging (gclid) is recommended over UTMs; if you use both, check your settings.')
      default: return u.kod
    }
  }

  const icerik = isEn ? {
    baslik: 'UTM Link Builder',
    metaBaslik: 'UTM Builder: Campaign URLs for Google Analytics 4',
    metaDesc: 'Build consistent UTM-tagged campaign links for GA4 in seconds. Presets for Instagram, email and WhatsApp, lowercase and character clean-up, bulk URLs.',
    giris: 'Add UTM parameters to campaign links so Google Analytics 4 shows exactly which post, email or ad brought each visit. The tool keeps naming consistent (lowercase, no spaces, no special characters) and estimates the GA4 channel. For setting up the reports, see the [GA4 SEO tracking article](/en/blog/ga4-seo-takibi).',
    adimlar: [
      'Paste the page URL. To tag several pages with the same campaign, put one URL per line.',
      'Pick a preset or fill in source and medium (both required) and a campaign name. Use utm_content to tell apart variants in the same campaign, such as two stories or two buttons.',
      'Leave the clean-up options on: GA4 treats "Instagram" and "instagram" as different sources, and consistent names keep reports clean.',
      'Copy the link and use it only in external places (social posts, emails, ads, QR codes). Never put UTMs on links between pages of your own site.',
    ],
    sss: [
      { s: 'Why should I not use UTMs on internal links?', c: 'A UTM on an internal link makes GA4 attribute the visit to that campaign instead of the real source, such as organic search. Your SEO and ad numbers then look worse than they are. Use UTMs only on links that bring people to your site from outside.' },
      { s: 'Which parameters are required?', c: 'utm_source and utm_medium tell GA4 where the visit came from and through which channel; utm_campaign is strongly recommended. utm_term and utm_content are optional details.' },
      { s: 'Which medium should I use so GA4 puts the traffic in the right channel?', c: 'GA4\'s default channel group uses the medium and source. For example "email" goes to Email, "social" to Organic Social, and a paid medium such as "cpc" or "paid_social" with a social source to Paid Social. The tool shows an estimate; check the final channel in your GA4 reports.' },
      { s: 'Do UTMs affect SEO?', c: 'Not directly, because you use them on external links. If a UTM link gets crawled, use a canonical tag on the page so Google indexes the clean URL. The [technical SEO guide](/en/guides/teknik-seo) explains canonicals.' },
    ],
  } : {
    baslik: 'UTM Link Oluşturucu',
    metaBaslik: 'UTM Oluşturucu: GA4 İçin Kampanya Linki Hazırlama',
    metaDesc: 'GA4 için tutarlı UTM kampanya linklerini saniyeler içinde oluşturun. Instagram, e-posta, WhatsApp hazır ayarları, küçük harf ve karakter düzeltme, toplu URL.',
    giris: 'Kampanya linklerinize UTM parametreleri ekleyin; Google Analytics 4 hangi gönderinin, e-postanın ya da reklamın ziyaret getirdiğini tam olarak göstersin. Araç adlandırmayı tutarlı tutar (küçük harf, boşluksuz, Türkçe karaktersiz) ve GA4 kanalını tahmin eder. Raporların kurulumu için [GA4\'te SEO takibi yazısına](/blog/ga4-seo-takibi) bakın.',
    adimlar: [
      'Sayfa adresini yapıştırın. Aynı kampanyayla birden fazla sayfayı etiketlemek için her satıra bir URL yazın.',
      'Hazır ayarlardan birini seçin ya da kaynak ve aracı (ikisi zorunlu) ve kampanya adını doldurun. Aynı kampanyadaki farklı sürümleri (iki hikâye, iki buton) ayırmak için utm_content kullanın.',
      'Düzeltme seçeneklerini açık bırakın: GA4 "Instagram" ile "instagram"ı ayrı kaynak sayar; tutarlı adlar raporları temiz tutar.',
      'Linki kopyalayın ve yalnızca dış kanallarda (sosyal medya gönderisi, e-posta, reklam, QR kod) kullanın. Kendi sitenizin sayfaları arasındaki linklere asla UTM eklemeyin.',
    ],
    sss: [
      { s: 'Site içi linklerde neden UTM kullanmamalıyım?', c: 'Site içi bir linkteki UTM, GA4\'ün ziyareti gerçek kaynağı (ör. organik arama) yerine o kampanyaya yazmasına yol açar. SEO ve reklam rakamlarınız olduğundan kötü görünür. UTM\'yi yalnızca dışarıdan sitenize gelen linklerde kullanın.' },
      { s: 'Hangi parametreler zorunlu?', c: 'utm_source ve utm_medium, ziyaretin nereden ve hangi kanalla geldiğini GA4\'e söyler; utm_campaign de kuvvetle önerilir. utm_term ve utm_content isteğe bağlı ayrıntılardır.' },
      { s: 'GA4 trafiği doğru kanala koysun diye medium ne olmalı?', c: 'GA4 varsayılan kanal grubu medium ve source değerlerini kullanır. Örneğin "email" Email\'e, "social" Organic Social\'a, sosyal bir kaynakla "cpc" ya da "paid_social" gibi ücretli bir medium Paid Social\'a gider. Araç bir tahmin gösterir; nihai kanalı GA4 raporlarınızda kontrol edin.' },
      { s: 'UTM SEO\'yu etkiler mi?', c: 'Doğrudan etkilemez, çünkü dış linklerde kullanırsınız. UTM\'li bir link taranırsa sayfadaki canonical etiketi Google\'ın temiz adresi dizine eklemesini sağlar. Canonical ayrıntısı [teknik SEO rehberinde](/rehber/teknik-seo).' },
    ],
  }

  const secenek = (k, deger, etiket) => (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#333', cursor: 'pointer' }}>
      <input type="checkbox" checked={!!ayar[k]} onChange={e => setAyar(a => ({ ...a, [k]: e.target.checked ? deger : (k === 'bosluk' ? '' : false) }))} />{etiket}
    </label>
  )

  return (
    <AracSayfa isEn={isEn} yol="/araclar/utm-olusturucu" yolEn="/en/tools/utm-builder" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['seo-raporlama', 'icerik-stratejisi', 'teknik-seo']}>
      <div style={{ display: 'grid', gap: '16px' }}>
        <div>
          <label htmlFor="utm-url" style={F.etiket}>{t('Sayfa adresi (birden fazlaysa her satıra bir tane)', 'Page URL (one per line for several)')}</label>
          <textarea id="utm-url" value={urller} onChange={e => setUrller(e.target.value)} rows={2} spellCheck={false} style={{ ...F.girdi, resize: 'vertical', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', fontSize: '13px' }} />
        </div>

        <div>
          <div style={F.etiket}>{t('Hazır ayarlar', 'Presets')}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {HAZIR.map(h => (
              <button key={h.id} type="button" onClick={() => setD(x => ({ ...x, utm_source: h.source, utm_medium: h.medium }))}
                style={{ ...F.ikincil, padding: '6px 12px', fontSize: '13px', ...(d.utm_source === h.source && d.utm_medium === h.medium ? { borderColor: 'var(--orange)', color: 'var(--orange)' } : {}) }}>
                {isEn ? h.en : h.tr}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {ALAN_BILGI.map(a => (
            <div key={a.k}>
              <label htmlFor={`utm-${a.k}`} style={F.etiket}>{isEn ? a.en : a.tr}{a.zorunlu && <span style={{ color: '#b91c1c' }}> *</span>}</label>
              <input id={`utm-${a.k}`} value={d[a.k]} onChange={e => setD(x => ({ ...x, [a.k]: e.target.value }))}
                placeholder={a.ornek} style={F.girdi} />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px' }}>
          {secenek('kucukHarf', true, t('Küçük harfe çevir', 'Convert to lowercase'))}
          {secenek('bosluk', '-', t('Boşlukları tireye çevir', 'Replace spaces with hyphens'))}
          {secenek('ascii', true, t('Türkçe karakterleri dönüştür (ş → s)', 'Convert Turkish characters (ş → s)'))}
        </div>

        <div aria-live="polite">
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{sonuclar.length > 1 ? t('Oluşturulan linkler', 'Generated links') : t('Oluşturulan link', 'Generated link')}</h2>
          {sonuclar.length === 0 && <p style={{ color: '#888', fontSize: '14px' }}>{t('Bir sayfa adresi girin.', 'Enter a page URL.')}</p>}
          <div style={{ display: 'grid', gap: '8px' }}>
            {sonuclar.map((r, i) => (
              r.hatalar.length ? (
                <p key={i} role="alert" style={{ margin: 0, padding: '10px 12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13.5px', color: '#b91c1c' }}>
                  {tabanlar[i]}: {r.hatalar.map(h => h === 'url' ? t('tam adres değil (https:// ile başlamalı)', 'not a full URL (must start with https://)') : h === 'source' ? t('utm_source zorunlu', 'utm_source is required') : t('utm_medium zorunlu', 'utm_medium is required')).join(' · ')}
                </p>
              ) : (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
                  <code style={{ flex: 1, minWidth: 0, background: '#1a1612', color: '#f5efe8', padding: '10px 12px', borderRadius: '8px', fontSize: '13px', lineHeight: 1.5, overflowWrap: 'anywhere' }}>{r.url}</code>
                  <button type="button" onClick={() => kopyala(r.url, i)} style={{ ...F.buton, whiteSpace: 'nowrap' }}>{kopya === i ? '✓' : t('Kopyala', 'Copy')}</button>
                </div>
              )
            ))}
          </div>
          {sonuclar.length > 1 && sonuclar.every(r => !r.hatalar.length) && (
            <button type="button" onClick={() => kopyala(sonuclar.map(r => r.url).join('\n'), 999)} style={{ ...F.ikincil, marginTop: '10px' }}>{kopya === 999 ? t('Kopyalandı ✓', 'Copied ✓') : t('Hepsini kopyala', 'Copy all')}</button>
          )}
          {ilk && !ilk.hatalar.length && (
            <p style={{ fontSize: '13.5px', color: '#555', margin: '12px 0 0' }}>
              {t('GA4 varsayılan kanal tahmini:', 'Estimated GA4 default channel:')} <strong>{ilk.kanal}</strong>{' '}
              <span style={{ color: '#999' }}>{t('(kaynak listesine bağlı; raporda doğrulayın)', '(depends on the source list; verify in your reports)')}</span>
            </p>
          )}
          {ortakUyari.length > 0 && (
            <ul style={{ margin: '10px 0 0', paddingLeft: '18px', fontSize: '13.5px', color: '#92400e', lineHeight: 1.7 }}>
              {ortakUyari.map((u, i) => <li key={i}>{uyariMetni(u)}</li>)}
            </ul>
          )}
        </div>
      </div>
    </AracSayfa>
  )
}
