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
// ─────────────────────────────────────────────────────────────
export function renderBlok(p, key, isMobile, mb) {
  const metin = { color: '#555', fontSize: '15px', lineHeight: isMobile ? 1.8 : 1.85, marginBottom: mb }
  if (typeof p === 'string') return <p key={key} style={metin}>{renderInline(p)}</p>
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

