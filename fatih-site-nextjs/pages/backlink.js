import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const LINK_TURLERI = {
  tr: [
    { tur: 'Editoryal Link', aciklama: 'Gazeteciler ve blog yazarlarının içeriğinizi kaynak olarak gösterdiği doğal linkler', deger: 10, renk: '#16a34a' },
    { tur: 'Misafir Yazarlık', aciklama: 'Sektör yayınlarında yazdığınız makalelerde yer alan linkler', deger: 7, renk: '#0ea5e9' },
    { tur: 'Dizin Linkleri', aciklama: 'Nişe özel otoriter rehber ve dizinlerden gelen linkler', deger: 4, renk: '#f59e0b' },
    { tur: 'Forum/Topluluk', aciklama: 'Reddit, Quora gibi platformlardaki bağlamsal linkler', deger: 2, renk: '#8b5cf6' },
    { tur: 'PBN / Ücretli', aciklama: 'Satın alınan veya link çiftliği kaynaklı riskli linkler', deger: -3, renk: '#dc2626' },
  ],
  en: [
    { tur: 'Editorial Link', aciklama: 'Natural links where journalists and bloggers cite your content as a source', deger: 10, renk: '#16a34a' },
    { tur: 'Guest Post', aciklama: 'Links in articles you write for industry publications', deger: 7, renk: '#0ea5e9' },
    { tur: 'Directory Links', aciklama: 'Links from authoritative niche-specific guides and directories', deger: 4, renk: '#f59e0b' },
    { tur: 'Forum/Community', aciklama: 'Contextual links on platforms like Reddit and Quora', deger: 2, renk: '#8b5cf6' },
    { tur: 'PBN / Paid', aciklama: 'Risky links from purchased sources or link farms', deger: -3, renk: '#dc2626' },
  ],
}

const HIZMETLER = {
  tr: [
    { ikon: '📰', baslik: 'Editoryal ve Kazanılmış Link Building', aciklama: 'Orijinal araştırma, veri ve haber değeri taşıyan içeriklerle gazeteci ve blog yazarlarından organik backlink kazanımı.', badge: 'En Değerli' },
    { ikon: '📡', baslik: 'Media Outreach', aciklama: 'Sektör medyasına, haber sitelerine ve etki alanı yüksek yayınlara sistematik ulaşım ve yayın süreci yönetimi.', badge: '' },
    { ikon: '✍️', baslik: 'Guest Post Stratejisi', aciklama: 'Nişle alakalı, otoriter sitelerde yayınlanan yüksek kaliteli konuk makaleleriyle backlink ve marka görünürlüğü.', badge: '' },
    { ikon: '🔍', baslik: 'Rakip Backlink Analizi', aciklama: 'Rakiplerinizin tüm backlink profilini analiz edip sizin eksik olduğunuz kaynaklara yönelik hedefli outreach stratejisi.', badge: '' },
    { ikon: '🔗', baslik: 'Broken Link Building', aciklama: 'Hedef sitelerdeki kırık dış linkleri tespit edip içeriğinizi alternatif kaynak olarak önerme stratejisi.', badge: 'Yüksek Dönüşüm' },
    { ikon: '📁', baslik: 'Niş Dizin & Sektörel Linkler', aciklama: 'Sektörünüze özel otoriter rehber, dernek ve platform listelerine kayıt ve citation inşası.', badge: '' },
  ],
  en: [
    { ikon: '📰', baslik: 'Editorial & Earned Link Building', aciklama: 'Earning organic backlinks from journalists and bloggers through original research, data and newsworthy content.', badge: 'Most Valuable' },
    { ikon: '📡', baslik: 'Media Outreach', aciklama: 'Systematic outreach to industry media, news sites and high-authority publications with full publication process management.', badge: '' },
    { ikon: '✍️', baslik: 'Guest Post Strategy', aciklama: 'Backlinks and brand visibility through high-quality guest articles published on authoritative, niche-relevant sites.', badge: '' },
    { ikon: '🔍', baslik: 'Competitor Backlink Analysis', aciklama: 'Analyzing your competitors\' full backlink profile and building a targeted outreach strategy toward sources you\'re missing.', badge: '' },
    { ikon: '🔗', baslik: 'Broken Link Building', aciklama: 'Identifying broken external links on target sites and proposing your content as the alternative source.', badge: 'High Conversion' },
    { ikon: '📁', baslik: 'Niche Directory & Sector Links', aciklama: 'Registration and citation building in authoritative industry-specific guides, associations and platforms.', badge: '' },
  ],
}

const SUREC_ADIMLARI = {
  tr: [
    { no: '01', baslik: 'Hedef ve Rakip Analizi', aciklama: 'Mevcut backlink profilinizi, rakiplerinizin link kaynaklarını ve sektördeki otorite sitelerini kapsamlı biçimde analiz ederim. Ahrefs ve SEMrush\'la link gap tespiti yaparım.' },
    { no: '02', baslik: 'İçerik & Haber Açısı', aciklama: 'Gazeteci ve blog yazarlarının bağlantı kurmak isteyeceği, haber değeri taşıyan içerik fikirleri geliştiririm. Araştırma, anket, infografik veya uzman görüşü formatları belirlenir.' },
    { no: '03', baslik: 'Medya & Site Listesi', aciklama: 'Hedef kitleyle örtüşen, yüksek domain authority\'ye sahip siteleri ve gazetecileri listelerim. Her hedef için kişiselleştirilmiş iletişim stratejisi planlarım.' },
    { no: '04', baslik: 'Outreach & Yayın', aciklama: 'Editörlere, gazetecilere ve blog yazarlarına kişiselleştirilmiş ulaşım e-postaları gönderirim. Takip sürecini yönetir, yayın onaylarını takip ederim.' },
    { no: '05', baslik: 'Raporlama & Etki Ölçümü', aciklama: 'Kazanılan linkleri, domain authority değişimini, organik trafik etkisini ve sıralama gelişimini aylık raporlarla paylaşırım.' },
  ],
  en: [
    { no: '01', baslik: 'Target & Competitor Analysis', aciklama: 'I comprehensively analyze your existing backlink profile, competitor link sources and authoritative sites in your industry. I identify link gaps with Ahrefs and SEMrush.' },
    { no: '02', baslik: 'Content & News Angle', aciklama: 'I develop newsworthy content ideas that journalists and bloggers will want to link to. Research, surveys, infographics or expert opinion formats are determined.' },
    { no: '03', baslik: 'Media & Site List', aciklama: 'I list sites and journalists with high domain authority that align with your target audience. I plan a personalized communication strategy for each target.' },
    { no: '04', baslik: 'Outreach & Publication', aciklama: 'I send personalized outreach emails to editors, journalists and bloggers. I manage the follow-up process and track publication approvals.' },
    { no: '05', baslik: 'Reporting & Impact Measurement', aciklama: 'I share earned links, domain authority changes, organic traffic impact and ranking improvements through monthly reports.' },
  ],
}

const SEKTORLER = {
  tr: [
    { ikon: '🛍️', baslik: 'E-Ticaret & Marka', detay: 'Ürün kategorileri, marka PR kampanyaları ve influencer kaynaklı editoryal linkler. Yüksek rekabetli anahtar kelimelerde ürün sayfası sıralaması için kritik.' },
    { ikon: '💻', baslik: 'SaaS & Teknoloji', detay: 'Ürün review linkleri, karşılaştırma sayfaları, teknoloji medyası outreach ve kurumsal blog guest post kampanyaları.' },
    { ikon: '⚖️', baslik: 'Finans, Hukuk, Sağlık (YMYL)', detay: 'Google\'ın en yüksek E-E-A-T standardını uyguladığı sektörlerde otoriter kaynaklardan editoryal linkler hayati önem taşır.' },
    { ikon: '🏪', baslik: 'KOBİ\'ler & Yerel İşletmeler', detay: 'Yerel medya outreach, sektörel dernek üyelikleri, NAP citation inşası ve bölgesel blog network linkler.' },
  ],
  en: [
    { ikon: '🛍️', baslik: 'E-Commerce & Brands', detay: 'Product category editorial links, brand PR campaigns and influencer-sourced links. Critical for product page rankings in highly competitive keywords.' },
    { ikon: '💻', baslik: 'SaaS & Technology', detay: 'Product review links, comparison pages, tech media outreach and corporate blog guest post campaigns.' },
    { ikon: '⚖️', baslik: 'Finance, Legal, Health (YMYL)', detay: 'Editorial links from authoritative sources are vital in sectors where Google applies its highest E-E-A-T standards.' },
    { ikon: '🏪', baslik: 'SMBs & Local Businesses', detay: 'Local media outreach, industry association memberships, NAP citation building and regional blog network links.' },
  ],
}

const FAQS = {
  tr: [
    { s: 'Backlink satın almak güvenli midir?', c: 'Hayır. Google\'ın link satın alma politikasına aykırı olan bu uygulama, manuel ceza veya algoritmik değer düşürme riskiyle birlikte gelir. Etik ve sürdürülebilir tek yol; editöryal, kazanılmış backlink inşasıdır.' },
    { s: 'Kaç backlink gereklidir?', c: 'Sayı değil kalite önemlidir. Tek bir otoriter kaynaktan (DA 80+) gelen editoryal link, 100 düşük kaliteli linkten daha değerlidir. Hedef, sektörünüzdeki en güçlü rakibin profiliyle rekabet edebilecek bir link profili inşa etmektir.' },
    { s: 'Dijital PR ile backlink aynı şey midir?', c: 'Hayır, ancak birbiriyle örtüşür. Dijital PR; marka bilinirliği, medya görünürlüğü ve itibar yönetimini kapsarken backlink bunun yan ürünüdür. En etkili strateji, ikisini birlikte yürütmektir.' },
    { s: 'Backlink çalışmasını kendiniz yapabilir misiniz?', c: 'Teknik olarak evet, ancak etkili outreach beceri, zaman ve sektör ilişkileri gerektirir. Başarılı bir outreach kampanyasında dönüşüm oranı genellikle %5-15\'tir; bu yoğun ve sürekli bir çaba anlamına gelir.' },
    { s: 'Backlink\'lerin etkisi ne zaman görülür?', c: 'Linkler Google tarafından genellikle 1-4 haftada indexlenir. Sıralama etkisi 4-12 hafta içinde başlar; backlink profilinin güçlenmesiyle birlikte etki zaman içinde birikerek artar.' },
  ],
  en: [
    { s: 'Is it safe to buy backlinks?', c: 'No. This practice violates Google\'s link buying policy and carries the risk of manual penalties or algorithmic devaluation. The only ethical and sustainable path is editorial, earned link building.' },
    { s: 'How many backlinks are needed?', c: 'Quality matters more than quantity. A single editorial link from an authoritative source (DA 80+) is more valuable than 100 low-quality links. The goal is to build a link profile that can compete with the strongest competitor in your industry.' },
    { s: 'Is digital PR the same as backlinks?', c: 'No, but they overlap. Digital PR encompasses brand awareness, media visibility and reputation management, with backlinks as a byproduct. The most effective strategy is running both together.' },
    { s: 'Can you do link building yourself?', c: 'Technically yes, but effective outreach requires skill, time and industry relationships. The conversion rate in a successful outreach campaign is typically 5-15%, meaning it requires intense and continuous effort.' },
    { s: 'When do backlinks show results?', c: 'Links are typically indexed by Google within 1-4 weeks. Ranking impact starts within 4-12 weeks; as the backlink profile strengthens, the effect grows cumulatively over time.' },
  ],
}

const ISTATISTIKLER = [
  { rakam: '#3', tr: 'Backlink — Google\'ın en önemli sıralama faktörlerinden', en: 'Backlinks — one of Google\'s top ranking factors' },
  { rakam: '%91', tr: 'İnternet sayfalarının hiç backlink almadığı gerçeği (Ahrefs)', en: 'Web pages that have no backlinks at all (Ahrefs)' },
  { rakam: '3.8x', tr: 'Güçlü backlink profilinin getirdiği sıralama artış katsayısı', en: 'Ranking multiplier from a strong backlink profile' },
  { rakam: '%65', tr: 'Üst sıraların backlink sayısıyla ilişki oranı (SEMrush)', en: 'Correlation of top rankings with backlink count (SEMrush)' },
]

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifFaq, setAktifFaq] = useState(null)
  const [aktifSurec, setAktifSurec] = useState(0)

  const hizmetler = isEn ? HIZMETLER.en : HIZMETLER.tr
  const surec = isEn ? SUREC_ADIMLARI.en : SUREC_ADIMLARI.tr
  const faqlar = isEn ? FAQS.en : FAQS.tr
  const sektorler = isEn ? SEKTORLER.en : SEKTORLER.tr
  const linkTurleri = isEn ? LINK_TURLERI.en : LINK_TURLERI.tr

  const t = isEn ? {
    badge: 'BACKLINK & DIGITAL PR',
    h1a: 'Backlink & Digital PR Services:',
    h1b: 'Grow Your Authority Organically',
    h1alt: 'Rise to the Top of Google with Backlinks & Digital PR',
    desc: 'A site with great content but poor authority will never beat a competitor with a strong backlink profile. I build high-quality, editorial backlinks through digital PR strategies that drive both rankings and brand credibility.',
    btn1: 'Get a Free Link Audit →',
    btn2: 'View Results',
    what_h2: 'What is a Backlink and Why Does It Matter?',
    what_p: 'A backlink is a link from another website pointing to yours. Search engines treat these as "votes of confidence" — the more high-quality votes your site receives, the more authority it carries in rankings. Backlinks have been a top-3 ranking factor for over a decade.',
    how_h3: 'How Search Engines Evaluate Backlinks',
    how_p: 'Not all backlinks are equal. Google evaluates each link on multiple dimensions: the authority of the linking domain, the relevance of the linking page to your content, the placement of the link (body text vs footer), the anchor text used, and whether the link is dofollow or nofollow.',
    kalite_h3: 'Quality vs. Spam Backlinks',
    da_h3: 'Domain Authority & Backlinks',
    da_p: 'Domain Authority (DA) is a score from 1-100 that predicts ranking strength. Sites with higher DA consistently outrank lower DA sites for competitive keywords. Building your DA requires sustained, high-quality link acquisition — there are no shortcuts.',
    pr_h2: 'What is Digital PR? How Does It Connect to SEO?',
    pr_p: 'Digital PR is the practice of earning media coverage and editorial backlinks through newsworthy content, expert positioning and journalist relationships. Unlike traditional PR (which focuses on brand image), Digital PR directly improves search rankings through earned links.',
    pr_farklar_h3: 'Traditional PR vs. Digital PR',
    pr_neden_h3: 'Why Digital PR Links Are More Valuable',
    pr_neden_p: 'Links earned through digital PR come from editorial decisions — a journalist or editor chose to cite you as a source. These editorial links carry the highest trust signals to Google. They\'re also nearly impossible to replicate through paid schemes.',
    pr_marka_h3: 'Brand Awareness + Backlinks: Two Wins at Once',
    pr_marka_p: 'Every successful media placement does double duty: it earns a backlink that improves rankings AND it puts your brand in front of the outlet\'s audience. A single placement in a major industry publication can drive weeks of referred traffic alongside the long-term SEO benefit.',
    hizmetler_h2: 'Our Backlink & Digital PR Services',
    surec_h2: 'How Our Digital PR Process Works',
    sektor_h2: 'Which Industries Benefit?',
    zaman_h2: 'When Will You See Results?',
    zaman_p: 'Backlink campaigns compound over time. Here\'s a realistic timeline:',
    zaman_sure: [
      { sure: '1-4 weeks', aciklama: 'New backlinks get crawled and indexed by Google' },
      { sure: '4-12 weeks', aciklama: 'Initial ranking movements begin as PageRank flows' },
      { sure: '3-6 months', aciklama: 'Meaningful DA growth and competitive keyword improvements' },
      { sure: '6-12 months', aciklama: 'Compounding authority — each new link multiplies the impact of existing links' },
    ],
    olcum_h3: 'How We Measure Campaign Performance',
    olcum_liste: [
      'Earned links (count, DA, relevance score)',
      'Domain Rating / Authority trend over time',
      'Organic keyword ranking changes for target terms',
      'Organic traffic growth attributable to link gains',
      'Brand mention volume and media coverage',
    ],
    faq_h2: 'Frequently Asked Questions',
    cta_h2: 'Review Our Backlink & Digital PR Packages',
    cta_desc: 'Every project starts with a free audit. I\'ll analyze your current link profile, identify gaps and show you exactly what\'s needed to outrank your competitors.',
    cta_btn: 'Start Free Link Audit →',
    cta_btn2: 'View Pricing',
    breadcrumb: ['Home', 'Services', 'Backlink & Digital PR'],
    pr_farklar: [
      ['Focus', 'Brand image, press releases', 'Search rankings + brand coverage'],
      ['Success metric', 'Media mentions, impressions', 'Earned backlinks + traffic'],
      ['Output', 'Brand awareness', 'DA growth, ranking improvement'],
      ['Longevity', 'Short-term campaign', 'Permanent link equity'],
    ],
    pr_fark_cols: ['Dimension', 'Traditional PR', 'Digital PR'],
  } : {
    badge: 'BACKLİNK & DİJİTAL PR',
    h1a: 'Backlink & Dijital PR Hizmetleri:',
    h1b: 'Otoritenizi Organik Olarak Büyütün',
    h1alt: 'Backlink ve Dijital PR ile Google\'da Üst Sıralara Çıkın',
    desc: 'Harika içeriğe sahip ama otoritesi düşük bir site, güçlü backlink profiline sahip rakibini hiçbir zaman geçemez. Dijital PR stratejileriyle hem sıralamaları hem marka güvenilirliğini artıran yüksek kaliteli, editoryal backlinkler inşa ediyorum.',
    btn1: 'Ücretsiz Link Analizi Al →',
    btn2: 'Sonuçları Gör',
    what_h2: 'Backlink Nedir ve Neden Bu Kadar Önemlidir?',
    what_p: 'Backlink, başka bir web sitesinin sizin sitenize verdiği bağlantıdır. Arama motorları bu bağlantıları "güven oyu" olarak değerlendirir — siteniz ne kadar kaliteli oy alırsa, sıralamada o kadar büyük güç taşır. Backlinkler, on yılı aşkın süredir en önemli üç sıralama faktöründen biri olmaya devam etmektedir.',
    how_h3: 'Arama Motorları Backlinkleri Nasıl Değerlendirir?',
    how_p: 'Her backlink eşit değer taşımaz. Google her linki birden fazla boyutta değerlendirir: linki veren domainin otoritesi, link veren sayfanın içeriğinizle alakası, linkin sayfadaki konumu (metin içi veya footer), kullanılan anchor text ve linkin dofollow/nofollow durumu.',
    kalite_h3: 'Kaliteli Backlink ile Spam Backlink Arasındaki Fark',
    da_h3: 'Domain Authority (DA) ve Backlink İlişkisi',
    da_p: 'Domain Authority (DA), sıralama gücünü tahmin eden 1-100 arası bir skorudur. Daha yüksek DA\'ya sahip siteler, rekabetçi anahtar kelimelerde sürekli olarak düşük DA\'lı sitelerin önünde sıralanır. DA\'nızı inşa etmek, sürdürülebilir ve yüksek kaliteli link kazanımı gerektirir — kısa yol yoktur.',
    pr_h2: 'Dijital PR Nedir? SEO ile Bağlantısı Nasıl Kurulur?',
    pr_p: 'Dijital PR, haber değeri taşıyan içerikler, uzman konumlandırması ve gazeteci ilişkileri aracılığıyla medya kapsamı ve editoryal backlinkler kazanma pratiğidir. Geleneksel PR\'ın aksine (marka imajına odaklanır), Dijital PR kazanılan linkler aracılığıyla arama sıralamalarını doğrudan iyileştirir.',
    pr_farklar_h3: 'Geleneksel PR ile Dijital PR Arasındaki Farklar',
    pr_neden_h3: 'Dijital PR ile Kazanılan Linkler Neden Daha Değerlidir?',
    pr_neden_p: 'Dijital PR aracılığıyla kazanılan linkler editoryal kararlardan gelir — bir gazeteci veya editör sizi kaynak olarak göstermeyi tercih etmiştir. Bu editoryal linkler, Google\'a en yüksek güven sinyalini gönderir. Aynı zamanda ücretli yöntemlerle kopyalanması neredeyse imkânsızdır.',
    pr_marka_h3: 'Marka Bilinirliği & Backlink: İki Kazanım Birden',
    pr_marka_p: 'Başarılı her medya yayını çift işlev görür: Sıralamaları iyileştiren bir backlink kazandırır VE markanızı yayının kitlesiyle buluşturur. Büyük bir sektör yayınında tek bir yayın, uzun vadeli SEO faydası yanında haftalarca referral trafik sağlayabilir.',
    hizmetler_h2: 'Backlink & Dijital PR Hizmetlerimiz',
    surec_h2: 'Dijital PR Sürecimiz Nasıl İşler?',
    sektor_h2: 'Hangi Sektörler Bu Hizmetten Yararlanır?',
    zaman_h2: 'Backlink Çalışmalarından Ne Zaman Sonuç Alırsınız?',
    zaman_p: 'Backlink kampanyaları zamanla birikimli etki yaratır. Gerçekçi zaman çizelgesi:',
    zaman_sure: [
      { sure: '1-4 hafta', aciklama: 'Yeni backlinkler Google tarafından taranır ve indexlenir' },
      { sure: '4-12 hafta', aciklama: 'PageRank akışıyla birlikte ilk sıralama hareketleri başlar' },
      { sure: '3-6 ay', aciklama: 'Anlamlı DA büyümesi ve rekabetçi anahtar kelimelerde iyileşme' },
      { sure: '6-12 ay', aciklama: 'Birikmeli otorite — her yeni link, mevcut linklerin etkisini çarpar' },
    ],
    olcum_h3: 'Kampanya Performansı Nasıl Ölçülür?',
    olcum_liste: [
      'Kazanılan linkler (adet, DA, alaka skoru)',
      'Domain Rating / Authority zaman içindeki trendi',
      'Hedef anahtar kelimelerde organik sıralama değişimleri',
      'Link kazanımlarına atfedilen organik trafik artışı',
      'Marka mention hacmi ve medya kapsamı',
    ],
    faq_h2: 'Sıkça Sorulan Sorular',
    cta_h2: 'Backlink & Dijital PR Paketlerimizi İnceleyin',
    cta_desc: 'Her proje ücretsiz bir analizle başlar. Mevcut link profilinizi değerlendirip boşlukları tespit edeceğim ve rakiplerinizi geçmek için tam olarak ne gerektiğini göstereceğim.',
    cta_btn: 'Ücretsiz Link Analizi Başlat →',
    cta_btn2: 'Fiyatlandırmaya Bak',
    breadcrumb: ['Ana Sayfa', 'Hizmetler', 'Backlink & Dijital PR'],
    pr_farklar: [
      ['Odak', 'Marka imajı, basın bülteni', 'Arama sıralaması + marka kapsamı'],
      ['Başarı metriği', 'Medya bahisleri, gösterimler', 'Kazanılan backlink + trafik'],
      ['Çıktı', 'Marka bilinirliği', 'DA büyümesi, sıralama iyileşmesi'],
      ['Kalıcılık', 'Kısa vadeli kampanya', 'Kalıcı link equity'],
    ],
    pr_fark_cols: ['Boyut', 'Geleneksel PR', 'Dijital PR'],
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'Backlink & Digital PR Services | Fatih Emin' : 'Backlink & Dijital PR Hizmetleri | Fatih Emin'}</title>
        <meta name="description" content={isEn ? 'Editorial backlink building and digital PR services to strengthen your domain authority, boost organic visibility and earn lasting positions in Google rankings.' : 'Editoryal backlink inşası ve dijital PR hizmetleriyle domain otoritenizi güçlendirin, organik görünürlüğünüzü artırın ve Google sıralamalarında kalıcı yer kazanın.'} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/backlink-digital-pr' : 'https://fatihemincakiroglu.com/backlink'} />
        <link rel="alternate" hrefLang="tr" href="https://fatihemincakiroglu.com/backlink" />
        <link rel="alternate" hrefLang="en" href="https://fatihemincakiroglu.com/en/backlink-digital-pr" />
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"Service","name":isEn?"Backlink & Digital PR":"Backlink & Dijital PR","provider":{"@id":"https://fatihemincakiroglu.com/#person"},"description":isEn?"Editorial link building and digital PR for organic authority growth.":"Organik otorite büyümesi için editoryal link inşası ve dijital PR."})}</script>
        <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqlar.map(f=>({ "@type":"Question","name":f.s,"acceptedAnswer":{"@type":"Answer","text":f.c} }))})}</script>
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>

        {/* BREADCRUMB */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href="/" style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <Link href={isEn ? '/en/services' : '/hizmetler'} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[1]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[2]}</span>
          </div>
        </div>

        {/* ─── HERO ─── */}
        <section style={{ background: 'linear-gradient(160deg, #0c1a0e 0%, #1a2e1c 50%, #0c1a0e 100%)', padding: '96px 32px 80px', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(22,163,74,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(232,86,10,0.08) 0%, transparent 50%)' }} />
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(22,163,74,0.15)', border: '1px solid rgba(22,163,74,0.3)', fontSize: '11px', fontWeight: 700, color: '#4ade80', letterSpacing: '2px', marginBottom: '24px' }}>
                {t.badge}
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4.5vw, 58px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: '12px' }}>
                <span style={{ display: 'block', marginBottom: '4px' }}>{t.h1a}</span>
                <span style={{ display: 'block', color: '#4ade80' }}>{t.h1b}</span>
              </h1>
              <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--orange)', fontStyle: 'italic', marginBottom: '16px' }}>{t.h1alt}</p>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px' }}>{t.desc}</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '15px 32px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.35)' }}>{t.btn1}</Link>
                <Link href={isEn ? '/en/case-studies' : '/vakalar'} style={{ padding: '15px 32px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>{t.btn2}</Link>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {ISTATISTIKLER.map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '22px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 900, color: i % 2 === 0 ? '#4ade80' : 'var(--orange)', lineHeight: 1, marginBottom: '8px' }}>{s.rakam}</div>
                  <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.5 }}>{isEn ? s.en : s.tr}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── BACKLINK NEDİR ─── */}
        <section style={{ padding: '80px 32px', background: '#fff' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '28px', height: '2px', background: 'var(--orange)' }} />
                  <span style={{ fontSize: '11px', color: '#aaa', fontWeight: 700, letterSpacing: '2px' }}>BACKLINK</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '16px', lineHeight: 1.2 }}>{t.what_h2}</h2>
                <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '28px' }}>{t.what_p}</p>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '4px', height: '18px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />{t.how_h3}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8, marginBottom: '24px' }}>{t.how_p}</p>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '4px', height: '18px', background: '#16a34a', borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />{t.da_h3}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8 }}>{t.da_p}</p>
              </div>

              {/* Link quality spectrum */}
              <div style={{ background: '#faf9f7', borderRadius: '20px', padding: '32px', border: '1px solid #ede8e0' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>{t.kalite_h3}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {linkTurleri.map((l, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: '10px', padding: '14px 16px', border: `1px solid ${l.renk}33`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111', marginBottom: '3px' }}>{l.tur}</div>
                        <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.4 }}>{l.aciklama}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: l.renk }}>{l.deger > 0 ? '+' : ''}{l.deger}</div>
                        <div style={{ fontSize: '10px', color: '#aaa' }}>{isEn ? 'value' : 'değer'}</div>
                        <div style={{ width: '48px', height: '4px', background: '#f0f0f0', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: l.deger > 0 ? `${(l.deger / 10) * 100}%` : '100%', background: l.renk, borderRadius: '2px' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DİJİTAL PR ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{t.pr_h2}</h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.85, marginBottom: '40px', maxWidth: '700px' }}>{t.pr_p}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
              {/* PR Farkları tablosu */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#111', marginBottom: '16px' }}>{t.pr_farklar_h3}</h3>
                <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#1a1612' }}>
                        {t.pr_fark_cols.map((col, i) => (
                          <th key={i} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: i === 2 ? '#4ade80' : '#aaa', letterSpacing: '1px', textTransform: 'uppercase' }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.pr_farklar.map((satir, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: '#111' }}>{satir[0]}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#888' }}>{satir[1]}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>{satir[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PR değeri açıklamaları */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { h3: t.pr_neden_h3, p: t.pr_neden_p },
                  { h3: t.pr_marka_h3, p: t.pr_marka_p },
                ].map((item, i) => (
                  <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '4px', height: '16px', background: 'var(--orange)', borderRadius: '2px', display: 'inline-block', flexShrink: 0 }} />{item.h3}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.75, margin: 0 }}>{item.p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── HİZMETLER ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '40px', textAlign: 'center' }}>{t.hizmetler_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {hizmetler.map((h, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0', transition: 'all 0.2s', position: 'relative' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(22,163,74,0.1)'; e.currentTarget.style.borderColor = 'rgba(22,163,74,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#faf9f7'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#ede8e0'; e.currentTarget.style.transform = 'none' }}>
                  {h.badge && (
                    <span style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '10px', fontWeight: 700, color: '#16a34a', padding: '3px 8px', borderRadius: '4px', background: '#dcfce7', border: '1px solid #bbf7d0' }}>{h.badge}</span>
                  )}
                  <div style={{ fontSize: '32px', marginBottom: '14px' }}>{h.ikon}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', marginBottom: '10px' }}>{h.baslik}</h3>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65 }}>{h.aciklama}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SÜREÇ ─── */}
        <section style={{ padding: '80px 32px', background: '#0c1a0e', borderTop: '1px solid #1a2e1c' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#fff', marginBottom: '40px', textAlign: 'center' }}>{t.surec_h2}</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {surec.map((s, i) => (
                <button key={i} onClick={() => setAktifSurec(i)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: aktifSurec === i ? '#16a34a' : 'rgba(255,255,255,0.06)', color: aktifSurec === i ? '#fff' : '#6b7280', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                  {s.no} {s.baslik}
                </button>
              ))}
            </div>
            <div style={{ background: 'rgba(22,163,74,0.08)', borderRadius: '20px', padding: '40px', border: '1px solid rgba(22,163,74,0.2)', borderLeft: '4px solid #16a34a', maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 900, color: 'rgba(22,163,74,0.3)', lineHeight: 1, marginBottom: '8px' }}>{surec[aktifSurec].no}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, color: '#4ade80', marginBottom: '16px' }}>{surec[aktifSurec].baslik}</h3>
              <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.85, margin: 0 }}>{surec[aktifSurec].aciklama}</p>
            </div>
          </div>
        </section>

        {/* ─── SEKTÖRLER ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '36px', textAlign: 'center' }}>{t.sektor_h2}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {sektorler.map((s, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '16px', padding: '28px', border: '1px solid #ede8e0', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '32px', flexShrink: 0 }}>{s.ikon}</div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: 800, color: '#111', marginBottom: '8px' }}>{s.baslik}</h3>
                    <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.65, margin: 0 }}>{s.detay}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ZAMAN & ÖLÇÜM ─── */}
        <section style={{ padding: '80px 32px', background: '#faf9f7', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 800, color: '#111', marginBottom: '16px', textAlign: 'center' }}>{t.zaman_h2}</h2>
            <p style={{ color: '#777', fontSize: '15px', textAlign: 'center', marginBottom: '40px' }}>{t.zaman_p}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
              {t.zaman_sure.map((z, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #eee', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(to right, #16a34a, #4ade80)`, opacity: (i + 1) / 4 }} />
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, color: '#16a34a', marginBottom: '10px' }}>{z.sure}</div>
                  <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.6, margin: 0 }}>{z.aciklama}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #eee' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, color: '#111', marginBottom: '20px' }}>{t.olcum_h3}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {t.olcum_liste.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: '#faf9f7', borderRadius: '8px', border: '1px solid #ede8e0', fontSize: '14px', color: '#444' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── SSS ─── */}
        <section style={{ padding: '80px 32px', background: '#fff', borderTop: '1px solid #ede8e0' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#111', marginBottom: '32px', textAlign: 'center' }}>{t.faq_h2}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqlar.map((f, i) => (
                <div key={i} style={{ background: '#faf9f7', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <button onClick={() => setAktifFaq(aktifFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#111', flex: 1, lineHeight: 1.4, paddingRight: '16px' }}>{f.s}</span>
                    <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '20px', flexShrink: 0, transition: 'transform 0.2s', transform: aktifFaq === i ? 'rotate(45deg)' : 'none', display: 'inline-block' }}>+</span>
                  </button>
                  {aktifFaq === i && (
                    <div style={{ padding: '0 24px 20px', borderTop: '1px solid #f0f0f0' }}>
                      <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, paddingTop: '16px', margin: 0 }}>{f.c}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '96px 32px', background: 'linear-gradient(160deg, #0c1a0e 0%, #1a2e1c 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(22,163,74,0.12) 0%, transparent 60%)' }} />
          <div style={{ maxWidth: '620px', margin: '0 auto', position: 'relative' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>{t.cta_h2}</h2>
            <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>{t.cta_desc}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={isEn ? '/en/contact' : '/iletisim'} style={{ padding: '16px 36px', background: 'var(--orange)', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', boxShadow: '0 4px 24px rgba(232,86,10,0.4)' }}>{t.cta_btn}</Link>
              <Link href={isEn ? '/en/pricing' : '/fiyatlandirma'} style={{ padding: '16px 36px', background: 'rgba(255,255,255,0.06)', color: '#fff', borderRadius: '8px', fontWeight: 600, fontSize: '16px', fontFamily: 'var(--font-body)', display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)' }}>{t.cta_btn2}</Link>
            </div>
            <p style={{ color: '#1f2937', fontSize: '13px', marginTop: '20px' }}>
              {isEn ? '✓ Free audit · ✓ No commitment · ✓ Custom link strategy' : '✓ Ücretsiz analiz · ✓ Yükümlülük yok · ✓ Özel link stratejisi'}
            </p>
          </div>
        </section>

      </div>
      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; gap: 28px !important; }
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
      `}</style>
    </>
  )
}
export async function getServerSideProps() { return { props: {} } }
