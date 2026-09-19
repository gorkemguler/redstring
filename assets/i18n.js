/* Redstring — arayüz metinleri / interface strings.
   Yeni bir dil eklemek için: STR nesnesine aynı anahtarlarla bir blok ekleyin
   ve DILLER dizisine dilin kodunu yazın.
   To add a language: add a block with the same keys to STR and list its code in DILLER. */
window.VM_I18N = (function () {
  "use strict";

  var DILLER = [
    { id: "tr", ad: "TR", locale: "tr-TR", kodOnek: "VK" },
    { id: "en", ad: "EN", locale: "en-GB", kodOnek: "CF" }
  ];

  var STR = {
    tr: {
      baslik: "Redstring",
      tag: "özel araştırma dosya sistemi",
      belgeBaslik: "Redstring — Özel Araştırma Dosya Sistemi",
      dilAria: "Dili değiştir",
      temaAria: "Açık / koyu tema",
      veri: "Veri",
      yeniVaka: "+ Yeni Vaka",
      ara: "Vaka, müvekkil veya kod ara…",
      araAria: "Vaka ara",
      filtreAria: "Duruma göre filtrele",
      hepsi: "Hepsi",
      railFoot: "Kayıtlar yalnızca bu tarayıcıda saklanır.",
      statAcik: "Açık dosya", statSicak: "Sıcak takip", statToplam: "Toplam",

      listBosBaslik: "Henüz dosya açılmadı",
      listBosAlt: "Sağ üstten ilk vakanızı açın.",
      listFiltreBaslik: "Eşleşen vaka yok",
      listFiltreAlt: "Aramayı veya filtreyi değiştirin.",
      musteriYok: "müvekkil belirtilmemiş",
      adsizVaka: "Adsız vaka",

      seciliYokBaslik: "Soldan bir dosya seçin",
      seciliYokAlt: "Her vaka için taraflar, deliller, kronoloji, saha mesaisi ve bağlantı şeması tek dosyada tutulur.",
      ornekEkle: "Örnek vakaları ekle",

      demoBaslik: "Demo",
      demoAlt: "Örnek veriyle açıldı; bu modda hiçbir şey kaydedilmez. Kendi dosyalarınız için adresten ?demo=1 kısmını çıkarın.",
      depoKapaliBaslik: "Kalıcı kayıt kapalı",
      depoKapaliAlt: "Tarayıcı depolamasına yazılamıyor (gizli sekme veya site verisi engelli olabilir). Girdikleriniz bu sekme kapanınca kaybolur.",

      geri: "← Vakalar", duzenle: "Düzenle", sil: "Sil",
      oncelikEk: "{x} öncelik",

      fMusteri: "Müvekkil", fIletisim: "İletişim", fAcilis: "Açılış",
      fMesai: "Saha mesaisi", fMasraf: "Masraf", fHakedis: "Hakediş", fAvans: "Avans",

      tabTaraflar: "Taraflar", tabDeliller: "Deliller", tabKronoloji: "Kronoloji",
      tabSaha: "Saha Kaydı", tabSema: "Bağlantı Şeması", tabRapor: "Dosya Raporu",

      phTaraflar: "Dosyadaki taraflar", btnTaraf: "+ Taraf ekle",
      phDeliller: "Delil kayıt defteri", btnDelil: "+ Delil kaydet",
      phKronoloji: "Olay zaman çizelgesi", btnOlay: "+ Kayıt ekle",
      phSaha: "Mesai ve masraf dökümü", btnSaha: "+ Kayıt ekle",
      phSema: "Bağlantı şeması", btnBaglanti: "+ Bağlantı kur",
      semaIpucu: "Kartları sürükleyerek yerleştirin.",
      phBaglantilar: "Kurulan bağlantılar",

      bosTaraflarB: "Taraf kaydı yok",
      bosTaraflarA: "Müvekkil, şüpheli, tanık ve diğer ilgilileri buraya işleyin.",
      bosTaraflarBtn: "+ İlk tarafı ekle",
      bosDelillerB: "Delil kaydı yok",
      bosDelillerA: "Her delili nereden, ne zaman ve kim tarafından alındığıyla birlikte kaydedin.",
      bosDelillerBtn: "+ İlk delili kaydet",
      bosKronolojiB: "Kronoloji boş",
      bosKronolojiA: "Gözlem, görüşme ve olayları saatiyle işleyin; rapor sırasında dizi kendiliğinden çıkar.",
      bosKronolojiBtn: "+ İlk kaydı ekle",
      bosSahaB: "Saha kaydı yok",
      bosSahaA: "Gözlem vardiyalarını ve masrafları girin; hakediş toplamı burada hesaplanır.",
      bosSahaBtn: "+ İlk kaydı ekle",
      bosSemaB: "Şema için taraf gerekiyor",
      bosSemaA: "Önce Taraflar sekmesinden kişileri ekleyin, sonra aralarına ip çekin.",

      kKaynak: "Kaynak", kTeslim: "Teslim alan", kSaklama: "Saklama", kIletisim: "İletişim",

      thTarih: "Tarih", thFaaliyet: "Faaliyet", thArastirmaci: "Araştırmacı",
      thSure: "Süre", thMasrafT: "Masraf", thToplam: "Toplam · saat ücreti {x}",

      raporIpucu: "Tüm bölümler tek sayfada. Yazdır düğmesi tarayıcının PDF çıktısını da verir.",
      raporYazdir: "Yazdır / PDF",
      raporBosB: "Rapora yazılacak kayıt yok",
      raporBosA: "Taraf, delil veya kronoloji ekledikçe bu sayfa kendiliğinden dolar.",
      rsTaraflar: "Taraflar", rsDeliller: "Delil kayıt defteri", rsKronoloji: "Olay kronolojisi",
      rsSaha: "Saha mesaisi ve masraf dökümü", rsSema: "Bağlantı şeması",
      raporAlt: "{kod} · rapor çıktısı {tarih} · Redstring",

      vazgec: "Vazgeç", kaydet: "Kaydet", guncelle: "Güncelle", ekle: "Ekle",
      vakaYeniEy: "Yeni dosya", vakaDuzenleEy: "Dosya düzenle",
      vakaYeniBaslik: "Vaka dosyası aç", vakaAc: "Dosyayı aç",
      lKod: "Dosya no", lAcilis: "Açılış tarihi", lBaslik: "Vaka başlığı",
      lMusteri: "Müvekkil", lMusteriIlet: "Müvekkil iletişimi", lDurum: "Durum",
      lOncelik: "Öncelik", lSaatUcreti: "Saat ücreti ({b})", lAvans: "Alınan avans ({b})",
      lOzet: "Vaka özeti",
      pBaslik: "ör. Depo stok kaybı araştırması", pMusteri: "Kişi veya kurum",
      pIletisim: "Telefon / e-posta",
      pOzet: "Müvekkilin talebi, araştırmanın kapsamı ve kapsam dışı bıraktığınız alanlar.",

      kisiEy: "İlgili taraf", kisiYeni: "Tarafa kayıt aç", kisiDuzenle: "Tarafı düzenle",
      lAd: "Ad soyad", lRol: "Sıfatı", lKisiIlet: "İletişim / adres", lTanim: "Eşkâl ve tanıtıcı bilgi",
      pTanim: "Yaş, boy, araç plakası, çalıştığı yer…",

      delilEy: "Delil kaydı", delilYeni: "Delil kayıt fişi", delilDuzenle: "Delili düzenle",
      lDelilAd: "Delil tanımı", lDelilTur: "Delil türü", lDelilTarih: "Elde edilme tarihi",
      lDelilKaynak: "Nereden elde edildi", lDelilTeslim: "Teslim alan", lDelilSaklama: "Saklama yeri",
      lNot: "Not",
      pDelilAd: "ör. 14.09 tarihli otopark görüntüsü", pDelilKaynak: "Konum veya kaynak kişi",
      pDelilTeslim: "Kaydı tutan araştırmacı", pDelilSaklama: "ör. Kasa B / şifreli disk klasör 03",

      olayEy: "Kronoloji", olayYeni: "Zaman çizelgesine kayıt", olayDuzenle: "Kaydı düzenle",
      lOlayNe: "Tarih ve saat", lOlayBaslik: "Ne oldu", lOlayTur: "Kayıt türü",
      lOlayYer: "Yer", lOlayAciklama: "Ayrıntı",

      sahaEy: "Saha kaydı", sahaYeni: "Mesai ve masraf kaydı", sahaDuzenle: "Kaydı düzenle",
      lSahaKim: "Araştırmacı", lSahaFaaliyet: "Faaliyet", lSahaSure: "Süre (saat)",
      lSahaMasraf: "Masraf ({b})",
      pSahaFaaliyet: "ör. Sabah vardiyası gözlem — Kartal",

      bagEy: "Bağlantı", bagBaslik: "İki tarafı bağla", bagBtn: "Bağla",
      lBagA: "Taraf", lBagB: "Diğer taraf", lBagIliski: "İlişki",
      pBagIliski: "ör. aynı araçta görüldü / eski iş ortağı",
      bagAzTaraf: "Bağlantı kurmak için en az iki taraf kaydı gerekir.",
      bagAyniKisi: "Bir tarafı kendisiyle bağlayamazsınız.",

      veriEy: "Veri", veriBaslik: "Yedekleme ve ayarlar",
      veriAciklama: "Kayıtlar yalnızca bu tarayıcıda tutuluyor ({n} kayıt). Başka bir cihaza taşımak veya yedeklemek için JSON dosyası kullanın.",
      veriDisa: "JSON olarak indir", veriIce: "Yedek dosyası yükle", veriTemizle: "Tüm kayıtları sil",
      lParaBirimi: "Para birimi simgesi",
      veriTemizleOnay: "Bu tarayıcıdaki TÜM vaka kayıtları kalıcı olarak silinecek. Önce yedek aldınız mı?",
      veriJsonHata: "Dosya okunamadı: geçerli bir JSON değil.",
      veriYedekHata: "Dosya bu uygulamanın yedeği değil.",
      veriIceOnay: "Yedek dosyası yüklenecek.\n\nTAMAM: mevcut kayıtların üzerine ekle (birleştir)\nİPTAL: mevcut kayıtları tamamen değiştir",
      vakaSilOnay: "“{x}” dosyası ve içindeki tüm kayıtlar silinecek. Onaylıyor musunuz?",
      kayitSilOnay: "Bu kayıt silinsin mi?",
      buVaka: "Bu vaka",
      duzenleAria: "Düzenle", silAria: "Sil"
    },

    en: {
      baslik: "Redstring",
      tag: "private investigation case files",
      belgeBaslik: "Redstring — Private Investigation Case Files",
      dilAria: "Change language",
      temaAria: "Light / dark theme",
      veri: "Data",
      yeniVaka: "+ New Case",
      ara: "Search case, client or file no…",
      araAria: "Search cases",
      filtreAria: "Filter by status",
      hepsi: "All",
      railFoot: "Records are stored in this browser only.",
      statAcik: "Open cases", statSicak: "Active watch", statToplam: "Total",

      listBosBaslik: "No case files yet",
      listBosAlt: "Open your first case from the top right.",
      listFiltreBaslik: "No matching case",
      listFiltreAlt: "Change the search or the filter.",
      musteriYok: "no client recorded",
      adsizVaka: "Untitled case",

      seciliYokBaslik: "Select a case file",
      seciliYokAlt: "Every case keeps its people, evidence, timeline, field hours and link chart in one file.",
      ornekEkle: "Add sample cases",

      demoBaslik: "Demo",
      demoAlt: "Opened with sample data; nothing is saved in this mode. Drop ?demo=1 from the address to keep your own files.",
      depoKapaliBaslik: "Persistent storage off",
      depoKapaliAlt: "The browser will not accept writes (private window, or site data blocked). Anything you enter is lost when this tab closes.",

      geri: "← Cases", duzenle: "Edit", sil: "Delete",
      oncelikEk: "{x} priority",

      fMusteri: "Client", fIletisim: "Contact", fAcilis: "Opened",
      fMesai: "Field hours", fMasraf: "Expenses", fHakedis: "Billable", fAvans: "Retainer",

      tabTaraflar: "People", tabDeliller: "Evidence", tabKronoloji: "Timeline",
      tabSaha: "Field Log", tabSema: "Link Chart", tabRapor: "Case Report",

      phTaraflar: "People on file", btnTaraf: "+ Add person",
      phDeliller: "Evidence register", btnDelil: "+ Log evidence",
      phKronoloji: "Event timeline", btnOlay: "+ Add entry",
      phSaha: "Hours and expenses", btnSaha: "+ Add entry",
      phSema: "Link chart", btnBaglanti: "+ Add link",
      semaIpucu: "Drag the cards to arrange them.",
      phBaglantilar: "Links on record",

      bosTaraflarB: "No people recorded",
      bosTaraflarA: "Record the client, subjects, witnesses and anyone else involved here.",
      bosTaraflarBtn: "+ Add the first person",
      bosDelillerB: "No evidence logged",
      bosDelillerA: "Log every item with where it came from, when, and who received it.",
      bosDelillerBtn: "+ Log the first item",
      bosKronolojiB: "Timeline is empty",
      bosKronolojiA: "Log observations, interviews and incidents with their times; the sequence builds itself for the report.",
      bosKronolojiBtn: "+ Add the first entry",
      bosSahaB: "No field log yet",
      bosSahaA: "Enter surveillance shifts and expenses; the billable total is worked out here.",
      bosSahaBtn: "+ Add the first entry",
      bosSemaB: "The chart needs people first",
      bosSemaA: "Add people on the People tab, then run string between them.",

      kKaynak: "Source", kTeslim: "Received by", kSaklama: "Stored at", kIletisim: "Contact",

      thTarih: "Date", thFaaliyet: "Activity", thArastirmaci: "Investigator",
      thSure: "Hours", thMasrafT: "Expense", thToplam: "Total · hourly rate {x}",

      raporIpucu: "Every section on one page. Print gives you the browser's PDF output too.",
      raporYazdir: "Print / PDF",
      raporBosB: "Nothing to report yet",
      raporBosA: "This page fills itself as you add people, evidence and timeline entries.",
      rsTaraflar: "People", rsDeliller: "Evidence register", rsKronoloji: "Event timeline",
      rsSaha: "Field hours and expenses", rsSema: "Link chart",
      raporAlt: "{kod} · report generated {tarih} · Redstring",

      vazgec: "Cancel", kaydet: "Save", guncelle: "Update", ekle: "Add",
      vakaYeniEy: "New file", vakaDuzenleEy: "Edit file",
      vakaYeniBaslik: "Open a case file", vakaAc: "Open file",
      lKod: "File no", lAcilis: "Opening date", lBaslik: "Case title",
      lMusteri: "Client", lMusteriIlet: "Client contact", lDurum: "Status",
      lOncelik: "Priority", lSaatUcreti: "Hourly rate ({b})", lAvans: "Retainer received ({b})",
      lOzet: "Case summary",
      pBaslik: "e.g. Warehouse stock loss inquiry", pMusteri: "Person or company",
      pIletisim: "Phone / email",
      pOzet: "What the client asked for, the scope of the inquiry, and what you have ruled out of scope.",

      kisiEy: "Person of interest", kisiYeni: "Add a person", kisiDuzenle: "Edit person",
      lAd: "Full name", lRol: "Role", lKisiIlet: "Contact / address", lTanim: "Description and identifiers",
      pTanim: "Age, height, vehicle plate, place of work…",

      delilEy: "Evidence", delilYeni: "Evidence intake slip", delilDuzenle: "Edit evidence",
      lDelilAd: "Evidence description", lDelilTur: "Evidence type", lDelilTarih: "Date obtained",
      lDelilKaynak: "Where it came from", lDelilTeslim: "Received by", lDelilSaklama: "Storage location",
      lNot: "Note",
      pDelilAd: "e.g. Car park footage from 14 Sept", pDelilKaynak: "Location or source person",
      pDelilTeslim: "Investigator logging the item", pDelilSaklama: "e.g. Safe B / encrypted disk folder 03",

      olayEy: "Timeline", olayYeni: "Add to the timeline", olayDuzenle: "Edit entry",
      lOlayNe: "Date and time", lOlayBaslik: "What happened", lOlayTur: "Entry type",
      lOlayYer: "Location", lOlayAciklama: "Details",

      sahaEy: "Field log", sahaYeni: "Hours and expense entry", sahaDuzenle: "Edit entry",
      lSahaKim: "Investigator", lSahaFaaliyet: "Activity", lSahaSure: "Duration (hours)",
      lSahaMasraf: "Expense ({b})",
      pSahaFaaliyet: "e.g. Morning shift surveillance — east gate",

      bagEy: "Link", bagBaslik: "Link two people", bagBtn: "Link",
      lBagA: "Person", lBagB: "Other person", lBagIliski: "Relationship",
      pBagIliski: "e.g. seen in the same vehicle / former business partner",
      bagAzTaraf: "You need at least two people on file to draw a link.",
      bagAyniKisi: "A person cannot be linked to themselves.",

      veriEy: "Data", veriBaslik: "Backup and settings",
      veriAciklama: "Records live in this browser only ({n} records). Use a JSON file to back them up or move them to another device.",
      veriDisa: "Download as JSON", veriIce: "Load a backup file", veriTemizle: "Delete all records",
      lParaBirimi: "Currency symbol",
      veriTemizleOnay: "EVERY case record in this browser will be permanently deleted. Have you taken a backup?",
      veriJsonHata: "The file could not be read: not valid JSON.",
      veriYedekHata: "That file is not a backup from this app.",
      veriIceOnay: "A backup file will be loaded.\n\nOK: merge into the existing records\nCancel: replace the existing records entirely",
      vakaSilOnay: "“{x}” and every record inside it will be deleted. Are you sure?",
      kayitSilOnay: "Delete this record?",
      buVaka: "This case",
      duzenleAria: "Edit", silAria: "Delete"
    }
  };

  /* Kimlikler veride saklanır; etiketler dile göre çözülür.
     Ids are what gets stored; labels resolve per language. */
  var DURUMLAR = [
    { id: "acik",   tr: "Açık",        en: "Open",         c: "var(--st-open)" },
    { id: "sicak",  tr: "Sıcak Takip", en: "Active Watch", c: "var(--st-hot)" },
    { id: "bekle",  tr: "Beklemede",   en: "On Hold",      c: "var(--st-hold)" },
    { id: "kapali", tr: "Kapandı",     en: "Closed",       c: "var(--st-closed)" }
  ];
  var ONCELIK = [
    { id: "dusuk",  tr: "Düşük",  en: "Low",    c: "var(--st-closed)" },
    { id: "orta",   tr: "Orta",   en: "Medium", c: "var(--st-hold)" },
    { id: "yuksek", tr: "Yüksek", en: "High",   c: "var(--st-hot)" }
  ];
  var ROLLER = [
    { id: "musteri", tr: "Müvekkil", en: "Client",  c: "var(--st-open)" },
    { id: "suphe",   tr: "Şüpheli",  en: "Subject", c: "var(--st-hot)" },
    { id: "tanik",   tr: "Tanık",    en: "Witness", c: "var(--st-hold)" },
    { id: "magdur",  tr: "Mağdur",   en: "Victim",  c: "var(--st-open)" },
    { id: "ilgili",  tr: "İlgili",   en: "Other",   c: "var(--st-closed)" }
  ];
  var DELIL_TUR = [
    { id: "foto",     tr: "Fotoğraf",      en: "Photograph" },
    { id: "video",    tr: "Video",         en: "Video" },
    { id: "ses",      tr: "Ses Kaydı",     en: "Audio Recording" },
    { id: "belge",    tr: "Belge",         en: "Document" },
    { id: "fiziksel", tr: "Fiziksel",      en: "Physical Item" },
    { id: "dijital",  tr: "Dijital Veri",  en: "Digital Data" },
    { id: "beyan",    tr: "Tanık Beyanı",  en: "Witness Statement" }
  ];
  var OLAY_TUR = [
    { id: "gozlem",  tr: "Gözlem",     en: "Observation" },
    { id: "gorusme", tr: "Görüşme",    en: "Interview" },
    { id: "olay",    tr: "Olay",       en: "Incident" },
    { id: "adli",    tr: "Adli İşlem", en: "Legal Action" },
    { id: "ihbar",   tr: "İhbar",      en: "Tip-off" }
  ];

  return {
    DILLER: DILLER, STR: STR,
    DURUMLAR: DURUMLAR, ONCELIK: ONCELIK, ROLLER: ROLLER,
    DELIL_TUR: DELIL_TUR, OLAY_TUR: OLAY_TUR
  };
})();
