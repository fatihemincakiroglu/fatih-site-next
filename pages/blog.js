import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const POSTS = [
  { slug: 'eticaret-seo-rehberi-2025', baslik: 'E-Ticaret SEO Rehberi 2025: Rakiplerinizin Önüne Geçin', ozet: 'E-ticaret sitelerinin Google\'da üst sıralara çıkması için uygulamanız gereken teknik SEO stratejileri, kategori mimarisi ve içerik optimizasyonu rehberi.', tarih: '15 Ocak 2025', sure: '8 dk', etiket: 'E-Ticaret' },
  { slug: 'google-core-update-2025', baslik: 'Google Core Update 2025: Sitenizi Nasıl Korursunuz?', ozet: 'Google\'ın son algoritma güncellemesi E-E-A-T sinyallerine daha fazla ağırlık veriyor. Sitenizi bu değişikliklere nasıl hazırlarsınız?', tarih: '3 Şubat 2025', sure: '6 dk', etiket: 'Google' },
  { slug: 'teknik-seo-denetim-rehberi', baslik: 'Teknik SEO Denetim Rehberi: Adım Adım Site Audit', ozet: 'Crawl bütçesi, indeksleme sorunları, hız optimizasyonu ve yapılandırılmış veri ile kapsamlı teknik SEO denetimi nasıl yapılır?', tarih: '10 Şubat 2025', sure: '12 dk', etiket: 'Teknik SEO' },
  { slug: 'topical-authority-rehberi', baslik: 'Topical Authority Nedir ve Nasıl İnşa Edilir?', ozet: 'Konu otoritesi inşa etmek için içerik kümeleme stratejileri, pillar page yapısı ve semantik SEO teknikleri hakkında kapsamlı rehber.', tarih: '18 Şubat 2025', sure: '10 dk', etiket: 'SEO' },
  { slug: 'trendyol-seo-ipuclari', baslik: 'Trendyol\'da Üst Sıralara Çıkmanın 10 Yolu', ozet: 'Trendyol arama algoritmasını anlayın, ürün başlığı optimizasyonu, kategori yapısı ve satış metrikleriyle üst sıralara çıkın.', tarih: '20 Şubat 2025', sure: '5 dk', etiket: 'E-Ticaret' },
  { slug: 'core-web-vitals-optimizasyon', baslik: 'Core Web Vitals Optimizasyonu: LCP, INP ve CLS Rehberi', ozet: 'Google\'ın sıralama faktörü olan Core Web Vitals metriklerini nasıl iyileştirirsiniz? Teknik çözümler ve araç önerileri.', tarih: '28 Şubat 2025', sure: '9 dk', etiket: 'Teknik SEO' },
  { slug: 'yerel-seo-rehberi', baslik: 'Yerel SEO Rehberi: Google Haritalar\'da Öne Çıkın', ozet: 'Google Business Profile optimizasyonu, yerel anahtar kelime stratejisi ve yerel backlink inşası ile işletmenizi öne çıkarın.', tarih: '8 Mart 2025', sure: '7 dk', etiket: 'Yerel SEO' },
  { slug: 'schema-markup-rehberi', baslik: 'Schema Markup Rehberi: Zengin Sonuçlar İçin Yapılandırılmış Veri', ozet: 'JSON-LD ile schema markup nasıl eklenir? Ürün, makale, SSS ve yerel işletme şemaları ile zengin arama sonuçları elde edin.', tarih: '15 Mart 2025', sure: '8 dk', etiket: 'Teknik SEO' },
  { slug: 'google-ads-optimizasyon', baslik: 'Google Ads Bütçenizi Optimize Etmenin 7 Yolu', ozet: 'ROAS ve CPA optimizasyonu, akıllı teklif stratejileri ve reklam kalite puanı iyileştirme teknikleriyle bütçenizi verimli kullanın.', tarih: '22 Mart 2025', sure: '6 dk', etiket: 'Google Ads' },
  { slug: 'backlink-stratejisi-2025', baslik: 'Backlink Stratejisi 2025: Kaliteli Link İnşası', ozet: 'Dijital PR, broken link building ve rakip analizi ile yüksek otoriteli backlink kazanmanın güncel yöntemleri.', tarih: '1 Nisan 2025', sure: '8 dk', etiket: 'SEO' },
  { slug: 'icerik-stratejisi-2025', baslik: 'İçerik Stratejisi 2025: AI Çağında SEO', ozet: 'Yapay zeka çağında içerik üretimi, topical authority ve içerik kümeleme ile organik trafik nasıl artırılır?', tarih: '5 Nisan 2025', sure: '9 dk', etiket: 'İçerik' },
  { slug: 'geo-nedir', baslik: 'GEO Nedir? Generative Engine Optimization Rehberi', ozet: 'ChatGPT, Perplexity ve Google AI Overview\'da içeriklerinizin kaynak gösterilmesi için GEO stratejileri ve uygulama teknikleri.', tarih: '12 Nisan 2025', sure: '10 dk', etiket: 'AI & GEO' },
  { slug: 'hepsiburada-seo', baslik: 'Hepsiburada\'da Organik Görünürlüğü Artırmanın Yolları', ozet: 'Hepsiburada arama algoritması, ürün optimizasyonu ve kategori sayfası stratejileriyle satışlarınızı artırın.', tarih: '20 Nisan 2025', sure: '6 dk', etiket: 'E-Ticaret' },
  { slug: 'seo-audit-araclari', baslik: 'En İyi SEO Audit Araçları: Karşılaştırmalı Rehber', ozet: 'Ahrefs, SEMrush, Screaming Frog ve Google Search Console\'u karşılaştıran kapsamlı araç rehberi.', tarih: '28 Nisan 2025', sure: '7 dk', etiket: 'SEO' },
  { slug: 'eeat-rehberi', baslik: 'E-E-A-T Rehberi: Google\'ın Güven Sinyalleri', ozet: 'Deneyim, Uzmanlık, Otorite ve Güvenilirlik sinyallerini güçlendirerek Google\'da üst sıralara çıkmanın yolları.', tarih: '5 Mayıs 2025', sure: '8 dk', etiket: 'SEO' },
  { slug: 'mobil-seo-rehberi', baslik: 'Mobil SEO Rehberi: Mobile-First İndeksleme', ozet: 'Google\'ın mobile-first indeksleme politikası kapsamında mobil SEO optimizasyonu nasıl yapılır?', tarih: '12 Mayıs 2025', sure: '7 dk', etiket: 'Teknik SEO' },
  { slug: 'meta-ads-strateji', baslik: 'Meta Ads ile Organik SEO\'yu Birleştirme Stratejisi', ozet: 'Facebook ve Instagram reklamlarından elde edilen veriyi SEO stratejinize entegre ederek maksimum ROI elde edin.', tarih: '20 Mayıs 2025', sure: '8 dk', etiket: 'Google Ads' },
  { slug: 'url-yapisi-seo', baslik: 'SEO için Doğru URL Yapısı Nasıl Oluşturulur?', ozet: 'URL hiyerarşisi, slug optimizasyonu ve canonical tag kullanımı ile teknik SEO puanınızı yükseltin.', tarih: '28 Mayıs 2025', sure: '6 dk', etiket: 'Teknik SEO' },
  { slug: 'keyword-research-2025', baslik: 'Anahtar Kelime Araştırması 2025: Arama Niyeti Odaklı Strateji', ozet: 'Search intent analizi, long-tail keyword stratejisi ve rekabet analizi ile etkili anahtar kelime planlaması.', tarih: '5 Haziran 2025', sure: '9 dk', etiket: 'SEO' },
  { slug: 'crawl-butcesi-optimizasyon', baslik: 'Crawl Bütçesi Optimizasyonu: Büyük Siteler İçin Teknik SEO', ozet: 'Googlebot\'un sitenizi nasıl taradığını anlayın ve crawl bütçenizi optimize ederek indeksleme sorunlarını çözün.', tarih: '12 Haziran 2025', sure: '10 dk', etiket: 'Teknik SEO' },
  { slug: 'internal-linking-stratejisi', baslik: 'İç Linkleme Stratejisi: PageRank Akışını Optimize Edin', ozet: 'Pillar-cluster modeli, anchor text optimizasyonu ve iç link mimarisi ile site otoritenizi artırın.', tarih: '20 Haziran 2025', sure: '7 dk', etiket: 'SEO' },
  { slug: 'hiz-optimizasyonu', baslik: 'Sayfa Hızı Optimizasyonu: Core Web Vitals İçin Teknik Rehber', ozet: 'Image optimization, lazy loading, JavaScript bundle küçültme ve CDN kullanımı ile sayfa hızını artırın.', tarih: '28 Haziran 2025', sure: '11 dk', etiket: 'Teknik SEO' },
  { slug: 'shopify-seo-rehberi', baslik: 'Shopify SEO Rehberi: E-Ticaret Mağazanızı Optimize Edin', ozet: 'Shopify\'da teknik SEO, koleksiyon sayfası optimizasyonu, ürün şeması ve blog içerik stratejisi.', tarih: '5 Temmuz 2025', sure: '10 dk', etiket: 'E-Ticaret' },
  { slug: 'woocommerce-seo', baslik: 'WooCommerce SEO: WordPress E-Ticaret Optimizasyonu', ozet: 'WooCommerce mağazanız için teknik SEO, ürün sayfası optimizasyonu ve kategori yapısı rehberi.', tarih: '12 Temmuz 2025', sure: '9 dk', etiket: 'E-Ticaret' },
  { slug: 'serp-features-rehberi', baslik: 'SERP Özellikleri Rehberi: Featured Snippet ve People Also Ask', ozet: 'Öne çıkan snippet, PAA kutuları ve diğer SERP özelliklerini kazanmak için içerik optimizasyonu teknikleri.', tarih: '20 Temmuz 2025', sure: '8 dk', etiket: 'SEO' },
  { slug: 'uluslararasi-seo', baslik: 'Uluslararası SEO: Hreflang ve Çok Dilli Site Stratejisi', ozet: 'Hreflang implementasyonu, çok dilli URL yapısı ve uluslararası pazar araştırması ile global SEO.', tarih: '28 Temmuz 2025', sure: '10 dk', etiket: 'Teknik SEO' },
  { slug: 'video-seo-rehberi', baslik: 'Video SEO: YouTube ve Google\'da Görünürlük', ozet: 'YouTube optimizasyonu, video şema markup ve video içeriklerini organik aramada öne çıkarma stratejileri.', tarih: '5 Ağustos 2025', sure: '7 dk', etiket: 'İçerik' },
  { slug: 'ai-overview-optimizasyon', baslik: 'Google AI Overview\'da Yer Almanın Yolları', ozet: 'Google\'ın yapay zeka destekli arama özetlerinde kaynak olarak gösterilmek için içerik ve teknik optimizasyon stratejileri.', tarih: '12 Ağustos 2025', sure: '9 dk', etiket: 'AI & GEO' },
  { slug: 'dijital-pr-rehberi', baslik: 'Dijital PR ile Yüksek Otoriteli Backlink Kazanma', ozet: 'Medya ilişkileri, data-driven PR kampanyaları ve editoryal link inşası ile domain otoritenizi artırın.', tarih: '20 Ağustos 2025', sure: '8 dk', etiket: 'SEO' },
  { slug: 'seo-raporu-hazirlama', baslik: 'SEO Raporu Nasıl Hazırlanır? Müşteriye Sunum Rehberi', ozet: 'KPI belirleme, Google Analytics 4 ve Search Console verileri ile profesyonel SEO raporu hazırlama.', tarih: '28 Ağustos 2025', sure: '7 dk', etiket: 'SEO' },
  { slug: 'llmstxt-rehberi', baslik: 'llms.txt Dosyası Nedir ve Nasıl Oluşturulur?', ozet: 'LLM tabanlı sistemler için llms.txt standardı, GEO optimizasyonu ve yapay zeka tarayıcılarıyla uyum.', tarih: '5 Eylül 2025', sure: '6 dk', etiket: 'AI & GEO' },
  { slug: 'content-pruning', baslik: 'Content Pruning: Düşük Kaliteli İçeriği Temizleme Stratejisi', ozet: 'İçerik denetimi, düşük trafikli sayfaların analizi ve içerik temizleme kararları nasıl alınır?', tarih: '12 Eylül 2025', sure: '8 dk', etiket: 'İçerik' },
  { slug: 'redirect-yonetimi', baslik: '301 ve 302 Yönlendirme Yönetimi: SEO\'ya Etkisi', ozet: 'Redirect zinciri, 301 vs 302 farkı, redirect map oluşturma ve site migrasyonunda yönlendirme stratejisi.', tarih: '20 Eylül 2025', sure: '7 dk', etiket: 'Teknik SEO' },
  { slug: 'google-search-console-rehberi', baslik: 'Google Search Console Rehberi: Verileri Nasıl Yorumlarsınız?', ozet: 'Performance raporu, Coverage sorunları, Core Web Vitals ve URL inspection aracını etkin kullanma.', tarih: '28 Eylül 2025', sure: '9 dk', etiket: 'SEO' },
  { slug: 'e-ticaret-crm-seo', baslik: 'CRO ve SEO Entegrasyonu: Organik Trafiği Gelire Dönüştürme', ozet: 'A/B testleri, ısı haritaları ve kullanıcı davranışı analizi ile dönüşüm oranı optimizasyonu.', tarih: '5 Ekim 2025', sure: '8 dk', etiket: 'E-Ticaret' },
  { slug: 'seo-migrasyon-rehberi', baslik: 'SEO Migrasyon Rehberi: Site Taşımalarında Trafik Kaybını Önleyin', ozet: 'Domain değişimi, platform migrasyonu ve URL yapısı güncellemelerinde SEO değerini koruma stratejileri.', tarih: '12 Ekim 2025', sure: '11 dk', etiket: 'Teknik SEO' },
  { slug: 'yerel-seo-gmb', baslik: 'Google Business Profile Optimizasyonu: Eksiksiz Rehber', ozet: 'GBP kategorisi seçimi, fotoğraf optimizasyonu, yorum yönetimi ve yerel arama sıralamasını iyileştirme.', tarih: '20 Ekim 2025', sure: '8 dk', etiket: 'Yerel SEO' },
  { slug: 'anchor-text-stratejisi', baslik: 'Anchor Text Stratejisi: Doğal Link Profili Oluşturma', ozet: 'Exact match, branded ve LSI anchor text dağılımı ile doğal backlink profili oluşturma ve penguin riski yönetimi.', tarih: '28 Ekim 2025', sure: '7 dk', etiket: 'SEO' },
  { slug: 'ses-arama-seo', baslik: 'Sesli Arama SEO: Conversational Keywords Stratejisi', ozet: 'Alexa, Google Assistant ve Siri optimizasyonu için uzun kuyruklu sorular ve featured snippet stratejisi.', tarih: '5 Kasım 2025', sure: '6 dk', etiket: 'SEO' },
  { slug: 'siyah-cuma-seo', baslik: 'Black Friday SEO: Sezonsal Kampanyalar İçin Strateji', ozet: 'Sezonsal içerik planlama, geçici sayfa vs kalıcı sayfa kararları ve indirim dönemi SEO taktikleri.', tarih: '12 Kasım 2025', sure: '7 dk', etiket: 'E-Ticaret' },
  { slug: 'chatgpt-seo-araclari', baslik: 'ChatGPT ve AI Araçlarını SEO\'da Kullanma', ozet: 'İçerik üretimi, anahtar kelime araştırması ve rakip analizi için yapay zeka araçlarını nasıl entegre edersiniz?', tarih: '20 Kasım 2025', sure: '9 dk', etiket: 'AI & GEO' },
  { slug: 'pagespeed-insights', baslik: 'PageSpeed Insights Puanı Nasıl Artırılır?', ozet: 'Google PageSpeed Insights önerilerini uygulama, render-blocking kaynaklar ve performans bütçesi yönetimi.', tarih: '28 Kasım 2025', sure: '8 dk', etiket: 'Teknik SEO' },
  { slug: 'e-ticaret-icerik-stratejisi', baslik: 'E-Ticaret İçerik Stratejisi: Ürün ve Kategori Sayfaları', ozet: 'Ürün açıklaması yazımı, kategori sayfası içeriği ve alıcı kılavuzları ile e-ticaret SEO içerik planlaması.', tarih: '5 Aralık 2025', sure: '9 dk', etiket: 'İçerik' },
  { slug: 'seo-2026-trendler', baslik: "2026'da Öne Çıkan 10 SEO Trendi", ozet: "Query fan-out'tan marka inşasına, yapay zeka aramadan içerik mühendisliğine 2026'nın kritik SEO trendleri.", tarih: '1 Ocak 2026', sure: '10 dk', etiket: 'SEO' },
  { slug: 'perplexity-seo', baslik: 'Perplexity\'de Kaynak Olarak Görünmenin Yolları', ozet: 'Perplexity AI arama motorunda içeriklerinizin alıntılanması için içerik yapısı ve otorite sinyalleri stratejisi.', tarih: '10 Ocak 2026', sure: '7 dk', etiket: 'AI & GEO' },
  { slug: 'sitelink-sitelinkler', baslik: 'Google Sitelink\'leri Nasıl Kazanırsınız?', ozet: 'Site mimarisi, navigasyon optimizasyonu ve marka aramaları ile Google sitelink\'lerini tetikleme stratejileri.', tarih: '20 Ocak 2026', sure: '6 dk', etiket: 'SEO' },
  { slug: 'robots-txt-rehberi', baslik: 'robots.txt Rehberi: Doğru Konfigürasyon', ozet: 'robots.txt sözdizimi, izin/engel direktifleri, sitemap bildirimi ve crawl bütçesi yönetimi için doğru konfigürasyon.', tarih: '1 Şubat 2026', sure: '7 dk', etiket: 'Teknik SEO' },
  { slug: 'zero-click-seo', baslik: 'Zero-Click Search\'te Görünürlük Stratejisi', ozet: 'Tıklamasız aramalar çağında marka görünürlüğü, bilgi paneli optimizasyonu ve featured snippet kazanma taktikleri.', tarih: '10 Şubat 2026', sure: '8 dk', etiket: 'SEO' },
  { slug: 'seo-ajans-secimi', baslik: 'SEO Ajansı veya Danışman Seçerken Dikkat Edilecekler', ozet: 'Garantili sıralama vaatleri, şeffaf raporlama ve referans kontrolü ile doğru SEO partneri nasıl seçilir?', tarih: '20 Şubat 2026', sure: '6 dk', etiket: 'SEO' },
];

const ETIKETLER = ['Tümü', 'SEO', 'Teknik SEO', 'E-Ticaret', 'Yerel SEO', 'Google Ads', 'İçerik', 'AI & GEO'];

const ETIKET_RENKLERI = {
  'SEO': { bg: '#fff3ee', color: '#e8560a' },
  'Teknik SEO': { bg: '#e0f2fe', color: '#0369a1' },
  'E-Ticaret': { bg: '#dcfce7', color: '#15803d' },
  'Yerel SEO': { bg: '#fef9c3', color: '#a16207' },
  'Google Ads': { bg: '#f3e8ff', color: '#7c3aed' },
  'İçerik': { bg: '#fce7f3', color: '#be185d' },
  'AI & GEO': { bg: '#e0f2fe', color: '#0284c7' },
};

export default function Page() {
    const router = useRouter()
  const [aktif, setAktif] = useState('Tümü');
  const [arama, setArama] = useState('');

  const filtered = POSTS
    .filter(p => aktif === 'Tümü' || p.etiket === aktif)
    .filter(p => !arama || p.baslik.toLowerCase().includes(arama.toLowerCase()) || p.ozet.toLowerCase().includes(arama.toLowerCase()));

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <Head>
        <title>{router.locale === 'en' ? 'Blog | Fatih Emin Çakıroğlu — SEO & Digital Marketing' : 'Blog | Fatih Emin Çakıroğlu — SEO & Dijital Pazarlama'}</title>
        <meta name="description" content={router.locale === 'en' ? 'Current articles on SEO, GEO and digital marketing.' : 'SEO, GEO ve dijital pazarlama üzerine güncel makaleler.'} />
        <link rel="canonical" href={router.locale === 'en' ? 'https://fatihemincakiroglu.com/en/blog' : 'https://fatihemincakiroglu.com/blog'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/blog" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/blog" />
        <link rel="alternate" hrefLang="x-default" href="https://fatihemincakiroglu.com/blog" />
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "Blog", "name": "Fatih Emin Çakıroğlu Blog", "url": "https://fatihemincakiroglu.com/blog", "description": "SEO, GEO ve dijital pazarlama üzerine güncel makaleler.", "author": {"@id": "https://fatihemincakiroglu.com/#person"}, "publisher": {"@type": "Person", "name": "Fatih Emin Çakıroğlu"}})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://fatihemincakiroglu.com"}, {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://fatihemincakiroglu.com/blog"}]})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>
        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>Ana Sayfa</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>Blog</span>
          </div>
        </div>


        {/* Header — açık tema */}
        <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '48px 32px 40px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--orange)', letterSpacing: '2px', textTransform: 'uppercase' }}>BLOG</span>
              <span style={{ fontSize: '11px', color: '#ccc' }}>·</span>
              <span style={{ fontSize: '11px', color: '#999' }}>{POSTS.length} yazı</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, color: '#111', lineHeight: 1.1, marginBottom: '12px' }}>
              SEO & Dijital Pazarlama<br />
              <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Yazıları</span>
            </h1>
            <p style={{ color: '#777', fontSize: '16px', maxWidth: '520px', lineHeight: 1.6 }}>
              Teknik SEO, e-ticaret optimizasyonu ve yapay zeka araması hakkında güncel stratejiler ve içgörüler.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '32px 32px 96px' }}>

          {/* Arama + Filtre */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '8px 14px', flex: '0 0 280px' }}>
              <span style={{ color: '#aaa' }}>🔍</span>
              <input type="text" placeholder="Yazılarda ara..." value={arama} onChange={e => setArama(e.target.value)}
                style={{ border: 'none', outline: 'none', fontSize: '14px', color: '#333', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {ETIKETLER.map(e => (
                <button key={e} onClick={() => setAktif(e)} style={{
                  padding: '7px 14px', borderRadius: '20px',
                  background: aktif === e ? 'var(--orange)' : '#fff',
                  color: aktif === e ? '#fff' : '#555',
                  border: aktif === e ? 'none' : '1px solid #eee',
                  fontSize: '13px', fontWeight: aktif === e ? 700 : 400,
                  cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s',
                }}>{e}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: '#aaa' }}>Sonuç bulunamadı.</div>
          )}

          {/* Featured */}
          {featured && (
            <Link href={`/blog/${featured.slug}`} style={{ display: 'block', marginBottom: '24px', textDecoration: 'none' }}>
              <article style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #eee', display: 'grid', gridTemplateColumns: '1fr 1fr', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ background: 'linear-gradient(135deg, #1a1612 0%, #2a1a0a 100%)', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '280px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(232,86,10,0.08)' }}></div>
                  <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>ÖNE ÇIKAN · {featured.etiket}</span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#fff', fontWeight: 800, lineHeight: 1.3, marginBottom: '10px' }}>{featured.baslik}</h2>
                  <div style={{ fontSize: '12px', color: '#6b6b6b' }}>{featured.sure} okuma · {featured.tarih}</div>
                </div>
                <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <EtiketBadge etiket={featured.etiket} />
                    <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.7, marginTop: '12px' }}>{featured.ozet}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ fontSize: '13px', color: '#aaa' }}>Fatih Emin Çakıroğlu</span>
                    <span style={{ color: 'var(--orange)', fontSize: '14px', fontWeight: 600 }}>Makaleyi oku →</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {rest.map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee', height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.07)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <EtiketBadge etiket={post.etiket} />
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111', margin: '12px 0 8px', lineHeight: 1.4 }}>{post.baslik}</h3>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, flex: 1 }}>{post.ozet}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f5f5f5' }}>
                    <span style={{ fontSize: '12px', color: '#bbb' }}>{post.tarih}</span>
                    <span style={{ fontSize: '12px', color: 'var(--orange)', fontWeight: 600 }}>{post.sure} →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function EtiketBadge({ etiket }) {
  const renk = ETIKET_RENKLERI[etiket] || { bg: '#f5f5f5', color: '#555' };
  return (
    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '4px', background: renk.bg, color: renk.color, fontSize: '11px', fontWeight: 700 }}>{etiket}</span>
  );
}

export async function getServerSideProps() { return { props: {} } }
