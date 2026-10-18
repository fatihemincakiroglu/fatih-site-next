// Google güncellemeleri günlüğü verisi (lib/google-guncellemeleri.json) için dil seçici.
// Yalnızca getStaticProps içinde kullanılır.
import VERI from './google-guncellemeleri.json'

export function guncellemeVerisi(lang) {
  const e = lang === 'en'
  return {
    son_kontrol: VERI.son_kontrol,
    giris: e ? VERI.giris_en : VERI.giris_tr,
    sss: (e ? VERI.sss_en : VERI.sss_tr) || [],
    kayitlar: VERI.kayitlar.map(k => ({
      id: k.id, tur: k.tur, baslangic: k.baslangic, bitis: k.bitis || null, kaynak: k.kaynak,
      ad: e ? k.ad_en : k.ad_tr, ozet: e ? k.ozet_en : k.ozet_tr, ne_yapmali: (e ? k.ne_yapmali_en : k.ne_yapmali_tr) || null,
    })),
  }
}
