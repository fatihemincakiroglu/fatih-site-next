import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { BOTLAR, ayristir, test, ORNEK_ROBOTS } from '../../lib/robots-test'

// robots.txt test aracı — kurallar tarayıcıda, Google'ın yorumuna göre değerlendirilir.
// TR: /robots-txt-test   EN: /en/robots-txt-tester

const VARSAYILAN_BOTLAR = ['googlebot', 'googlebot-image', 'bingbot', 'gptbot', 'oai-searchbot', 'claudebot', 'perplexitybot', 'google-extended']
const ORNEK_URL = '/\n/hesabim/giris\n/hesabim/siparisler\n/kategori/ayakkabi?siralama=fiyat\n/ozel-gorseller/kampanya.jpg\n/robots-txt'

export default function RobotsTxtTest(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const t = (tr, en) => (isEn ? en : tr)
  const [robots, setRobots] = useState(ORNEK_ROBOTS)
  const [urller, setUrller] = useState(ORNEK_URL)
  const [secili, setSecili] = useState(VARSAYILAN_BOTLAR)
  const [ozel, setOzel] = useState('')
  const [site, setSite] = useState('')
  const [getirDurum, setGetirDurum] = useState(null)

  const ayrik = useMemo(() => ayristir(robots), [robots])
  const botlar = useMemo(() => {
    const l = BOTLAR.filter(b => secili.includes(b.id)).map(b => ({ id: b.id, ad: b.ad, not: b.not }))
    const o = ozel.trim().toLowerCase().replace(/[^a-z0-9._-]/g, '')
    if (o && !l.some(b => b.id === o)) l.push({ id: o, ad: ozel.trim() })
    return l
  }, [secili, ozel])
  const satirlar = useMemo(() => urller.split(/\r?\n/).map(s => s.trim()).filter(Boolean).slice(0, 100), [urller])
  const sonuc = useMemo(() => satirlar.map(u => ({ url: u, hucre: botlar.map(b => test(ayrik, b.id, u)) })), [satirlar, botlar, ayrik])

  const getir = async () => {
    if (!site.trim()) return
    setGetirDurum({ yukleniyor: true })
    try {
      const r = await fetch(`/api/robots-getir?site=${encodeURIComponent(site.trim())}`)
      const j = await r.json()
      if (r.status === 429) return setGetirDurum({ hata: t('Çok fazla istek. Bir dakika sonra tekrar deneyin.', 'Too many requests. Try again in a minute.') })
      if (!j.ok) return setGetirDurum({ hata: t('robots.txt getirilemedi. Adresi kontrol edin ya da içeriği elle yapıştırın.', 'Could not fetch robots.txt. Check the address or paste the content manually.') })
      if (j.status >= 400 && j.status < 500) { setRobots(''); return setGetirDurum({ bilgi: t(`${j.url} → HTTP ${j.status}. Google, 4xx yanıtında robots.txt yokmuş gibi davranır: tüm site taranabilir.`, `${j.url} → HTTP ${j.status}. Google treats a 4xx response as if there were no robots.txt: the whole site can be crawled.`) }) }
      if (j.status >= 500) return setGetirDurum({ hata: t(`${j.url} → HTTP ${j.status}. Google, sunucu hatasında siteyi geçici olarak tamamen engelli sayar; uzun sürerse önbellekteki son kopyayı kullanır.`, `${j.url} → HTTP ${j.status}. On server errors Google temporarily treats the whole site as disallowed and may later fall back to its last cached copy.`) })
      setRobots(j.metin)
      setGetirDurum({ bilgi: t(`${j.url} getirildi (HTTP ${j.status}).`, `Fetched ${j.url} (HTTP ${j.status}).`) })
    } catch {
      setGetirDurum({ hata: t('Bağlantı hatası.', 'Connection error.') })
    }
  }

  const uyariMetni = (u) => {
    const s = u.satir ? `${t('Satır', 'Line')} ${u.satir}: ` : ''
    switch (u.kod) {
      case 'boyut': return t(`Dosya ${Math.round(u.bayt / 1024)} KiB. Google 500 KiB'tan sonrasını okumaz.`, `File is ${Math.round(u.bayt / 1024)} KiB. Google ignores everything after 500 KiB.`)
      case 'bicim': return s + t(`"alan: değer" biçiminde değil, yok sayılır.`, `not in "field: value" format; ignored.`)
      case 'yazim': return s + t(`"${u.alan}" yazım hatası; "${u.dogru}" olarak yorumlandı. Düzeltin.`, `"${u.alan}" is misspelled; read as "${u.dogru}". Fix it.`)
      case 'desteklenmiyor': return s + t(`"${u.alan}" Google tarafından desteklenmez (ör. crawl-delay, noindex). Başka arama motorları farklı davranabilir.`, `"${u.alan}" is not supported by Google (e.g. crawl-delay, noindex). Other engines may behave differently.`)
      case 'bilinmeyen': return s + t(`"${u.alan}" bilinmeyen bir alan; yok sayılır.`, `"${u.alan}" is an unknown field; ignored.`)
      case 'sitemap-goreli': return s + t(`Sitemap adresi tam URL olmalı (https:// ile).`, `Sitemap must be a full URL (with https://).`)
      case 'ajansiz-kural': return s + t(`Kural bir User-agent satırından önce geliyor; hiçbir tarayıcıya uygulanmaz.`, `Rule appears before any User-agent line; it applies to no crawler.`)
      case 'yol-bicimi': return s + t(`Yol "/" ya da "*" ile başlamalı ("${u.deger}").`, `Path should start with "/" or "*" ("${u.deger}").`)
      case 'tumu-engelli': return s + t(`"User-agent: *" için "Disallow: /" var: bu kurala uyan tüm tarayıcılar sitenin tamamını tarayamaz. Bilerek mi?`, `"Disallow: /" for "User-agent: *": every crawler that follows this group is blocked from the whole site. Intended?`)
      default: return s + u.kod
    }
  }
  const botNotu = (b) => {
    if (b.not === 'kontrol') return t('Ayrı bir tarayıcı değil, kontrol belirtecidir: tarama ana tarayıcıyla yapılır; bu kural içeriğin yapay zekâ modellerinde kullanımını belirler.', 'Not a separate crawler but a control token: crawling is done by the main crawler; this rule governs use of content in AI models.')
    if (b.not === 'yildiz-yok') return t('"*" grubunu yok sayar; yalnızca adıyla anılırsa engellenir.', 'Ignores the "*" group; only blocked when named explicitly.')
    if (b.not === 'kullanici') return t('Kullanıcı isteğiyle çalışır; OpenAI dokümanına göre robots.txt kuralları uygulanmayabilir.', 'User-initiated; per OpenAI docs, robots.txt rules may not apply.')
    return null
  }

  const icerik = isEn ? {
    baslik: 'robots.txt Tester',
    metaBaslik: 'robots.txt Tester | Free SEO Tool',
    metaDesc: 'Check which URLs are blocked or allowed for Googlebot, Bingbot, GPTBot, ClaudeBot and PerplexityBot. Follows Google\'s rules and flags errors.',
    giris: 'Paste a robots.txt file (or fetch it from a site), list URLs, and see which crawler can access each one, and which rule decides it. Matching follows Google\'s documented rules. For the background, read the [robots.txt guide](/en/robots-txt) and the [crawl budget article](/en/crawl-butcesi).',
    adimlar: [
      'Enter a domain and press **Fetch**, or paste your robots.txt content (for example a draft you have not published yet).',
      'List the URLs to test, one per line. Full URLs or paths both work.',
      'Pick the crawlers. Add any other user-agent token in the custom field.',
      'Read the table: each cell shows allowed or blocked and the line number of the deciding rule. Fix the warnings below the table before publishing.',
    ],
    sss: [
      { s: 'Does blocking a URL in robots.txt remove it from Google?', c: 'No. robots.txt controls crawling, not indexing. A blocked URL can still be indexed without its content if other pages link to it. To keep a page out of the index, allow crawling and use a noindex tag; see the [technical SEO guide](/en/teknik-seo).' },
      { s: 'Which rule wins when Allow and Disallow both match?', c: 'Google applies the most specific rule, meaning the longest matching path. If an Allow and a Disallow rule are equally long, the less restrictive one (Allow) wins. The tool shows the deciding rule for each URL.' },
      { s: 'Should I block AI crawlers like GPTBot or ClaudeBot?', c: 'It is a business decision. Blocking training crawlers keeps content out of future model training but does not necessarily remove you from AI answers that use search. The [GEO implementation guide](/en/geo-uygulama) explains the trade-offs.' },
      { s: 'Is this tool identical to Google\'s parser?', c: 'It follows Google\'s documented rules (groups, the most specific user-agent, longest match, wildcards, the 500 KiB limit), but it is not Google\'s own code. For critical changes, also check the robots.txt report in Search Console.' },
    ],
  } : {
    baslik: 'robots.txt Test Aracı',
    metaBaslik: 'robots.txt Test Aracı | Ücretsiz SEO Aracı',
    metaDesc: 'URL\'lerin Googlebot, Bingbot, GPTBot, ClaudeBot ve PerplexityBot için engelli mi açık mı olduğunu test edin. Hatalar ayrıca gösterilir.',
    giris: 'robots.txt dosyanızı yapıştırın ya da siteden getirin, URL\'leri listeleyin: hangi tarayıcının hangi sayfaya erişebildiğini ve kararı hangi kuralın verdiğini görün. Eşleştirme Google\'ın belgelenmiş kurallarına göre yapılır. Arka planı [robots.txt rehberi](/robots-txt) ve [tarama bütçesi yazısında](/crawl-butcesi) anlattım.',
    adimlar: [
      'Alan adını yazıp **Getir**\'e basın ya da robots.txt içeriğini yapıştırın (yayınlamadığınız bir taslağı da test edebilirsiniz).',
      'Test edilecek URL\'leri her satıra bir tane yazın. Tam adres ya da yalnızca yol yazabilirsiniz.',
      'Tarayıcıları seçin. Listede olmayan bir user-agent için özel alanı kullanın.',
      'Tabloyu okuyun: her hücre izin/engel durumunu ve kararı veren kuralın satır numarasını gösterir. Yayından önce tablonun altındaki uyarıları düzeltin.',
    ],
    sss: [
      { s: 'robots.txt ile engellediğim sayfa Google\'dan silinir mi?', c: 'Hayır. robots.txt taramayı kontrol eder, dizine eklemeyi değil. Engellenen bir URL, başka sayfalardan link alıyorsa içeriği okunmadan dizinde kalabilir. Bir sayfayı dizin dışında tutmak için taramaya izin verip noindex etiketi kullanın; ayrıntısı [teknik SEO rehberinde](/teknik-seo).' },
      { s: 'Allow ve Disallow aynı anda eşleşirse hangisi geçerli olur?', c: 'Google en özel kuralı, yani en uzun eşleşen yolu uygular. Allow ve Disallow kuralları eşit uzunluktaysa daha az kısıtlayıcı olan (Allow) kazanır. Araç her URL için kararı veren kuralı gösterir.' },
      { s: 'GPTBot, ClaudeBot gibi yapay zekâ botlarını engellemeli miyim?', c: 'Bu bir iş kararı. Eğitim amaçlı botları engellemek içeriğinizi gelecekteki model eğitiminden çıkarır ama aramayı kullanan yapay zekâ cevaplarından mutlaka çıkarmaz. Artı ve eksileri [GEO uygulama rehberinde](/geo-uygulama) anlattım.' },
      { s: 'Bu araç Google\'ın ayrıştırıcısıyla birebir aynı mı?', c: 'Google\'ın belgelenmiş kurallarını izler (gruplar, en özel user-agent, en uzun eşleşme, joker karakterler, 500 KiB sınırı) ama Google\'ın kendi kodu değildir. Kritik değişikliklerde Search Console\'daki robots.txt raporunu da kontrol edin.' },
    ],
  }

  const hucreStil = (izin) => ({ padding: '8px 10px', borderBottom: '1px solid #f0ece6', textAlign: 'center', fontSize: '13px', fontWeight: 700, color: izin ? '#15803d' : '#b91c1c', background: izin ? '#f0fdf4' : '#fef2f2', whiteSpace: 'nowrap' })

  return (
    <AracSayfa isEn={isEn} yol="/robots-txt-test" yolEn="/en/robots-txt-tester" baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc}
      giris={icerik.giris} adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['teknik-seo', 'site-tasima-seo', 'geo-uygulama']}>
      <div style={{ display: 'grid', gap: '18px' }}>
        <div>
          <label htmlFor="rb-site" style={F.etiket}>{t('Siteden getir (isteğe bağlı)', 'Fetch from a site (optional)')}</label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input id="rb-site" value={site} onChange={e => setSite(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') getir() }}
              placeholder="ornek.com" style={{ ...F.girdi, flex: '1 1 220px', width: 'auto' }} />
            <button type="button" onClick={getir} style={F.buton} disabled={getirDurum?.yukleniyor}>{getirDurum?.yukleniyor ? t('Getiriliyor…', 'Fetching…') : t('Getir', 'Fetch')}</button>
          </div>
          {getirDurum?.hata && <p role="alert" style={{ color: '#b91c1c', fontSize: '13px', margin: '6px 0 0' }}>{getirDurum.hata}</p>}
          {getirDurum?.bilgi && <p role="status" style={{ color: '#15803d', fontSize: '13px', margin: '6px 0 0' }}>{getirDurum.bilgi}</p>}
        </div>

        <div className="rb-izgara" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '16px' }}>
          <div>
            <label htmlFor="rb-metin" style={F.etiket}>robots.txt</label>
            <textarea id="rb-metin" value={robots} onChange={e => setRobots(e.target.value)} spellCheck={false} rows={14}
              style={{ ...F.girdi, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: '13px', lineHeight: 1.6, resize: 'vertical' }} />
          </div>
          <div>
            <label htmlFor="rb-url" style={F.etiket}>{t('Test edilecek URL\'ler (her satıra bir)', 'URLs to test (one per line)')}</label>
            <textarea id="rb-url" value={urller} onChange={e => setUrller(e.target.value)} spellCheck={false} rows={14}
              style={{ ...F.girdi, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', fontSize: '13px', lineHeight: 1.6, resize: 'vertical' }} />
          </div>
        </div>

        <fieldset style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 14px', margin: 0 }}>
          <legend style={{ ...F.etiket, padding: '0 6px', marginBottom: 0 }}>{t('Tarayıcılar', 'Crawlers')}</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 14px' }}>
            {BOTLAR.map(b => (
              <label key={b.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', color: '#333', cursor: 'pointer' }}>
                <input type="checkbox" checked={secili.includes(b.id)} onChange={e => setSecili(s => e.target.checked ? [...s, b.id] : s.filter(x => x !== b.id))} />
                {b.ad} <span style={{ color: '#aaa', fontSize: '12px' }}>{b.grup}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: '10px', maxWidth: '320px' }}>
            <label htmlFor="rb-ozel" style={{ ...F.etiket, fontWeight: 500 }}>{t('Özel user-agent', 'Custom user-agent')}</label>
            <input id="rb-ozel" value={ozel} onChange={e => setOzel(e.target.value)} placeholder="ör. SemrushBot" style={F.girdi} />
          </div>
        </fieldset>

        <div aria-live="polite">
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 10px' }}>{t('Sonuç', 'Result')}</h2>
          {satirlar.length === 0 || botlar.length === 0 ? (
            <p style={{ color: '#888', fontSize: '14px' }}>{t('En az bir URL ve bir tarayıcı seçin.', 'Add at least one URL and pick a crawler.')}</p>
          ) : (
            <div style={{ overflowX: 'auto', border: '1px solid #eee', borderRadius: '10px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: `${220 + botlar.length * 110}px` }}>
                <thead>
                  <tr style={{ background: '#faf9f7' }}>
                    <th scope="col" style={{ textAlign: 'left', padding: '10px', fontSize: '13px', borderBottom: '1px solid #eee' }}>URL</th>
                    {botlar.map(b => <th key={b.id} scope="col" title={botNotu(b) || ''} style={{ padding: '10px 8px', fontSize: '12.5px', borderBottom: '1px solid #eee', whiteSpace: 'nowrap' }}>{b.ad}{botNotu(b) ? ' *' : ''}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {sonuc.map((r, i) => (
                    <tr key={i}>
                      <th scope="row" style={{ textAlign: 'left', padding: '8px 10px', fontSize: '13px', fontWeight: 500, color: '#333', borderBottom: '1px solid #f0ece6', fontFamily: 'ui-monospace, Menlo, Consolas, monospace', wordBreak: 'break-all', minWidth: '180px' }}>{r.url}</th>
                      {r.hucre.map((h, j) => h.gecersiz ? (
                        <td key={j} style={{ ...hucreStil(true), color: '#888', background: '#fff' }}>{t('geçersiz', 'invalid')}</td>
                      ) : (
                        <td key={j} style={hucreStil(h.izin)} title={h.kural ? `${h.kural.tip}: ${h.kural.yol}` : ''}>
                          {h.izin ? t('✓ İzin', '✓ Allowed') : t('✗ Engelli', '✗ Blocked')}
                          <div style={{ fontSize: '11px', fontWeight: 500, color: '#777', marginTop: '2px' }}>
                            {h.kural ? `${t('satır', 'line')} ${h.kural.satir}` : h.sebep === 'robots' ? 'robots.txt' : h.secim?.yildizYok ? t('* yok sayılır', '* ignored') : t('kural yok', 'no rule')}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {botlar.some(botNotu) && (
            <ul style={{ margin: '10px 0 0', paddingLeft: '18px', fontSize: '12.5px', color: '#666', lineHeight: 1.6 }}>
              {botlar.filter(botNotu).map(b => <li key={b.id}><strong>{b.ad} *</strong> {botNotu(b)}</li>)}
            </ul>
          )}
        </div>

        {(ayrik.uyarilar.length > 0 || ayrik.siteHaritalari.length > 0) && (
          <div style={{ display: 'grid', gap: '10px' }}>
            {ayrik.uyarilar.length > 0 && (
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px 14px' }}>
                <div style={{ fontWeight: 800, color: '#b45309', fontSize: '14px', marginBottom: '6px' }}>{t('Uyarılar', 'Warnings')} ({ayrik.uyarilar.length})</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: '#444', lineHeight: 1.7 }}>
                  {ayrik.uyarilar.map((u, i) => <li key={i}>{uyariMetni(u)}</li>)}
                </ul>
              </div>
            )}
            {ayrik.siteHaritalari.length > 0 && (
              <p style={{ fontSize: '13.5px', color: '#555', margin: 0 }}>
                <strong>{t('Site haritaları:', 'Sitemaps:')}</strong> {ayrik.siteHaritalari.map(s => s.url).join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: '@media (max-width: 760px){.rb-izgara{grid-template-columns:minmax(0,1fr)!important}}' }} />
    </AracSayfa>
  )
}
