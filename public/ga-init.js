// Google Analytics 4 başlatma kodu.
// Sayfaya gömülü (inline) script yerine ayrı dosyada duruyor; böylece
// Content-Security-Policy, script-src için 'unsafe-inline' izni vermeden
// çalışabiliyor (bkz. next.config.mjs → GUVENLIK_BASLIKLARI).
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
window.gtag = gtag;
gtag('js', new Date());
gtag('config', 'G-WZBHKP34SD');
