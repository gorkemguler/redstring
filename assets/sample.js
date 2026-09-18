/* Redstring örnek vakası — uygulamayı tanıtmak için. İçindeki kişi ve olaylar kurgudur.
   Sample case used for the demo and first-run tour. Everyone in it is fictional. */
window.VM_SAMPLE = function (lang, ctx) {
  "use strict";
  var g = ctx.bugun;

  var tr = {
    vaka: {
      baslik: "Depo stok kaybı araştırması",
      musteri: "Aksu Lojistik A.Ş.",
      iletisim: "0212 000 00 00 · idari@aksulojistik.example",
      ozet: "ÖRNEK DOSYA — uygulamayı tanımanız için eklendi; içindeki kişi ve bilgiler kurgudur, dilediğiniz gibi değiştirebilir veya dosyayı silebilirsiniz.\n\nMüvekkil, deposunda üç aydır süren stok açığının personel kaynaklı olup olmadığının araştırılmasını talep etti. Kapsam: gece vardiyası gözlemi, kamera kaydı incelemesi ve sevkiyat evrakının çapraz kontrolü. Kapsam dışı: personelin özel yaşamına ilişkin her türlü araştırma."
    },
    people: [
      ["p1", { ad: "Nurten Aksu", rol: "musteri", iletisim: "İdari müdür · 0532 000 00 00", tanim: "Müvekkil temsilcisi. Raporlar yalnızca kendisine teslim edilecek.", x: 18, y: 22 }],
      ["p2", { ad: "Deniz Korkmaz", rol: "suphe", iletisim: "Gece vardiyası depo sorumlusu", tanim: "38 yaşlarında, 1.80 civarı. Gri panelvan, 34 ABC 123. Vardiya çıkışlarında rampada tek başına kaldığı üç kez gözlendi.", x: 52, y: 34 }],
      ["p3", { ad: "Servet Balaban", rol: "tanik", iletisim: "Forklift operatörü · aynı vardiya", tanim: "Rampaya yanaşan aracı gördüğünü, plakayı hatırlamadığını beyan etti.", x: 26, y: 68 }],
      ["p4", { ad: "Beyaz panelvan sürücüsü (kimliği belirsiz)", rol: "ilgili", iletisim: "—", tanim: "Yüz görüntüsü net değil. Araç: beyaz panelvan, plakanın ilk üç hanesi 34 T.", x: 78, y: 62 }]
    ],
    evidence: [
      ["e1", { ad: "Dört günlük depo kamera kayıtları", tur: "dijital", tarih: g, kaynak: "Depo NVR cihazı, kanal 3 — idari müdür huzurunda kopyalandı", teslimAlan: "Araştırmacı", saklama: "Şifreli harici disk / klasör 03", not: "Toplam 74 saat kayıt. 23.10–23.48 aralığı incelemeye alındı." }],
      ["e2", { ad: "Sevkiyat irsaliyeleri (48 sayfa)", tur: "belge", tarih: g, kaynak: "Müvekkil muhasebe birimi, imza karşılığı", teslimAlan: "Araştırmacı", saklama: "Kasa B, dosya 14", not: "Üç irsaliyede çıkış adedi ile sistem kaydı arasında fark tespit edildi." }],
      ["e3", { ad: "Rampa ve otopark fotoğrafları (26 kare)", tur: "foto", tarih: g, kaynak: "Karşı kaldırımdaki gözlem noktası, kamusal alan", teslimAlan: "Araştırmacı", saklama: "Şifreli harici disk / klasör 03", not: "Araç plakası 12 numaralı karede kısmen okunabiliyor." }]
    ],
    events: [
      ["v1", { ne: g + "T21:30", tur: "gozlem", baslik: "Gece vardiyası gözlemi başladı", yer: "Depo, karşı kaldırım", aciklama: "Gözlem noktası kuruldu. Vardiya girişi 22.00'de tamamlandı." }],
      ["v2", { ne: g + "T23:12", tur: "olay", baslik: "Beyaz panelvan yükleme rampasına yanaştı", yer: "Arka rampa", aciklama: "Araç 23.12'de yanaştı, 23.46'da ayrıldı. Rampada tek kişi vardı. Sevkiyat programında bu saate kayıtlı çıkış bulunmuyor." }],
      ["v3", { ne: g + "T14:00", tur: "gorusme", baslik: "Tanık Servet Balaban ile görüşme", yer: "Depo dinlenme alanı", aciklama: "Aracı gördüğünü, olağan bir sevkiyat sandığını beyan etti. Beyan yazılı alındı." }]
    ],
    log: [
      ["l1", { tarih: g, kim: "Araştırmacı", faaliyet: "Gece vardiyası gözlemi", sure: 6, masraf: 480, not: "Araç yakıtı ve otopark." }],
      ["l2", { tarih: g, kim: "Araştırmacı", faaliyet: "Sabah devri ve fotoğraflama", sure: 3.5, masraf: 220, not: "" }],
      ["l3", { tarih: g, kim: "Araştırmacı", faaliyet: "Kamera kaydı inceleme ve irsaliye çapraz kontrolü", sure: 5, masraf: 0, not: "Ofis çalışması." }]
    ],
    links: [
      ["b1", { a: "p2", b: "p4", iliski: "olay gecesi aynı rampada" }],
      ["b2", { a: "p2", b: "p3", iliski: "aynı vardiya ekibi" }],
      ["b3", { a: "p1", b: "p2", iliski: "işveren – çalışan" }]
    ]
  };

  var en = {
    vaka: {
      baslik: "Warehouse stock loss inquiry",
      musteri: "Aksu Logistics Ltd.",
      iletisim: "+44 20 0000 0000 · admin@aksulogistics.example",
      ozet: "SAMPLE FILE — added so you can look around; every person and detail in it is fictional, so change it or delete the file as you like.\n\nThe client asked us to establish whether a three-month stock shortfall at their warehouse originates with staff. In scope: night shift surveillance, review of CCTV, and cross-checking despatch paperwork. Out of scope: any inquiry into staff members' private lives."
    },
    people: [
      ["p1", { ad: "Nurten Aksu", rol: "musteri", iletisim: "Operations manager · +44 7700 000000", tanim: "Client contact. Reports go to her and no one else.", x: 18, y: 22 }],
      ["p2", { ad: "Deniz Korkmaz", rol: "suphe", iletisim: "Night shift warehouse supervisor", tanim: "Late thirties, around 1.80 m. Grey van, plate ABC 123. Observed alone on the loading bay at shift end on three occasions.", x: 52, y: 34 }],
      ["p3", { ad: "Servet Balaban", rol: "tanik", iletisim: "Forklift operator · same shift", tanim: "States he saw the van pull up to the bay but does not recall the plate.", x: 26, y: 68 }],
      ["p4", { ad: "White van driver (unidentified)", rol: "ilgili", iletisim: "—", tanim: "Face not clear on any frame. Vehicle: white panel van, first three characters of the plate read as 34 T.", x: 78, y: 62 }]
    ],
    evidence: [
      ["e1", { ad: "Four days of warehouse CCTV", tur: "dijital", tarih: g, kaynak: "Site NVR, channel 3 — copied in the presence of the operations manager", teslimAlan: "Investigator", saklama: "Encrypted external drive / folder 03", not: "74 hours in total. The 23:10–23:48 window is under review." }],
      ["e2", { ad: "Despatch notes (48 pages)", tur: "belge", tarih: g, kaynak: "Client accounts department, signed for", teslimAlan: "Investigator", saklama: "Safe B, file 14", not: "Three notes show a discrepancy between quantity despatched and the system record." }],
      ["e3", { ad: "Loading bay and car park photographs (26 frames)", tur: "foto", tarih: g, kaynak: "Observation point on the public pavement opposite", teslimAlan: "Investigator", saklama: "Encrypted external drive / folder 03", not: "The plate is partly legible in frame 12." }]
    ],
    events: [
      ["v1", { ne: g + "T21:30", tur: "gozlem", baslik: "Night shift surveillance began", yer: "Warehouse, pavement opposite", aciklama: "Observation point set up. Shift entry completed at 22:00." }],
      ["v2", { ne: g + "T23:12", tur: "olay", baslik: "White van pulled up to the loading bay", yer: "Rear loading bay", aciklama: "Van arrived 23:12, left 23:46. One person on the bay. No despatch is booked for that time in the schedule." }],
      ["v3", { ne: g + "T14:00", tur: "gorusme", baslik: "Interview with witness Servet Balaban", yer: "Warehouse break room", aciklama: "States he saw the van and assumed it was a routine collection. Statement taken in writing." }]
    ],
    log: [
      ["l1", { tarih: g, kim: "Investigator", faaliyet: "Night shift surveillance", sure: 6, masraf: 480, not: "Fuel and parking." }],
      ["l2", { tarih: g, kim: "Investigator", faaliyet: "Morning handover and photography", sure: 3.5, masraf: 220, not: "" }],
      ["l3", { tarih: g, kim: "Investigator", faaliyet: "CCTV review and despatch note cross-check", sure: 5, masraf: 0, not: "Desk work." }]
    ],
    links: [
      ["b1", { a: "p2", b: "p4", iliski: "same loading bay on the night" }],
      ["b2", { a: "p2", b: "p3", iliski: "same shift team" }],
      ["b3", { a: "p1", b: "p2", iliski: "employer – employee" }]
    ]
  };

  return lang === "en" ? en : tr;
};
