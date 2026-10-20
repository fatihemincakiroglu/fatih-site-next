// ─────────────────────────────────────────────────────────────
// Ayrı dosyalarda tutulan blog yazıları.
// lib/blog-icerikler.js içindeki ICERIKLER objesine eklenir; yapı aynıdır
// (baslik_tr/en, meta_desc_tr/en, bolumler_tr/en ...).
//
// Yeni yazı eklemek için: bu klasöre <slug>.js veya <slug>.json dosyası ekleyin, aşağıya
// import edin, ardından lib/content-index.js, lib/blog-meta.js ve
// pages/blog.js → TUM_YAZILAR listelerini güncelleyin.
// ─────────────────────────────────────────────────────────────
import seoAjansiFiyatlari from './seo-ajansi-fiyatlari'
import chatgptMarkaGorunurlugu from './chatgpt-marka-gorunurlugu'
import llmsTxtRehberi from './llms-txt-rehberi'
import seoUzmaniMiSeoAjansiMi from './seo-uzmani-mi-seo-ajansi-mi'
import googleBusinessProfile from './google-business-profile'
// Ekim 2026: JSON biçimindeki yazılar
import tarandi_dizine_eklenmemis from './tarandi-dizine-eklenmemis.json'
import cekirdek_guncelleme_trafik_dususu from './cekirdek-guncelleme-trafik-dususu.json'
import programatik_seo from './programatik-seo.json'
import e_ticaret_altyapisi_seo_karsilastirma from './e-ticaret-altyapisi-seo-karsilastirma.json'
import trendyol_magazasi_mi_kendi_site_mi from './trendyol-magazasi-mi-kendi-site-mi.json'
import avukatlar_icin_seo from './avukatlar-icin-seo.json'
import dis_klinikleri_yerel_seo from './dis-klinikleri-yerel-seo.json'
import google_ai_mode_turkiye from './google-ai-mode-turkiye.json'
import perplexity_kaynak_gosterilme from './perplexity-kaynak-gosterilme.json'
import marka_bahsi_brand_mention from './marka-bahsi-brand-mention.json'
import yoast_mu_rank_math_mi from './yoast-mu-rank-math-mi.json'
import yapay_zeka_icerik_google_politikasi from './yapay-zeka-icerik-google-politikasi.json'
import ga4_yapay_zeka_trafigi from './ga4-yapay-zeka-trafigi.json'
import seo_mu_google_ads_mi from './seo-mu-google-ads-mi.json'
import google_yorumlarina_cevap from './google-yorumlarina-cevap.json'
// Ekim 2026 (2. dalga)
import y_301_302_yonlendirme from './301-302-yonlendirme.json'
import y_anchor_text from './anchor-text.json'
import y_black_friday_seo from './black-friday-seo.json'
import y_chatgpt_ile_seo from './chatgpt-ile-seo.json'
import y_content_pruning from './content-pruning.json'
import y_crawl_butcesi from './crawl-butcesi.json'
import y_cro_ve_seo from './cro-ve-seo.json'
import y_e_ticaret_urun_aciklamasi from './e-ticaret-urun-aciklamasi.json'
import y_eeat_icin_icerik from './eeat-icin-icerik.json'
import y_entity_seo from './entity-seo.json'
import y_featured_snippet_serp_ozellikleri from './featured-snippet-serp-ozellikleri.json'
import y_ga4_seo_takibi from './ga4-seo-takibi.json'
import y_google_ads_butce_optimizasyonu from './google-ads-butce-optimizasyonu.json'
import y_google_ai_overview_optimizasyonu from './google-ai-overview-optimizasyonu.json'
import y_google_sitelinks from './google-sitelinks.json'
import y_hepsiburada_urun_sayfasi from './hepsiburada-urun-sayfasi.json'
import y_hreflang_uluslararasi_seo from './hreflang-uluslararasi-seo.json'
import y_ic_linkleme from './ic-linkleme.json'
import y_javascript_seo from './javascript-seo.json'
import y_meta_ads_ve_seo from './meta-ads-ve-seo.json'
import y_mobil_seo from './mobil-seo.json'
import y_rakip_analizi_seo from './rakip-analizi-seo.json'
import y_robots_txt from './robots-txt.json'
import y_search_console_rehberi from './search-console-rehberi.json'
import y_seo_audit_araclari from './seo-audit-araclari.json'
import y_seo_roi_olcumu from './seo-roi-olcumu.json'
import y_seo_strateji_plani from './seo-strateji-plani.json'
import y_seo_trendleri_2026 from './seo-trendleri-2026.json'
import y_sesli_arama_seo from './sesli-arama-seo.json'
import y_shopify_seo from './shopify-seo.json'
import y_toksik_backlink_disavow from './toksik-backlink-disavow.json'
import y_topical_authority from './topical-authority.json'
import y_trendyol_urun_sirasi from './trendyol-urun-sirasi.json'
import y_url_yapisi_seo from './url-yapisi-seo.json'
import y_video_seo from './video-seo.json'
import y_woocommerce_seo from './woocommerce-seo.json'
import y_zero_click_arama from './zero-click-arama.json'

export const YENI_YAZILAR = {
  'seo-ajansi-fiyatlari': seoAjansiFiyatlari,
  'chatgpt-marka-gorunurlugu': chatgptMarkaGorunurlugu,
  'llms-txt-rehberi': llmsTxtRehberi,
  'seo-uzmani-mi-seo-ajansi-mi': seoUzmaniMiSeoAjansiMi,
  'google-business-profile': googleBusinessProfile,
  'tarandi-dizine-eklenmemis': tarandi_dizine_eklenmemis,
  'cekirdek-guncelleme-trafik-dususu': cekirdek_guncelleme_trafik_dususu,
  'programatik-seo': programatik_seo,
  'e-ticaret-altyapisi-seo-karsilastirma': e_ticaret_altyapisi_seo_karsilastirma,
  'trendyol-magazasi-mi-kendi-site-mi': trendyol_magazasi_mi_kendi_site_mi,
  'avukatlar-icin-seo': avukatlar_icin_seo,
  'dis-klinikleri-yerel-seo': dis_klinikleri_yerel_seo,
  'google-ai-mode-turkiye': google_ai_mode_turkiye,
  'perplexity-kaynak-gosterilme': perplexity_kaynak_gosterilme,
  'marka-bahsi-brand-mention': marka_bahsi_brand_mention,
  'yoast-mu-rank-math-mi': yoast_mu_rank_math_mi,
  'yapay-zeka-icerik-google-politikasi': yapay_zeka_icerik_google_politikasi,
  'ga4-yapay-zeka-trafigi': ga4_yapay_zeka_trafigi,
  'seo-mu-google-ads-mi': seo_mu_google_ads_mi,
  'google-yorumlarina-cevap': google_yorumlarina_cevap,
  '301-302-yonlendirme': y_301_302_yonlendirme,
  'anchor-text': y_anchor_text,
  'black-friday-seo': y_black_friday_seo,
  'chatgpt-ile-seo': y_chatgpt_ile_seo,
  'content-pruning': y_content_pruning,
  'crawl-butcesi': y_crawl_butcesi,
  'cro-ve-seo': y_cro_ve_seo,
  'e-ticaret-urun-aciklamasi': y_e_ticaret_urun_aciklamasi,
  'eeat-icin-icerik': y_eeat_icin_icerik,
  'entity-seo': y_entity_seo,
  'featured-snippet-serp-ozellikleri': y_featured_snippet_serp_ozellikleri,
  'ga4-seo-takibi': y_ga4_seo_takibi,
  'google-ads-butce-optimizasyonu': y_google_ads_butce_optimizasyonu,
  'google-ai-overview-optimizasyonu': y_google_ai_overview_optimizasyonu,
  'google-sitelinks': y_google_sitelinks,
  'hepsiburada-urun-sayfasi': y_hepsiburada_urun_sayfasi,
  'hreflang-uluslararasi-seo': y_hreflang_uluslararasi_seo,
  'ic-linkleme': y_ic_linkleme,
  'javascript-seo': y_javascript_seo,
  'meta-ads-ve-seo': y_meta_ads_ve_seo,
  'mobil-seo': y_mobil_seo,
  'rakip-analizi-seo': y_rakip_analizi_seo,
  'robots-txt': y_robots_txt,
  'search-console-rehberi': y_search_console_rehberi,
  'seo-audit-araclari': y_seo_audit_araclari,
  'seo-roi-olcumu': y_seo_roi_olcumu,
  'seo-strateji-plani': y_seo_strateji_plani,
  'seo-trendleri-2026': y_seo_trendleri_2026,
  'sesli-arama-seo': y_sesli_arama_seo,
  'shopify-seo': y_shopify_seo,
  'toksik-backlink-disavow': y_toksik_backlink_disavow,
  'topical-authority': y_topical_authority,
  'trendyol-urun-sirasi': y_trendyol_urun_sirasi,
  'url-yapisi-seo': y_url_yapisi_seo,
  'video-seo': y_video_seo,
  'woocommerce-seo': y_woocommerce_seo,
  'zero-click-arama': y_zero_click_arama,
}
