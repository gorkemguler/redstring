<p align="center">
  <img src="docs/banner.png" alt="Redstring" width="900">
</p>

<p align="center">
  <a href="https://github.com/gorkemguler/redstring/actions/workflows/deploy-pages.yml"><img src="https://img.shields.io/github/actions/workflow/status/gorkemguler/redstring/deploy-pages.yml?branch=main&label=yay%C4%B1n&color=1F6F6B" alt="Yayın durumu"></a>
  <img src="https://img.shields.io/badge/license-MIT-A8322D" alt="MIT lisansı">
  <img src="https://img.shields.io/badge/build-yok-181B21" alt="Derleme adımı yok">
  <img src="https://img.shields.io/badge/JavaScript-vanilla-f1e05a" alt="Vanilla JavaScript">
  <img src="https://img.shields.io/badge/arayüz-TR%20%7C%20EN-1F6F6B" alt="Türkçe ve İngilizce arayüz">
  <img src="https://img.shields.io/badge/veri-tarayıcıda-5B6472" alt="Veriler tarayıcıda saklanır">
  <img src="https://img.shields.io/badge/bağımlılık-0-8A6414" alt="Bağımlılık yok">
</p>

<p align="center">
  <b>Türkçe</b> · <a href="README.md">English</a>
</p>

<p align="center">
  <a href="https://gorkemguler.github.io/redstring/"><b>Uygulamayı aç →</b></a>&nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="https://gorkemguler.github.io/redstring/?demo=1">Örnek vakalarla gez</a>
</p>

# Redstring

Özel araştırmacılar için vaka dosyası sistemi. Her vaka için **taraflar, delil zinciri, olay
kronolojisi, saha mesaisi ve bağlantı şeması** tek dosyada toplanır; dosya raporu tek tuşla
yazdırılır.

Adını, kişileri birbirine bağlayan panodaki kırmızı iplerden alıyor. Proje Türkçe *Vaka Masası*
adıyla başladı; arayüz hâlâ tam Türkçe.

Tek sayfalık statik bir web uygulaması. Derleme adımı, paket yöneticisi, bağımlılık ve sunucu
yok — `index.html` dosyasını açmak yeterli.

## Meslektaşlar için: nasıl kullanılır

Kurulum yok, üyelik yok, ücret yok. **<https://gorkemguler.github.io/redstring/>** adresini açın
ve çalışmaya başlayın.

Uygulamayı ilk açtığınızda işlenmiş dört örnek dosya hazır gelir — depo hırsızlığı araştırması,
kayıp kişi, sigorta hasar doğrulaması ve kapanmış bir geçmiş araştırması; her vaka durumundan
birer tane. İçlerindeki isimlerin tamamı kurgudur ve her dosya bunu en başta yazar. Dilediğiniz
zaman silin, geri gelmezler.

Kayıtlarınız **sizin tarayıcınızda** kalır; ne bize ne başka birine gider — bu sitenin arkasında
bir sunucu yok. Dolayısıyla aynı adresi kullanan iki araştırmacı birbirinin dosyalarını görmez.
Tek sorumluluk sizde: düzenli olarak **Veri → JSON olarak indir** ile yedek alın.

Hiçbir şey kaydetmeden gezinmek isterseniz <https://gorkemguler.github.io/redstring/?demo=1>
adresi aynı örneklerle açılır ve tarayıcınıza hiçbir şey yazmaz.

---

## Ekran görüntüleri

### Vaka künyesi ve taraflar

Dosya açılır açılmaz müvekkil, durum, öncelik ve mali özet üstte görünür; saha mesaisi ile
masraftan hakediş kendiliğinden hesaplanır. Sol raydaki her kartın kenarındaki renk şeridi
önceliği gösterir.

![Vaka künyesi ve taraflar sekmesi](docs/screenshots/01-dossier-tr.png)

### Delil kayıt defteri

Her delil, delil zincirinin gerektirdiği alanlarla kaydedilir: nereden elde edildi, kim teslim
aldı, şu an nerede saklanıyor.

![Delil kayıt defteri](docs/screenshots/03-evidence-en.png)

### Olay kronolojisi

Gözlem, görüşme ve olaylar saatiyle işlenir; çizelge en yeniden eskiye kendiliğinden dizilir.

![Olay kronolojisi](docs/screenshots/04-timeline-en.png)

### Bağlantı şeması

Dosyadaki kişiler bir panoya yerleşir, aralarındaki ilişkiler kırmızı iplerle çizilir. Kartlar
sürüklenerek düzenlenir, konumları dosyayla birlikte saklanır.

![Bağlantı şeması](docs/screenshots/05-link-chart.png)

### Saha mesaisi ve masraf dökümü

Vardiyalar ve masraflar tabloya girilir; alt toplam satırı saat ücretiyle birlikte hakedişi verir.

![Saha kaydı tablosu](docs/screenshots/06-field-log-en.png)

### Dosya raporu

Bütün bölümler tek sayfada toplanır. Yazdır düğmesi tarayıcının PDF çıktısını da verir; yazdırma
sırasında arayüz gizlenir, yalnızca dosya içeriği basılır.

![Dosya raporu](docs/screenshots/07-report-en.png)

### İngilizce arayüz ve mobil görünüm

Arayüz üstteki **TR / EN** düğmesiyle anında değişir; seçim tarayıcıda hatırlanır. Dar ekranda
liste ve dosya ayrı görünümlere ayrılır.

| İngilizce | Mobil |
|---|---|
| ![İngilizce arayüz](docs/screenshots/02-dossier-en.png) | ![Mobil görünüm](docs/screenshots/08-mobile-tr.png) |

---

## Neler var

| Bölüm | İçerik |
|---|---|
| **Künye** | Dosya no, müvekkil, durum, öncelik, saat ücreti, avans; saha mesaisi ve masraftan hakediş otomatik |
| **Taraflar** | Müvekkil / şüpheli / tanık / mağdur / ilgili kayıtları, eşkâl ve iletişim bilgisiyle |
| **Deliller** | Delil zinciri alanları: nereden elde edildi, kim teslim aldı, nerede saklanıyor |
| **Kronoloji** | Saatli olay çizelgesi, en yeniden eskiye |
| **Saha Kaydı** | Vardiya ve masraf dökümü, alt toplam satırıyla |
| **Bağlantı Şeması** | Kişileri kırmızı iplerle bağlayan sürüklenebilir pano |
| **Dosya Raporu** | Tüm bölümler tek sayfada; yazdırılır veya PDF'e çıkar |

Ayrıca: vaka arama ve duruma göre filtreleme (`/` tuşu arama kutusuna atlar), Türkçe/İngilizce
arayüz, açık–koyu–sistem teması, para birimi ayarı, JSON yedek alma ve geri yükleme, birden fazla
sekme arasında anlık eşitleme, tek tuşla yeniden eklenebilen örnek vakalar.

---

## Veriler nerede duruyor

**Kayıtlar yalnızca tarayıcınızın `localStorage` alanında tutulur.** Hiçbir veri sunucuya
gönderilmez; arkasında bir sunucu yoktur. Pratikte bunun anlamı:

- Kayıtlar **o cihaza ve o tarayıcıya** bağlıdır; başka bilgisayarda görünmez.
- Tarayıcı site verisini temizlerseniz kayıtlar silinir.
- Gizli sekmede kayıt kalıcı olmaz — uygulama bunu üstte uyarı şeridiyle bildirir.
- Ekipçe eşzamanlı çalışma yoktur; aynı cihazda açık sekmeler birbirini anında günceller.

Bu yüzden **Veri → JSON olarak indir** ile düzenli yedek alın. Aynı menüden yedeği başka bir
cihazda geri yükleyebilir, mevcut kayıtlarla birleştirebilir veya onların yerine koyabilirsiniz.

> [!IMPORTANT]
> **Kişisel veri uyarısı.** Uygulama gerçek kişilere ait veri barındırır. KVKK kapsamında veri
> sorumlusu sizsiniz: cihaz disk şifrelemesini açık tutun, yedek JSON dosyalarını şifreli bir
> alanda saklayın, saklama süresi dolan dosyaları silin. Ortak kullanılan bir bilgisayarda
> uygulamayı ayrı bir tarayıcı profilinde çalıştırın.

---

## Çalıştırma

`index.html` dosyasına çift tıklamak yeterli. Yerel sunucu tercih ederseniz:

```bash
python3 -m http.server 8080
```

Sonra <http://localhost:8080> adresini açın.

## GitHub Pages'te yayınlama

Depoda `.github/workflows/deploy-pages.yml` hazır. **Settings → Pages → Build and deployment →
Source** ayarını **GitHub Actions** yapın; `main` dalına her gönderimde site yayınlanır.

İş akışını kullanmak istemezseniz aynı ekrandaki **Deploy from a branch → main / (root)**
seçeneği de çalışır; bu durumda workflow dosyasını silebilirsiniz.

> Depo herkese açıksa siteniz de herkese açık olur. Uygulama **boş** yayınlanır — kayıtlar
> ziyaretçinin kendi tarayıcısında oluşur, sizin vakalarınız siteye yüklenmez. Yine de gerçek
> dosyalarla çalışırken depoyu private tutmanız önerilir.

---

## URL parametreleri

Adres çubuğundan uygulamanın açılışını yönlendirebilirsiniz. Demo bağlantısı paylaşmak veya
belge için ekran görüntüsü almak bunlarla yapılır.

| Parametre | Değer | Ne yapar |
|---|---|---|
| `demo` | `1` | Örnek vakalarla açar ve **hiçbir şeyi kaydetmez** — tanıtım için |
| `lang` | `tr`, `en` | Arayüz dilini zorlar |
| `theme` | `light`, `dark` | Temayı zorlar |
| `tab` | `taraflar`, `deliller`, `kronoloji`, `saha`, `sema`, `rapor` | Açılacak sekme |

Örnek: `index.html?demo=1&lang=en&tab=sema&theme=dark`

---

## Dosya düzeni

```
index.html              uygulama kabuğu
assets/app.css          tema değişkenleri, yerleşim, yazdırma stilleri
assets/app.js           veri katmanı (localStorage), görünümler, formlar
assets/i18n.js          arayüz metinleri ve dile göre çözülen listeler
assets/sample.js        dört örnek vaka (TR + EN)
docs/banner-source.html README başlığındaki banner'ın kaynağı
docs/mobile-frame.html  mobil ekran görüntüsü için sabit genişlikli çerçeve
.github/workflows/      GitHub Pages yayın akışı
```

Bağımlılık yok; tek dış kaynak Google Fonts üzerinden gelen IBM Plex ailesi. İnternet olmadan da
çalışır, yalnızca yazı tipleri sistem yazı tipine düşer.

## Yeni dil eklemek

1. `assets/i18n.js` içindeki `STR` nesnesine aynı anahtarlarla yeni bir blok ekleyin.
2. Aynı dosyadaki `DILLER` dizisine dili yazın: `{ id, ad, locale, kodOnek }`.
3. Durum, öncelik, sıfat, delil türü ve olay türü listelerindeki her kayda dil kodunuzla bir
   etiket ekleyin — kimlikler (`id`) değişmez, veri onlarla saklanır.
4. İsterseniz `assets/sample.js` içine o dilde örnek vakalar ekleyin.

Arayüzde yeni dil, üstteki dil düğmesinin sırasına kendiliğinden katılır.

## Lisans

MIT — bkz. [LICENSE](LICENSE).
