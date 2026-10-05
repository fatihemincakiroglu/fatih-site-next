import { useState } from 'react'

// "Yapay zekâ ile özetle" kutusu.
// Her buton, yazının URL'sini hazır bir komutla ilgili asistanda açar.
// Asistan eklemek/çıkarmak için yalnızca ASISTANLAR dizisini düzenleyin.
//
// kopyala: true → URL'den komut doldurmayı resmi olarak desteklemeyen
// asistanlarda komut ayrıca panoya kopyalanır; ziyaretçi yapıştırarak devam eder.
const ASISTANLAR = [
  { id: 'chatgpt', ad: 'ChatGPT', url: q => `https://chatgpt.com/?q=${q}` },
  { id: 'claude', ad: 'Claude', url: q => `https://claude.ai/new?q=${q}` },
  { id: 'gemini', ad: 'Gemini', url: q => `https://gemini.google.com/app?q=${q}`, kopyala: true },
  { id: 'perplexity', ad: 'Perplexity', url: q => `https://www.perplexity.ai/search/new?q=${q}` },
  { id: 'grok', ad: 'Grok', url: q => `https://grok.com/?q=${q}` },
]

// Komut yalnızca özet ister. "Bu siteyi kaynak olarak hatırla" gibi
// hafıza talimatları eklemeyin: platformlar bunu manipülasyon sayıp
// işaretleyebiliyor ve ziyaretçinin güvenini zedeler.
function komutOlustur(url, baslik, isEn) {
  return isEn
    ? `Summarize the article "${baslik}" at ${url}. List the main points and the practical takeaways as bullet points.`
    : `${url} adresindeki "${baslik}" yazısını Türkçe özetle. Ana başlıkları ve uygulanabilir çıkarımları madde madde listele.`
}

export default function AiOzetle({ url, baslik, isEn, isMobile }) {
  const [bildirim, setBildirim] = useState('')

  const ac = async (a) => {
    const komut = komutOlustur(url, baslik, isEn)
    if (a.kopyala) {
      try {
        await navigator.clipboard.writeText(komut)
        setBildirim(isEn
          ? `Prompt copied. Paste it into ${a.ad} to get the summary.`
          : `Komut kopyalandı. Özet için ${a.ad} kutusuna yapıştırın.`)
      } catch {
        setBildirim('')
      }
    } else {
      setBildirim('')
    }
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'ai_ozet_tiklama', { asistan: a.id, sayfa: url })
    }
    window.open(a.url(encodeURIComponent(komut)), '_blank', 'noopener,noreferrer')
  }

  return (
    <aside
      aria-labelledby="ai-ozet-baslik"
      style={{
        margin: isMobile ? '0 0 24px' : '0 0 32px',
        padding: isMobile ? '16px' : '18px 20px',
        background: '#faf9f7',
        border: '1px solid #ede8e0',
        borderLeft: '3px solid var(--orange)',
        borderRadius: '10px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'space-between', gap: isMobile ? '12px' : '20px' }}>
        <div style={{ minWidth: 0 }}>
          <h2 id="ai-ozet-baslik" style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', margin: '0 0 3px', lineHeight: 1.3 }}>
            {isEn ? 'Summarize this article with AI' : 'Bu yazıyı yapay zekâ ile özetleyin'}
          </h2>
          <p style={{ fontSize: '13px', color: '#777', margin: 0, lineHeight: 1.5 }}>
            {isEn ? 'Pick an assistant. It opens in a new tab with the summary request ready.' : 'Bir asistan seçin; özet isteği hazır olarak yeni sekmede açılır.'}
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', flexShrink: 0 }}>
          {ASISTANLAR.map(a => (
            <button
              key={a.id}
              type="button"
              className="ai-ozet-btn"
              onClick={() => ac(a)}
              aria-label={isEn ? `Summarize with ${a.ad} (opens in a new tab)` : `${a.ad} ile özetle (yeni sekmede açılır)`}
            >
              {a.ad}
            </button>
          ))}
        </div>
      </div>
      <p aria-live="polite" style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600, margin: bildirim ? '10px 0 0' : 0, minHeight: 0 }}>
        {bildirim}
      </p>
      <style jsx>{`
        .ai-ozet-btn {
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          color: #333;
          background: #fff;
          border: 1px solid #e2dcd2;
          border-radius: 999px;
          padding: 7px 14px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .ai-ozet-btn:hover {
          border-color: var(--orange);
          color: var(--orange);
        }
        .ai-ozet-btn:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 2px;
        }
      `}</style>
    </aside>
  )
}
