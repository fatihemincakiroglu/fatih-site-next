import { YAYINDAKI_BLOG_SLUGS } from '../lib/content-index'
import { getBlogKapak } from '../lib/blog-kapaklar'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';

const KATEGORILER = {
  tr: [
    { id: 'all',       label: 'Tümü',        renk: '#111',    bg: '#f8f7f5', emoji: '✦' },
    { id: 'technical', label: 'Teknik SEO',   renk: '#e8560a', bg: '#fff7ed', emoji: '⚙️' },
    { id: 'geo',       label: 'GEO',          renk: '#6366f1', bg: '#eef2ff', emoji: '🤖' },
    { id: 'content',   label: 'İçerik',       renk: '#0ea5e9', bg: '#f0f9ff', emoji: '✍️' },
    { id: 'backlink',  label: 'Backlink',      renk: '#16a34a', bg: '#f0fdf4', emoji: '🔗' },
    { id: 'ecommerce', label: 'E-Ticaret',     renk: '#f59e0b', bg: '#fffbeb', emoji: '🛍️' },
    { id: 'analytics', label: 'Analitik',      renk: '#8b5cf6', bg: '#faf5ff', emoji: '📊' },
    { id: 'local',     label: 'Yerel SEO',     renk: '#ec4899', bg: '#fdf2f8', emoji: '📍' },
    { id: 'strategy',  label: 'Strateji',      renk: '#14b8a6', bg: '#f0fdfa', emoji: '🎯' },
  ],
  en: [
    { id: 'all',       label: 'All',          renk: '#111',    bg: '#f8f7f5', emoji: '✦' },
    { id: 'technical', label: 'Technical SEO', renk: '#e8560a', bg: '#fff7ed', emoji: '⚙️' },
    { id: 'geo',       label: 'GEO',          renk: '#6366f1', bg: '#eef2ff', emoji: '🤖' },
    { id: 'content',   label: 'Content',       renk: '#0ea5e9', bg: '#f0f9ff', emoji: '✍️' },
    { id: 'backlink',  label: 'Backlink',      renk: '#16a34a', bg: '#f0fdf4', emoji: '🔗' },
    { id: 'ecommerce', label: 'E-Commerce',    renk: '#f59e0b', bg: '#fffbeb', emoji: '🛍️' },
    { id: 'analytics', label: 'Analytics',     renk: '#8b5cf6', bg: '#faf5ff', emoji: '📊' },
    { id: 'local',     label: 'Local SEO',     renk: '#ec4899', bg: '#fdf2f8', emoji: '📍' },
    { id: 'strategy',  label: 'Strategy',      renk: '#14b8a6', bg: '#f0fdfa', emoji: '🎯' },
  ],
}

const TUM_YAZILAR = [
  // Teknik SEO
  { slug: 'core-web-vitals-2025',      kategori: 'technical', sure: 12, featured: true,
    tr: { baslik: 'Core Web Vitals 2026: LCP, INP ve CLS Optimizasyon Rehberi', ozet: 'Google\'ın sıralama sinyali olarak kullandığı üç kritik metriği nasıl iyileştirirsiniz? Adım adım rehber.' },
    en: { baslik: 'Core Web Vitals 2026: Complete LCP, INP and CLS Optimization Guide', ozet: 'How to improve the three critical metrics Google uses as ranking signals? Step-by-step guide.' },
  },
  // GEO
  { slug: 'turkiye-en-iyi-15-geo-ajansi-2026', kategori: 'geo', sure: 12, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 15 GEO Ajansı - Güncel 2026", ozet: "ChatGPT, Gemini ve Perplexity görünürlüğü için 15 GEO ajansı; ajansa sorulacak 7 soru ve teknik GEO unsurları." },
    en: { baslik: "Turkey's Best 15 GEO Agencies - Updated 2026", ozet: 'Fifteen GEO agencies for visibility in ChatGPT, Gemini and Perplexity, with 7 questions to ask and the key technical GEO factors.' },
  },
  { slug: 'turkiye-en-iyi-10-geo-ajansi-2026', kategori: 'geo', sure: 10, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 10 GEO Ajansı - Güncel 2026", ozet: "GEO ajansı nedir, 2026'da neden önemli? 10 ajans, seçim kriterleri ve SEO ile GEO arasındaki fark." },
    en: { baslik: "Turkey's Best 10 GEO Agencies - Updated 2026", ozet: 'What a GEO agency does and why it matters in 2026: ten agencies, selection criteria and how GEO differs from SEO.' },
  },
  { slug: 'geo-ajansi-nasil-secilir', kategori: 'geo', sure: 12, featured: false,
    tr: { baslik: 'GEO Ajansı Nasıl Seçilir? Kriterler ve Sorulacak Sorular', ozet: 'Metodoloji, SEO altyapısı, entity ve dijital PR yaklaşımı, AI görünürlüğü ölçümü ve garanti vaatleri — GEO ajansı seçerken nelere bakılmalı?' },
    en: { baslik: 'How to Choose a GEO Agency: Criteria and Questions to Ask', ozet: 'Methodology, SEO foundations, entity and digital PR work, AI visibility measurement and guarantee claims — what to look for in a GEO agency.' },
  },
  { slug: 'chatgpt-marka-gorunurlugu', kategori: 'geo', sure: 15, featured: false,
    tr: { baslik: "Markanız ChatGPT'de Nasıl Görünüyor? Adım Adım Ücretsiz Test Yöntemi", ozet: "Soru seti, puanlama, kaynak analizi, robots.txt kontrolü ve GA4'te ChatGPT trafiği: markanızın yapay zekâ görünürlüğünü ücretsiz ölçün." },
    en: { baslik: 'How Does Your Brand Appear in ChatGPT? A Free Step-by-Step Test Method', ozet: 'Question sets, scoring, source analysis, robots.txt checks and ChatGPT traffic in GA4: measure your AI visibility for free.' },
  },
  { slug: 'llms-txt-rehberi',          kategori: 'geo', sure: 13, featured: false,
    tr: { baslik: "llms.txt Nedir? Nasıl Oluşturulur ve 2026'da Gerçekten İşe Yarıyor mu?", ozet: "Google'ın resmi açıklamaları ve bağımsız araştırmalarla llms.txt'nin yapay zekâ görünürlüğüne gerçek etkisi, doğru kullanım alanları ve kurulum adımları." },
    en: { baslik: 'What Is llms.txt? How to Create It and Does It Actually Work in 2026?', ozet: "llms.txt's real effect on AI visibility based on Google's statements and independent research, where it is useful and how to set it up." },
  },
  // İçerik
  // Backlink
  // E-Ticaret
  // Analitik
  // Yerel SEO
  { slug: 'google-business-profile',   kategori: 'local', sure: 17, featured: false,
    tr: { baslik: 'Google Business Profile Optimizasyonu: 2026 İçin Eksiksiz Rehber', ozet: 'Kategori, işletme adı, yorum stratejisi, fotoğraflar, Soru-Cevap sonrası Ask Maps dönemi, ölçüm ve askıya alınma riskleri.' },
    en: { baslik: 'Google Business Profile Optimization: The Complete 2026 Guide', ozet: 'Categories, business name, review strategy, photos, the post-Q&A Ask Maps era, measurement and suspension risks.' },
  },
  // Strateji
  { slug: 'seo-ajansi-fiyatlari',      kategori: 'strategy', sure: 16, featured: false,
    tr: { baslik: 'SEO Ajansı Fiyatları 2026: Aylık SEO Ücretleri Neye Göre Belirlenir?', ozet: 'Freelance, ajans ve kurumsal SEO ücret aralıkları, fiyatlandırma modelleri, gizli maliyetler ve teklif karşılaştırma rehberi.' },
    en: { baslik: 'SEO Agency Pricing in Turkey 2026: What Determines Monthly SEO Fees?', ozet: 'Fee ranges for freelancers, agencies and enterprise SEO, pricing models, hidden costs and how to compare proposals.' },
  },
  { slug: 'seo-uzmani-mi-seo-ajansi-mi', kategori: 'strategy', sure: 14, featured: false,
    tr: { baslik: 'SEO Uzmanı mı, SEO Ajansı mı? Doğru Seçim İçin Kapsamlı Karşılaştırma', ozet: 'Freelance uzman, bağımsız danışman, ajans ve kurum içi ekip: maliyet, kapasite ve risk açısından hangi model size uygun?' },
    en: { baslik: 'SEO Consultant or SEO Agency? A Complete Comparison for the Right Choice', ozet: 'Freelancer, independent consultant, agency or in-house team: which model fits your cost, capacity and risk profile?' },
  },
  { slug: 'seo-ajansi-nasil-secilir',  kategori: 'strategy', sure: 19, featured: false,
    tr: { baslik: "SEO Ajansı Nasıl Seçilir? Kriterler ve Türkiye'den Örnekler", ozet: "Referanslar, şeffaflık ve sektör deneyimi gibi kriterlerle SEO ajansı seçimi — Türkiye'den alfabetik, tarafsız örnekler." },
    en: { baslik: 'How to Choose an SEO Agency: Criteria and Questions to Ask', ozet: 'Choosing an SEO agency based on references, transparency and industry experience — an alphabetical, unranked overview from Turkey.' },
  },
  { slug: 'turkiye-en-iyi-15-dijital-pazarlama-ajansi-2026', kategori: 'strategy', sure: 12, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 15 Dijital Pazarlama Ajansı - Güncel 2026", ozet: "İstanbul'dan 15 dijital pazarlama ajansı — butik performans ekiplerinden global medya ağlarına, alfabetik ve sıralama içermeyen liste." },
    en: { baslik: "Turkey's Best 15 Digital Marketing Agencies - Updated 2026", ozet: 'Fifteen digital marketing agencies in Istanbul, from boutique performance teams to global media networks — alphabetical and unranked.' },
  },
  { slug: 'turkiye-en-iyi-10-dijital-pazarlama-ajansi-2026', kategori: 'strategy', sure: 10, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 10 Dijital Pazarlama Ajansı - Güncel 2026", ozet: "Türkiye genelinden 10 dijital pazarlama ajansı; bölgesel ajansla çalışmanın artıları, eksileri ve fiyatı belirleyen değişkenler." },
    en: { baslik: "Turkey's Best 10 Digital Marketing Agencies - Updated 2026", ozet: 'Ten digital marketing agencies from across Turkey, with the pros and cons of working regionally and the variables that set the price.' },
  },
  { slug: 'turkiye-en-iyi-15-sosyal-medya-ajansi-2026', kategori: 'strategy', sure: 11, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 15 Sosyal Medya Ajansı - Güncel 2026", ozet: "İstanbul, Ankara ve İzmir'den 15 sosyal medya ajansı — alfabetik, sıralama içermeyen liste ve seçim kriterleri." },
    en: { baslik: "Turkey's Best 15 Social Media Agencies - Updated 2026", ozet: 'Fifteen social media agencies from Istanbul, Ankara and Izmir — an alphabetical, unranked list with selection criteria.' },
  },
  { slug: 'turkiye-en-iyi-10-sosyal-medya-ajansi-2026', kategori: 'strategy', sure: 9, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 10 Sosyal Medya Ajansı - Güncel 2026", ozet: "İstanbul, Ankara, İzmir ve Antalya'dan 10 sosyal medya ajansı; sektöre göre değişen ihtiyaçlar ve fiyat değişkenleri." },
    en: { baslik: "Turkey's Best 10 Social Media Agencies - Updated 2026", ozet: 'Ten social media agencies from Istanbul, Ankara, Izmir and Antalya, with sector-specific needs and pricing variables.' },
  },
  { slug: 'sosyal-medya-ajansi-nasil-secilir', kategori: 'strategy', sure: 13, featured: false,
    tr: { baslik: 'Sosyal Medya Ajansı Nasıl Seçilir? Kriterler ve Sorulacak Sorular', ozet: 'Platform seçimi, içerik ve video kapasitesi, reklam yönetimi, raporlama ve sözleşme — teklif görüşmesinde sorulacak somut sorular.' },
    en: { baslik: 'How to Choose a Social Media Agency: Criteria and Questions to Ask', ozet: 'Platform selection, content and video capacity, ad management, reporting and contracts — concrete questions for the proposal meeting.' },
  },
  { slug: 'dijital-pazarlama-ajansi-nasil-secilir', kategori: 'strategy', sure: 10, featured: false,
    tr: { baslik: 'Dijital Pazarlama Ajansı Nasıl Seçilir? Kriterler ve Sorulacak Sorular', ozet: 'Ajans ölçeği, kanal derinliği, ölçümleme altyapısı, ekip erişimi ve sözleşme — nelere bakmalı, ne sormalı?' },
    en: { baslik: 'How to Choose a Digital Marketing Agency: Criteria and Questions to Ask', ozet: 'Agency scale, channel depth, measurement infrastructure, team access and contracts — what to look at and what to ask.' },
  },
  { slug: 'turkiye-en-iyi-15-seo-ajansi-2026', kategori: 'strategy', sure: 10, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 15 SEO Ajansı - Güncel 2026", ozet: "2026 için güncellenen, alfabetik ve sıralama içermeyen 15 tanınmış SEO ajansı listesi ve seçim kriterleri." },
    en: { baslik: "Turkey's Best 15 SEO Agencies - Updated 2026", ozet: 'An alphabetical, unranked list of 15 well-known SEO agencies in Turkey for 2026, plus selection criteria.' },
  },
  { slug: 'turkiye-en-iyi-10-seo-ajansi-2026', kategori: 'strategy', sure: 8, featured: false,
    tr: { baslik: "Türkiye'nin En İyi 10 SEO Ajansı (2026 Güncel)", ozet: "2026 için güncellenen, alfabetik ve sıralama içermeyen 10 tanınmış SEO ajansı listesi ve seçim kriterleri." },
    en: { baslik: "Turkey's Best 10 SEO Agencies (Updated 2026)", ozet: 'An alphabetical, unranked list of 10 well-known SEO agencies in Turkey for 2026, plus selection criteria.' },
  },
  // Ekim 2026
  { slug: 'tarandi-dizine-eklenmemis', kategori: 'technical', sure: 8, featured: false,
    tr: { baslik: "Search Console'da \"Tarandı – şu anda dizine eklenmemiş\" Hatası Nasıl Çözülür?", ozet: "Google sayfanızı taradı ama dizine eklemedi: nedenini URL tipine göre bulun, düzeltin ve doğru süre bekleyin." },
    en: { baslik: "How to Fix \"Crawled – Currently Not Indexed\" in Google Search Console", ozet: "Google crawled your page but did not index it: find the cause by URL type, fix it and wait the right amount of time." },
  },
  { slug: 'cekirdek-guncelleme-trafik-dususu', kategori: 'analytics', sure: 9, featured: false,
    tr: { baslik: "Google Çekirdek Güncellemesi Sonrası Trafik Düştü: Adım Adım Teşhis Listesi", ozet: "Panik yapmadan önce: dönemi doğru seçin, ölçüm ve teknik hataları eleyin, düşüşün hangi sayfa ve sorgularda olduğunu bulun." },
    en: { baslik: "Traffic Dropped After a Google Core Update: A Step-by-Step Diagnosis Checklist", ozet: "Before you panic: pick the right periods, rule out tracking and technical errors, and find which pages and queries lost." },
  },
  { slug: 'programatik-seo', kategori: 'content', sure: 9, featured: false,
    tr: { baslik: "Programatik SEO: Ne Zaman İşe Yarar, Ne Zaman \"Doorway\" Sayfaya Dönüşür?", ozet: "Şablonla binlerce sayfa üretmek ne zaman değer katar, ne zaman spam politikasına takılır? Karar kriterleri ve kontrol listesi." },
    en: { baslik: "Programmatic SEO: When It Works and When It Turns into Doorway Pages", ozet: "When does generating thousands of templated pages add value, and when does it hit spam policies? Criteria and a checklist." },
  },
  { slug: 'e-ticaret-altyapisi-seo-karsilastirma', kategori: 'ecommerce', sure: 9, featured: false,
    tr: { baslik: "ikas, IdeaSoft, T-Soft ve Shopify: SEO Açısından Karşılaştırma", ozet: "Dört e-ticaret altyapısının resmi dokümanlardaki SEO özellikleri ve hangi durumda hangisinin uygun olduğu." },
    en: { baslik: "ikas, IdeaSoft, T-Soft and Shopify: An SEO Comparison", ozet: "Four e-commerce platforms compared on the SEO features their own documentation lists, with a which-fits-when framework." },
  },
  { slug: 'trendyol-magazasi-mi-kendi-site-mi', kategori: 'ecommerce', sure: 8, featured: false,
    tr: { baslik: "Trendyol Mağazası mı, Kendi E-ticaret Siteniz mi? Organik Trafik Açısından Değerlendirme", ozet: "Pazaryeri mağazası ile kendi sitenin organik trafikteki rolleri ve ikisini birlikte kullanmanın yolu." },
    en: { baslik: "Trendyol Store or Your Own E-commerce Site? An Organic Traffic Perspective", ozet: "How a marketplace store and your own site play different roles in organic traffic, and how to run both." },
  },
  { slug: 'avukatlar-icin-seo', kategori: 'local', sure: 8, featured: false,
    tr: { baslik: "Avukatlar İçin SEO: Reklam Yasağına Uyarak Dijital Görünürlük", ozet: "Reklam yasağı altında avukatlar için neyin mümkün, neyin riskli olduğunu ayıran dürüst bir dijital görünürlük çerçevesi." },
    en: { baslik: "SEO for Lawyers in Turkey: Online Visibility Within the Advertising Ban", ozet: "An honest framework for lawyers in Turkey: what is workable online under the advertising ban and what carries risk." },
  },
  { slug: 'dis-klinikleri-yerel-seo', kategori: 'local', sure: 8, featured: false,
    tr: { baslik: "Diş Klinikleri İçin Yerel SEO: Haritalarda Öne Çıkmanın Yolları", ozet: "Diş kliniklerinin harita ve yerel aramalarda görünürlüğü için hekim profili, şube sayfası, yorum ve ölçüm odaklı plan." },
    en: { baslik: "Local SEO for Dental Clinics: How to Stand Out on Google Maps", ozet: "A local search plan for dental clinics: dentist profiles, branch pages, patient reviews and measurement on Google Maps." },
  },
  { slug: 'google-ai-mode-turkiye', kategori: 'geo', sure: 9, featured: false,
    tr: { baslik: "Google AI Mode Türkiye'de: İşletmeler İçin Ne Değişti?", ozet: "AI Modu Türkiye'de: arama davranışında ne değişti, görünmek için ne gerekiyor ve etkisi nasıl ölçülür?" },
    en: { baslik: "Google AI Mode in Türkiye: What Changed for Businesses?", ozet: "AI Mode in Türkiye: how search behaviour shifts, what it takes to appear and how to measure the impact." },
  },
  { slug: 'perplexity-kaynak-gosterilme', kategori: 'geo', sure: 9, featured: false,
    tr: { baslik: "Perplexity'de Markanız Nasıl Kaynak Gösterilir?", ozet: "Perplexity'nin kaynak gösterme mantığı, PerplexityBot erişimi ve markanızın cevaplarda kaynak olarak yer alma yolları." },
    en: { baslik: "How Does Your Brand Get Cited in Perplexity?", ozet: "How Perplexity cites sources, how PerplexityBot access works and how your brand can show up as a cited source." },
  },
  { slug: 'marka-bahsi-brand-mention', kategori: 'backlink', sure: 9, featured: false,
    tr: { baslik: "Marka Bahsi (Brand Mention) Nedir? Linksiz Bahsin SEO ve GEO'daki Yeri", ozet: "Linksiz marka bahsi SEO'da ve yapay zekâ cevaplarında ne işe yarar, hangi bahis değerlidir, nasıl izlenir?" },
    en: { baslik: "What Is a Brand Mention? The Role of Unlinked Mentions in SEO and GEO", ozet: "What unlinked brand mentions do for SEO and AI answers, which mentions are valuable and how to track them." },
  },
  { slug: 'yoast-mu-rank-math-mi', kategori: 'technical', sure: 9, featured: false,
    tr: { baslik: "Yoast mu Rank Math mi? 2026'da WordPress SEO Eklentisi Seçimi", ozet: "Yoast SEO ve Rank Math'in resmi dokümanlardaki özellikleri, eklenti değiştirme adımları ve hangi site için hangisi." },
    en: { baslik: "Yoast or Rank Math? Choosing a WordPress SEO Plugin in 2026", ozet: "Yoast SEO and Rank Math compared on documented features, with safe switching steps and a which-fits-when view." },
  },
  { slug: 'yapay-zeka-icerik-google-politikasi', kategori: 'content', sure: 9, featured: false,
    tr: { baslik: "Yapay Zekâ ile Üretilen İçerik ve Google: Resmi Politika Ne Diyor?", ozet: "Google yapay zekâ içeriğine nasıl bakıyor? Resmi açıklamalar, spam politikası ve güvenli bir yayın akışı." },
    en: { baslik: "AI-Generated Content and Google: What Does the Official Policy Say?", ozet: "How Google treats AI-generated content: official statements, the spam policy and a safe publishing workflow." },
  },
  { slug: 'ga4-yapay-zeka-trafigi', kategori: 'analytics', sure: 8, featured: false,
    tr: { baslik: "GA4'te ChatGPT ve Perplexity Trafiğini Ayrı Görmek", ozet: "GA4'te yapay zekâ asistanlarından gelen ziyaretleri referrer bazlı ayırmanın pratik yolları ve verinin sınırları." },
    en: { baslik: "Seeing ChatGPT and Perplexity Traffic Separately in GA4", ozet: "Practical, referrer-based ways to separate AI assistant visits in GA4, plus the limits of the data." },
  },
  { slug: 'seo-mu-google-ads-mi', kategori: 'strategy', sure: 8, featured: false,
    tr: { baslik: "SEO mu Google Ads mi? Bütçeyi Nasıl Bölmeli?", ozet: "SEO ve Google Ads'i rakip değil, aşamalara göre ağırlığı değişen iki kanal olarak planlamak için karar çerçevesi." },
    en: { baslik: "SEO or Google Ads? How Should You Split Your Budget?", ozet: "A decision framework for treating SEO and Google Ads as two channels whose weight shifts by stage, not as rivals." },
  },
  { slug: 'google-yorumlarina-cevap', kategori: 'local', sure: 9, featured: false,
    tr: { baslik: "Google Yorumlarına Nasıl Cevap Verilir? Olumsuz Yorum Örnekleriyle", ozet: "Olumlu ve olumsuz Google yorumlarına cevap verme ilkeleri, kurgusal cevap örnekleri ve yorum bildirme süreci." },
    en: { baslik: "How to Respond to Google Reviews, With Negative Review Examples", ozet: "Principles for replying to positive and negative Google reviews, fictional reply examples and the review reporting process." },
  },
  // Ekim 2026 (2. dalga)
  { slug: '301-302-yonlendirme', kategori: 'technical', sure: 7, featured: false,
    tr: { baslik: "301 ve 302 Yönlendirme Farkı: Hangi Durumda Hangisi?", ozet: "Kalıcı mı geçici mi? 301, 302, 307 ve 308'i doğru seçmek, zincirleri temizlemek ve kuralları hatasız yazmak için rehber." },
    en: { baslik: "301 vs 302 Redirects: Which One to Use and When", ozet: "Permanent or temporary? How to pick between 301, 302, 307 and 308, clean up chains and write redirect rules without errors." },
  },
  { slug: 'anchor-text', kategori: 'backlink', sure: 7, featured: false,
    tr: { baslik: "Anchor Text (Bağlantı Metni) Stratejisi: Doğal Bir Link Profili", ozet: "Marka, tam eşleşme, genel ve URL anchor'ları: aşırı optimizasyona düşmeden doğal bir bağlantı metni profili kurmak." },
    en: { baslik: "Anchor Text Strategy: Building a Natural Link Profile", ozet: "Brand, exact-match, generic and URL anchors: building a natural anchor text profile without over-optimizing." },
  },
  { slug: 'black-friday-seo', kategori: 'ecommerce', sure: 7, featured: false,
    tr: { baslik: "Black Friday ve Kasım İndirimleri İçin SEO: Sezonluk Sayfa Stratejisi", ozet: "Kasım indirim sayfası için kalıcı URL, hazırlık takvimi, yerel terimler ve kampanya sonrası yapılacaklar." },
    en: { baslik: "SEO for Black Friday and November Sales: A Seasonal Page Strategy", ozet: "A permanent URL, prep timeline, local terms and post-sale steps for your November sale page." },
  },
  { slug: 'chatgpt-ile-seo', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "ChatGPT ve Yapay Zekâ Araçlarıyla SEO Çalışması: Nerede İşe Yarar?", ozet: "Yapay zekâ araçlarını SEO iş akışında nerede kullanmalı, nerede kullanmamalı? Somut görevler ve doğrulama adımları." },
    en: { baslik: "Doing SEO with ChatGPT and AI Tools: Where They Actually Help", ozet: "Where to use AI tools in an SEO workflow and where not to: concrete tasks and verification steps." },
  },
  { slug: 'content-pruning', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "Content Pruning ve İçerik Güncelleme: Zayıf Sayfaları Silmek mi, Birleştirmek mi?", ozet: "Zayıf sayfalar için veriye dayalı karar ağacı: güncelle, birleştir, 301, noindex ya da sil." },
    en: { baslik: "Content Pruning and Content Updates: Delete or Merge Weak Pages?", ozet: "A data-driven decision tree for weak pages: update, merge, redirect, noindex or delete." },
  },
  { slug: 'crawl-butcesi', kategori: 'technical', sure: 7, featured: false,
    tr: { baslik: "Tarama Bütçesi (Crawl Budget) Nedir? Büyük Sitelerde Optimizasyon", ozet: "Tarama bütçesi her sitenin sorunu değil; büyük sitelerde israfı bulup Googlebot'u değerli sayfalara yönlendirin." },
    en: { baslik: "What Is Crawl Budget? Optimisation for Large Sites", ozet: "Crawl budget is not every site's problem; on large sites, find the waste and steer Googlebot to pages that matter." },
  },
  { slug: 'cro-ve-seo', kategori: 'strategy', sure: 7, featured: false,
    tr: { baslik: "CRO ve SEO: Organik Trafiği Dönüşüme Çevirmek", ozet: "Niyet uyumu, CTA, form ve güven öğeleriyle organik trafiği dönüşüme çevirmek; A/B testini SEO'ya zarar vermeden yapmak." },
    en: { baslik: "CRO and SEO: Turning Organic Traffic into Conversions", ozet: "Turning organic traffic into conversions with intent fit, CTAs, forms and trust, and A/B testing without hurting SEO." },
  },
  { slug: 'e-ticaret-urun-aciklamasi', kategori: 'ecommerce', sure: 7, featured: false,
    tr: { baslik: "Ürün Açıklaması ve Kategori Metni Nasıl Yazılır?", ozet: "Satan ve aranan ürün açıklaması için şablon, üretici metni sorunu ve kategori metninin doğru yeri ile uzunluğu." },
    en: { baslik: "How to Write Product Descriptions and Category Copy", ozet: "A template for product descriptions that sell and rank, the manufacturer copy problem and where category copy belongs." },
  },
  { slug: 'eeat-icin-icerik', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "E-E-A-T Nedir? Deneyim, Uzmanlık, Otorite ve Güveni İçerikte Göstermek", ozet: "E-E-A-T doğrudan bir sıralama faktörü değil; ama deneyim, uzmanlık ve güveni sayfada görünür kılmanın somut yolları var." },
    en: { baslik: "What Is E-E-A-T? Showing Experience, Expertise, Authority and Trust", ozet: "E-E-A-T is not a direct ranking factor, but there are concrete ways to make experience, expertise and trust visible." },
  },
  { slug: 'entity-seo', kategori: 'geo', sure: 8, featured: false,
    tr: { baslik: "Entity SEO: Google ve Yapay Zekâ Markanızı Nasıl Tanır?", ozet: "Markanızın Google ve yapay zekâ için tanımlı bir varlık olması: Knowledge Graph, Organization şeması, sameAs ve tutarlı profiller." },
    en: { baslik: "Entity SEO: How Google and AI Assistants Recognise Your Brand", ozet: "Making your brand a well-defined entity for Google and AI: Knowledge Graph, Organization markup, sameAs and consistent profiles." },
  },
  { slug: 'featured-snippet-serp-ozellikleri', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "Featured Snippet ve SERP Özellikleri: Hangi Sonuç Türü Nasıl Kazanılır?", ozet: "Öne çıkan snippet, ilgili sorular, görsel, video ve yerel paket: her sonuç türünü neyin belirlediği ve ilk adımlar." },
    en: { baslik: "Featured Snippets and SERP Features: How to Earn Each Result Type", ozet: "Featured snippets, People Also Ask, images, video and the local pack: what drives each result type and where to start." },
  },
  { slug: 'ga4-seo-takibi', kategori: 'analytics', sure: 8, featured: false,
    tr: { baslik: "GA4'te Organik Trafik Takibi: SEO İçin Kurulacak Raporlar", ozet: "Organic Search kanalı, Search Console bağlantısı ve anahtar etkinliklerle GA4'ü SEO için okunur hâle getirin." },
    en: { baslik: "Tracking Organic Traffic in GA4: The Reports to Set Up for SEO", ozet: "Make GA4 readable for SEO with the Organic Search channel, the Search Console link and properly marked key events." },
  },
  { slug: 'google-ads-butce-optimizasyonu', kategori: 'strategy', sure: 7, featured: false,
    tr: { baslik: "Google Ads Bütçesini Verimli Kullanmak: SEO Verisiyle Çalışan Ayarlar", ozet: "Arama terimleri, negatif kelimeler ve organik veriyle Google Ads bütçesinde israfı bulup azaltmak." },
    en: { baslik: "Using Your Google Ads Budget Efficiently: Settings Driven by SEO Data", ozet: "Finding and cutting Google Ads waste with search terms, negative keywords and organic search data." },
  },
  { slug: 'google-ai-overview-optimizasyonu', kategori: 'geo', sure: 8, featured: false,
    tr: { baslik: "Google AI Overviews'da Kaynak Olarak Görünmek: Ne Yapılabilir?", ozet: "AI Bakışı'nda kaynak bağlantısı olmak için özel bir işaretleme yok; Google'ın resmi dokümanı neyi öne çıkarıyor, ne yapılabilir?" },
    en: { baslik: "Getting Cited in Google AI Overviews: What You Can Actually Do", ozet: "There is no special markup for AI Overviews citations. What Google's documentation stresses and what you can realistically do." },
  },
  { slug: 'google-sitelinks', kategori: 'technical', sure: 6, featured: false,
    tr: { baslik: "Google Sitelink'leri: Nasıl Oluşur, Neyi Etkileyebilirsiniz?", ozet: "Sitelink'leri Google seçer; site yapısı, başlıklar ve iç linklerle bu seçimi kolaylaştırırsınız." },
    en: { baslik: "Google Sitelinks: How They Form and What You Can Influence", ozet: "Google picks sitelinks; you make the choice easier with structure, titles and internal links. Here is what actually helps." },
  },
  { slug: 'hepsiburada-urun-sayfasi', kategori: 'ecommerce', sure: 7, featured: false,
    tr: { baslik: "Hepsiburada'da Ürün Görünürlüğü: Ürün Sayfası ve İçerik", ozet: "Hepsiburada'da ortak ürün sayfasını doğru kurmak: başlık, görsel, özellik alanları, açıklama ve soru-cevap." },
    en: { baslik: "Product Visibility on Hepsiburada: Product Page and Content", ozet: "Building a solid shared product page on Hepsiburada: title, images, attribute fields, description and Q&A." },
  },
  { slug: 'hreflang-uluslararasi-seo', kategori: 'technical', sure: 8, featured: false,
    tr: { baslik: "Uluslararası SEO ve Hreflang: Çok Dilli Site Kurulumu", ozet: "Çok dilli sitede URL yapısını seçmek, hreflang'i doğru yazmak ve sık yapılan hataları yakalamak için pratik rehber." },
    en: { baslik: "International SEO and Hreflang: Setting Up a Multilingual Site", ozet: "A practical guide to choosing a URL structure, writing hreflang correctly and catching common mistakes on a multilingual site." },
  },
  { slug: 'ic-linkleme', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "İç Linkleme Stratejisi: Sayfalar Arasında Otoriteyi Doğru Dağıtmak", ozet: "Bağlantı metni, yetim sayfa, tıklama derinliği ve denetim: iç linklerle önemli sayfaları öne çıkarmanın yolu." },
    en: { baslik: "Internal Linking Strategy: Distributing Authority Across Your Pages", ozet: "Anchor text, orphan pages, click depth and audits: using internal links to put your important pages forward." },
  },
  { slug: 'javascript-seo', kategori: 'technical', sure: 8, featured: false,
    tr: { baslik: "JavaScript SEO: SPA, SSR ve Next.js Sitelerde Tarama ve Render", ozet: "Google JavaScript'i render eder ama her zaman değil: doğru render yöntemini seçin, test edin, yaygın hatalardan kaçının." },
    en: { baslik: "JavaScript SEO: Crawling and Rendering on SPA, SSR and Next.js Sites", ozet: "Google can render JavaScript, but not everything every time: choose a rendering method, test it properly and avoid common traps." },
  },
  { slug: 'meta-ads-ve-seo', kategori: 'strategy', sure: 7, featured: false,
    tr: { baslik: "Meta Ads ve SEO Birlikte: Reklam Verisini İçerik Stratejisine Taşımak", ozet: "Meta reklam testlerini içerik kararlarına çevirmek ve marka araması etkisini dürüstçe ölçmek." },
    en: { baslik: "Meta Ads and SEO Together: Turning Ad Data into Content Strategy", ozet: "Turning Meta ad tests into content decisions and measuring branded search impact honestly." },
  },
  { slug: 'mobil-seo', kategori: 'technical', sure: 7, featured: false,
    tr: { baslik: "Mobil SEO: Mobil Öncelikli Dizine Eklemede Dikkat Edilecekler", ozet: "Google sitenizi mobil sürümüyle değerlendiriyor: içerik eşitliğini, gizli içeriği ve mobil deneyimi doğru kurun." },
    en: { baslik: "Mobile SEO: What to Watch for Under Mobile-First Indexing", ozet: "Google evaluates your site through its mobile version: get content parity, hidden content and mobile experience right." },
  },
  { slug: 'rakip-analizi-seo', kategori: 'strategy', sure: 8, featured: false,
    tr: { baslik: "SEO Rakip Analizi: Arama Sonuçlarındaki Rakipleri Doğru Okumak", ozet: "Arama sonuçlarında gerçekten kiminle yarıştığınızı bulup içerik ve backlink boşluklarını eyleme çevirmenin yolu." },
    en: { baslik: "SEO Competitor Analysis: Reading Your Search Competitors Correctly", ozet: "Find out who you really compete with in search and turn content and backlink gaps into action." },
  },
  { slug: 'robots-txt', kategori: 'technical', sure: 8, featured: false,
    tr: { baslik: "robots.txt Rehberi: Doğru Yapılandırma ve Sık Yapılan Hatalar", ozet: "robots.txt taramayı yönetir, dizine eklemeyi değil: doğru sözdizimi, yapay zekâ botları ve en sık hatalar tek yerde." },
    en: { baslik: "robots.txt Guide: Correct Configuration and Common Mistakes", ozet: "robots.txt controls crawling, not indexing: correct syntax, AI crawlers and the most common mistakes in one place." },
  },
  { slug: 'search-console-rehberi', kategori: 'analytics', sure: 8, featured: false,
    tr: { baslik: "Google Search Console Rehberi: Temel Raporları Okumak", ozet: "Search Console'un temel raporlarını doğru okumak için pratik rehber: neye bakmalı, neyi dert etmemeli?" },
    en: { baslik: "Google Search Console Guide: Reading the Core Reports", ozet: "A practical guide to reading Search Console's core reports: what to watch and what not to worry about." },
  },
  { slug: 'seo-audit-araclari', kategori: 'technical', sure: 8, featured: false,
    tr: { baslik: "SEO Denetim Araçları: Screaming Frog, Sitebulb, Ahrefs, Semrush ve Ücretsiz Seçenekler", ozet: "Masaüstü tarayıcılar, bulut platformları ve ücretsiz Google araçları: SEO denetiminde hangi iş için hangisini seçmeli?" },
    en: { baslik: "SEO Audit Tools: Screaming Frog, Sitebulb, Ahrefs, Semrush and Free Options", ozet: "Desktop crawlers, cloud platforms and free Google tools: which one to pick for which SEO audit job." },
  },
  { slug: 'seo-roi-olcumu', kategori: 'analytics', sure: 8, featured: false,
    tr: { baslik: "SEO ROI Nasıl Hesaplanır? Organik Trafiğin Gelire Katkısı", ozet: "SEO ROI'yi kâr, artımlı trafik ve atıf sınırlarını hesaba katarak hesaplamanın pratik yolu." },
    en: { baslik: "How to Calculate SEO ROI: Organic Traffic's Contribution to Revenue", ozet: "A practical way to calculate SEO ROI using profit, incremental traffic and honest attribution limits." },
  },
  { slug: 'seo-strateji-plani', kategori: 'strategy', sure: 9, featured: false,
    tr: { baslik: "12 Aylık SEO Strateji Planı: Ay Ay Yol Haritası", ozet: "Bir yıllık SEO çalışmasını çeyreklere bölen, önceliklendiren ve raporlama ritmine bağlayan yol haritası." },
    en: { baslik: "A 12-Month SEO Strategy Plan: A Month-by-Month Roadmap", ozet: "A roadmap that splits a year of SEO into quarters, sets priorities and ties the work to a reporting rhythm." },
  },
  { slug: 'seo-trendleri-2026', kategori: 'strategy', sure: 8, featured: false,
    tr: { baslik: "2026'da SEO: Sahada Gerçekten Değişen 8 Şey", ozet: "Tahmin değil, kayıt: 2025 sonu ve 2026'da Google ve ölçüm araçlarında doğrulanmış 8 değişiklik ve sahadaki karşılığı." },
    en: { baslik: "SEO in 2026: 8 Things That Actually Changed", ozet: "A record, not predictions: 8 verified changes in Google and analytics tools across late 2025 and 2026, and what they mean." },
  },
  { slug: 'sesli-arama-seo', kategori: 'geo', sure: 8, featured: false,
    tr: { baslik: "Sesli Arama ve Konuşma Diliyle Sorgular: İçeriği Soru-Cevaba Hazırlamak", ozet: "Konuşma diliyle sorulan sorulara net cevap veren içerik: doğal dil, yerel niyet ve kısa cevap blokları, abartısız." },
    en: { baslik: "Voice Search and Conversational Queries: Preparing Content for Q&A", ozet: "Content that answers conversational questions clearly: natural language, local intent and short answer blocks, without the hype." },
  },
  { slug: 'shopify-seo', kategori: 'ecommerce', sure: 8, featured: false,
    tr: { baslik: "Shopify SEO: Mağaza İçin Teknik ve İçerik Kontrol Listesi", ozet: "Shopify'ın sabit URL yapısı, yinelenen ürün adresleri, robots.txt.liquid ve uygulama yükü için uygulanabilir kontrol listesi." },
    en: { baslik: "Shopify SEO: A Technical and Content Checklist for Your Store", ozet: "A practical checklist for Shopify's fixed URL structure, duplicate product URLs, robots.txt.liquid and app bloat." },
  },
  { slug: 'toksik-backlink-disavow', kategori: 'backlink', sure: 8, featured: false,
    tr: { baslik: "Toksik Backlink ve Disavow Aracı: Ne Zaman Gerekir?", ozet: "Çoğu site disavow aracına hiç ihtiyaç duymaz; manuel işlem ve link şeması durumunda nasıl doğru kullanılacağını anlatıyorum." },
    en: { baslik: "Toxic Backlinks and the Disavow Tool: When Do You Need It?", ozet: "Most sites never need the disavow tool; here is when it is justified and how to use it correctly after a link scheme." },
  },
  { slug: 'topical-authority', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "Topical Authority Nedir? Konu Otoritesi ve Pillar-Cluster Modeli", ozet: "Konu otoritesi resmi bir puan değil, bir çalışma çerçevesi. Pillar-cluster modelini adım adım planlamak." },
    en: { baslik: "What Is Topical Authority? Topic Clusters and the Pillar-Cluster Model", ozet: "Topical authority is not an official score but a working framework. How to plan a pillar-cluster model step by step." },
  },
  { slug: 'trendyol-urun-sirasi', kategori: 'ecommerce', sure: 7, featured: false,
    tr: { baslik: "Trendyol'da Ürün Görünürlüğü: Ürün Sayfası Optimizasyonu", ozet: "Trendyol'da başlık, görsel, özellik alanları ve müşteri sorularıyla ürün sayfasını eksiksiz hale getirmenin yolları." },
    en: { baslik: "Product Visibility on Trendyol: Optimising Your Product Pages", ozet: "How to complete your Trendyol product pages: titles, images, attribute fields and customer questions." },
  },
  { slug: 'url-yapisi-seo', kategori: 'technical', sure: 7, featured: false,
    tr: { baslik: "SEO Uyumlu URL Yapısı: Türkçe Karakter, Hiyerarşi ve Parametreler", ozet: "Türkçe karakterden parametrelere: okunur, tutarlı ve kalıcı URL yapısını kurmak ve değiştirirken trafiği korumak." },
    en: { baslik: "SEO-Friendly URL Structure: Turkish Characters, Hierarchy and Parameters", ozet: "From Turkish characters to parameters: building readable, consistent, lasting URLs and protecting traffic when they change." },
  },
  { slug: 'video-seo', kategori: 'content', sure: 8, featured: false,
    tr: { baslik: "Video SEO: YouTube ve Google Aramada Videoları Görünür Kılmak", ozet: "Videonuzun Google'da video sonucu olarak görünmesi için izleme sayfası, VideoObject, site haritası ve YouTube bölümleri." },
    en: { baslik: "Video SEO: Making Videos Visible on YouTube and Google Search", ozet: "Watch pages, VideoObject, video sitemaps and YouTube chapters to get your videos shown as video results on Google." },
  },
  { slug: 'woocommerce-seo', kategori: 'ecommerce', sure: 8, featured: false,
    tr: { baslik: "WooCommerce SEO: WordPress E-Ticaret Siteleri İçin Kontrol Listesi", ozet: "WooCommerce'te kalıcı bağlantılar, kategori/etiket yapısı, varyasyonlar ve eklenti yükü için adım adım kontrol listesi." },
    en: { baslik: "WooCommerce SEO: A Checklist for WordPress Ecommerce Sites", ozet: "A step-by-step WooCommerce checklist for permalinks, category and tag structure, variations and plugin bloat." },
  },
  { slug: 'zero-click-arama', kategori: 'geo', sure: 8, featured: false,
    tr: { baslik: "Zero-Click Arama: Tıklama Gelmeyen Sonuçlarda Görünürlük", ozet: "Kullanıcı sonuç sayfasında cevabı bulup tıklamadığında görünürlüğü nasıl ölçer, içerik kararlarını nasıl verirsiniz?" },
    en: { baslik: "Zero-Click Search: Staying Visible When Results Don't Get Clicked", ozet: "How to measure visibility and make content decisions when users find the answer on the results page and never click." },
  },
]


// Yalnızca gerçek içeriği yazılmış yazılar listelenir / indekslenir.
// (Tam liste TUM_YAZILAR'da korunur; yeni yazı yayına alınınca
//  lib/content-index.js içindeki YAYINDAKI_BLOG_SLUGS'a eklenmesi yeterli.)
export const YAZILAR = TUM_YAZILAR.filter(y => YAYINDAKI_BLOG_SLUGS.includes(y.slug))

const KAT_MAP = { technical: 'technical', geo: 'geo', content: 'content', backlink: 'backlink', ecommerce: 'ecommerce', analytics: 'analytics', local: 'local', strategy: 'strategy' }

// Kart görseli: kapak varsa 16:9 görsel, yoksa kategori renginde yer tutucu.
// Böylece görseli olan ve olmayan kartlar aynı hizada durur.
function KartGorseli({ slug, kat, alt, sizes, priority = false }) {
  const kapak = getBlogKapak(slug)
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: kat.bg, overflow: 'hidden', flexShrink: 0 }}>
      {kapak ? (
        <Image src={kapak} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover' }} />
      ) : (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px', opacity: 0.35, background: `linear-gradient(135deg, ${kat.bg}, ${kat.renk}22)` }}>
          {kat.emoji}
        </div>
      )}
    </div>
  )
}

export default function Page(props) {
  const router = useRouter()
  const isEn = props.__forceLocale === 'en' || router.pathname.startsWith('/en')
  const [aktifKat, setAktifKat] = useState('all')
  const [arama, setArama] = useState('')
  const kategoriler = isEn ? KATEGORILER.en : KATEGORILER.tr

  const filtered = YAZILAR.filter(y => {
    const katMatch = aktifKat === 'all' || y.kategori === aktifKat
    const baslik = isEn ? y.en.baslik : y.tr.baslik
    const aramaMatch = !arama || baslik.toLowerCase().includes(arama.toLowerCase())
    return katMatch && aramaMatch
  })

  const featured = filtered.filter(y => y.featured)
  const rest = filtered.filter(y => !y.featured)

  const getKat = (id) => kategoriler.find(k => k.id === id) || kategoriler[0]

  const t = isEn ? {
    badge: 'BLOG',
    h1a: 'SEO & GEO',
    h1b: 'Insights',
    desc: `${YAZILAR.length} articles on SEO, GEO and digital marketing. Practical, actionable, data-driven.`,
    placeholder: 'Search articles...',
    minRead: 'min read',
    read: 'Read',
    featured_label: 'Featured',
    noResult: 'No articles found.',
    noResult_sub: 'Try a different search term or category.',
    all_in: 'All articles in',
    breadcrumb: ['Home', 'Blog'],
  } : {
    badge: 'BLOG',
    h1a: 'SEO & GEO',
    h1b: 'Rehberleri',
    desc: `${YAZILAR.length} makale: SEO, GEO ve dijital pazarlama üzerine güncel, uygulanabilir, veriye dayalı içgörüler.`,
    placeholder: 'Yazılarda ara...',
    minRead: 'dk okuma',
    read: 'Oku',
    featured_label: 'Öne Çıkan',
    noResult: 'Makale bulunamadı.',
    noResult_sub: 'Farklı bir arama terimi veya kategori deneyin.',
    all_in: 'Tüm makaleler:',
    breadcrumb: ['Ana Sayfa', 'Blog'],
  }

  return (
    <>
      <Head>
        <title>{isEn ? 'SEO & GEO Blog | Fatih Emin Çakıroğlu' : 'SEO ve GEO Blog | Fatih Emin Çakıroğlu'}</title>
        <meta name="description" content={isEn ? `${YAZILAR.length}+ in-depth articles on SEO, GEO, technical SEO and digital marketing strategy. Practical, actionable insights to grow your organic search visibility.` : `${YAZILAR.length}+ derinlemesine makale: teknik SEO, GEO, içerik stratejisi ve dijital pazarlama üzerine. Organik görünürlüğünüzü artıracak uygulanabilir içgörüler.`} />
        <link rel="canonical" href={isEn ? 'https://fatihemincakiroglu.com/en/blog' : 'https://fatihemincakiroglu.com/blog'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org","@type":"Blog","name": isEn ? "Fatih Emin Çakıroğlu Blog" : "Fatih Emin Çakıroğlu Blog","url": isEn ? "https://fatihemincakiroglu.com/en/blog" : "https://fatihemincakiroglu.com/blog","author":{"@type":"Person","name":"Fatih Emin Çakıroğlu"} }) }} />
      </Head>

      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh', background: '#f8f7f5' }}>

        {/* Breadcrumb */}
        <div style={{ background: '#faf9f7', borderBottom: '1px solid #ede8e0', padding: '10px 32px' }}>
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link href={isEn ? "/en" : "/"} style={{ color: '#aaa', fontSize: '13px' }}>{t.breadcrumb[0]}</Link>
            <span style={{ color: '#ccc' }}>›</span>
            <span style={{ color: '#555', fontSize: '13px' }}>{t.breadcrumb[1]}</span>
          </div>
        </div>

        {/* Hero */}
        <div style={{ background: '#111', padding: '64px 32px 0', overflow: 'hidden', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', paddingBottom: '40px' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--orange)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.badge}</span>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: '#fff', lineHeight: 0.95, marginBottom: '0' }}>
                  {t.h1a}<br />
                  <span style={{ color: 'var(--orange)', fontStyle: 'italic' }}>{t.h1b}</span>
                </h1>
              </div>
              <div style={{ maxWidth: '360px' }}>
                <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>{t.desc}</p>
                {/* Arama */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '12px 16px' }}>
                  <span style={{ color: '#6b7280', fontSize: '16px' }}>🔍</span>
                  <input type="text" placeholder={t.placeholder} value={arama}
                    onChange={e => { setArama(e.target.value); setAktifKat('all') }}
                    style={{ border: 'none', outline: 'none', fontSize: '14px', background: 'transparent', fontFamily: 'var(--font-body)', width: '100%', color: '#fff', '::placeholder': { color: '#6b7280' } }} />
                  {arama && <button onClick={() => setArama('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: '16px', padding: '0' }}>✕</button>}
                </div>
              </div>
            </div>

            {/* Kategori Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '0', scrollbarWidth: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              {kategoriler.map(k => (
                <button key={k.id} onClick={() => { setAktifKat(k.id); setArama('') }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', borderRadius: '0', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: aktifKat === k.id ? 700 : 400, fontSize: '14px', color: aktifKat === k.id ? '#fff' : '#6b7280', borderBottom: aktifKat === k.id ? `3px solid ${k.renk === '#111' ? 'var(--orange)' : k.renk}` : '3px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap', paddingBottom: '14px' }}>
                  <span>{k.emoji}</span> {k.label}
                  <span style={{ fontSize: '11px', background: aktifKat === k.id ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '10px', marginLeft: '2px' }}>
                    {k.id === 'all' ? YAZILAR.length : YAZILAR.filter(y => y.kategori === k.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* İçerik */}
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 32px 96px' }}>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#111', marginBottom: '8px' }}>{t.noResult}</h3>
              <p style={{ color: '#aaa' }}>{t.noResult_sub}</p>
            </div>
          ) : (
            <>
              {/* Featured Grid — sadece all ve kategori filtresinde göster, aramada gösterme */}
              {!arama && featured.length > 0 && (
                <div style={{ marginBottom: '48px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '2px', textTransform: 'uppercase' }}>
                      ★ {t.featured_label}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: '#eee' }} />
                  </div>
                  <div className="blog-featured" style={{ display: 'grid', gridTemplateColumns: featured.length >= 2 ? '2fr 1fr' : '1fr', gap: '16px' }}>
                    {featured.slice(0, 1).map((y, i) => {
                      const kat = getKat(y.kategori)
                      const baslik = isEn ? y.en.baslik : y.tr.baslik
                      const ozet = isEn ? y.en.ozet : y.tr.ozet
                      return (
                        <Link key={i} href={isEn ? `/en/blog/${y.slug}` : `/blog/${y.slug}`}
                          className={featured.length >= 2 ? undefined : 'blog-featured-card'}
                          style={{ background: kat.bg, borderRadius: '20px', padding: 0, border: `1px solid ${kat.renk}20`, textDecoration: 'none', display: 'grid', gridTemplateColumns: featured.length >= 2 ? '1fr' : '1fr 1fr', alignItems: 'stretch', minHeight: '260px', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative', overflow: 'hidden' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${kat.renk}20` }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                          <KartGorseli slug={y.slug} kat={kat} alt={baslik} sizes="(max-width: 768px) 100vw, 760px" priority />
                          <div style={{ padding: '32px 36px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: kat.renk, padding: '4px 12px', background: '#fff', borderRadius: '20px', border: `1px solid ${kat.renk}30` }}>{kat.emoji} {kat.label}</span>
                              <span style={{ fontSize: '12px', color: kat.renk }}>{y.sure} {t.minRead}</span>
                            </div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 800, color: '#111', marginBottom: '12px', lineHeight: 1.25 }}>{baslik}</h2>
                            <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.65 }}>{ozet}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '20px', color: kat.renk, fontWeight: 700, fontSize: '14px' }}>
                            {t.read} <span style={{ fontSize: '18px' }}>→</span>
                          </div>
                          </div>
                        </Link>
                      )
                    })}
                    {featured.length >= 2 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {featured.slice(1, 3).map((y, i) => {
                          const kat = getKat(y.kategori)
                          const baslik = isEn ? y.en.baslik : y.tr.baslik
                          return (
                            <Link key={i} href={isEn ? `/en/blog/${y.slug}` : `/blog/${y.slug}`}
                              style={{ background: kat.bg, borderRadius: '16px', padding: '24px', border: `1px solid ${kat.renk}20`, textDecoration: 'none', flex: 1, transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                              onMouseLeave={e => { e.currentTarget.style.transform = 'none' }}>
                              <div>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: kat.renk, padding: '3px 10px', background: '#fff', borderRadius: '20px', border: `1px solid ${kat.renk}30`, display: 'inline-block', marginBottom: '10px' }}>{kat.emoji} {kat.label}</span>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 800, color: '#111', lineHeight: 1.3 }}>{baslik}</h3>
                              </div>
                              <div style={{ color: kat.renk, fontWeight: 700, fontSize: '13px', marginTop: '12px' }}>{t.read} →</div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Rest articles */}
              {(arama ? filtered : rest).length > 0 && (
                <div>
                  {!arama && rest.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#aaa', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        {t.all_in} {aktifKat !== 'all' ? getKat(aktifKat).label : ''} ({(arama ? filtered : rest).length})
                      </span>
                      <div style={{ flex: 1, height: '1px', background: '#eee' }} />
                    </div>
                  )}
                  <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {(arama ? filtered : rest).map((y, i) => {
                      const kat = getKat(y.kategori)
                      const baslik = isEn ? y.en.baslik : y.tr.baslik
                      const ozet = isEn ? y.en.ozet : y.tr.ozet
                      return (
                        <Link key={i} href={isEn ? `/en/blog/${y.slug}` : `/blog/${y.slug}`}
                          style={{ background: '#fff', borderRadius: '16px', padding: 0, border: '1px solid #eee', textDecoration: 'none', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', borderTop: `3px solid ${kat.renk}`, overflow: 'hidden' }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)' }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
                          <KartGorseli slug={y.slug} kat={kat} alt={baslik} sizes="(max-width: 768px) 100vw, 400px" />
                          <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '18px' }}>{kat.emoji}</span>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: kat.renk, letterSpacing: '0.5px' }}>{kat.label}</span>
                            <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#ccc' }}>{y.sure} {t.minRead}</span>
                          </div>
                          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.35, marginBottom: '10px', flex: 1 }}>{baslik}</h3>
                          <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6, marginBottom: '14px' }}>{ozet.slice(0, 80)}...</p>
                          <div style={{ color: kat.renk, fontWeight: 700, fontSize: '13px' }}>{t.read} →</div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        input::placeholder { color: #6b7280; }
        ::-webkit-scrollbar { height: 0; }
        @media (max-width: 768px) {
          .blog-featured { grid-template-columns: minmax(0, 1fr) !important; }
          .blog-grid { grid-template-columns: minmax(0, 1fr) !important; }
          .blog-featured-card { grid-template-columns: minmax(0, 1fr) !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      ` }} />
    </>
  )
}
