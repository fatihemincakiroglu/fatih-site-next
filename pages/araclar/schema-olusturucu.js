import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import AracSayfa, { formStil as F } from '../../components/AracSayfa'
import { semaUret, uyarilar, jsonLdMetni, ISLETME_TURLERI, GUNLER } from '../../lib/schema-uretici'

// Schema (JSON-LD) oluşturucu — tamamen tarayıcıda çalışır, veri sunucuya gitmez.
// TR: /araclar/schema-olusturucu   EN: /en/tools/schema-generator

const TURLER = [
  { id: 'LocalBusiness', tr: 'Yerel İşletme', en: 'Local Business' },
  { id: 'Organization', tr: 'Kurum (Organization)', en: 'Organization' },
  { id: 'FAQPage', tr: 'SSS (FAQPage)', en: 'FAQ (FAQPage)' },
  { id: 'Article', tr: 'Makale (Article)', en: 'Article' },
]

function Alan({ id, etiket, deger, onChange, tip = 'text', yer, cok = false, ipucu }) {
  return (
    <div>
      <label htmlFor={id} style={F.etiket}>{etiket}</label>
      {cok
        ? <textarea id={id} rows={3} value={deger || ''} placeholder={yer} onChange={e => onChange(e.target.value)} style={{ ...F.girdi, resize: 'vertical' }} />
        : <input id={id} type={tip} value={deger || ''} placeholder={yer} onChange={e => onChange(e.target.value)} style={F.girdi} />}
      {ipucu && <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{ipucu}</div>}
    </div>
  )
}

const izgara = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '14px' }

export default function SchemaOlusturucu(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [tur, setTur] = useState('LocalBusiness')
  const [veri, setVeri] = useState({
    LocalBusiness: { altTur: 'LocalBusiness', il: 'İstanbul', ulke: 'TR', saatler: [{ gunler: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], acilis: '09:00', kapanis: '18:00' }] },
    Organization: {},
    FAQPage: { sorular: [{ s: '', c: '' }, { s: '', c: '' }] },
    Article: { makaleTuru: 'Article' },
  })
  const [kopyalandi, setKopyalandi] = useState(false)
  const d = veri[tur]
  const set = (k) => (v) => setVeri(o => ({ ...o, [tur]: { ...o[tur], [k]: v } }))
  const t = (tr, en) => (isEn ? en : tr)

  const cikti = useMemo(() => jsonLdMetni(semaUret(tur, d)), [tur, d])
  const notlar = useMemo(() => uyarilar(tur, d, isEn), [tur, d, isEn])

  const kopyala = async () => {
    try { await navigator.clipboard.writeText(cikti); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 2000) } catch {}
  }

  const saatGuncelle = (i, alan, deger) => set('saatler')((d.saatler || []).map((s, j) => (j === i ? { ...s, [alan]: deger } : s)))
  const soruGuncelle = (i, alan, deger) => set('sorular')((d.sorular || []).map((q, j) => (j === i ? { ...q, [alan]: deger } : q)))

  const icerik = {
    tr: {
      baslik: 'Schema Oluşturucu (JSON-LD)',
      metaBaslik: 'Schema Oluşturucu: Ücretsiz JSON-LD Aracı | Fatih Emin Çakıroğlu',
      metaDesc: 'LocalBusiness, Organization, FAQPage ve Article için ücretsiz JSON-LD schema oluşturucu. Bilgileri girin, kodu kopyalayın; veriler tarayıcınızdan çıkmaz.',
      giris: 'İşletme türünüzü seçin, bilgileri doldurun; araç sitenize ekleyebileceğiniz JSON-LD kodunu anında üretir. Hangi türün ne işe yaradığını [schema ve yapısal veri rehberinde](/rehber/schema-yapisal-veri) anlattım.',
      adimlar: [
        'Üstten şema türünü seçin. Fiziksel adresi olan işletmeler için **Yerel İşletme**, marka veya şirket için **Kurum** uygundur.',
        'Bilgileri sitenizde ve Google Business Profile\'da göründüğü şekilde, birebir aynı yazımla girin.',
        'Sağdaki kodu kopyalayıp ilgili sayfanın <head> bölümüne ya da sayfa gövdesine ekleyin.',
        'Yayınladıktan sonra Google\'ın Zengin Sonuçlar Testi ve Schema Markup Validator ile kontrol edin.',
      ],
      sss: [
        { s: 'Girdiğim bilgiler bir yere kaydediliyor mu?', c: 'Hayır. Araç tamamen tarayıcınızda çalışır; girdiğiniz bilgiler sunucuya gönderilmez ve kaydedilmez.' },
        { s: 'Schema eklemek sıralamamı yükseltir mi?', c: 'Yapısal veri tek başına bir sıralama garantisi değildir. Arama motorlarının ve yapay zekâ sistemlerinin içeriğinizi doğru anlamasına yardımcı olur ve bazı türler zengin sonuçlara uygun olabilir. Ayrıntılar için [teknik SEO rehberine](/rehber/teknik-seo) bakın.' },
        { s: 'Kodu sitenin neresine eklemeliyim?', c: 'JSON-LD kodu sayfanın <head> veya <body> bölümüne eklenebilir. Yerel işletme ve kurum şeması genellikle ana sayfaya ya da iletişim sayfasına, makale şeması ilgili yazının sayfasına eklenir.' },
        { s: 'WordPress kullanıyorum, yine de gerekir mi?', c: 'SEO eklentileri temel şemaları otomatik üretir; eksik kalan alanları (çalışma saatleri, sameAs bağlantıları gibi) tamamlamak için bu araçtan yararlanabilirsiniz. Eklenti seçimi için [Yoast mu Rank Math mi](/blog/yoast-mu-rank-math-mi) yazısına göz atın.' },
      ],
    },
    en: {
      baslik: 'Schema Generator (JSON-LD)',
      metaBaslik: 'Schema Generator: Free JSON-LD Tool | Fatih Emin Çakıroğlu',
      metaDesc: 'Free JSON-LD schema generator for LocalBusiness, Organization, FAQPage and Article. Fill in the fields and copy the code; your data never leaves the browser.',
      giris: 'Choose your schema type and fill in the details; the tool instantly produces JSON-LD you can add to your site. I explain what each type does in the [schema and structured data guide](/en/guides/schema-yapisal-veri).',
      adimlar: [
        'Pick a schema type at the top. **Local Business** suits businesses with a physical address; **Organization** suits a brand or company.',
        'Enter your details exactly as they appear on your website and Google Business Profile.',
        'Copy the code on the right and add it to the <head> or body of the relevant page.',
        'After publishing, check it with Google\'s Rich Results Test and the Schema Markup Validator.',
      ],
      sss: [
        { s: 'Is the information I enter stored anywhere?', c: 'No. The tool runs entirely in your browser; nothing you type is sent to a server or saved.' },
        { s: 'Will adding schema improve my rankings?', c: 'Structured data is not a ranking guarantee on its own. It helps search engines and AI systems understand your content, and some types can be eligible for rich results. See the [technical SEO guide](/en/guides/teknik-seo) for context.' },
        { s: 'Where should I put the code?', c: 'JSON-LD can go in the page <head> or <body>. Local business and organization markup usually goes on the home or contact page; article markup goes on the article itself.' },
        { s: 'I use WordPress. Do I still need this?', c: 'SEO plugins generate basic schema automatically; you can use this tool to fill gaps such as opening hours or sameAs links. For choosing a plugin, see [Yoast vs Rank Math](/en/blog/yoast-mu-rank-math-mi).' },
      ],
    },
  }[isEn ? 'en' : 'tr']

  return (
    <AracSayfa isEn={isEn} yol="/araclar/schema-olusturucu" yolEn="/en/tools/schema-generator"
      baslik={icerik.baslik} metaBaslik={icerik.metaBaslik} metaDesc={icerik.metaDesc} giris={icerik.giris}
      adimlar={icerik.adimlar} sss={icerik.sss} rehberler={['schema-yapisal-veri', 'yerel-seo', 'teknik-seo']}>

      <div role="tablist" aria-label={t('Şema türü', 'Schema type')} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {TURLER.map(x => (
          <button key={x.id} role="tab" aria-selected={tur === x.id} onClick={() => setTur(x.id)}
            style={{ ...(tur === x.id ? F.buton : F.ikincil), padding: '8px 14px' }}>{isEn ? x.en : x.tr}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: '14px', minWidth: 0 }}>
          {tur === 'LocalBusiness' && (<>
            <div>
              <label htmlFor="s-altTur" style={F.etiket}>{t('İşletme türü', 'Business type')}</label>
              <select id="s-altTur" value={d.altTur} onChange={e => set('altTur')(e.target.value)} style={F.girdi}>
                {ISLETME_TURLERI.map(x => <option key={x.id} value={x.id}>{isEn ? x.en : x.tr} ({x.id})</option>)}
              </select>
            </div>
            <div style={izgara}>
              <Alan id="s-ad" etiket={t('İşletme adı *', 'Business name *')} deger={d.ad} onChange={set('ad')} />
              <Alan id="s-url" etiket={t('Web sitesi', 'Website')} deger={d.url} onChange={set('url')} tip="url" yer="https://" />
              <Alan id="s-tel" etiket={t('Telefon', 'Telephone')} deger={d.telefon} onChange={set('telefon')} tip="tel" yer="+90 212 000 00 00" />
              <Alan id="s-eposta" etiket={t('E-posta', 'Email')} deger={d.eposta} onChange={set('eposta')} tip="email" />
              <Alan id="s-gorsel" etiket={t('Görsel / logo adresi', 'Image / logo URL')} deger={d.gorsel} onChange={set('gorsel')} tip="url" yer="https://" />
              <Alan id="s-fiyat" etiket={t('Fiyat aralığı', 'Price range')} deger={d.fiyat} onChange={set('fiyat')} yer="₺₺" />
            </div>
            <Alan id="s-adres" etiket={t('Sokak adresi', 'Street address')} deger={d.adres} onChange={set('adres')} />
            <div style={izgara}>
              <Alan id="s-ilce" etiket={t('İlçe', 'Locality')} deger={d.ilce} onChange={set('ilce')} yer={t('Kadıköy', 'Kadıköy')} />
              <Alan id="s-il" etiket={t('İl', 'Region')} deger={d.il} onChange={set('il')} />
              <Alan id="s-pk" etiket={t('Posta kodu', 'Postal code')} deger={d.postaKodu} onChange={set('postaKodu')} />
              <Alan id="s-ulke" etiket={t('Ülke kodu', 'Country code')} deger={d.ulke} onChange={set('ulke')} yer="TR" />
              <Alan id="s-enlem" etiket={t('Enlem', 'Latitude')} deger={d.enlem} onChange={set('enlem')} yer="40.9903" />
              <Alan id="s-boylam" etiket={t('Boylam', 'Longitude')} deger={d.boylam} onChange={set('boylam')} yer="29.0277" />
            </div>
            <fieldset style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 14px' }}>
              <legend style={{ ...F.etiket, padding: '0 6px', marginBottom: 0 }}>{t('Çalışma saatleri', 'Opening hours')}</legend>
              {(d.saatler || []).map((s, i) => (
                <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', margin: '8px 0' }}>
                  {GUNLER.map(g => {
                    const secili = s.gunler?.includes(g.id)
                    return (
                      <button key={g.id} type="button" aria-pressed={secili}
                        onClick={() => saatGuncelle(i, 'gunler', secili ? s.gunler.filter(x => x !== g.id) : [...(s.gunler || []), g.id])}
                        style={{ padding: '5px 8px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', border: secili ? '1px solid var(--orange)' : '1px solid #ddd', background: secili ? '#fdf1ea' : '#fff', color: secili ? 'var(--orange)' : '#555', fontWeight: 600 }}>
                        {isEn ? g.en : g.tr}
                      </button>
                    )
                  })}
                  <input aria-label={t('Açılış', 'Opens')} type="time" value={s.acilis} onChange={e => saatGuncelle(i, 'acilis', e.target.value)} style={{ ...F.girdi, width: 'auto' }} />
                  <span aria-hidden="true">–</span>
                  <input aria-label={t('Kapanış', 'Closes')} type="time" value={s.kapanis} onChange={e => saatGuncelle(i, 'kapanis', e.target.value)} style={{ ...F.girdi, width: 'auto' }} />
                  <button type="button" onClick={() => set('saatler')(d.saatler.filter((_, j) => j !== i))} aria-label={t('Satırı sil', 'Remove row')} style={{ ...F.ikincil, padding: '6px 10px' }}>✕</button>
                </div>
              ))}
              <button type="button" onClick={() => set('saatler')([...(d.saatler || []), { gunler: ['Saturday'], acilis: '10:00', kapanis: '16:00' }])} style={{ ...F.ikincil, padding: '6px 12px', fontSize: '13px' }}>
                + {t('Saat satırı ekle', 'Add hours row')}
              </button>
            </fieldset>
            <Alan id="s-aciklama" etiket={t('Kısa açıklama', 'Short description')} deger={d.aciklama} onChange={set('aciklama')} cok />
            <Alan id="s-sameas" etiket={t('Sosyal profiller (her satıra bir adres)', 'Social profiles (one URL per line)')} deger={d.sameAs} onChange={set('sameAs')} cok yer="https://www.instagram.com/..." ipucu={t('Instagram, LinkedIn, Google Haritalar profili gibi resmi hesaplar.', 'Official accounts such as Instagram, LinkedIn or your Google Maps profile.')} />
          </>)}

          {tur === 'Organization' && (<>
            <div style={izgara}>
              <Alan id="o-ad" etiket={t('Kurum / marka adı *', 'Organization name *')} deger={d.ad} onChange={set('ad')} />
              <Alan id="o-resmi" etiket={t('Resmi unvan', 'Legal name')} deger={d.resmiAd} onChange={set('resmiAd')} />
              <Alan id="o-url" etiket={t('Web sitesi', 'Website')} deger={d.url} onChange={set('url')} tip="url" yer="https://" />
              <Alan id="o-logo" etiket={t('Logo adresi', 'Logo URL')} deger={d.logo} onChange={set('logo')} tip="url" yer="https://" />
              <Alan id="o-eposta" etiket={t('E-posta', 'Email')} deger={d.eposta} onChange={set('eposta')} tip="email" />
              <Alan id="o-kurulus" etiket={t('Kuruluş tarihi', 'Founding date')} deger={d.kurulus} onChange={set('kurulus')} tip="date" />
              <Alan id="o-tel" etiket={t('İletişim telefonu', 'Contact phone')} deger={d.telefon} onChange={set('telefon')} tip="tel" />
              <Alan id="o-tur" etiket={t('İletişim türü', 'Contact type')} deger={d.iletisimTuru} onChange={set('iletisimTuru')} yer="customer service" />
            </div>
            <Alan id="o-diller" etiket={t('Hizmet dilleri (her satıra bir dil)', 'Languages (one per line)')} deger={d.diller} onChange={set('diller')} cok yer={'Turkish\nEnglish'} />
            <Alan id="o-aciklama" etiket={t('Kısa açıklama', 'Short description')} deger={d.aciklama} onChange={set('aciklama')} cok />
            <Alan id="o-sameas" etiket={t('Sosyal profiller (her satıra bir adres)', 'Social profiles (one URL per line)')} deger={d.sameAs} onChange={set('sameAs')} cok yer="https://www.linkedin.com/company/..." />
          </>)}

          {tur === 'FAQPage' && (<>
            {(d.sorular || []).map((q, i) => (
              <div key={i} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 14px', display: 'grid', gap: '10px' }}>
                <Alan id={`f-s-${i}`} etiket={`${t('Soru', 'Question')} ${i + 1}`} deger={q.s} onChange={v => soruGuncelle(i, 's', v)} />
                <Alan id={`f-c-${i}`} etiket={t('Cevap', 'Answer')} deger={q.c} onChange={v => soruGuncelle(i, 'c', v)} cok />
                {(d.sorular || []).length > 1 && (
                  <button type="button" onClick={() => set('sorular')(d.sorular.filter((_, j) => j !== i))} style={{ ...F.ikincil, padding: '6px 10px', fontSize: '13px', justifySelf: 'start' }}>{t('Soruyu sil', 'Remove question')}</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => set('sorular')([...(d.sorular || []), { s: '', c: '' }])} style={{ ...F.ikincil, justifySelf: 'start' }}>+ {t('Soru ekle', 'Add question')}</button>
          </>)}

          {tur === 'Article' && (<>
            <div>
              <label htmlFor="a-tur" style={F.etiket}>{t('Makale türü', 'Article type')}</label>
              <select id="a-tur" value={d.makaleTuru} onChange={e => set('makaleTuru')(e.target.value)} style={F.girdi}>
                <option value="Article">Article</option>
                <option value="BlogPosting">BlogPosting</option>
                <option value="NewsArticle">NewsArticle</option>
              </select>
            </div>
            <Alan id="a-baslik" etiket={t('Başlık *', 'Headline *')} deger={d.baslik} onChange={set('baslik')} />
            <Alan id="a-aciklama" etiket={t('Açıklama', 'Description')} deger={d.aciklama} onChange={set('aciklama')} cok />
            <div style={izgara}>
              <Alan id="a-url" etiket={t('Yazının adresi', 'Article URL')} deger={d.url} onChange={set('url')} tip="url" yer="https://" />
              <Alan id="a-yayin" etiket={t('Yayın tarihi', 'Published')} deger={d.yayin} onChange={set('yayin')} tip="date" />
              <Alan id="a-guncelleme" etiket={t('Güncelleme tarihi', 'Modified')} deger={d.guncelleme} onChange={set('guncelleme')} tip="date" />
              <Alan id="a-yazar" etiket={t('Yazar adı', 'Author name')} deger={d.yazar} onChange={set('yazar')} />
              <Alan id="a-yazarurl" etiket={t('Yazar sayfası', 'Author URL')} deger={d.yazarUrl} onChange={set('yazarUrl')} tip="url" yer="https://" />
              <Alan id="a-yayinci" etiket={t('Yayıncı adı', 'Publisher name')} deger={d.yayinci} onChange={set('yayinci')} />
              <Alan id="a-logo" etiket={t('Yayıncı logosu', 'Publisher logo')} deger={d.yayinciLogo} onChange={set('yayinciLogo')} tip="url" yer="https://" />
            </div>
            <Alan id="a-gorsel" etiket={t('Görsel adresleri (her satıra bir adres)', 'Image URLs (one per line)')} deger={d.gorsel} onChange={set('gorsel')} cok yer="https://" />
          </>)}
        </div>

        <div className="sticky-sidebar" style={{ minWidth: 0, position: 'sticky', top: 'calc(var(--nav-h) + 16px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: '14px', color: '#111' }}>{t('Oluşturulan kod', 'Generated code')}</strong>
            <button type="button" onClick={kopyala} style={F.buton}>{kopyalandi ? t('Kopyalandı ✓', 'Copied ✓') : t('Kodu kopyala', 'Copy code')}</button>
          </div>
          <pre style={F.kod} aria-live="polite"><code>{cikti}</code></pre>
          {notlar.length > 0 && (
            <ul style={{ margin: '12px 0 0', padding: '12px 14px 12px 30px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', color: '#92400e', fontSize: '13px', lineHeight: 1.6 }}>
              {notlar.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          )}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '12px', fontSize: '13px' }}>
            <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontWeight: 600 }}>{t('Zengin Sonuçlar Testi ↗', 'Rich Results Test ↗')}</a>
            <a href="https://validator.schema.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--orange)', fontWeight: 600 }}>Schema Markup Validator ↗</a>
          </div>
        </div>
      </div>
    </AracSayfa>
  )
}
