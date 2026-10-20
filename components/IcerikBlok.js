// Blog yazıları ve rehberler için ortak içerik blokları (paragraf, h3, liste,
// kontrol listesi, alıntı, tablo, kod) ve satır içi link/kalın biçimlendirme.
// Markdown karşılığı: lib/blog-markdown.js
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────
// Paragraf içi biçimlendirme (yalnızca iki kalıp):
//   [metin](/url)  → link. "/" ile başlayan iç linkler Next Link olur
//                    (nofollow yok, aynı sekme); dış linkler yeni sekme + nofollow.
//   **metin**      → kalın
// Mevcut yazılarda bu kalıplar geçmediği için eski içerik etkilenmez.
// ─────────────────────────────────────────────────────────────
const INLINE_RE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

const inlineLinkStyle = { color: 'var(--orange)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }

export function renderInline(text) {
  if (typeof text !== 'string' || (!text.includes('](') && !text.includes('**'))) return text
  const parts = []
  let last = 0
  let m
  INLINE_RE.lastIndex = 0
  while ((m = INLINE_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const key = `i${m.index}`
    if (m[1] !== undefined) {
      const url = m[2]
      parts.push(url.startsWith('/')
        ? <Link key={key} href={url} style={inlineLinkStyle}>{m[1]}</Link>
        : <a key={key} href={url} target="_blank" rel="nofollow noopener noreferrer" style={inlineLinkStyle}>{m[1]}</a>)
    } else {
      parts.push(<strong key={key} style={{ color: '#222', fontWeight: 700 }}>{m[3]}</strong>)
    }
    last = INLINE_RE.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

// ─────────────────────────────────────────────────────────────
// Paragraf blokları: paragraflar dizisindeki her öğe ya düz metin (string)
// ya da aşağıdaki tiplerden biridir. Eski yazılar yalnızca string kullanır.
//   { alt: '...' }                         → h3 alt başlık
//   { liste: ['...', ...] }                → madde listesi
//   { kontrol: ['...', ...] }              → kontrol listesi (☐)
//   { alinti: '...' }                      → vurgulu alıntı satırı
//   { tablo: { basliklar, satirlar, sag } } → tablo (sag: sağa hizalı sütunlar)
//   { kod: '...' }                         → kod bloğu (robots.txt, llms.txt örnekleri)
// Görsel bloklar (resim dosyası gerektirmez, CSS ile çizilir, mobilde alt alta dizilir):
//   { akis: { baslik?, adimlar: ['...' | {baslik, metin}] } }        → numaralı süreç/akış şeması
//   { kartlar: [{ ikon?, baslik, metin }] }                          → bilgi kartları ızgarası
//   { karsilastir: { sol: {baslik, maddeler, tur}, sag: {...} } }    → yan yana karşılaştırma (tur: 'iyi' | 'kotu' | 'notr')
//   { agac: { kok, dallar: [{ ad, alt?: ['...'] }] } }               → hiyerarşi / site yapısı şeması
//   { cubuk: { baslik, birim?, veriler: [{etiket, deger}], not } }  → yatay çubuk grafik (not: kaynak veya "temsili" açıklaması)
//   { kutu: { tur: 'ipucu' | 'uyari' | 'not', baslik?, metin } }     → vurgulu bilgi kutusu
// ─────────────────────────────────────────────────────────────
const TURUNCU = 'var(--orange)'
const KUTU_RENK = {
  ipucu: { renk: '#15803d', bg: '#f0fdf4', kenar: '#bbf7d0', ikon: '💡' },
  uyari: { renk: '#b45309', bg: '#fffbeb', kenar: '#fde68a', ikon: '⚠️' },
  not: { renk: '#1d4ed8', bg: '#eff6ff', kenar: '#bfdbfe', ikon: 'ℹ️' },
}
const KARS_RENK = {
  iyi: { renk: '#15803d', bg: '#f0fdf4', kenar: '#bbf7d0', isaret: '✓' },
  kotu: { renk: '#b91c1c', bg: '#fef2f2', kenar: '#fecaca', isaret: '✗' },
  notr: { renk: '#374151', bg: '#faf9f7', kenar: '#eee', isaret: '•' },
}
const sekilBaslik = { fontSize: '13px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '.6px', margin: '0 0 12px' }

export function renderBlok(p, key, isMobile, mb) {
  const metin = { color: '#555', fontSize: '15px', lineHeight: isMobile ? 1.8 : 1.85, marginBottom: mb }
  if (typeof p === 'string') return <p key={key} style={metin}>{renderInline(p)}</p>
  if (p.akis) {
    const { baslik, adimlar } = p.akis
    return (
      <figure key={key} style={{ margin: `4px 0 ${mb === '0' ? '0' : '18px'}`, background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '14px', padding: '18px' }}>
        {baslik && <figcaption style={sekilBaslik}>{renderInline(baslik)}</figcaption>}
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', counterReset: 'adim' }}>
          {adimlar.map((a, i) => {
            const ad = typeof a === 'string' ? a : a.baslik
            const ac = typeof a === 'string' ? null : a.metin
            return (
              <li key={i} style={{ position: 'relative', background: '#fff', border: '1px solid #eee', borderTop: `3px solid ${TURUNCU}`, borderRadius: '10px', padding: '12px 12px 12px', minWidth: 0 }}>
                <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', background: TURUNCU, color: '#fff', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>{i + 1}</span>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', lineHeight: 1.4 }}>{renderInline(ad)}</div>
                {ac && <div style={{ fontSize: '13px', color: '#666', lineHeight: 1.55, marginTop: '4px' }}>{renderInline(ac)}</div>}
                {i < adimlar.length - 1 && <span aria-hidden="true" style={{ position: 'absolute', right: '-9px', top: '50%', transform: 'translateY(-50%)', color: '#d6cfc6', fontSize: '14px', zIndex: 1 }}>▸</span>}
              </li>
            )
          })}
        </ol>
      </figure>
    )
  }
  if (p.kartlar) return (
    <div key={key} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: `4px 0 ${mb === '0' ? '0' : '18px'}` }}>
      {p.kartlar.map((k, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '14px 16px', minWidth: 0, boxShadow: '0 1px 2px rgba(0,0,0,.03)' }}>
          {k.ikon && <div aria-hidden="true" style={{ fontSize: '22px', marginBottom: '6px' }}>{k.ikon}</div>}
          <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#111', marginBottom: '4px', lineHeight: 1.35 }}>{renderInline(k.baslik)}</div>
          <div style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.6 }}>{renderInline(k.metin)}</div>
        </div>
      ))}
    </div>
  )
  if (p.karsilastir) {
    const taraf = (t, i) => {
      const r = KARS_RENK[t.tur] || KARS_RENK.notr
      return (
        <div key={i} style={{ background: r.bg, border: `1px solid ${r.kenar}`, borderRadius: '12px', padding: '14px 16px', minWidth: 0 }}>
          <div style={{ fontSize: '14.5px', fontWeight: 800, color: r.renk, marginBottom: '8px' }}>{renderInline(t.baslik)}</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {t.maddeler.map((m, j) => (
              <li key={j} style={{ display: 'flex', gap: '8px', fontSize: '14px', color: '#333', lineHeight: 1.6, marginBottom: '5px' }}>
                <span aria-hidden="true" style={{ color: r.renk, fontWeight: 800, flexShrink: 0 }}>{r.isaret}</span><span>{renderInline(m)}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return (
      <div key={key} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px', margin: `4px 0 ${mb === '0' ? '0' : '18px'}` }}>
        {[p.karsilastir.sol, p.karsilastir.sag].map(taraf)}
      </div>
    )
  }
  if (p.agac) {
    const { kok, dallar } = p.agac
    return (
      <figure key={key} style={{ margin: `4px 0 ${mb === '0' ? '0' : '18px'}`, background: '#faf9f7', border: '1px solid #f0ece6', borderRadius: '14px', padding: '18px' }}>
        <div style={{ display: 'inline-block', background: '#111', color: '#fff', fontWeight: 800, fontSize: '14px', padding: '8px 14px', borderRadius: '8px', marginBottom: '10px', maxWidth: '100%', overflowWrap: 'anywhere' }}>{renderInline(kok)}</div>
        <ul style={{ listStyle: 'none', margin: '0 0 0 12px', padding: '0 0 0 16px', borderLeft: `2px solid ${TURUNCU}` }}>
          {dallar.map((d, i) => (
            <li key={i} style={{ position: 'relative', margin: '0 0 10px' }}>
              <span aria-hidden="true" style={{ position: 'absolute', left: '-16px', top: '14px', width: '12px', borderTop: `2px solid ${TURUNCU}` }} />
              <div style={{ display: 'inline-block', background: '#fff', border: '1px solid #e8e2d9', borderRadius: '8px', padding: '6px 12px', fontSize: '14px', fontWeight: 700, color: '#111', maxWidth: '100%', overflowWrap: 'anywhere' }}>{renderInline(d.ad)}</div>
              {d.alt?.length > 0 && (
                <ul style={{ listStyle: 'none', margin: '6px 0 0 14px', padding: '0 0 0 14px', borderLeft: '1px dashed #cfc6ba' }}>
                  {d.alt.map((a, j) => <li key={j} style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.6, padding: '2px 0', overflowWrap: 'anywhere' }}>{renderInline(a)}</li>)}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </figure>
    )
  }
  if (p.cubuk) {
    const { baslik, birim = '', veriler, not } = p.cubuk
    const enBuyuk = Math.max(...veriler.map(v => Number(v.deger) || 0), 1)
    return (
      <figure key={key} style={{ margin: `4px 0 ${mb === '0' ? '0' : '18px'}`, background: '#fff', border: '1px solid #eee', borderRadius: '14px', padding: '18px' }}>
        {baslik && <figcaption style={sekilBaslik}>{renderInline(baslik)}</figcaption>}
        <div style={{ display: 'grid', gap: '8px' }}>
          {veriler.map((v, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'minmax(90px, 34%) 1fr', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '13px', color: '#444', lineHeight: 1.35 }}>{renderInline(v.etiket)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <div style={{ height: '14px', width: `${Math.max(2, (Number(v.deger) / enBuyuk) * 100)}%`, background: TURUNCU, borderRadius: '0 7px 7px 0', opacity: 0.55 + 0.45 * (Number(v.deger) / enBuyuk) }} />
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap' }}>{v.deger}{birim}</span>
              </div>
            </div>
          ))}
        </div>
        {not && <p style={{ fontSize: '12px', color: '#999', margin: '10px 0 0', lineHeight: 1.5 }}>{renderInline(not)}</p>}
      </figure>
    )
  }
  if (p.kutu) {
    const r = KUTU_RENK[p.kutu.tur] || KUTU_RENK.not
    return (
      <aside key={key} style={{ display: 'flex', gap: '12px', background: r.bg, border: `1px solid ${r.kenar}`, borderRadius: '12px', padding: '14px 16px', margin: `4px 0 ${mb === '0' ? '0' : '18px'}` }}>
        <span aria-hidden="true" style={{ fontSize: '18px', lineHeight: 1.4 }}>{r.ikon}</span>
        <div style={{ minWidth: 0 }}>
          {p.kutu.baslik && <div style={{ fontWeight: 800, color: r.renk, fontSize: '14.5px', marginBottom: '4px' }}>{renderInline(p.kutu.baslik)}</div>}
          <div style={{ fontSize: '14.5px', color: '#333', lineHeight: 1.7 }}>{renderInline(p.kutu.metin)}</div>
        </div>
      </aside>
    )
  }
  if (p.alt) return (
    <h3 key={key} style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '16px' : '17px', fontWeight: 800, color: '#222', margin: `10px 0 ${mb === '0' ? '0' : '10px'}` }}>{renderInline(p.alt)}</h3>
  )
  if (p.liste || p.kontrol) {
    const kontrol = !!p.kontrol
    return (
      <ul key={key} style={{ listStyle: 'none', padding: 0, margin: `0 0 ${mb}` }}>
        {(p.liste || p.kontrol).map((li, j) => (
          <li key={j} style={{ ...metin, marginBottom: '6px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            {kontrol
              ? <span aria-hidden="true" style={{ flexShrink: 0, width: '16px', height: '16px', marginTop: '5px', border: '2px solid var(--orange)', borderRadius: '4px' }} />
              : <span aria-hidden="true" style={{ flexShrink: 0, width: '6px', height: '6px', marginTop: '11px', background: 'var(--orange)', borderRadius: '50%' }} />}
            <span>{renderInline(li)}</span>
          </li>
        ))}
      </ul>
    )
  }
  if (p.alinti) return (
    <p key={key} style={{ ...metin, color: '#222', fontWeight: 600, borderLeft: '3px solid var(--orange)', background: '#faf9f7', padding: '10px 16px', borderRadius: '0 8px 8px 0' }}>{renderInline(p.alinti)}</p>
  )
  if (p.kod) return (
    <pre key={key} style={{ background: '#1a1612', color: '#f5efe8', padding: '16px 18px', borderRadius: '10px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.65, margin: `0 0 ${mb}`, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', whiteSpace: 'pre' }}><code>{p.kod}</code></pre>
  )
  if (p.tablo) {
    const { basliklar, satirlar, sag = [] } = p.tablo
    const hucre = (i) => ({ padding: '10px 14px', textAlign: sag.includes(i) ? 'right' : 'left', borderBottom: '1px solid #eee', fontSize: '14px' })
    return (
      <div key={key} style={{ overflowX: 'auto', marginBottom: mb, border: '1px solid #eee', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '320px' }}>
          <thead>
            <tr style={{ background: '#faf9f7' }}>
              {basliklar.map((h, i) => <th key={i} style={{ ...hucre(i), color: '#111', fontWeight: 700 }}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {satirlar.map((r, ri) => (
              <tr key={ri}>{r.map((c, i) => <td key={i} style={{ ...hucre(i), color: '#555' }}>{renderInline(c)}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

