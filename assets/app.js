/* Redstring — özel araştırmacılar için vaka dosyası sistemi.
   Redstring — case management for private investigators.

   Sunucu yok: bütün kayıtlar tarayıcının localStorage alanında durur.
   No server: every record lives in the browser's localStorage.

   URL parametreleri / URL parameters:
     ?demo=1        örnek veriyle aç, hiçbir şeyi kaydetme / open with sample data, persist nothing
     ?lang=tr|en    dili zorla / force the language
     ?tab=<id>      açılacak sekme / which tab to open
     ?theme=dark    temayı zorla / force the theme (dark | light)
*/
(function () {
  "use strict";

  var I = window.VM_I18N;
  var STORE_KEY = "redstring.v1";
  var THEME_KEY = "redstring.tema";
  var LANG_KEY  = "redstring.dil";
  var AYAR_KEY  = "redstring.ayarlar";
  var SEED_KEY  = "redstring.ornekEklendi";
  var SCHEMA = 1;
  var SUBS = ["people", "evidence", "events", "log", "links"];

  var params = new URLSearchParams(window.location.search);
  var DEMO = params.get("demo") === "1";

  /* ============================== dil =============================== */
  function yerelOku(k, d) { try { return window.localStorage.getItem(k) || d; } catch (e) { return d; } }
  function yerelYaz(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  function dilSec() {
    var p = params.get("lang");
    if (p && I.STR[p]) return p;
    var kayitli = yerelOku(LANG_KEY, "");
    if (kayitli && I.STR[kayitli]) return kayitli;
    var n = (navigator.language || "tr").slice(0, 2).toLowerCase();
    return I.STR[n] ? n : "tr";
  }
  var lang = dilSec();

  function t(k, vars) {
    var s = (I.STR[lang] && I.STR[lang][k]) || I.STR.tr[k] || k;
    if (vars) Object.keys(vars).forEach(function (v) { s = s.split("{" + v + "}").join(vars[v]); });
    return s;
  }
  function ad(def) { return def[lang] || def.tr; }
  function lookup(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return list[list.length - 1];
  }
  /* kayıtlı değer bilinen bir kimlik değilse (eski kayıt) olduğu gibi göster */
  function etiket(list, val) {
    for (var i = 0; i < list.length; i++) if (list[i].id === val) return ad(list[i]);
    return String(val || "");
  }
  function secenekler(list) {
    return list.map(function (o) { return { id: o.id, ad: ad(o) }; });
  }
  function dilBilgi() {
    for (var i = 0; i < I.DILLER.length; i++) if (I.DILLER[i].id === lang) return I.DILLER[i];
    return I.DILLER[0];
  }

  /* ============================ ayarlar ============================= */
  var ayarlar = (function () {
    var d = { paraBirimi: lang === "en" ? "£" : "₺" };
    try {
      var raw = window.localStorage.getItem(AYAR_KEY);
      if (raw) d = Object.assign(d, JSON.parse(raw));
    } catch (e) {}
    return d;
  })();
  function ayarYaz() { try { window.localStorage.setItem(AYAR_KEY, JSON.stringify(ayarlar)); } catch (e) {} }

  /* ====================== depo (localStorage) ======================= */
  var repo = (function () {
    var data = {}, subs = {}, kalici = !DEMO;

    function oku() {
      if (DEMO) return {};
      try {
        var raw = window.localStorage.getItem(STORE_KEY);
        if (!raw) return {};
        var p = JSON.parse(raw);
        return p && typeof p === "object" && p.kayitlar ? p.kayitlar : {};
      } catch (e) { kalici = false; return {}; }
    }
    function yaz() {
      if (DEMO) return true;
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify({
          schema: SCHEMA, guncelleme: new Date().toISOString(), kayitlar: data
        }));
        return true;
      } catch (e) { kalici = false; return false; }
    }
    function liste(key) {
      var store = data[key] || {}, out = [];
      Object.keys(store).forEach(function (id) { out.push(Object.assign({ __id: id }, store[id])); });
      return out;
    }
    function duyur(key) { (subs[key] || []).forEach(function (cb) { cb(liste(key)); }); }
    function hepsiniDuyur() { Object.keys(subs).forEach(duyur); }

    data = oku();

    if (!DEMO) {
      window.addEventListener("storage", function (ev) {
        if (ev.key !== STORE_KEY) return;
        data = oku();
        hepsiniDuyur();
      });
    }

    return {
      kalici: function () { return kalici; },
      demo: function () { return DEMO; },
      newId: function () { return "k" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); },
      watch: function (key, cb) {
        (subs[key] = subs[key] || []).push(cb);
        cb(liste(key));
        return function () { subs[key] = (subs[key] || []).filter(function (f) { return f !== cb; }); };
      },
      put: function (key, id, doc) {
        data[key] = data[key] || {};
        data[key][id] = doc;
        yaz(); duyur(key);
      },
      del: function (key, id) {
        if (data[key]) delete data[key][id];
        yaz(); duyur(key);
      },
      delVaka: function (caseId) {
        SUBS.forEach(function (n) { delete data["cases/" + caseId + "/" + n]; });
        if (data.cases) delete data.cases[caseId];
        yaz(); hepsiniDuyur();
      },
      disaAktar: function () {
        return { uygulama: "redstring", schema: SCHEMA, tarih: new Date().toISOString(), kayitlar: data };
      },
      iceAktar: function (paket, birlestir) {
        if (!paket || typeof paket !== "object" || !paket.kayitlar) throw new Error(t("veriYedekHata"));
        if (birlestir) {
          Object.keys(paket.kayitlar).forEach(function (k) {
            data[k] = Object.assign({}, data[k] || {}, paket.kayitlar[k]);
          });
        } else {
          data = JSON.parse(JSON.stringify(paket.kayitlar));
        }
        yaz(); hepsiniDuyur();
      },
      sayim: function () {
        var n = 0;
        Object.keys(data).forEach(function (k) { n += Object.keys(data[k] || {}).length; });
        return n;
      }
    };
  })();

  /* ============================= durum ============================== */
  var state = {
    cases: [], activeId: null, tab: params.get("tab") || "taraflar",
    filter: "hepsi", q: "",
    sub: { people: [], evidence: [], events: [], log: [], links: [] },
    unsubSub: [], ilkAcilis: true
  };

  var elList    = document.getElementById("caseList");
  var elDossier = document.getElementById("dossier");
  var elStats   = document.getElementById("topStats");
  var elFilters = document.getElementById("filters");
  var elSearch  = document.getElementById("search");
  var elImport  = document.getElementById("importFile");
  var dlg       = document.getElementById("dlg");

  /* =========================== yardımcılar ========================== */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function tarih(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return esc(iso);
    return d.toLocaleDateString(dilBilgi().locale, { day: "2-digit", month: "short", year: "numeric" });
  }
  function tarihSaat(iso) {
    if (!iso) return "—";
    var d = new Date(iso);
    if (isNaN(d.getTime())) return esc(iso);
    var L = dilBilgi().locale;
    return d.toLocaleDateString(L, { day: "2-digit", month: "short", year: "numeric" }) + " · " +
           d.toLocaleTimeString(L, { hour: "2-digit", minute: "2-digit" });
  }
  function para(n) {
    return (Number(n) || 0).toLocaleString(dilBilgi().locale, { maximumFractionDigits: 0 }) + " " + ayarlar.paraBirimi;
  }
  function saat(n) {
    var v = Number(n) || 0;
    return (v % 1 === 0 ? v : v.toFixed(1)) + (lang === "en" ? " h" : " sa");
  }
  function bugun() { return gunOnce(0); }
  /* n gün önce, yerel saate göre YYYY-AA-GG / n days ago, local time */
  function gunOnce(n) {
    var d = new Date(), p = function (x) { return String(x).padStart(2, "0"); };
    d.setDate(d.getDate() - (Number(n) || 0));
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }
  function simdi() {
    var d = new Date(), p = function (x) { return String(x).padStart(2, "0"); };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "T" + p(d.getHours()) + ":" + p(d.getMinutes());
  }
  function chip(renk, metin) {
    return '<span class="chip" style="--c:' + renk + '"><span class="dot"></span>' + esc(metin) + "</span>";
  }
  function aktif() {
    for (var i = 0; i < state.cases.length; i++) if (state.cases[i].__id === state.activeId) return state.cases[i];
    return null;
  }
  function onay(mesaj, fn) { if (window.confirm(mesaj)) fn(); }

  /* =========================== form motoru ========================== */
  function openForm(opts) {
    var h = '<form method="dialog"><div class="dhead"><div class="eyebrow">' + esc(opts.eyebrow || "") +
            "</div><h3>" + esc(opts.title) + "</h3></div><div class=\"dbody\">";
    if (opts.aciklama) h += '<p class="full">' + esc(opts.aciklama) + "</p>";
    (opts.fields || []).forEach(function (f) {
      var v = opts.values && opts.values[f.name] != null ? opts.values[f.name] : (f.def != null ? f.def : "");
      h += '<div class="field' + (f.full ? " full" : "") + '"><label for="f_' + f.name + '">' + esc(f.label) + "</label>";
      if (f.type === "select") {
        h += '<select id="f_' + f.name + '" name="' + f.name + '">';
        (f.options || []).forEach(function (o) {
          h += '<option value="' + esc(o.id) + '"' + (String(o.id) === String(v) ? " selected" : "") + ">" + esc(o.ad) + "</option>";
        });
        h += "</select>";
      } else if (f.type === "textarea") {
        h += '<textarea id="f_' + f.name + '" name="' + f.name + '" placeholder="' + esc(f.ph || "") + '">' + esc(v) + "</textarea>";
      } else {
        h += '<input id="f_' + f.name + '" name="' + f.name + '" type="' + (f.type || "text") + '"' +
             (f.step ? ' step="' + f.step + '"' : "") + (f.req ? " required" : "") +
             ' placeholder="' + esc(f.ph || "") + '" value="' + esc(v) + '">';
      }
      h += "</div>";
    });
    h += '</div><div class="dfoot">';
    (opts.extraButtons || []).forEach(function (b) {
      h += '<button class="btn' + (b.tehlike ? " danger" : "") + '" type="button" data-x="' + esc(b.id) + '">' + esc(b.ad) + "</button>";
    });
    h += '<button class="btn" value="iptal" type="submit" formnovalidate>' + esc(t("vazgec")) + "</button>";
    if (opts.fields && opts.fields.length) {
      h += '<button class="btn primary" value="ok" type="submit">' + esc(opts.submit || t("kaydet")) + "</button>";
    }
    h += "</div></form>";

    dlg.innerHTML = h;
    var form = dlg.querySelector("form");
    form.addEventListener("submit", function (ev) {
      if (ev.submitter && ev.submitter.value === "iptal") return;
      if (!opts.onSubmit) return;
      var d = {};
      (opts.fields || []).forEach(function (f) {
        var el = form.elements[f.name];
        d[f.name] = f.type === "number" ? (el.value === "" ? 0 : Number(el.value)) : el.value.trim();
      });
      opts.onSubmit(d);
    });
    form.addEventListener("click", function (ev) {
      var b = ev.target.closest("[data-x]");
      if (b && opts.onExtra) { dlg.close(); opts.onExtra(b.getAttribute("data-x")); }
    });
    dlg.showModal();
    var first = dlg.querySelector(".dbody input, .dbody select, .dbody textarea");
    if (first) first.focus();
  }

  /* ========================= vaka işlemleri ========================= */
  function sonrakiKod() {
    var yil = new Date().getFullYear(), en = 0;
    state.cases.forEach(function (c) {
      var m = /^[A-Z]{2}-(\d{4})-(\d+)$/.exec(c.kod || "");
      if (m && Number(m[1]) === yil) en = Math.max(en, Number(m[2]));
    });
    return dilBilgi().kodOnek + "-" + yil + "-" + String(en + 1).padStart(3, "0");
  }

  function vakaFormu(mevcut) {
    var b = { b: ayarlar.paraBirimi };
    openForm({
      eyebrow: mevcut ? t("vakaDuzenleEy") : t("vakaYeniEy"),
      title: mevcut ? (mevcut.baslik || t("adsizVaka")) : t("vakaYeniBaslik"),
      values: mevcut || { kod: sonrakiKod(), durum: "acik", oncelik: "orta", acilis: bugun(), saatUcreti: 1500 },
      submit: mevcut ? t("guncelle") : t("vakaAc"),
      fields: [
        { name: "kod", label: t("lKod"), req: true },
        { name: "acilis", label: t("lAcilis"), type: "date" },
        { name: "baslik", label: t("lBaslik"), req: true, full: true, ph: t("pBaslik") },
        { name: "musteri", label: t("lMusteri"), ph: t("pMusteri") },
        { name: "iletisim", label: t("lMusteriIlet"), ph: t("pIletisim") },
        { name: "durum", label: t("lDurum"), type: "select", options: secenekler(I.DURUMLAR) },
        { name: "oncelik", label: t("lOncelik"), type: "select", options: secenekler(I.ONCELIK) },
        { name: "saatUcreti", label: t("lSaatUcreti", b), type: "number", step: "50" },
        { name: "avans", label: t("lAvans", b), type: "number", step: "100" },
        { name: "ozet", label: t("lOzet"), type: "textarea", full: true, ph: t("pOzet") }
      ],
      onSubmit: function (d) {
        var id = mevcut ? mevcut.__id : repo.newId();
        d.olusturma = mevcut ? mevcut.olusturma : new Date().toISOString();
        repo.put("cases", id, d);
        if (!mevcut) selectCase(id);
      }
    });
  }

  function selectCase(id, tab) {
    state.activeId = id;
    state.tab = tab || "taraflar";
    document.body.classList.toggle("has-active", !!id);
    state.unsubSub.forEach(function (u) { try { u(); } catch (e) {} });
    state.unsubSub = [];
    SUBS.forEach(function (n) { state.sub[n] = []; });
    if (id) {
      SUBS.forEach(function (n) {
        state.unsubSub.push(repo.watch("cases/" + id + "/" + n, function (rows) {
          state.sub[n] = rows;
          renderDossier();
        }));
      });
    }
    renderList();
    renderDossier();
  }

  /* ======================= alt kayıt formları ======================= */
  function altSpec(name) {
    var b = { b: ayarlar.paraBirimi };
    if (name === "people") return {
      eyebrow: t("kisiEy"), yeni: t("kisiYeni"), duzenle: t("kisiDuzenle"), def: { rol: "ilgili" },
      fields: [
        { name: "ad", label: t("lAd"), req: true, full: true },
        { name: "rol", label: t("lRol"), type: "select", options: secenekler(I.ROLLER) },
        { name: "iletisim", label: t("lKisiIlet") },
        { name: "tanim", label: t("lTanim"), type: "textarea", full: true, ph: t("pTanim") }
      ]
    };
    if (name === "evidence") return {
      eyebrow: t("delilEy"), yeni: t("delilYeni"), duzenle: t("delilDuzenle"), def: { tur: "foto", tarih: bugun() },
      fields: [
        { name: "ad", label: t("lDelilAd"), req: true, full: true, ph: t("pDelilAd") },
        { name: "tur", label: t("lDelilTur"), type: "select", options: secenekler(I.DELIL_TUR) },
        { name: "tarih", label: t("lDelilTarih"), type: "date" },
        { name: "kaynak", label: t("lDelilKaynak"), ph: t("pDelilKaynak") },
        { name: "teslimAlan", label: t("lDelilTeslim"), ph: t("pDelilTeslim") },
        { name: "saklama", label: t("lDelilSaklama"), full: true, ph: t("pDelilSaklama") },
        { name: "not", label: t("lNot"), type: "textarea", full: true }
      ]
    };
    if (name === "events") return {
      eyebrow: t("olayEy"), yeni: t("olayYeni"), duzenle: t("olayDuzenle"), def: { tur: "gozlem" },
      fields: [
        { name: "ne", label: t("lOlayNe"), type: "datetime-local", full: true },
        { name: "baslik", label: t("lOlayBaslik"), req: true, full: true },
        { name: "tur", label: t("lOlayTur"), type: "select", options: secenekler(I.OLAY_TUR) },
        { name: "yer", label: t("lOlayYer") },
        { name: "aciklama", label: t("lOlayAciklama"), type: "textarea", full: true }
      ]
    };
    if (name === "log") return {
      eyebrow: t("sahaEy"), yeni: t("sahaYeni"), duzenle: t("sahaDuzenle"), def: { tarih: bugun(), sure: 1, masraf: 0 },
      fields: [
        { name: "tarih", label: t("thTarih"), type: "date" },
        { name: "kim", label: t("lSahaKim") },
        { name: "faaliyet", label: t("lSahaFaaliyet"), req: true, full: true, ph: t("pSahaFaaliyet") },
        { name: "sure", label: t("lSahaSure"), type: "number", step: "0.5" },
        { name: "masraf", label: t("lSahaMasraf", b), type: "number", step: "10" },
        { name: "not", label: t("lNot"), type: "textarea", full: true }
      ]
    };
    return null;
  }

  function altFormu(name, mevcut) {
    var c = aktif(), s = altSpec(name);
    if (!c || !s) return;
    var vars = mevcut || Object.assign({}, s.def);
    if (name === "events" && !vars.ne) vars.ne = simdi();
    openForm({
      eyebrow: s.eyebrow,
      title: mevcut ? s.duzenle : s.yeni,
      values: vars,
      submit: mevcut ? t("guncelle") : t("ekle"),
      fields: s.fields,
      onSubmit: function (d) {
        var id = mevcut ? mevcut.__id : repo.newId();
        var body = mevcut ? Object.assign({}, mevcut, d) : d;
        delete body.__id;
        if (name === "people" && body.x == null) {
          body.x = 20 + Math.round(Math.random() * 60);
          body.y = 20 + Math.round(Math.random() * 60);
        }
        repo.put("cases/" + c.__id + "/" + name, id, body);
      }
    });
  }

  function baglantiFormu() {
    var c = aktif();
    if (!c) return;
    var kisiler = state.sub.people.map(function (p) { return { id: p.__id, ad: p.ad }; });
    if (kisiler.length < 2) { window.alert(t("bagAzTaraf")); return; }
    openForm({
      eyebrow: t("bagEy"), title: t("bagBaslik"), submit: t("bagBtn"),
      values: { a: kisiler[0].id, b: kisiler[1].id },
      fields: [
        { name: "a", label: t("lBagA"), type: "select", options: kisiler },
        { name: "b", label: t("lBagB"), type: "select", options: kisiler },
        { name: "iliski", label: t("lBagIliski"), full: true, req: true, ph: t("pBagIliski") }
      ],
      onSubmit: function (d) {
        if (d.a === d.b) { window.alert(t("bagAyniKisi")); return; }
        repo.put("cases/" + c.__id + "/links", repo.newId(), d);
      }
    });
  }

  /* ================== yedekleme, ayarlar, örnek vaka ================= */
  function veriMenusu() {
    openForm({
      eyebrow: t("veriEy"), title: t("veriBaslik"),
      aciklama: t("veriAciklama", { n: repo.sayim() }),
      values: { paraBirimi: ayarlar.paraBirimi },
      submit: t("kaydet"),
      fields: [{ name: "paraBirimi", label: t("lParaBirimi") }],
      extraButtons: [
        { id: "disa", ad: t("veriDisa") },
        { id: "ice", ad: t("veriIce") },
        { id: "ornek", ad: t("ornekEkle") },
        { id: "temizle", ad: t("veriTemizle"), tehlike: true }
      ],
      onSubmit: function (d) {
        ayarlar.paraBirimi = d.paraBirimi || "₺";
        ayarYaz();
        renderDossier();
      },
      onExtra: function (k) {
        if (k === "disa") disaAktar();
        else if (k === "ice") elImport.click();
        else if (k === "ornek") ornekVakaEkle();
        else if (k === "temizle") {
          onay(t("veriTemizleOnay"), function () {
            repo.iceAktar({ kayitlar: {} }, false);
            selectCase(null);
          });
        }
      }
    });
  }

  function disaAktar() {
    var blob = new Blob([JSON.stringify(repo.disaAktar(), null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "redstring-" + bugun() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }

  elImport.addEventListener("change", function () {
    var file = elImport.files && elImport.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var paket;
      try { paket = JSON.parse(String(reader.result)); }
      catch (e) { window.alert(t("veriJsonHata")); elImport.value = ""; return; }
      try { repo.iceAktar(paket, window.confirm(t("veriIceOnay"))); }
      catch (e) { window.alert(e.message || t("veriYedekHata")); }
      elImport.value = "";
      selectCase(null);
    };
    reader.readAsText(file);
  });

  function ornekVakaEkle() {
    var liste = window.VM_SAMPLE(lang, { gun: gunOnce });
    var ilkId = null, damga = Date.now().toString(36);
    liste.forEach(function (s, i) {
      var id = "ornek-" + damga + "-" + i;
      repo.put("cases", id, Object.assign({
        kod: sonrakiKod(), olusturma: new Date().toISOString()
      }, s.vaka));
      SUBS.forEach(function (n) {
        (s[n] || []).forEach(function (row) { repo.put("cases/" + id + "/" + n, row[0], row[1]); });
      });
      if (!ilkId) ilkId = id;
    });
    if (ilkId) selectCase(ilkId, state.tab);
  }

  /* ========================= çizim: vaka rayı ======================= */
  function renderFilters() {
    var opts = [{ id: "hepsi", ad: t("hepsi") }].concat(secenekler(I.DURUMLAR));
    elFilters.innerHTML = opts.map(function (o) {
      return '<button type="button" data-f="' + o.id + '" aria-pressed="' + (state.filter === o.id) + '">' + esc(o.ad) + "</button>";
    }).join("");
  }

  function filtrele() {
    var q = state.q.toLocaleLowerCase(dilBilgi().locale);
    return state.cases.filter(function (c) {
      if (state.filter !== "hepsi" && c.durum !== state.filter) return false;
      if (!q) return true;
      return ((c.baslik || "") + " " + (c.musteri || "") + " " + (c.kod || ""))
        .toLocaleLowerCase(dilBilgi().locale).indexOf(q) > -1;
    }).sort(function (a, b) {
      var r = { sicak: 0, acik: 1, bekle: 2, kapali: 3 };
      var ra = r[a.durum] == null ? 9 : r[a.durum], rb = r[b.durum] == null ? 9 : r[b.durum];
      return ra !== rb ? ra - rb : String(b.acilis || "").localeCompare(String(a.acilis || ""));
    });
  }

  function renderList() {
    var rows = filtrele();
    if (!rows.length) {
      var bosluk = state.cases.length;
      elList.innerHTML = '<li class="empty" style="margin:8px"><span class="eh">' +
        esc(bosluk ? t("listFiltreBaslik") : t("listBosBaslik")) + "</span><span>" +
        esc(bosluk ? t("listFiltreAlt") : t("listBosAlt")) + "</span></li>";
      return;
    }
    elList.innerHTML = rows.map(function (c) {
      var d = lookup(I.DURUMLAR, c.durum), o = lookup(I.ONCELIK, c.oncelik);
      return '<li><button class="case-card" style="--prio:' + o.c + '" data-id="' + esc(c.__id) +
        '" aria-current="' + (c.__id === state.activeId) + '">' +
        '<span class="row1"><span class="code">' + esc(c.kod || "—") + "</span>" + chip(d.c, ad(d)) + "</span>" +
        '<span class="title">' + esc(c.baslik || t("adsizVaka")) + "</span>" +
        '<span class="meta"><span>' + esc(c.musteri || t("musteriYok")) + "</span>" +
        '<span class="mono" style="margin-left:auto; font-size:10.5px; color:var(--faint)">' + tarih(c.acilis) + "</span></span>" +
        "</button></li>";
    }).join("");
  }

  function renderStats() {
    var acik = state.cases.filter(function (c) { return c.durum !== "kapali"; }).length;
    var sicak = state.cases.filter(function (c) { return c.durum === "sicak"; }).length;
    elStats.innerHTML =
      "<span>" + esc(t("statAcik")) + " <b>" + acik + "</b></span>" +
      "<span>" + esc(t("statSicak")) + " <b>" + sicak + "</b></span>" +
      "<span>" + esc(t("statToplam")) + " <b>" + state.cases.length + "</b></span>";
  }

  /* =========================== çizim: dosya ========================= */
  function fact(k, v) {
    return '<div class="fact"><span class="eyebrow">' + esc(k) + '</span><span class="v">' + v + "</span></div>";
  }
  /* kimlik bilgisi: künye şeridindeki sayılardan ayrı, başlığın altında */
  function ident(k, v) {
    return '<div><span class="eyebrow">' + esc(k) + '</span><span class="iv">' + v + "</span></div>";
  }

  function renderDossier() {
    var c = aktif();
    if (!c) {
      elDossier.innerHTML = '<div class="empty" style="margin-top:40px"><span class="eh">' + esc(t("seciliYokBaslik")) + "</span>" +
        "<span>" + esc(t("seciliYokAlt")) + "</span>" +
        '<div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center">' +
        '<button class="btn primary" data-act="yeni">' + esc(t("yeniVaka")) + "</button>" +
        '<button class="btn" data-act="ornek">' + esc(t("ornekEkle")) + "</button></div></div>";
      return;
    }
    var d = lookup(I.DURUMLAR, c.durum), o = lookup(I.ONCELIK, c.oncelik);
    var toplamSaat = state.sub.log.reduce(function (s, r) { return s + (Number(r.sure) || 0); }, 0);
    var toplamMasraf = state.sub.log.reduce(function (s, r) { return s + (Number(r.masraf) || 0); }, 0);
    var tutar = toplamSaat * (Number(c.saatUcreti) || 0) + toplamMasraf;

    var h = "";
    if (repo.demo()) {
      h += '<div class="banner info"><b>' + esc(t("demoBaslik")) + "</b><span>" + esc(t("demoAlt")) + "</span></div>";
    } else if (!repo.kalici()) {
      h += '<div class="banner"><b>' + esc(t("depoKapaliBaslik")) + "</b><span>" + esc(t("depoKapaliAlt")) + "</span></div>";
    }
    h += '<section class="dossier-head" style="--prio:' + o.c + '"><div class="classbar"></div><div class="body">' +
      '<div class="line1"><div><span class="code">' + esc(c.kod || "—") + '</span><h2>' + esc(c.baslik || t("adsizVaka")) + "</h2></div>" +
      '<div class="actions">' +
        '<button class="btn ghost sm backbtn" data-act="geri">' + esc(t("geri")) + "</button>" +
        chip(d.c, ad(d)) + chip(o.c, t("oncelikEk", { x: ad(o) })) +
        '<button class="btn sm" data-act="duzenle">' + esc(t("duzenle")) + "</button>" +
        '<button class="btn sm danger" data-act="sil">' + esc(t("sil")) + "</button>" +
      "</div></div>" +
      (c.ozet ? '<p class="summary">' + esc(c.ozet) + "</p>" : "") +
      '<div class="ident">' +
        ident(t("fMusteri"), esc(c.musteri || "—")) +
        ident(t("fIletisim"), esc(c.iletisim || "—")) +
      "</div>" +
      '</div><div class="facts">' +
        fact(t("fAcilis"), tarih(c.acilis)) +
        fact(t("fMesai"), saat(toplamSaat)) +
        fact(t("fMasraf"), para(toplamMasraf)) +
        fact(t("fHakedis"), para(tutar)) +
        fact(t("fAvans"), para(c.avans)) +
      "</div></section>";

    var tabs = [
      { id: "taraflar", ad: t("tabTaraflar"), col: "people" },
      { id: "deliller", ad: t("tabDeliller"), col: "evidence" },
      { id: "kronoloji", ad: t("tabKronoloji"), col: "events" },
      { id: "saha", ad: t("tabSaha"), col: "log" },
      { id: "sema", ad: t("tabSema"), col: "links" },
      { id: "rapor", ad: t("tabRapor"), col: null }
    ];
    h += '<nav class="tabs" role="tablist">' + tabs.map(function (tb) {
      var n = tb.col ? state.sub[tb.col].length : null;
      return '<button role="tab" data-tab="' + tb.id + '" aria-selected="' + (state.tab === tb.id) + '">' + esc(tb.ad) +
        (n === null ? "" : '<span class="count">' + n + "</span>") + "</button>";
    }).join("") + '</nav><div id="tabBody"></div>';

    elDossier.innerHTML = h;
    renderTab();
  }

  function tools(kind, id) {
    return '<span class="tools"><button class="icobtn" data-edit="' + kind + '" data-id="' + esc(id) +
      '" title="' + esc(t("duzenleAria")) + '" aria-label="' + esc(t("duzenleAria")) + '">✎</button>' +
      '<button class="icobtn" data-del="' + kind + '" data-id="' + esc(id) +
      '" title="' + esc(t("silAria")) + '" aria-label="' + esc(t("silAria")) + '">✕</button></span>';
  }
  function bos(baslik, alt, btnLabel, action) {
    return '<div class="empty"><span class="eh">' + esc(baslik) + "</span><span>" + esc(alt) + "</span>" +
      '<button class="btn" data-add="' + action + '">' + esc(btnLabel) + "</button></div>";
  }
  function panelHead(label, btnLabel, action, extra) {
    return '<div class="panel-head"><span class="eyebrow">' + esc(label) + "</span>" + (extra || "") +
      '<button class="btn sm" data-add="' + action + '">' + esc(btnLabel) + "</button></div>";
  }

  /* --- bölümler (ro: salt okunur, rapor görünümü) --- */
  function secTaraflar(ro) {
    if (!state.sub.people.length) return ro ? "" : bos(t("bosTaraflarB"), t("bosTaraflarA"), t("bosTaraflarBtn"), "people");
    return '<div class="cards">' + state.sub.people.map(function (p) {
      var r = lookup(I.ROLLER, p.rol);
      return '<article class="item"><div class="ihead"><div><div class="iname">' + esc(p.ad) + "</div>" +
        '<div style="margin-top:4px">' + chip(r.c, ad(r)) + "</div></div>" + (ro ? "" : tools("people", p.__id)) + "</div>" +
        (p.iletisim ? '<dl class="kv"><dt>' + esc(t("kIletisim")) + "</dt><dd>" + esc(p.iletisim) + "</dd></dl>" : "") +
        (p.tanim ? '<p class="note">' + esc(p.tanim) + "</p>" : "") + "</article>";
    }).join("") + "</div>";
  }

  function secDeliller(ro) {
    if (!state.sub.evidence.length) return ro ? "" : bos(t("bosDelillerB"), t("bosDelillerA"), t("bosDelillerBtn"), "evidence");
    return '<div class="cards">' + state.sub.evidence.map(function (e) {
      return '<article class="item"><div class="ihead"><div><div class="iname">' + esc(e.ad) + "</div>" +
        '<div class="mono" style="font-size:10.5px; color:var(--faint); letter-spacing:.05em; margin-top:2px">' +
        esc(etiket(I.DELIL_TUR, e.tur).toLocaleUpperCase(dilBilgi().locale)) + " · " + tarih(e.tarih) + "</div></div>" +
        (ro ? "" : tools("evidence", e.__id)) + '</div><dl class="kv">' +
        (e.kaynak ? "<dt>" + esc(t("kKaynak")) + "</dt><dd>" + esc(e.kaynak) + "</dd>" : "") +
        (e.teslimAlan ? "<dt>" + esc(t("kTeslim")) + "</dt><dd>" + esc(e.teslimAlan) + "</dd>" : "") +
        (e.saklama ? "<dt>" + esc(t("kSaklama")) + "</dt><dd>" + esc(e.saklama) + "</dd>" : "") +
        "</dl>" + (e.not ? '<p class="note">' + esc(e.not) + "</p>" : "") + "</article>";
    }).join("") + "</div>";
  }

  function secKronoloji(ro) {
    var olaylar = state.sub.events.slice().sort(function (a, b) { return String(b.ne || "").localeCompare(String(a.ne || "")); });
    if (!olaylar.length) return ro ? "" : bos(t("bosKronolojiB"), t("bosKronolojiA"), t("bosKronolojiBtn"), "events");
    return '<div class="tl">' + olaylar.map(function (e) {
      return '<div class="tl-item"><div class="when">' + tarihSaat(e.ne) + " · " +
        esc(etiket(I.OLAY_TUR, e.tur).toLocaleUpperCase(dilBilgi().locale)) + "</div>" +
        '<div class="what">' + esc(e.baslik) + (ro ? "" : tools("events", e.__id)) + "</div>" +
        (e.yer ? '<div class="where">' + esc(e.yer) + "</div>" : "") +
        (e.aciklama ? "<p>" + esc(e.aciklama) + "</p>" : "") + "</div>";
    }).join("") + "</div>";
  }

  function secSaha(ro) {
    var c = aktif();
    var rows = state.sub.log.slice().sort(function (a, b) { return String(b.tarih || "").localeCompare(String(a.tarih || "")); });
    if (!rows.length) return ro ? "" : bos(t("bosSahaB"), t("bosSahaA"), t("bosSahaBtn"), "log");
    var ts = 0, tm = 0;
    var body = rows.map(function (r) {
      ts += Number(r.sure) || 0; tm += Number(r.masraf) || 0;
      return '<tr><td class="mono" style="white-space:nowrap">' + tarih(r.tarih) + "</td>" +
        '<td><div style="font-weight:500">' + esc(r.faaliyet) + "</div>" +
        (r.not ? '<div style="color:var(--muted); font-size:12.5px">' + esc(r.not) + "</div>" : "") + "</td>" +
        "<td>" + esc(r.kim || "—") + "</td>" +
        '<td class="num">' + saat(r.sure) + '</td><td class="num">' + para(r.masraf) + "</td>" +
        (ro ? "" : '<td style="text-align:right">' + tools("log", r.__id) + "</td>") + "</tr>";
    }).join("");
    var uc = Number(c.saatUcreti) || 0;
    return '<div class="tablewrap"><table><thead><tr><th>' + esc(t("thTarih")) + "</th><th>" + esc(t("thFaaliyet")) +
      "</th><th>" + esc(t("thArastirmaci")) + '</th><th class="num">' + esc(t("thSure")) +
      '</th><th class="num">' + esc(t("thMasrafT")) + "</th>" + (ro ? "" : "<th></th>") + "</tr></thead><tbody>" + body + "</tbody>" +
      '<tfoot><tr><td colspan="3">' + esc(t("thToplam", { x: para(uc) })) + "</td>" +
      '<td class="num">' + saat(ts) + '</td><td class="num">' + para(tm) + '</td><td class="num">' + para(ts * uc + tm) +
      "</td></tr></tfoot></table></div>";
  }

  function secSema(ro) {
    var kisiler = state.sub.people;
    if (!kisiler.length) return ro ? "" : bos(t("bosSemaB"), t("bosSemaA"), t("btnTaraf"), "people");
    var byId = {};
    kisiler.forEach(function (p) { byId[p.__id] = p; });
    var lines = state.sub.links.map(function (l) {
      var a = byId[l.a], b = byId[l.b];
      if (!a || !b) return "";
      var ax = Number(a.x) || 50, ay = Number(a.y) || 50, bx = Number(b.x) || 50, by = Number(b.y) || 50;
      return '<line x1="' + ax + '%" y1="' + ay + '%" x2="' + bx + '%" y2="' + by + '%"></line>' +
        '<text x="' + ((ax + bx) / 2) + '%" y="' + ((ay + by) / 2 - 1) + '%">' + esc(l.iliski || "") + "</text>";
    }).join("");
    var pins = kisiler.map(function (p) {
      var r = lookup(I.ROLLER, p.rol);
      return '<div class="pin" data-pin="' + esc(p.__id) + '" style="--rc:' + r.c + "; left:" + (Number(p.x) || 50) +
        "%; top:" + (Number(p.y) || 50) + '%"><div class="pn">' + esc(p.ad) + '</div><div class="pr">' + esc(ad(r)) + "</div></div>";
    }).join("");
    var h = '<div class="board" id="board"><svg aria-hidden="true">' + lines + "</svg>" + pins + "</div>";
    if (state.sub.links.length) {
      h += '<div class="panel-head"><span class="eyebrow">' + esc(t("phBaglantilar")) + "</span></div>" +
        '<div class="cards">' + state.sub.links.map(function (l) {
          var a = byId[l.a], b = byId[l.b];
          return '<article class="item"><div class="ihead"><div class="iname" style="font-size:13.5px">' +
            esc((a && a.ad) || "?") + " ↔ " + esc((b && b.ad) || "?") + "</div>" +
            (ro ? "" : '<span class="tools"><button class="icobtn" data-del="links" data-id="' + esc(l.__id) +
              '" aria-label="' + esc(t("silAria")) + '">✕</button></span>') +
            '</div><div style="font-size:12.5px; color:var(--muted)">' + esc(l.iliski || "") + "</div></article>";
        }).join("") + "</div>";
    }
    return h;
  }

  function secRapor() {
    var c = aktif();
    var bloklar = [
      [t("rsTaraflar"), secTaraflar(true)],
      [t("rsDeliller"), secDeliller(true)],
      [t("rsKronoloji"), secKronoloji(true)],
      [t("rsSaha"), secSaha(true)],
      [t("rsSema"), secSema(true)]
    ].filter(function (b) { return b[1]; });

    var h = '<div class="panel-head"><span class="hint">' + esc(t("raporIpucu")) + "</span>" +
      '<button class="btn sm" data-act="yazdir">' + esc(t("raporYazdir")) + "</button></div>";
    if (!bloklar.length) return h + bos(t("raporBosB"), t("raporBosA"), t("btnTaraf"), "people");
    h += bloklar.map(function (b) {
      return '<section class="report-sec"><h3>' + esc(b[0]) + "</h3>" + b[1] + "</section>";
    }).join("");
    h += '<p class="report-meta">' + esc(t("raporAlt", { kod: c.kod || "", tarih: tarihSaat(new Date().toISOString()) })) + "</p>";
    return h;
  }

  function renderTab() {
    var body = document.getElementById("tabBody");
    if (!body || !aktif()) return;
    var tb = state.tab, h = "";
    if (tb === "taraflar")       h = panelHead(t("phTaraflar"), t("btnTaraf"), "people") + secTaraflar(false);
    else if (tb === "deliller")  h = panelHead(t("phDeliller"), t("btnDelil"), "evidence") + secDeliller(false);
    else if (tb === "kronoloji") h = panelHead(t("phKronoloji"), t("btnOlay"), "events") + secKronoloji(false);
    else if (tb === "saha")      h = panelHead(t("phSaha"), t("btnSaha"), "log") + secSaha(false);
    else if (tb === "sema")      h = panelHead(t("phSema"), t("btnBaglanti"), "link",
                                     '<span class="hint">' + esc(t("semaIpucu")) + "</span>") + secSema(false);
    else if (tb === "rapor")     h = secRapor();
    body.innerHTML = h;
    if (tb === "sema" || tb === "rapor") wireBoard();
  }

  /* ======================== şema sürükleme ========================== */
  function wireBoard() {
    var board = document.getElementById("board");
    if (!board) return;
    var c = aktif();
    if (!c) return;
    var drag = null;

    board.addEventListener("pointerdown", function (ev) {
      var pin = ev.target.closest(".pin");
      if (!pin) return;
      drag = { el: pin, id: pin.getAttribute("data-pin") };
      try { pin.setPointerCapture(ev.pointerId); } catch (e) {}
      ev.preventDefault();
    });
    board.addEventListener("pointermove", function (ev) {
      if (!drag) return;
      var r = board.getBoundingClientRect();
      var x = Math.max(5, Math.min(95, ((ev.clientX - r.left) / r.width) * 100));
      var y = Math.max(6, Math.min(94, ((ev.clientY - r.top) / r.height) * 100));
      drag.x = x; drag.y = y;
      drag.el.style.left = x + "%";
      drag.el.style.top = y + "%";
      var svg = board.querySelector("svg");
      if (svg) redrawLines(svg, drag.id, x, y);
    });
    function bitir() {
      if (!drag) return;
      var d = drag;
      drag = null;
      if (d.x == null) return;
      var p = null;
      state.sub.people.forEach(function (q) { if (q.__id === d.id) p = q; });
      if (!p) return;
      var body = Object.assign({}, p, { x: Math.round(d.x * 10) / 10, y: Math.round(d.y * 10) / 10 });
      delete body.__id;
      repo.put("cases/" + c.__id + "/people", d.id, body);
    }
    board.addEventListener("pointerup", bitir);
    board.addEventListener("pointercancel", bitir);
  }

  function redrawLines(svg, pid, x, y) {
    var idx = {};
    state.sub.people.forEach(function (p) { idx[p.__id] = p; });
    function pos(id) {
      if (id === pid) return [x, y];
      var p = idx[id];
      return p ? [Number(p.x) || 50, Number(p.y) || 50] : null;
    }
    var out = "";
    state.sub.links.forEach(function (l) {
      var a = pos(l.a), b = pos(l.b);
      if (!a || !b) return;
      out += '<line x1="' + a[0] + '%" y1="' + a[1] + '%" x2="' + b[0] + '%" y2="' + b[1] + '%"></line>' +
        '<text x="' + ((a[0] + b[0]) / 2) + '%" y="' + ((a[1] + b[1]) / 2 - 1) + '%">' + esc(l.iliski || "") + "</text>";
    });
    svg.innerHTML = out;
  }

  /* ========================== tema ve dil =========================== */
  function temaUygula(x) {
    if (x === "dark" || x === "light") document.documentElement.setAttribute("data-theme", x);
    else document.documentElement.removeAttribute("data-theme");
  }
  function temaDegistir() {
    var sira = ["system", "light", "dark"];
    var yeni = sira[(sira.indexOf(yerelOku(THEME_KEY, "system")) + 1) % sira.length];
    yerelYaz(THEME_KEY, yeni);
    temaUygula(yeni);
  }
  temaUygula(params.get("theme") || yerelOku(THEME_KEY, "system"));

  function dilUygula() {
    document.documentElement.lang = lang;
    document.title = t("belgeBaslik");
    document.getElementById("brandTag").textContent = t("tag");
    document.getElementById("dataBtn").textContent = t("veri");
    document.getElementById("newCaseBtn").textContent = t("yeniVaka");
    document.getElementById("railFoot").textContent = t("railFoot");
    document.getElementById("themeBtn").setAttribute("aria-label", t("temaAria"));
    var lb = document.getElementById("langBtn");
    lb.textContent = dilBilgi().ad;
    lb.setAttribute("aria-label", t("dilAria"));
    lb.title = t("dilAria");
    elSearch.placeholder = t("ara");
    elSearch.setAttribute("aria-label", t("araAria"));
    elFilters.setAttribute("aria-label", t("filtreAria"));
    renderFilters();
    renderStats();
    renderList();
    renderDossier();
  }
  function dilDegistir() {
    var idx = 0;
    I.DILLER.forEach(function (d, i) { if (d.id === lang) idx = i; });
    lang = I.DILLER[(idx + 1) % I.DILLER.length].id;
    yerelYaz(LANG_KEY, lang);
    dilUygula();
  }

  /* ============================= olaylar ============================ */
  elSearch.addEventListener("input", function () { state.q = elSearch.value; renderList(); });

  elFilters.addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-f]");
    if (!b) return;
    state.filter = b.getAttribute("data-f");
    renderFilters();
    renderList();
  });

  elList.addEventListener("click", function (ev) {
    var b = ev.target.closest(".case-card");
    if (b) selectCase(b.getAttribute("data-id"));
  });

  document.getElementById("newCaseBtn").addEventListener("click", function () { vakaFormu(null); });
  document.getElementById("dataBtn").addEventListener("click", veriMenusu);
  document.getElementById("themeBtn").addEventListener("click", temaDegistir);
  document.getElementById("langBtn").addEventListener("click", dilDegistir);

  elDossier.addEventListener("click", function (ev) {
    var tb = ev.target.closest("[data-tab]");
    if (tb) { state.tab = tb.getAttribute("data-tab"); renderDossier(); return; }

    var act = ev.target.closest("[data-act]");
    if (act) {
      var a = act.getAttribute("data-act");
      if (a === "yeni") { vakaFormu(null); return; }
      if (a === "ornek") { ornekVakaEkle(); return; }
      if (a === "geri") { selectCase(null); return; }
      if (a === "yazdir") { window.print(); return; }
      var cc = aktif();
      if (!cc) return;
      if (a === "duzenle") { vakaFormu(cc); return; }
      if (a === "sil") {
        onay(t("vakaSilOnay", { x: cc.baslik || t("buVaka") }), function () {
          repo.delVaka(cc.__id);
          selectCase(null);
        });
      }
      return;
    }

    var c = aktif();
    if (!c) return;

    var add = ev.target.closest("[data-add]");
    if (add) {
      var k = add.getAttribute("data-add");
      if (k === "link") baglantiFormu();
      else {
        if (k === "people" && state.tab !== "taraflar") { state.tab = "taraflar"; renderDossier(); }
        altFormu(k, null);
      }
      return;
    }

    var ed = ev.target.closest("[data-edit]");
    if (ed) {
      var kind = ed.getAttribute("data-edit"), id = ed.getAttribute("data-id"), rec = null;
      (state.sub[kind] || []).forEach(function (r) { if (r.__id === id) rec = r; });
      if (rec) altFormu(kind, rec);
      return;
    }

    var dl = ev.target.closest("[data-del]");
    if (dl) {
      var kind2 = dl.getAttribute("data-del"), id2 = dl.getAttribute("data-id");
      onay(t("kayitSilOnay"), function () { repo.del("cases/" + c.__id + "/" + kind2, id2); });
    }
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "/" && !dlg.open && document.activeElement !== elSearch &&
        !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      ev.preventDefault();
      elSearch.focus();
    }
  });

  /* ============================= başlat ============================= */
  dilUygula();
  repo.watch("cases", function (rows) {
    state.cases = rows;
    renderStats();
    renderList();
    if (state.activeId && !aktif()) { selectCase(null); return; }
    if (!state.activeId && state.ilkAcilis) {
      state.ilkAcilis = false;
      var ilk = filtrele()[0];
      if (ilk) { selectCase(ilk.__id, state.tab); return; }
    }
    renderDossier();
  });
  /* İlk açılış: depo bomboşsa ve daha önce hiç tohumlanmadıysa örnek dosyaları
     ekle; kullanıcı silerse geri gelmez. Demo modunda her zaman eklenir ve
     hiçbir şey kaydedilmez.
     First run: seed the sample files when the store is empty and has never been
     seeded; they do not come back if the user deletes them. In demo mode they
     are always added and nothing is persisted. */
  if (DEMO) {
    if (!state.cases.length) ornekVakaEkle();
  } else if (!state.cases.length && yerelOku(SEED_KEY, "") !== "1") {
    yerelYaz(SEED_KEY, "1");
    ornekVakaEkle();
  }
})();
