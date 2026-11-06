// Anahtar kelime gruplama (kümeleme): saf mantık (tarayıcıdan bağımsız, test edilebilir).
// pages/araclar/anahtar-kelime-gruplama.js kullanır. Hiçbir veri sunucuya gönderilmez.
//
// Adımlar:
// 1. listeyiOku: satır başına bir kelime; isteğe bağlı "kelime<TAB>hacim", "kelime,hacim" ya da "kelime;hacim".
// 2. normalize: Türkçe kurallarıyla küçük harf (İ → i, I → ı), isteğe bağlı Türkçe → ASCII katlama (ş → s, ı → i ...).
// 3. tokenlar: harf ve rakam dizileri; TR + EN bağlaç ve edatlar (ve, ile, için, the, for ...) atılır.
//    Soru kelimeleri (nedir, nasıl, how, what) bilerek atılmaz: arama niyetini değiştirirler.
// 4. kok: yaygın Türkçe ekler temkinli biçimde atılır (lar/ler, lık/lik, ı/i/u/ü, sı/si, da/de, dan/den ...).
//    Kök en az 4 harf (tek ya da iki harfli eklerde 5 harf) kalmalıdır; en fazla iki ek atılır.
//    İngilizce çoğul "s" de atılır. Amaç dilbilgisel doğruluk değil, aynı kelimenin çekimlerini eşlemektir.
// 5. kumele: hacmi en yüksek atanmamış kelime "baş kelime" olur; kök kümeleri arasındaki Jaccard
//    benzerliği eşik değerine ulaşan diğer atanmamış kelimeler bu kümeye girer (açgözlü kümeleme).
// 6. Küme adı: baş kelimenin, kümedeki kelimelerin en az yarısında geçen kelimeleri (baş kelimedeki sırayla).

export const VARSAYILAN_ESIK = 0.5
export const EN_FAZLA_SATIR = 10000

export const DURAK_TR = new Set(('ve veya ile için icin bir bu şu su o da de ki mi mı mu mü en çok cok daha gibi kadar ya hem ama fakat ' +
  'ise yani her bazı bazi olan olarak üzere uzere göre gore dair diye').split(/\s+/))
export const DURAK_EN = new Set(('a an the and or of for to in on at by with from as is are be vs versus into about your my our ' +
  'it its this that these those').split(/\s+/))

const KATLAMA = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u', é: 'e', è: 'e', ë: 'e', á: 'a', à: 'a', ä: 'a', ó: 'o', ò: 'o', í: 'i', ú: 'u', ñ: 'n' }

// Türkçe kurallarıyla küçük harf: İ → i, I → ı. (toLocaleLowerCase her ortamda tr-TR desteklemeyebilir.)
export function trKucuk(s) {
  return String(s || '').replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase().replace(/i̇/g, 'i')
}

export function katla(s) {
  return String(s || '').replace(/[çğıöşüâîûéèëáàäóòíúñ]/g, ch => KATLAMA[ch] || ch)
}

export function normalize(s, { asciiKatla = true } = {}) {
  const k = trKucuk(s).replace(/[’'`´]/g, "'").replace(/\s+/g, ' ').trim()
  return asciiKatla ? katla(k) : k
}

export function tokenlar(normal) {
  return normal.match(/[\p{L}\p{N}]+/gu) || []
}

export function durakMi(token) {
  return DURAK_TR.has(token) || DURAK_EN.has(token) || DURAK_TR.has(katla(token))
}

// Ekler: uzundan kısaya. Hem Türkçe karakterli hem ASCII yazımlar var (katlama kapalıyken de çalışsın).
const EKLER = [
  'lığı', 'liği', 'luğu', 'lüğü', 'ligi', 'lugu',
  'ları', 'leri', 'lari', 'ların', 'lerin', 'larin',
  'lar', 'ler',
  'lık', 'lik', 'luk', 'lük',
  'nın', 'nin', 'nun', 'nün',
  'dan', 'den', 'tan', 'ten',
  'sı', 'si', 'su', 'sü',
  'da', 'de', 'ta', 'te',
  'ı', 'i', 'u', 'ü',
].sort((a, b) => b.length - a.length)

// Temkinli kök: en fazla iki ek atılır, kalan kök kısa kalıyorsa ek atılmaz.
export function kok(token) {
  let t = token
  if (t.length < 5 || /^\d+$/.test(t)) return t
  for (let tur = 0; tur < 2; tur++) {
    let degisti = false
    for (const ek of EKLER) {
      if (!t.endsWith(ek)) continue
      const kalan = t.length - ek.length
      const enAz = ek.length <= 2 ? 5 : 4
      if (kalan < enAz) continue
      t = t.slice(0, kalan)
      degisti = true
      break
    }
    if (!degisti) break
  }
  // İngilizce çoğul: services → service, tools → tool. Türkçede sık görülen sonlar hariç
  // (ajans, kurs, otobüs, elmas, tenis gibi kelimeler bozulmasın diye ns, rs, us, as, is, ss).
  if (/^[a-z]+$/.test(t) && t.length >= 5 && /s$/.test(t) && !/(ss|us|is|ns|rs|as)$/.test(t)) t = t.slice(0, -1)
  return t
}

// "1.200", "1,200", "1 200", "1200" → 1200. Sayı değilse null.
export function hacimOku(s) {
  const h = String(s ?? '').trim()
  if (!h) return null
  if (!/^\d{1,3}([.,\s]\d{3})*$|^\d+$/.test(h)) return null
  return Number(h.replace(/[.,\s]/g, ''))
}

const BASLIK_RE = /^(keyword|keywords|anahtar kelime|anahtar kelimeler|kelime|query|sorgu|search term)s?\s*([\t,;]|$)/i

// Satırları { kelime, hacim, satir } listesine çevirir. Aynı (normalize edilmiş) kelime birden fazla
// varsa bir kez tutulur, en yüksek hacim alınır ve tekrar sayısı döner.
export function listeyiOku(metin, { asciiKatla = true, enFazla = EN_FAZLA_SATIR } = {}) {
  const harita = new Map()
  let tekrar = 0
  let fazla = 0
  let hacimli = 0
  const satirlar = String(metin || '').split(/\r?\n/)
  satirlar.forEach((ham, i) => {
    const satir = ham.trim()
    if (!satir) return
    // Başlık satırı: ilk satır "Keyword<TAB>Volume" gibiyse (ikinci sütun sayı değilse) atlanır
    if (i === 0 && BASLIK_RE.test(satir) && !/[\t,;]\s*[\d.,\s]+$/.test(satir)) return
    let kelime = satir
    let hacim = null
    if (satir.includes('\t')) {
      const p = satir.split('\t')
      kelime = p[0].trim()
      hacim = hacimOku(p[1])
    } else {
      const m = satir.match(/^(.*?)\s*[,;]\s*([\d.,\s]+)$/)
      if (m && hacimOku(m[2]) !== null) { kelime = m[1].trim(); hacim = hacimOku(m[2]) }
    }
    kelime = kelime.replace(/^["']|["']$/g, '').replace(/\s+/g, ' ').trim()
    if (!kelime) return
    const anahtar = normalize(kelime, { asciiKatla })
    if (!anahtar) return
    if (harita.has(anahtar)) {
      tekrar++
      const k = harita.get(anahtar)
      if (hacim !== null && (k.hacim === null || hacim > k.hacim)) k.hacim = hacim
      return
    }
    if (harita.size >= enFazla) { fazla++; return }
    if (hacim !== null) hacimli++
    harita.set(anahtar, { kelime, hacim, satir: i + 1, anahtar })
  })
  return { kelimeler: [...harita.values()], tekrar, fazla, hacimli }
}

// Bir kelimenin anlamlı kök kümesi. Hepsi durak kelimeyse (ör. "ne için") durak kelimeler kullanılır.
// gorunen: aynı tokenların katlanmamış (Türkçe karakterli) yazımı; küme adında kullanılır.
// Katlama harf harf yapıldığı için iki dizinin token sayısı ve sırası aynıdır.
export function kokler(kelime, { asciiKatla = true, durakAt = true } = {}) {
  const ham = tokenlar(normalize(kelime, { asciiKatla: false }))
  const t = asciiKatla ? ham.map(katla) : ham
  const secili = t.map((x, i) => i).filter(i => !durakAt || !durakMi(t[i]))
  const idx = secili.length ? secili : t.map((x, i) => i)
  const kaynak = idx.map(i => t[i])
  return { tokenlar: kaynak, gorunen: idx.map(i => ham[i]), kokler: [...new Set(kaynak.map(kok))] }
}

export function jaccard(a, b) {
  if (!a.size || !b.size) return 0
  let ortak = 0
  for (const x of a) if (b.has(x)) ortak++
  return ortak / (a.size + b.size - ortak)
}

/**
 * @param {Array<{kelime:string, hacim:number|null}>} kelimeler
 * @returns {{ kumeler: Array, tekiller: Array }}
 *   kume: { ad, bas, kelimeler: [{kelime, hacim, benzerlik}], toplamHacim, adet, ortakKokler }
 */
export function kumele(kelimeler, { esik = VARSAYILAN_ESIK, asciiKatla = true, durakAt = true } = {}) {
  const e = Math.min(1, Math.max(0.05, Number(esik) || VARSAYILAN_ESIK))
  const ogeler = kelimeler.map((k, i) => {
    const r = kokler(k.kelime, { asciiKatla, durakAt })
    return { ...k, i, hacimSay: k.hacim ?? 0, set: new Set(r.kokler), tok: r.tokenlar, gor: r.gorunen }
  })
  // Sıra: hacim (büyükten küçüğe), sonra daha az kelimeli (daha genel) olan, sonra alfabetik
  const sirali = [...ogeler].sort((a, b) => (b.hacimSay - a.hacimSay) || (a.set.size - b.set.size) || a.kelime.localeCompare(b.kelime, 'tr'))
  // Ters dizin: kök → bu kökü içeren öğeler
  const dizin = new Map()
  for (const o of ogeler) for (const k of o.set) { if (!dizin.has(k)) dizin.set(k, []); dizin.get(k).push(o) }

  const atandi = new Set()
  const kumeler = []
  for (const bas of sirali) {
    if (atandi.has(bas.i)) continue
    atandi.add(bas.i)
    const uyeler = [{ o: bas, benzerlik: 1 }]
    const adaylar = new Set()
    for (const k of bas.set) for (const o of dizin.get(k) || []) if (!atandi.has(o.i)) adaylar.add(o)
    for (const o of adaylar) {
      const s = jaccard(bas.set, o.set)
      if (s >= e - 1e-9) { uyeler.push({ o, benzerlik: s }); atandi.add(o.i) }
    }
    uyeler.sort((a, b) => (b.o.hacimSay - a.o.hacimSay) || a.o.kelime.localeCompare(b.o.kelime, 'tr'))
    kumeler.push(kumeOzet(bas, uyeler))
  }
  kumeler.sort((a, b) => (b.toplamHacim - a.toplamHacim) || (b.adet - a.adet) || a.ad.localeCompare(b.ad, 'tr'))
  return {
    kumeler: kumeler.filter(k => k.adet > 1),
    tekiller: kumeler.filter(k => k.adet === 1).map(k => k.kelimeler[0]),
  }
}

function kumeOzet(bas, uyeler) {
  // Her kökün kaç üyede geçtiği
  const sayac = new Map()
  for (const { o } of uyeler) for (const k of o.set) sayac.set(k, (sayac.get(k) || 0) + 1)
  const yari = Math.ceil(uyeler.length / 2)
  // Ad: baş kelimenin, üyelerin en az yarısında geçen kelimeleri (baş kelimedeki sırayla)
  const adParcalari = []
  const gorulen = new Set()
  bas.tok.forEach((t, i) => {
    const k = kok(t)
    if (gorulen.has(k)) return
    if ((sayac.get(k) || 0) >= yari) { adParcalari.push(bas.gor[i] || t); gorulen.add(k) }
  })
  const ortakKokler = [...sayac.entries()].filter(([, n]) => n >= yari).sort((a, b) => b[1] - a[1]).map(([k]) => k)
  const hacimli = uyeler.some(u => u.o.hacim !== null && u.o.hacim !== undefined)
  return {
    ad: adParcalari.length ? adParcalari.join(' ') : bas.kelime,
    bas: bas.kelime,
    kelimeler: uyeler.map(u => ({ kelime: u.o.kelime, hacim: u.o.hacim ?? null, benzerlik: Math.round(u.benzerlik * 100) / 100 })),
    toplamHacim: uyeler.reduce((t, u) => t + u.o.hacimSay, 0),
    hacimli,
    adet: uyeler.length,
    ortakKokler,
  }
}

// CSV hücresi: tırnak, virgül, satır sonu varsa tırnak içine alınır. =, +, -, @ ile başlayan metinler
// tablo programlarında formül olarak çalışmasın diye başına ' eklenir.
export function csvHucre(v) {
  if (v === null || v === undefined) return ''
  let s = String(v)
  if (typeof v !== 'number' && /^[=+\-@\t\r]/.test(s)) s = `'${s}`
  return /[",;\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function csvUret({ kumeler, tekiller }, { isEn = false, tekilleriEkle = true } = {}) {
  const baslik = isEn
    ? ['Cluster', 'Suggested page / topic', 'Keyword', 'Volume', 'Cluster volume', 'Cluster keywords', 'Similarity to head']
    : ['Küme', 'Önerilen sayfa / konu', 'Anahtar kelime', 'Hacim', 'Küme hacmi', 'Küme kelime sayısı', 'Baş kelimeye benzerlik']
  const satirlar = [baslik]
  kumeler.forEach((k, i) => {
    for (const w of k.kelimeler) satirlar.push([i + 1, k.ad, w.kelime, w.hacim ?? '', k.toplamHacim, k.adet, w.benzerlik])
  })
  if (tekilleriEkle) {
    const ad = isEn ? 'Unclustered' : 'Gruplanmamış'
    for (const w of tekiller) satirlar.push([ad, w.kelime, w.kelime, w.hacim ?? '', w.hacim ?? '', 1, 1])
  }
  return satirlar.map(r => r.map(csvHucre).join(',')).join('\r\n')
}

export const ORNEK_LISTE = [
  'seo ajansı\t2400', 'istanbul seo ajansı\t880', 'en iyi seo ajansı\t390', 'seo ajansları\t320', 'seo ajansı fiyatları\t210',
  'seo nedir\t6600', 'seo nedir nasıl yapılır\t480', 'seo ne demek\t1300',
  'teknik seo\t1000', 'teknik seo nedir\t390', 'teknik seo kontrol listesi\t140', 'teknik seo denetimi\t110',
  'anahtar kelime araştırması\t1600', 'anahtar kelime araştırma araçları\t590', 'ücretsiz anahtar kelime aracı\t480', 'anahtar kelime analizi\t320',
  'site haritası oluşturma\t260', 'xml site haritası\t390', 'sitemap nedir\t720',
].join('\n')
