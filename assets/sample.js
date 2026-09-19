/* Redstring örnek vakaları — uygulamayı tanıtmak ve canlı sitede ilk açılışta
   gerçek bir çalışma görünümü vermek için. İçindeki kişilerin, kurumların ve
   olayların tamamı kurgudur; hiçbir gerçek kişiyle ilgisi yoktur.

   Redstring sample cases — used for the demo and to give the live site a
   realistic working state on first run. Every person, company and event in
   here is fictional and matches no real person.

   ctx.gun(n) = n gün önce, YYYY-AA-GG / n days ago as YYYY-MM-DD           */
window.VM_SAMPLE = function (lang, ctx) {
  "use strict";
  var g = ctx.gun;

  /* ===================================================================== */
  var tr = [
    {
      vaka: {
        baslik: "Depo stok kaybı araştırması",
        musteri: "Aksu Lojistik A.Ş.",
        iletisim: "0212 000 00 00 · idari@aksulojistik.example",
        durum: "sicak", oncelik: "yuksek", acilis: g(17), saatUcreti: 1500, avans: 25000,
        ozet: "ÖRNEK DOSYA — uygulamayı tanımanız için eklendi; içindeki kişi ve bilgiler kurgudur. Dilediğiniz gibi değiştirebilir veya dosyayı silebilirsiniz.\n\nMüvekkil, deposunda üç aydır süren stok açığının personel kaynaklı olup olmadığının araştırılmasını talep etti. Kapsam: gece vardiyası gözlemi, kamera kaydı incelemesi ve sevkiyat evrakının çapraz kontrolü. Kapsam dışı: personelin özel yaşamına ilişkin her türlü araştırma."
      },
      people: [
        ["p1", { ad: "Nurten Aksu", rol: "musteri", iletisim: "İdari müdür · 0532 000 00 00", tanim: "Müvekkil temsilcisi. Raporlar yalnızca kendisine teslim edilecek, personele bilgi verilmeyecek.", x: 16, y: 20 }],
        ["p2", { ad: "Deniz Korkmaz", rol: "suphe", iletisim: "Gece vardiyası depo sorumlusu · 4 yıldır çalışıyor", tanim: "38 yaşlarında, 1.80 civarı. Gri panelvan, 34 ABC 123. Vardiya çıkışlarında rampada tek başına kaldığı üç kez gözlendi. Stok sayım yetkisi kendisinde.", x: 50, y: 34 }],
        ["p3", { ad: "Servet Balaban", rol: "tanik", iletisim: "Forklift operatörü · aynı vardiya", tanim: "Rampaya yanaşan aracı gördüğünü, plakayı hatırlamadığını beyan etti. Beyanı yazılı alındı ve imzalatıldı.", x: 24, y: 68 }],
        ["p4", { ad: "Beyaz panelvan sürücüsü (kimliği belirsiz)", rol: "ilgili", iletisim: "—", tanim: "Yüz görüntüsü hiçbir karede net değil. Araç: beyaz panelvan, plakanın ilk üç hanesi 34 T olarak okunuyor.", x: 78, y: 60 }],
        ["p5", { ad: "Hakan Erdoğan", rol: "ilgili", iletisim: "Sevkiyat planlama · gündüz vardiyası", tanim: "Fark tespit edilen üç irsaliyeyi düzenleyen kişi. Şu aşamada şüpheli değil; evrak akışını anlamak için görüşüldü.", x: 62, y: 80 }]
      ],
      evidence: [
        ["e1", { ad: "Dört günlük depo kamera kayıtları (74 saat)", tur: "dijital", tarih: g(4), kaynak: "Depo NVR cihazı, kanal 3 — idari müdür huzurunda kopyalandı", teslimAlan: "G. Güler", saklama: "Şifreli harici disk / klasör 03", not: "23.10–23.48 aralığı incelemeye alındı. Kopyalama tutanağı dosyada." }],
        ["e2", { ad: "Sevkiyat irsaliyeleri (48 sayfa)", tur: "belge", tarih: g(11), kaynak: "Müvekkil muhasebe birimi, imza karşılığı teslim alındı", teslimAlan: "G. Güler", saklama: "Kasa B, dosya 14", not: "Üç irsaliyede çıkış adedi ile sistem kaydı arasında toplam 62 kalemlik fark var." }],
        ["e3", { ad: "Rampa ve otopark fotoğrafları (26 kare)", tur: "foto", tarih: g(7), kaynak: "Karşı kaldırımdaki gözlem noktası — kamusal alan", teslimAlan: "G. Güler", saklama: "Şifreli harici disk / klasör 03", not: "Araç plakası 12 numaralı karede kısmen okunabiliyor." }],
        ["e4", { ad: "Servet Balaban yazılı beyanı (2 sayfa)", tur: "beyan", tarih: g(6), kaynak: "Depo dinlenme alanında alınan görüşme", teslimAlan: "G. Güler", saklama: "Kasa B, dosya 14", not: "Tanık, beyanının müvekkille paylaşılmasına yazılı onay verdi." }]
      ],
      events: [
        ["v1", { ne: g(8) + "T21:30", tur: "gozlem", baslik: "Gece vardiyası gözlemi başladı", yer: "Depo, karşı kaldırım", aciklama: "Gözlem noktası kuruldu. Vardiya girişi 22.00'de tamamlandı, sekiz personel içeri girdi." }],
        ["v2", { ne: g(8) + "T23:12", tur: "olay", baslik: "Beyaz panelvan yükleme rampasına yanaştı", yer: "Arka rampa", aciklama: "Araç 23.12'de yanaştı, 23.46'da ayrıldı. Rampada tek kişi vardı. Sevkiyat programında bu saate kayıtlı çıkış bulunmuyor." }],
        ["v3", { ne: g(6) + "T14:00", tur: "gorusme", baslik: "Tanık Servet Balaban ile görüşme", yer: "Depo dinlenme alanı", aciklama: "Aracı gördüğünü, olağan bir sevkiyat sandığını beyan etti. Plakayı hatırlamıyor." }],
        ["v4", { ne: g(4) + "T10:20", tur: "adli", baslik: "Kamera kayıtları teslim alındı", yer: "Müvekkil idari ofis", aciklama: "Kopyalama işlemi idari müdür huzurunda yapıldı, teslim tutanağı karşılıklı imzalandı." }],
        ["v5", { ne: g(2) + "T16:45", tur: "gozlem", baslik: "Ara değerlendirme müvekkile sunuldu", yer: "Müvekkil ofisi", aciklama: "Bulgular sözlü aktarıldı. Müvekkil, personele henüz bilgi verilmemesini istedi. Gözlem iki hafta daha sürecek." }]
      ],
      log: [
        ["l1", { tarih: g(8), kim: "G. Güler", faaliyet: "Gece vardiyası gözlemi — 21.30/03.30", sure: 6, masraf: 480, not: "Araç yakıtı ve otopark." }],
        ["l2", { tarih: g(7), kim: "G. Güler", faaliyet: "Sabah devri ve rampa fotoğraflaması", sure: 3.5, masraf: 220, not: "" }],
        ["l3", { tarih: g(6), kim: "M. Tuna", faaliyet: "Tanık görüşmesi ve beyan yazımı", sure: 2, masraf: 0, not: "" }],
        ["l4", { tarih: g(4), kim: "G. Güler", faaliyet: "Kamera kaydı inceleme ve irsaliye çapraz kontrolü", sure: 5, masraf: 0, not: "Ofis çalışması." }]
      ],
      links: [
        ["b1", { a: "p2", b: "p4", iliski: "olay gecesi aynı rampada" }],
        ["b2", { a: "p2", b: "p3", iliski: "aynı vardiya ekibi" }],
        ["b3", { a: "p1", b: "p2", iliski: "işveren – çalışan" }],
        ["b4", { a: "p5", b: "p2", iliski: "irsaliyeleri düzenleyen – stok sayımı yapan" }]
      ]
    },

    {
      vaka: {
        baslik: "Kayıp kişi araştırması — Emre Şahin",
        musteri: "Hatice Şahin (anne)",
        iletisim: "0533 000 00 00",
        durum: "acik", oncelik: "yuksek", acilis: g(9), saatUcreti: 1200, avans: 10000,
        ozet: "ÖRNEK DOSYA — kurgu bir vakadır.\n\nMüvekkilin 24 yaşındaki oğlu 11 gündür ailesiyle irtibat kurmuyor. Kolluk kuvvetlerine kayıp ihbarı yapılmış, dosya açılmıştır; bu araştırma ihbarın yerine geçmez, ona destek olur. Kapsam: son görüldüğü çevrede tanık taraması, açık kaynak taraması ve ulaşılabilen adreslerin kontrolü. Kapsam dışı: iletişim içeriğine erişim, konum takibi ve kolluk yetkisi gerektiren her türlü işlem."
      },
      people: [
        ["p1", { ad: "Hatice Şahin", rol: "musteri", iletisim: "Anne · 0533 000 00 00", tanim: "Günlük bilgilendirme istiyor. Oğluyla son telefon görüşmesi 11 gün önce, kısa ve gergin geçmiş.", x: 18, y: 22 }],
        ["p2", { ad: "Emre Şahin", rol: "magdur", iletisim: "Son bilinen adres: Kadıköy, kiralık daire", tanim: "24 yaşında, 1.75, ince yapılı. Sol bilekte saat dövmesi. Son görüldüğünde koyu yeşil mont ve sırt çantası. Telefonu 11 gündür kapalı.", x: 52, y: 40 }],
        ["p3", { ad: "Onur Bilir", rol: "tanik", iletisim: "Ev arkadaşı", tanim: "Emre'nin 11 gün önce akşam çıktığını, dönmediğini beyan etti. Kira payını iki aydır geciktirdiğini ekledi.", x: 24, y: 70 }],
        ["p4", { ad: "Sevil Arıkan", rol: "tanik", iletisim: "Çalıştığı kafenin işletmecisi", tanim: "Emre'nin son iki haftadır vardiyalara gelmediğini, borç istediğini beyan etti.", x: 76, y: 66 }]
      ],
      evidence: [
        ["e1", { ad: "Son fotoğraf ve eşkâl formu", tur: "foto", tarih: g(9), kaynak: "Müvekkil tarafından teslim edildi", teslimAlan: "M. Tuna", saklama: "Şifreli disk / klasör 07", not: "Kayıp ihbar dosyasına da aynı fotoğraf verilmiş." }],
        ["e2", { ad: "Ev arkadaşı Onur Bilir beyanı", tur: "beyan", tarih: g(7), kaynak: "Kadıköy'deki dairede alınan görüşme", teslimAlan: "M. Tuna", saklama: "Kasa B, dosya 21", not: "Beyan yazılı alındı ve imzalandı." }],
        ["e3", { ad: "Açık kaynak tarama notları", tur: "belge", tarih: g(3), kaynak: "Herkese açık sosyal medya hesapları", teslimAlan: "M. Tuna", saklama: "Şifreli disk / klasör 07", not: "Son paylaşım 12 gün önce. Hesaplar kapatılmamış, aktiflik yok." }]
      ],
      events: [
        ["v1", { ne: g(11) + "T19:40", tur: "olay", baslik: "Ailesiyle son telefon görüşmesi", yer: "—", aciklama: "Müvekkilin beyanına göre görüşme kısa ve gergin geçmiş; para konusu konuşulmuş." }],
        ["v2", { ne: g(11) + "T21:10", tur: "olay", baslik: "Evden çıktığı son an", yer: "Kadıköy, kiralık daire", aciklama: "Ev arkadaşının beyanı. Sırt çantasıyla çıkmış, dönmemiş." }],
        ["v3", { ne: g(7) + "T11:00", tur: "gorusme", baslik: "Ev arkadaşı ile görüşme", yer: "Daire", aciklama: "Kira gecikmesi ve son haftalardaki davranış değişikliği aktarıldı." }],
        ["v4", { ne: g(5) + "T15:30", tur: "gorusme", baslik: "İşyeri görüşmesi", yer: "Çalıştığı kafe", aciklama: "İki haftadır vardiyalara gelmiyor. İşletmeciden borç istediği öğrenildi." }],
        ["v5", { ne: g(1) + "T09:00", tur: "ihbar", baslik: "Müvekkile günlük bilgilendirme", yer: "Telefon", aciklama: "Bulgular aktarıldı. Kolluk dosyasıyla paylaşılmak üzere ara rapor hazırlanacak." }]
      ],
      log: [
        ["l1", { tarih: g(8), kim: "M. Tuna", faaliyet: "Son görüldüğü çevrede tanık taraması", sure: 5, masraf: 340, not: "Yedi işletmeyle görüşüldü." }],
        ["l2", { tarih: g(7), kim: "M. Tuna", faaliyet: "Ev arkadaşı görüşmesi ve daire kontrolü", sure: 2.5, masraf: 90, not: "" }],
        ["l3", { tarih: g(3), kim: "M. Tuna", faaliyet: "Açık kaynak taraması", sure: 4, masraf: 0, not: "Ofis çalışması." }]
      ],
      links: [
        ["b1", { a: "p1", b: "p2", iliski: "anne – oğul" }],
        ["b2", { a: "p3", b: "p2", iliski: "aynı evde kalıyorlar" }],
        ["b3", { a: "p4", b: "p2", iliski: "işveren – çalışan, iki haftadır devamsız" }]
      ]
    },

    {
      vaka: {
        baslik: "Sigorta hasar beyanı doğrulaması",
        musteri: "Marmara Sigorta — Hasar Birimi",
        iletisim: "hasar@marmarasigorta.example",
        durum: "bekle", oncelik: "orta", acilis: g(26), saatUcreti: 1800, avans: 15000,
        ozet: "ÖRNEK DOSYA — kurgu bir vakadır.\n\nİş göremezlik beyanıyla tazminat talep eden sigortalının, beyanındaki kısıtlarla bağdaşmayan faaliyetlerde bulunup bulunmadığının tespiti talep edildi. Kapsam: kamusal alanda gözlem ve açık kaynak doğrulaması. Kapsam dışı: konut içi görüntüleme, sağlık kaydı talebi, iletişim dinleme.\n\nDosya, müvekkilin talebiyle beklemede: hakem heyeti kararı bekleniyor."
      },
      people: [
        ["p1", { ad: "Marmara Sigorta — Ece Yalçın", rol: "musteri", iletisim: "Hasar birimi uzmanı", tanim: "Dosya sorumlusu. Ara raporlar yalnızca kendisine iletiliyor.", x: 20, y: 26 }],
        ["p2", { ad: "Kemal Doğru", rol: "suphe", iletisim: "Sigortalı · Beylikdüzü", tanim: "52 yaşında. Beyanına göre ağır kaldıramıyor ve merdiven çıkamıyor. Gözlem günlerinde inşaat malzemesi taşırken görüntülendi.", x: 56, y: 44 }],
        ["p3", { ad: "Komşu esnaf (ad vermek istemedi)", rol: "tanik", iletisim: "Aynı sokakta işletme sahibi", tanim: "Sigortalının düzenli olarak dükkânda çalıştığını söyledi, yazılı beyan vermeyi reddetti.", x: 30, y: 74 }]
      ],
      evidence: [
        ["e1", { ad: "Gözlem görüntüleri (3 gün, 9 kesit)", tur: "video", tarih: g(20), kaynak: "Kamusal alandan, sokak üzerinden", teslimAlan: "G. Güler", saklama: "Şifreli disk / klasör 11", not: "Yalnızca sokak cephesi kaydedildi; konut içi hiçbir görüntü yok." }],
        ["e2", { ad: "Hasar beyan formu örneği", tur: "belge", tarih: g(26), kaynak: "Müvekkil hasar birimi", teslimAlan: "G. Güler", saklama: "Kasa A, dosya 05", not: "Beyanda belirtilen kısıtlar listelendi." }],
        ["e3", { ad: "İşletme kayıt dökümü (açık kaynak)", tur: "dijital", tarih: g(19), kaynak: "Kamuya açık ticaret sicil kaydı", teslimAlan: "G. Güler", saklama: "Şifreli disk / klasör 11", not: "Sigortalı, dükkânın halen faal ortağı görünüyor." }]
      ],
      events: [
        ["v1", { ne: g(22) + "T08:15", tur: "gozlem", baslik: "Birinci gün gözlemi", yer: "Beylikdüzü, sokak", aciklama: "Sigortalı 08.15'te dükkâna geldi, 19.00'a kadar ayrılmadı." }],
        ["v2", { ne: g(21) + "T11:05", tur: "olay", baslik: "Ağır malzeme taşınması görüntülendi", yer: "Dükkân önü", aciklama: "Yaklaşık 25 kg'lık çuvallar tek başına taşındı. Beyandaki kısıtla bağdaşmıyor." }],
        ["v3", { ne: g(19) + "T13:00", tur: "adli", baslik: "Ara rapor müvekkile iletildi", yer: "E-posta", aciklama: "Görüntü kesitleri ve gözlem notları teslim edildi." }],
        ["v4", { ne: g(12) + "T10:00", tur: "ihbar", baslik: "Dosya beklemeye alındı", yer: "—", aciklama: "Müvekkil, hakem heyeti kararı çıkana kadar saha çalışmasının durdurulmasını istedi." }]
      ],
      log: [
        ["l1", { tarih: g(22), kim: "G. Güler", faaliyet: "Birinci gün gözlem", sure: 11, masraf: 620, not: "Araç ve yemek." }],
        ["l2", { tarih: g(21), kim: "G. Güler", faaliyet: "İkinci gün gözlem ve görüntüleme", sure: 9, masraf: 540, not: "" }],
        ["l3", { tarih: g(19), kim: "G. Güler", faaliyet: "Görüntü kurgusu ve ara rapor", sure: 4, masraf: 0, not: "Ofis çalışması." }]
      ],
      links: [
        ["b1", { a: "p1", b: "p2", iliski: "sigortacı – sigortalı" }],
        ["b2", { a: "p3", b: "p2", iliski: "aynı sokakta esnaf, düzenli gördüğünü söylüyor" }]
      ]
    },

    {
      vaka: {
        baslik: "İşe alım öncesi geçmiş araştırması",
        musteri: "Vektör Yazılım A.Ş. — İK",
        iletisim: "ik@vektoryazilim.example",
        durum: "kapali", oncelik: "dusuk", acilis: g(54), saatUcreti: 1200, avans: 6000,
        ozet: "ÖRNEK DOSYA — kurgu bir vakadır.\n\nFinans direktörü pozisyonu için son aşamaya kalan adayın, özgeçmişinde beyan ettiği eğitim ve iş geçmişinin doğrulanması talep edildi. Adayın yazılı açık rızası alınmıştır. Kapsam: diploma ve istihdam doğrulaması, kamuya açık kayıt taraması. Kapsam dışı: özel yaşam, sağlık ve maddi durum araştırması.\n\nDosya kapandı: beyanların tamamı doğrulandı, olumsuz bulgu yok."
      },
      people: [
        ["p1", { ad: "Vektör Yazılım — Bora Çetin", rol: "musteri", iletisim: "İK direktörü", tanim: "Rapor doğrudan kendisine teslim edildi.", x: 22, y: 30 }],
        ["p2", { ad: "Aday — S.K.", rol: "ilgili", iletisim: "Yazılı rızası dosyada", tanim: "Adayın kimliği, rıza metnindeki sınırlar gereği baş harfleriyle kaydedildi.", x: 56, y: 48 }],
        ["p3", { ad: "Önceki işveren referansı", rol: "tanik", iletisim: "İK birimi, telefonla doğrulandı", tanim: "Görev süresi ve unvanı teyit etti.", x: 34, y: 76 }]
      ],
      evidence: [
        ["e1", { ad: "Adayın yazılı rıza metni", tur: "belge", tarih: g(54), kaynak: "Müvekkil İK birimi", teslimAlan: "M. Tuna", saklama: "Kasa A, dosya 02", not: "Araştırmanın kapsamı rıza metninde açıkça sınırlandırılmış." }],
        ["e2", { ad: "Diploma doğrulama yazışması", tur: "belge", tarih: g(46), kaynak: "Üniversite öğrenci işleri", teslimAlan: "M. Tuna", saklama: "Kasa A, dosya 02", not: "Mezuniyet yılı ve bölüm beyanla birebir uyuşuyor." }],
        ["e3", { ad: "İstihdam doğrulama notları", tur: "belge", tarih: g(43), kaynak: "İki önceki işveren, telefon görüşmesi", teslimAlan: "M. Tuna", saklama: "Kasa A, dosya 02", not: "Görev süreleri ve unvanlar teyit edildi." }]
      ],
      events: [
        ["v1", { ne: g(54) + "T10:00", tur: "adli", baslik: "Rıza metni alındı, dosya açıldı", yer: "Müvekkil ofisi", aciklama: "Kapsam sınırları yazılı olarak belirlendi." }],
        ["v2", { ne: g(46) + "T14:20", tur: "gorusme", baslik: "Üniversite doğrulaması tamamlandı", yer: "Telefon ve resmî yazışma", aciklama: "Beyan doğrulandı." }],
        ["v3", { ne: g(43) + "T11:30", tur: "gorusme", baslik: "İstihdam doğrulaması tamamlandı", yer: "Telefon", aciklama: "İki önceki işveren de beyanı teyit etti." }],
        ["v4", { ne: g(40) + "T17:00", tur: "adli", baslik: "Rapor teslim edildi, dosya kapandı", yer: "Müvekkil ofisi", aciklama: "Olumsuz bulgu yok. Ham kayıtların saklama süresi altı ay olarak belirlendi." }]
      ],
      log: [
        ["l1", { tarih: g(46), kim: "M. Tuna", faaliyet: "Eğitim doğrulaması", sure: 2, masraf: 0, not: "" }],
        ["l2", { tarih: g(43), kim: "M. Tuna", faaliyet: "İstihdam doğrulaması", sure: 3, masraf: 0, not: "" }],
        ["l3", { tarih: g(40), kim: "M. Tuna", faaliyet: "Rapor yazımı ve teslim", sure: 2.5, masraf: 0, not: "" }]
      ],
      links: [
        ["b1", { a: "p1", b: "p2", iliski: "işe alan – aday" }],
        ["b2", { a: "p3", b: "p2", iliski: "önceki işveren – çalışan" }]
      ]
    }
  ];

  /* ===================================================================== */
  var en = [
    {
      vaka: {
        baslik: "Warehouse stock loss inquiry",
        musteri: "Aksu Logistics Ltd.",
        iletisim: "+44 20 0000 0000 · admin@aksulogistics.example",
        durum: "sicak", oncelik: "yuksek", acilis: g(17), saatUcreti: 85, avans: 1500,
        ozet: "SAMPLE FILE — added so you can look around; every person and detail in it is fictional. Change it or delete the file as you like.\n\nThe client asked us to establish whether a three-month stock shortfall at their warehouse originates with staff. In scope: night shift surveillance, review of CCTV, and cross-checking despatch paperwork. Out of scope: any inquiry into staff members' private lives."
      },
      people: [
        ["p1", { ad: "Nurten Aksu", rol: "musteri", iletisim: "Operations manager · +44 7700 000000", tanim: "Client contact. Reports go to her and to nobody else; staff are not to be informed.", x: 16, y: 20 }],
        ["p2", { ad: "Deniz Korkmaz", rol: "suphe", iletisim: "Night shift warehouse supervisor · four years in post", tanim: "Late thirties, around 1.80 m. Grey van, plate ABC 123. Observed alone on the loading bay at shift end on three occasions. Holds stock-count authority.", x: 50, y: 34 }],
        ["p3", { ad: "Servet Balaban", rol: "tanik", iletisim: "Forklift operator · same shift", tanim: "States he saw the van pull up to the bay but does not recall the plate. Statement taken and signed.", x: 24, y: 68 }],
        ["p4", { ad: "White van driver (unidentified)", rol: "ilgili", iletisim: "—", tanim: "Face not clear on any frame. Vehicle: white panel van, first three characters of the plate read as 34 T.", x: 78, y: 60 }],
        ["p5", { ad: "Hakan Erdoğan", rol: "ilgili", iletisim: "Despatch planning · day shift", tanim: "Raised the three despatch notes that show a discrepancy. Not a subject at this stage; interviewed to understand the paperwork flow.", x: 62, y: 80 }]
      ],
      evidence: [
        ["e1", { ad: "Four days of warehouse CCTV (74 hours)", tur: "dijital", tarih: g(4), kaynak: "Site NVR, channel 3 — copied in the presence of the operations manager", teslimAlan: "G. Güler", saklama: "Encrypted external drive / folder 03", not: "The 23:10–23:48 window is under review. Copy record filed." }],
        ["e2", { ad: "Despatch notes (48 pages)", tur: "belge", tarih: g(11), kaynak: "Client accounts department, signed for on collection", teslimAlan: "G. Güler", saklama: "Safe B, file 14", not: "Three notes differ from the system record by 62 units in total." }],
        ["e3", { ad: "Loading bay and car park photographs (26 frames)", tur: "foto", tarih: g(7), kaynak: "Observation point on the public pavement opposite", teslimAlan: "G. Güler", saklama: "Encrypted external drive / folder 03", not: "The plate is partly legible in frame 12." }],
        ["e4", { ad: "Written statement of Servet Balaban (2 pages)", tur: "beyan", tarih: g(6), kaynak: "Interview in the warehouse break room", teslimAlan: "G. Güler", saklama: "Safe B, file 14", not: "The witness consented in writing to the statement being shared with the client." }]
      ],
      events: [
        ["v1", { ne: g(8) + "T21:30", tur: "gozlem", baslik: "Night shift surveillance began", yer: "Warehouse, pavement opposite", aciklama: "Observation point set up. Shift entry completed at 22:00; eight staff went in." }],
        ["v2", { ne: g(8) + "T23:12", tur: "olay", baslik: "White van pulled up to the loading bay", yer: "Rear loading bay", aciklama: "Van arrived 23:12, left 23:46. One person on the bay. No despatch is booked for that time in the schedule." }],
        ["v3", { ne: g(6) + "T14:00", tur: "gorusme", baslik: "Interview with witness Servet Balaban", yer: "Warehouse break room", aciklama: "States he saw the van and assumed it was a routine collection. Does not recall the plate." }],
        ["v4", { ne: g(4) + "T10:20", tur: "adli", baslik: "CCTV taken into custody", yer: "Client's administrative office", aciklama: "Copied in the presence of the operations manager; handover record signed by both parties." }],
        ["v5", { ne: g(2) + "T16:45", tur: "gozlem", baslik: "Interim findings presented to the client", yer: "Client's office", aciklama: "Findings given verbally. The client asked that staff not be informed yet. Surveillance continues for two more weeks." }]
      ],
      log: [
        ["l1", { tarih: g(8), kim: "G. Güler", faaliyet: "Night shift surveillance — 21:30 to 03:30", sure: 6, masraf: 28, not: "Fuel and parking." }],
        ["l2", { tarih: g(7), kim: "G. Güler", faaliyet: "Morning handover and loading bay photography", sure: 3.5, masraf: 13, not: "" }],
        ["l3", { tarih: g(6), kim: "M. Tuna", faaliyet: "Witness interview and statement", sure: 2, masraf: 0, not: "" }],
        ["l4", { tarih: g(4), kim: "G. Güler", faaliyet: "CCTV review and despatch note cross-check", sure: 5, masraf: 0, not: "Desk work." }]
      ],
      links: [
        ["b1", { a: "p2", b: "p4", iliski: "same loading bay on the night" }],
        ["b2", { a: "p2", b: "p3", iliski: "same shift team" }],
        ["b3", { a: "p1", b: "p2", iliski: "employer – employee" }],
        ["b4", { a: "p5", b: "p2", iliski: "raised the notes – ran the stock count" }]
      ]
    },

    {
      vaka: {
        baslik: "Missing person inquiry — Emre Şahin",
        musteri: "Hatice Şahin (mother)",
        iletisim: "+44 7700 000001",
        durum: "acik", oncelik: "yuksek", acilis: g(9), saatUcreti: 70, avans: 600,
        ozet: "SAMPLE FILE — a fictional case.\n\nThe client's 24-year-old son has not been in contact with his family for eleven days. A missing person report has been filed with the police and a case is open; this inquiry does not replace that report, it supports it. In scope: canvassing witnesses where he was last seen, open-source checks, and visits to known addresses. Out of scope: access to communications content, location tracking, and anything requiring police powers."
      },
      people: [
        ["p1", { ad: "Hatice Şahin", rol: "musteri", iletisim: "Mother · +44 7700 000001", tanim: "Asks for a daily update. Her last call with her son was eleven days ago, short and tense.", x: 18, y: 22 }],
        ["p2", { ad: "Emre Şahin", rol: "magdur", iletisim: "Last known address: rented flat, east side", tanim: "24 years old, 1.75 m, slight build. Watch tattoo on the left wrist. Last seen in a dark green coat with a rucksack. Phone off for eleven days.", x: 52, y: 40 }],
        ["p3", { ad: "Onur Bilir", rol: "tanik", iletisim: "Flatmate", tanim: "States Emre went out in the evening eleven days ago and did not return. Adds that he was two months behind on his share of the rent.", x: 24, y: 70 }],
        ["p4", { ad: "Sevil Arıkan", rol: "tanik", iletisim: "Manager of the café where he worked", tanim: "States he has missed shifts for the last two weeks and had asked her for a loan.", x: 76, y: 66 }]
      ],
      evidence: [
        ["e1", { ad: "Most recent photograph and description form", tur: "foto", tarih: g(9), kaynak: "Handed over by the client", teslimAlan: "M. Tuna", saklama: "Encrypted drive / folder 07", not: "The same photograph was given to the police report." }],
        ["e2", { ad: "Statement of flatmate Onur Bilir", tur: "beyan", tarih: g(7), kaynak: "Interview at the flat", teslimAlan: "M. Tuna", saklama: "Safe B, file 21", not: "Taken in writing and signed." }],
        ["e3", { ad: "Open-source search notes", tur: "belge", tarih: g(3), kaynak: "Publicly visible social media accounts", teslimAlan: "M. Tuna", saklama: "Encrypted drive / folder 07", not: "Last post twelve days ago. Accounts not closed, no activity since." }]
      ],
      events: [
        ["v1", { ne: g(11) + "T19:40", tur: "olay", baslik: "Last phone call with his family", yer: "—", aciklama: "Per the client, the call was short and tense; money was discussed." }],
        ["v2", { ne: g(11) + "T21:10", tur: "olay", baslik: "Last seen leaving the flat", yer: "Rented flat, east side", aciklama: "Flatmate's account. Left with a rucksack and did not return." }],
        ["v3", { ne: g(7) + "T11:00", tur: "gorusme", baslik: "Interview with the flatmate", yer: "The flat", aciklama: "Rent arrears and a change in behaviour over recent weeks were described." }],
        ["v4", { ne: g(5) + "T15:30", tur: "gorusme", baslik: "Interview at his workplace", yer: "The café", aciklama: "Two weeks of missed shifts. The manager confirms he asked her for a loan." }],
        ["v5", { ne: g(1) + "T09:00", tur: "ihbar", baslik: "Daily update to the client", yer: "By phone", aciklama: "Findings passed on. An interim report will be prepared for sharing with the police file." }]
      ],
      log: [
        ["l1", { tarih: g(8), kim: "M. Tuna", faaliyet: "Canvass of the area where he was last seen", sure: 5, masraf: 20, not: "Seven businesses spoken to." }],
        ["l2", { tarih: g(7), kim: "M. Tuna", faaliyet: "Flatmate interview and check of the flat", sure: 2.5, masraf: 5, not: "" }],
        ["l3", { tarih: g(3), kim: "M. Tuna", faaliyet: "Open-source search", sure: 4, masraf: 0, not: "Desk work." }]
      ],
      links: [
        ["b1", { a: "p1", b: "p2", iliski: "mother – son" }],
        ["b2", { a: "p3", b: "p2", iliski: "share a flat" }],
        ["b3", { a: "p4", b: "p2", iliski: "employer – employee, two weeks absent" }]
      ]
    },

    {
      vaka: {
        baslik: "Insurance claim verification",
        musteri: "Marmara Insurance — Claims",
        iletisim: "claims@marmarainsurance.example",
        durum: "bekle", oncelik: "orta", acilis: g(26), saatUcreti: 95, avans: 900,
        ozet: "SAMPLE FILE — a fictional case.\n\nWe were asked to establish whether a claimant who has declared total incapacity for work is engaged in activity inconsistent with that declaration. In scope: observation from public places and open-source verification. Out of scope: filming inside a home, requesting medical records, and any interception of communications.\n\nThe file is on hold at the client's request, pending the arbitration panel's decision."
      },
      people: [
        ["p1", { ad: "Marmara Insurance — Ece Yalçın", rol: "musteri", iletisim: "Claims specialist", tanim: "Owns the file. Interim reports go to her only.", x: 20, y: 26 }],
        ["p2", { ad: "Kemal Doğru", rol: "suphe", iletisim: "Claimant · west side", tanim: "52 years old. Declares he cannot lift heavy loads or climb stairs. Recorded carrying building materials on the observation days.", x: 56, y: 44 }],
        ["p3", { ad: "Neighbouring trader (declined to be named)", rol: "tanik", iletisim: "Runs a business on the same street", tanim: "Says the claimant works at the shop regularly, but refused to give a written statement.", x: 30, y: 74 }]
      ],
      evidence: [
        ["e1", { ad: "Observation footage (3 days, 9 clips)", tur: "video", tarih: g(20), kaynak: "From the public street", teslimAlan: "G. Güler", saklama: "Encrypted drive / folder 11", not: "Only the street frontage was recorded; there is no footage of any interior." }],
        ["e2", { ad: "Copy of the claim declaration form", tur: "belge", tarih: g(26), kaynak: "Client's claims department", teslimAlan: "G. Güler", saklama: "Safe A, file 05", not: "The limitations stated in the declaration are listed." }],
        ["e3", { ad: "Company register extract (open source)", tur: "dijital", tarih: g(19), kaynak: "Public companies register", teslimAlan: "G. Güler", saklama: "Encrypted drive / folder 11", not: "The claimant still appears as an active partner in the shop." }]
      ],
      events: [
        ["v1", { ne: g(22) + "T08:15", tur: "gozlem", baslik: "Day one observation", yer: "West side, street", aciklama: "The claimant arrived at the shop at 08:15 and did not leave until 19:00." }],
        ["v2", { ne: g(21) + "T11:05", tur: "olay", baslik: "Heavy lifting recorded", yer: "In front of the shop", aciklama: "Sacks of roughly 25 kg carried unaided. Inconsistent with the declared limitation." }],
        ["v3", { ne: g(19) + "T13:00", tur: "adli", baslik: "Interim report sent to the client", yer: "By email", aciklama: "Clips and observation notes handed over." }],
        ["v4", { ne: g(12) + "T10:00", tur: "ihbar", baslik: "File placed on hold", yer: "—", aciklama: "The client asked for fieldwork to stop until the arbitration panel rules." }]
      ],
      log: [
        ["l1", { tarih: g(22), kim: "G. Güler", faaliyet: "Day one observation", sure: 11, masraf: 36, not: "Vehicle and meals." }],
        ["l2", { tarih: g(21), kim: "G. Güler", faaliyet: "Day two observation and filming", sure: 9, masraf: 31, not: "" }],
        ["l3", { tarih: g(19), kim: "G. Güler", faaliyet: "Editing clips and writing the interim report", sure: 4, masraf: 0, not: "Desk work." }]
      ],
      links: [
        ["b1", { a: "p1", b: "p2", iliski: "insurer – claimant" }],
        ["b2", { a: "p3", b: "p2", iliski: "trader on the same street, says he sees him daily" }]
      ]
    },

    {
      vaka: {
        baslik: "Pre-employment background check",
        musteri: "Vektör Software Ltd. — HR",
        iletisim: "hr@vektorsoftware.example",
        durum: "kapali", oncelik: "dusuk", acilis: g(54), saatUcreti: 70, avans: 350,
        ozet: "SAMPLE FILE — a fictional case.\n\nWe were asked to verify the education and employment history declared by the final candidate for a finance director post. The candidate gave written consent. In scope: verification of the degree and of past employment, and public record checks. Out of scope: private life, health, and financial circumstances.\n\nFile closed: every declaration was verified and nothing adverse was found."
      },
      people: [
        ["p1", { ad: "Vektör Software — Bora Çetin", rol: "musteri", iletisim: "HR director", tanim: "The report was handed to him directly.", x: 22, y: 30 }],
        ["p2", { ad: "Candidate — S.K.", rol: "ilgili", iletisim: "Written consent on file", tanim: "Recorded by initials only, as the terms of the consent require.", x: 56, y: 48 }],
        ["p3", { ad: "Reference from a former employer", rol: "tanik", iletisim: "HR department, verified by phone", tanim: "Confirmed the dates of service and the job title.", x: 34, y: 76 }]
      ],
      evidence: [
        ["e1", { ad: "The candidate's written consent", tur: "belge", tarih: g(54), kaynak: "Client's HR department", teslimAlan: "M. Tuna", saklama: "Safe A, file 02", not: "The scope of the check is expressly limited in the consent." }],
        ["e2", { ad: "Degree verification correspondence", tur: "belge", tarih: g(46), kaynak: "University registry", teslimAlan: "M. Tuna", saklama: "Safe A, file 02", not: "Year of graduation and course match the declaration exactly." }],
        ["e3", { ad: "Employment verification notes", tur: "belge", tarih: g(43), kaynak: "Two former employers, by telephone", teslimAlan: "M. Tuna", saklama: "Safe A, file 02", not: "Dates of service and titles confirmed." }]
      ],
      events: [
        ["v1", { ne: g(54) + "T10:00", tur: "adli", baslik: "Consent obtained, file opened", yer: "Client's office", aciklama: "The limits of the check were agreed in writing." }],
        ["v2", { ne: g(46) + "T14:20", tur: "gorusme", baslik: "University verification completed", yer: "Phone and formal correspondence", aciklama: "Declaration verified." }],
        ["v3", { ne: g(43) + "T11:30", tur: "gorusme", baslik: "Employment verification completed", yer: "By phone", aciklama: "Both former employers confirmed the declaration." }],
        ["v4", { ne: g(40) + "T17:00", tur: "adli", baslik: "Report delivered, file closed", yer: "Client's office", aciklama: "Nothing adverse found. Retention of the raw records set at six months." }]
      ],
      log: [
        ["l1", { tarih: g(46), kim: "M. Tuna", faaliyet: "Education verification", sure: 2, masraf: 0, not: "" }],
        ["l2", { tarih: g(43), kim: "M. Tuna", faaliyet: "Employment verification", sure: 3, masraf: 0, not: "" }],
        ["l3", { tarih: g(40), kim: "M. Tuna", faaliyet: "Writing and delivering the report", sure: 2.5, masraf: 0, not: "" }]
      ],
      links: [
        ["b1", { a: "p1", b: "p2", iliski: "hiring manager – candidate" }],
        ["b2", { a: "p3", b: "p2", iliski: "former employer – employee" }]
      ]
    }
  ];

  return lang === "en" ? en : tr;
};
