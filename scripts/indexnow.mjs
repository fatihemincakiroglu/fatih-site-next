// IndexNow: yeni / güncellenen sayfaları Bing ve diğer katılımcı arama
// motorlarına anında bildirir. (ChatGPT'nin web araması büyük ölçüde
// Bing dizinini kullanır.)
//
// Kullanım (deploy TAMAMLANDIKTAN sonra, PowerShell'de proje klasöründe):
//   npm run indexnow                          → sitemap'teki tüm adresler
//   npm run indexnow -- /blog/yeni-yazi       → yalnızca verilen adres(ler)
//
// Anahtar dosyası: public/ad906745414561fd013cb1313f4eb986.txt
// Bu dosya silinir veya değiştirilirse bildirimler reddedilir.

const HOST = 'fatihemincakiroglu.com'
const SITE = `https://${HOST}`
const KEY = 'ad906745414561fd013cb1313f4eb986'
const KEY_URL = `${SITE}/${KEY}.txt`

async function sitemapAdresleri(url, gorulen = new Set()) {
  if (gorulen.has(url)) return []
  gorulen.add(url)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sitemap okunamadı: ${url} (${res.status})`)
  const xml = await res.text()
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(m => m[1])
  const sonuc = []
  for (const loc of locs) {
    if (loc.endsWith('.xml')) sonuc.push(...await sitemapAdresleri(loc, gorulen))
    else sonuc.push(loc)
  }
  return sonuc
}

async function main() {
  // 1) Anahtar dosyası canlıda mı? Değilse IndexNow istekleri reddeder.
  const k = await fetch(KEY_URL)
  if (!k.ok || (await k.text()).trim() !== KEY) {
    console.error(`Anahtar dosyası canlıda bulunamadı: ${KEY_URL}`)
    console.error('Önce deploy\'un tamamlanmasını bekleyin.')
    process.exit(1)
  }

  // 2) Gönderilecek adresler
  const argumanlar = process.argv.slice(2)
  const adresler = argumanlar.length
    ? argumanlar.map(a => (a.startsWith('http') ? a : `${SITE}${a.startsWith('/') ? '' : '/'}${a}`))
    : [...new Set(await sitemapAdresleri(`${SITE}/sitemap.xml`))]

  const gecerli = adresler.filter(u => new URL(u).host === HOST)
  if (!gecerli.length) {
    console.error('Gönderilecek adres bulunamadı.')
    process.exit(1)
  }

  // 3) Gönder (tek istekte en fazla 10.000 adres)
  for (let i = 0; i < gecerli.length; i += 10000) {
    const parca = gecerli.slice(i, i + 10000)
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_URL, urlList: parca }),
    })
    // 200 = alındı, 202 = alındı (anahtar doğrulaması bekliyor)
    if (res.status === 200 || res.status === 202) {
      console.log(`✓ ${parca.length} adres gönderildi (HTTP ${res.status}).`)
    } else {
      console.error(`✗ IndexNow hatası: HTTP ${res.status} ${await res.text()}`)
      process.exit(1)
    }
  }
}

main().catch(e => { console.error(e.message); process.exit(1) })
