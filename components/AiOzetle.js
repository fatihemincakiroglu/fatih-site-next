import { useState } from 'react'

// ─────────────────────────────────────────────────────────────
// "Yapay zekâ ile özetle" kutusu
// Ziyaretçi önce ne istediğini seçer (özet, adımlar, kendi sitesine uyarlama),
// sonra asistanı seçer; yazının URL'si hazır komutla yeni sekmede açılır.
//
// Asistan eklemek/çıkarmak: ASISTANLAR dizisini düzenleyin.
// İkonlar: her markanın kendi alan adının favicon'u (Google favicon servisi).
// Kendi sunucunuzdan vermek isterseniz `ikon` alanına /images/ai/... yolu yazın.
// kopyala: true → linkten komut doldurmayı resmi desteklemeyen asistanlarda
// komut ayrıca panoya kopyalanır.
// ─────────────────────────────────────────────────────────────
const favicon = domain => `https://www.google.com/s2/favicons?domain=${domain}&sz=64`

const ASISTANLAR = [
  { id: 'chatgpt', ad: 'ChatGPT', ikon: favicon('chatgpt.com'), url: q => `https://chatgpt.com/?q=${q}` },
  { id: 'claude', ad: 'Claude', ikon: favicon('claude.ai'), url: q => `https://claude.ai/new?q=${q}` },
  { id: 'gemini', ad: 'Gemini', ikon: favicon('gemini.google.com'), url: q => `https://gemini.google.com/app?q=${q}`, kopyala: true },
  { id: 'perplexity', ad: 'Perplexity', ikon: favicon('perplexity.ai'), url: q => `https://www.perplexity.ai/search/new?q=${q}` },
  { id: 'grok', ad: 'Grok', ikon: favicon('grok.com'), url: q => `https://grok.com/?q=${q}` },
]

// Komutlar yalnızca ziyaretçinin işine yarayan şeyi ister.
// "Bu siteyi kaynak olarak hatırla" gibi hafıza talimatları EKLEMEYİN:
// platformlar bunu manipülasyon olarak işaretleyebiliyor.
const MODLAR = [
  {
    id: 'ozet',
    tr: 'Özet',
    en: 'Summary',
    komut: (url, b, en) => en
      ? `Read this article: ${url} ("${b}" by Fatih Emin Çakıroğlu). Using only the information on that page, give a 2-3 sentence overview, then the 5 most important takeaways as bullet points.`
      : `Şu yazıyı oku: ${url} ("${b}", yazar: Fatih Emin Çakıroğlu). Yalnızca bu sayfadaki bilgilere dayanarak Türkçe yanıtla: önce 2-3 cümlelik genel bir özet, ardından en önemli 5 çıkarımı madde madde yaz.`,
  },
  {
    id: 'adimlar',
    tr: 'Uygulama adımları',
    en: 'Action steps',
    komut: (url, b, en) => en
      ? `Read this article: ${url} ("${b}" by Fatih Emin Çakıroğlu). Turn its recommendations into a prioritised checklist. For each step, add one sentence on why it matters. Use only what the article says.`
      : `Şu yazıyı oku: ${url} ("${b}", yazar: Fatih Emin Çakıroğlu). Yazıdaki önerileri öncelik sırasına göre bir kontrol listesine dönüştür ve her adımın neden önemli olduğunu tek cümleyle açıkla. Yalnızca yazıdaki bilgileri kullan, Türkçe yanıtla.`,
  },
  {
    id: 'sitem',
    tr: 'Siteme uyarla',
    en: 'Apply to my site',
    komut: (url, b, en) => en
      ? `Read this article: ${url} ("${b}" by Fatih Emin Çakıroğlu). I want to apply its advice to my own website. First ask me for my site's address and industry, then explain which of the article's recommendations should be my priorities and why.`
      : `Şu yazıyı oku: ${url} ("${b}", yazar: Fatih Emin Çakıroğlu). Bu yazıdaki önerileri kendi web siteme uygulamak istiyorum. Önce bana sitemin adresini ve sektörümü sor, ardından yazıdaki önerilerden hangilerinin benim için öncelikli olduğunu nedenleriyle Türkçe açıkla.`,
  },
]

function Kivilcim() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5c.5 4.6 2.9 7 9.5 9.5-6.6 2.5-9 4.9-9.5 9.5-.5-4.6-2.9-7-9.5-9.5 6.6-2.5 9-4.9 9.5-9.5Z" fill="currentColor" />
      <path d="M19.5 2.5c.2 1.6 1 2.4 2.5 3-1.5.6-2.3 1.4-2.5 3-.2-1.6-1-2.4-2.5-3 1.5-.6 2.3-1.4 2.5-3Z" fill="currentColor" opacity=".55" />
    </svg>
  )
}

function AsistanIkonu({ a }) {
  const [hata, setHata] = useState(false)
  if (hata) return <span className="ikon-yedek" aria-hidden="true">{a.ad[0]}</span>
  return (
    // Küçük, harici favicon: next/image optimizasyonu gereksiz.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={a.ikon} alt="" width="18" height="18" loading="lazy" decoding="async" onError={() => setHata(true)} />
  )
}

export default function AiOzetle({ url, baslik, isEn, isMobile, sure }) {
  const [mod, setMod] = useState(MODLAR[0])
  const [bildirim, setBildirim] = useState('')

  const komut = () => mod.komut(url, baslik, isEn)

  const kopyala = async (mesaj) => {
    try {
      await navigator.clipboard.writeText(komut())
      setBildirim(mesaj)
      return true
    } catch {
      setBildirim(isEn ? 'Could not copy automatically. Please try again.' : 'Otomatik kopyalanamadı, lütfen tekrar deneyin.')
      return false
    }
  }

  const izle = (asistan) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ai_ozet_tiklama', { asistan, mod: mod.id, sayfa: url })
    }
  }

  const ac = async (a) => {
    if (a.kopyala) {
      await kopyala(isEn ? `Prompt copied. If ${a.ad} opens empty, just paste it.` : `Komut kopyalandı. ${a.ad} boş açılırsa yapıştırmanız yeterli.`)
    } else {
      setBildirim('')
    }
    izle(a.id)
    window.open(a.url(encodeURIComponent(komut())), '_blank', 'noopener,noreferrer')
  }

  const altMetin = sure
    ? (isEn ? `Get the key points of this ${sure}-minute read in seconds.` : `${sure} dakikalık bu yazının özünü saniyeler içinde alın.`)
    : (isEn ? 'Get the key points in seconds.' : 'Yazının özünü saniyeler içinde alın.')

  return (
    <aside className={`ai-kutu${isMobile ? ' mobil' : ''}`} aria-labelledby="ai-ozet-baslik">
      <div className="ust">
        <span className="rozet"><Kivilcim /></span>
        <div>
          <h2 id="ai-ozet-baslik">{isEn ? 'Read it with AI' : 'Yapay zekâ ile okuyun'}</h2>
          <p className="alt">{altMetin}</p>
        </div>
      </div>

      <div className="bolum-etiketi" id="ai-mod-etiket">{isEn ? 'What do you need?' : 'Ne istiyorsunuz?'}</div>
      <div className="modlar" role="radiogroup" aria-labelledby="ai-mod-etiket">
        {MODLAR.map(m => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mod.id === m.id}
            className={`mod${mod.id === m.id ? ' secili' : ''}`}
            onClick={() => { setMod(m); setBildirim('') }}
          >
            {isEn ? m.en : m.tr}
          </button>
        ))}
      </div>

      <div className="bolum-etiketi">{isEn ? 'Open in' : 'Şurada açın'}</div>
      <div className="asistanlar">
        {ASISTANLAR.map(a => (
          <button
            key={a.id}
            type="button"
            className="asistan"
            onClick={() => ac(a)}
            aria-label={isEn ? `Open in ${a.ad} (new tab)` : `${a.ad} ile aç (yeni sekme)`}
          >
            <AsistanIkonu a={a} />
            <span>{a.ad}</span>
          </button>
        ))}
      </div>

      <div className="alt-satir">
        <button
          type="button"
          className="kopyala"
          onClick={() => { kopyala(isEn ? 'Prompt copied. Paste it into any assistant.' : 'Komut kopyalandı. İstediğiniz asistana yapıştırabilirsiniz.'); izle('kopyala') }}
        >
          {isEn ? 'Copy the prompt for another assistant' : 'Başka bir asistan için komutu kopyala'}
        </button>
        <span className="bildirim" aria-live="polite">{bildirim}</span>
      </div>

      <style jsx>{`
        .ai-kutu {
          margin: 0 0 36px;
          padding: 22px 24px 18px;
          background: #fffaf6;
          border: 1px solid #f1dfd2;
          border-radius: 14px;
        }
        .ai-kutu.mobil { margin: 0 0 24px; padding: 18px 16px 14px; }

        .ust { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
        .rozet {
          width: 38px; height: 38px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px; background: var(--orange); color: #fff;
        }
        h2 {
          font-family: var(--font-display);
          font-size: 18px; font-weight: 800; color: #111;
          margin: 0 0 2px; line-height: 1.25;
        }
        .alt { font-size: 13px; color: #7a6f66; margin: 0; line-height: 1.5; }

        .bolum-etiketi {
          font-size: 12px; font-weight: 700; color: #4a423b;
          margin: 0 0 8px;
        }

        .modlar {
          display: inline-flex; gap: 2px; padding: 3px; margin-bottom: 16px;
          background: #f4e9e0; border-radius: 10px; max-width: 100%;
          overflow-x: auto; scrollbar-width: none;
        }
        .modlar::-webkit-scrollbar { display: none; }
        .mod {
          font-family: var(--font-body); font-size: 13px; font-weight: 600;
          color: #6b5f55; background: transparent; border: 0;
          padding: 7px 14px; border-radius: 8px; cursor: pointer; white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .mobil .modlar { display: flex; width: 100%; }
        .mobil .mod { flex: 1; white-space: normal; line-height: 1.25; padding: 7px 6px; font-size: 12px; }
        .mod:hover { color: #111; }
        .mod.secili { background: #fff; color: var(--orange); box-shadow: 0 1px 2px rgba(80, 40, 10, 0.12); }

        .asistanlar {
          display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px;
        }
        .mobil .asistanlar { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .mobil .asistan:last-child:nth-child(odd) { grid-column: 1 / -1; }
        .asistan {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-body); font-size: 13px; font-weight: 600; color: #222;
          background: #fff; border: 1px solid #eadfd5; border-radius: 10px;
          padding: 10px 8px; cursor: pointer; min-width: 0;
          transition: border-color 0.15s, transform 0.15s;
        }
        .asistan span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .asistan:hover { border-color: var(--orange); transform: translateY(-1px); }
        .asistan :global(img), .ikon-yedek { width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0; }
        .ikon-yedek {
          display: inline-flex; align-items: center; justify-content: center;
          background: #f4e9e0; color: var(--orange); font-size: 11px; font-weight: 800;
        }

        .alt-satir {
          display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
          margin-top: 14px; padding-top: 12px; border-top: 1px dashed #eadfd5;
        }
        .kopyala {
          font-family: var(--font-body); font-size: 12px; font-weight: 600;
          color: #7a6f66; background: none; border: 0; padding: 0; cursor: pointer;
          text-decoration: underline; text-underline-offset: 3px;
        }
        .kopyala:hover { color: var(--orange); }
        .bildirim { font-size: 12px; font-weight: 600; color: var(--orange); }

        .mod:focus-visible, .asistan:focus-visible, .kopyala:focus-visible {
          outline: 2px solid var(--orange); outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .asistan, .mod { transition: none; }
          .asistan:hover { transform: none; }
        }
      `}</style>
    </aside>
  )
}
