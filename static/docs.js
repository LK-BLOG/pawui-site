/* ============================================================
   PawUI docs — single-page renderer
   Requires: marked, DOMPurify, and window.PAWUI_DOCS (data.js)
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.PAWUI_DOCS;
  if (!DATA) {
    document.getElementById('doc').innerHTML =
      '<h1>Failed to load documentation data</h1><p>static/data.js is missing.</p>';
    return;
  }

  var LANG_KEY = 'pawui_lang';
  var ORDER = DATA.order;
  var state = {
    lang: localStorage.getItem(LANG_KEY) || 'zh',
    doc: 'index',
    route: 'index',
    query: ''
  };

  var elDoc = document.getElementById('doc');
  var elNav = document.getElementById('side-nav');
  var elCrumbs = document.getElementById('crumbs');
  var elPager = document.getElementById('pager');
  var elTocNav = document.getElementById('toc-nav');
  var elSearch = document.getElementById('doc-search');
  var side = document.getElementById('side');
  var scrim = document.getElementById('scrim');
  var menuBtn = document.getElementById('menu-btn');

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function b64ToUtf8(b64) {
    var bin = atob(b64);
    var len = bin.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);
    if (window.TextDecoder) return new TextDecoder('utf-8').decode(bytes);
    var escaped = '';
    for (var j = 0; j < len; j++) escaped += '%' + ('00' + bytes[j].toString(16)).slice(-2);
    try { return decodeURIComponent(escaped); } catch (e) { return bin; }
  }

  function meta(id) {
    return DATA.docs[id] ? DATA.docs[id][state.lang] : null;
  }

  function parseRoute() {
    var h = (location.hash || '').replace(/^#/, '');
    h = h.replace(/^\/+/, '').replace(/^docs\//, '').replace(/\/+$/, '');
    return h || 'index';
  }

  function slug(text, used) {
    var s = text.trim().toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    if (!s) s = 'section';
    if (used[s]) { s = s + '-' + used[s]; }
    used[s] = (used[s] || 0) + 1;
    return s;
  }

  /* ---------- sidebar ---------- */
  function buildSidebar() {
    var html = '';
    var counter = 0;
    DATA.groups.forEach(function (g) {
      html += '<div class="side-group" data-group><b>' +
        esc(state.lang === 'zh' ? g.zh : g.en) + '</b>';
      g.docs.forEach(function (id) {
        if (!DATA.docs[id]) return;
        counter++;
        var title = DATA.docs[id][state.lang].title;
        html += '<a class="side-link" data-doc="' + id + '" data-title="' +
          esc(title.toLowerCase()) + '" href="#/' + id + '">' +
          '<span class="idx">' + (counter < 10 ? '0' + counter : counter) + '</span>' +
          '<span>' + esc(title) + '</span></a>';
      });
      html += '</div>';
    });
    elNav.innerHTML = html;
    markActive();
  }

  function markActive() {
    var links = elNav.querySelectorAll('.side-link');
    for (var i = 0; i < links.length; i++) {
      var active = state.doc !== '' && links[i].getAttribute('data-doc') === state.doc;
      links[i].classList.toggle('active', active);
      if (active) links[i].setAttribute('aria-current', 'page');
      else links[i].removeAttribute('aria-current');
    }
  }

  /* ---------- full-text search ---------- */
  var BODIES = null;
  function getBodies() {
    if (BODIES) return BODIES;
    BODIES = {};
    for (var i = 0; i < ORDER.length; i++) {
      var id = ORDER[i];
      BODIES[id] = {
        zh: b64ToUtf8(DATA.docs[id].zh.body),
        en: b64ToUtf8(DATA.docs[id].en.body)
      };
    }
    return BODIES;
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function runSearch(rawQuery) {
    var q = rawQuery.trim();
    if (!q) { buildSidebar(); return; }
    var lower = q.toLowerCase();
    var bodies = getBodies();
    var results = [];
    for (var i = 0; i < ORDER.length; i++) {
      var id = ORDER[i];
      var text = bodies[id][state.lang] || '';
      var idx = text.toLowerCase().indexOf(lower);
      if (idx === -1) continue;
      var start = Math.max(0, idx - 24);
      var end = Math.min(text.length, idx + q.length + 72);
      var snippet = text.slice(start, end).replace(/\s+/g, ' ').trim();
      results.push({ id: id, title: DATA.docs[id][state.lang].title, snippet: snippet });
    }
    var html = '<div class="side-hint">' +
      (state.lang === 'zh' ? '搜索结果' : 'Results') + ' · ' + results.length + '</div>';
    if (!results.length) {
      html += '<div class="side-empty">' +
        (state.lang === 'zh' ? '无匹配结果' : 'No matches found') + '</div>';
    } else {
      var re = new RegExp('(' + escapeRegExp(q) + ')', 'ig');
      for (var k = 0; k < results.length; k++) {
        var r = results[k];
        var safe = esc(r.snippet).replace(re, '<mark>$1</mark>');
        html += '<a class="side-result" href="#/' + r.id + '">' +
          '<span class="rt">' + esc(r.title) + '</span>' +
          '<span class="rs">' + safe + '</span></a>';
      }
    }
    elNav.innerHTML = html;
  }

  /* ---------- not found ---------- */
  function notFoundView(id) {
    state.route = id;
    state.doc = '';
    var zh = state.lang === 'zh';
    elDoc.innerHTML =
      '<h1>' + (zh ? '页面未找到' : 'Page not found') + '</h1>' +
      '<p>' + (zh
        ? '找不到文档 “' + esc(id) + '”，它可能已被移动或重命名。'
        : 'No document named “' + esc(id) + '”. It may have been moved or renamed.') +
      '</p>' +
      '<p><a href="#/index">' + (zh ? '返回文档首页' : 'Back to docs home') + '</a>' +
      ' &nbsp;·&nbsp; <a href="../index.html">' + (zh ? '回官网' : 'Home page') + '</a></p>';
    elCrumbs.innerHTML =
      '<a href="../index.html">' + (zh ? '首页' : 'Home') + '</a>' +
      '<span class="sep">/</span><span>404</span>';
    elPager.innerHTML = '';
    elTocNav.innerHTML = '';
    document.title = (zh ? '页面未找到' : 'Not found') + ' — PawUI';
    markActive();
    try {
      if (location.hash !== '#/' + id) history.replaceState(null, '', '#/' + id);
    } catch (e) { /* file:// may block */ }
  }

  /* ---------- render a document ---------- */
  function renderDoc(id, opts) {
    state.route = id;
    if (!DATA.docs[id]) { notFoundView(id); return; }
    state.doc = id;
    var m = meta(id);
    if (!m) return;

    var raw = b64ToUtf8(m.body);
    var html = marked.parse(raw);
    html = DOMPurify.sanitize(html, { ADD_ATTR: ['target'] });
    elDoc.innerHTML = html;

    // external links open in a new tab
    var anchors = elDoc.querySelectorAll('a[href^="http"]');
    for (var a = 0; a < anchors.length; a++) {
      anchors[a].setAttribute('target', '_blank');
      anchors[a].setAttribute('rel', 'noopener');
    }

    // wrap tables so wide content scrolls instead of breaking the page
    var tables = elDoc.querySelectorAll('table');
    for (var t = 0; t < tables.length; t++) {
      var wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      tables[t].parentNode.insertBefore(wrap, tables[t]);
      wrap.appendChild(tables[t]);
    }

    assignHeadingIds();
    buildToc();
    buildCrumbs(id);
    buildPager(id);
    addCodeCopyButtons();

    document.title = m.title + ' — PawUI';
    markActive();
    if (!opts || opts.scroll !== false) window.scrollTo(0, 0);

    // normalize short hashes to canonical form
    try {
      var canon = '#/' + id;
      if (location.hash !== canon) {
        history.replaceState(null, '', canon + location.search);
      }
    } catch (e) {
      // history.replaceState can throw on file:// (null origin); ignore
    }
  }

  function assignHeadingIds() {
    var used = {};
    var hs = elDoc.querySelectorAll('h2, h3');
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].id) { used[hs[i].id] = (used[hs[i].id] || 0) + 1; continue; }
      hs[i].id = slug(hs[i].textContent, used);
    }
  }

  function buildToc() {
    var hs = elDoc.querySelectorAll('h2, h3');
    if (!hs.length) { elTocNav.innerHTML = ''; return; }
    var html = '';
    for (var i = 0; i < hs.length; i++) {
      html += '<a class="toc-link' + (hs[i].tagName === 'H3' ? ' lvl3' : '') +
        '" href="#' + hs[i].id + '">' + esc(hs[i].textContent) + '</a>';
    }
    elTocNav.innerHTML = html;
    var links = elTocNav.querySelectorAll('.toc-link');
    for (var j = 0; j < links.length; j++) {
      links[j].addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(this.getAttribute('href').slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function buildCrumbs(id) {
    var group = '';
    DATA.groups.forEach(function (g) {
      if (g.docs.indexOf(id) !== -1) group = state.lang === 'zh' ? g.zh : g.en;
    });
    elCrumbs.innerHTML =
      '<a href="../">' + (state.lang === 'zh' ? '首页' : 'Home') + '</a>' +
      '<span class="sep">/</span>' +
      '<span>' + (state.lang === 'zh' ? '文档' : 'Docs') + '</span>' +
      (group ? '<span class="sep">/</span><b>' + esc(group) + '</b>' : '') +
      '<span class="sep">/</span><b>' + esc(meta(id).title) + '</b>';
  }

  function buildPager(id) {
    var i = ORDER.indexOf(id);
    var prev = i > 0 ? ORDER[i - 1] : null;
    var next = i !== -1 && i < ORDER.length - 1 ? ORDER[i + 1] : null;
    var html = '';
    if (prev) {
      html += '<a class="prev" href="#/' + prev + '"><div class="dir">' +
        (state.lang === 'zh' ? '上一篇' : 'Previous') + '</div><div class="ttl">' +
        esc(meta(prev).title) + '</div></a>';
    } else {
      html += '<span class="spacer"></span>';
    }
    if (next) {
      html += '<a class="next" href="#/' + next + '"><div class="dir">' +
        (state.lang === 'zh' ? '下一篇' : 'Next') + '</div><div class="ttl">' +
        esc(meta(next).title) + '</div></a>';
    } else {
      html += '<span class="spacer"></span>';
    }
    elPager.innerHTML = html;
  }

  function addCodeCopyButtons() {
    var pres = elDoc.querySelectorAll('pre');
    for (var i = 0; i < pres.length; i++) {
      (function (pre) {
        var code = pre.querySelector('code');
        var lang = '';
        if (code) {
          var cls = code.className || '';
          var m = cls.match(/language-([\w-]+)/);
          if (m) lang = m[1];
        }
        if (lang) {
          var tag = document.createElement('span');
          tag.className = 'lang';
          tag.textContent = lang;
          pre.appendChild(tag);
        }
        var btn = document.createElement('button');
        btn.className = 'code-copy';
        btn.type = 'button';
        btn.textContent = state.lang === 'zh' ? '复制' : 'Copy';
        btn.addEventListener('click', function () {
          var text = code ? code.textContent : pre.textContent;
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.setAttribute('readonly', '');
          ta.style.position = 'fixed';
          ta.style.left = '-9999px';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) { /* noop */ }
          document.body.removeChild(ta);
          btn.textContent = state.lang === 'zh' ? '已复制' : 'Copied';
          setTimeout(function () {
            btn.textContent = state.lang === 'zh' ? '复制' : 'Copy';
          }, 1400);
        });
        pre.appendChild(btn);
      })(pres[i]);
    }
  }

  /* ---------- toc active tracking ---------- */
  function setupTocTracker() {
    var tocLinks = elTocNav.querySelectorAll('.toc-link');
    if (!tocLinks.length) return;
    function update() {
      var headings = elDoc.querySelectorAll('h2, h3');
      var current = null;
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].getBoundingClientRect().top <= 100) current = headings[i].id;
      }
      for (var j = 0; j < tocLinks.length; j++) {
        tocLinks[j].classList.toggle('active',
          tocLinks[j].getAttribute('href') === '#' + current);
      }
    }
    window.removeEventListener('scroll', window.__tocUpdate || function () {});
    window.__tocUpdate = update;
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- navigation ---------- */
  function navigate() {
    var id = parseRoute();
    if (id.indexOf('#') !== -1) {
      // in-page anchor within the current doc
      return;
    }
    var hadQuery = state.query;
    if (hadQuery) { state.query = ''; elSearch.value = ''; }
    renderDoc(id, { scroll: true });
    if (hadQuery) buildSidebar();
    setupTocTracker();
  }

  window.addEventListener('hashchange', function () {
    // Ignore plain in-page anchors (e.g. #section); only route on "#/..." hashes.
    if (location.hash && location.hash.indexOf('#/') !== 0) return;
    navigate();
    closeSidebar();
  });

  /* ---------- language ---------- */
  function setLang(lang, rerender) {
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    var btns = document.querySelectorAll('.lang-toggle button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-lang') === lang);
    }
    var navHeads = document.querySelectorAll('.header-nav [data-zh]');
    for (var n = 0; n < navHeads.length; n++) {
      var v = navHeads[n].getAttribute('data-' + lang);
      if (v !== null) navHeads[n].textContent = v;
    }
    elSearch.placeholder = lang === 'zh' ? '搜索文档' : 'Search docs';
    elSearch.setAttribute('aria-label', lang === 'zh' ? '搜索文档' : 'Search docs');
    if (state.query.trim()) runSearch(state.query); else buildSidebar();
    renderVersion();
    if (rerender !== false) {
      renderDoc(state.route, { scroll: false });
      setupTocTracker();
    }
  }

  /* ---------- sidebar mobile ---------- */
  function openSidebar() {
    side.classList.add('open'); scrim.classList.add('show');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar() {
    side.classList.remove('open'); scrim.classList.remove('show');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', function () {
    if (side.classList.contains('open')) closeSidebar(); else openSidebar();
  });
  scrim.addEventListener('click', closeSidebar);

  /* ---------- search ---------- */
  elSearch.addEventListener('input', function () {
    state.query = this.value;
    runSearch(state.query);
  });

  /* ---------- version badge (live from PyPI RSS) ---------- */
  var VERSION = '';
  function renderVersion() {
    var el = document.getElementById('side-ver');
    if (!el || !VERSION) return;
    el.textContent = (state.lang === 'zh' ? '适用于 PawUI v' : 'For PawUI v') + VERSION;
    el.hidden = false;
  }
  function loadVersion() {
    fetch('https://pypi.org/rss/project/pawui/releases.xml', { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (xml) {
        var doc = new DOMParser().parseFromString(xml, 'text/xml');
        var item = doc.querySelector('item > title');
        if (!item) return;
        VERSION = item.textContent.trim();
        renderVersion();
      })
      .catch(function () { /* offline: keep hidden */ });
  }

  /* ---------- init ---------- */
  function init() {
    marked.setOptions({ gfm: true, breaks: false });
    setLang(state.lang, false);
    navigate();
    loadVersion();
    var btns = document.querySelectorAll('.lang-toggle button');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-lang'), true);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
