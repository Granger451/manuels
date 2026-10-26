(function () {
  const M = window.MANUEL || { cle: 'manuel', index: [] };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const stock = {
    lire(k) { try { return localStorage.getItem(M.cle + ':' + k); } catch (e) { return null; } },
    ecrire(k, v) { try { v === null ? localStorage.removeItem(M.cle + ':' + k) : localStorage.setItem(M.cle + ':' + k, v); } catch (e) { /* stockage indisponible */ } },
  };
  const vues = $$('.vue');
  const ids = new Set(vues.map(v => v.dataset.vue));
  let vueActive = 'manuels';

  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast.minuterie);
    toast.minuterie = setTimeout(() => { t.hidden = true; }, 2200);
  }

  // ---- Vues ----
  function afficher(id, { pousser = true, haut = true } = {}) {
    if (!ids.has(id)) id = 'manuels';
    vueActive = id;
    let parent = 'manuels';
    vues.forEach(v => { const ok = v.dataset.vue === id; v.hidden = !ok; if (ok) parent = v.dataset.parent; });
    $$('.nav-lien').forEach(a => a.dataset.go === parent ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
    const v = $('#vue-' + id), chap = v.dataset.chapitre, info = (M.chapitres || {})[chap];
    $$('.menu-chapitre').forEach(m => { m.hidden = m.dataset.chapitre !== chap; });
    $$('.nav-autre').forEach(a => { a.hidden = !!chap && a.dataset.go === chap + '-accueil'; });
    $('#marque-niveau').textContent = info && info.niveau ? 'Maths ' + info.niveau + ' pro' : 'Maths pro';
    $('#marque-chapitre').textContent = info ? info.titre : 'Les manuels';
    document.title = (v.dataset.titre ? v.dataset.titre + (info && !/accueil$/.test(id) ? ' · ' + info.titre : '') + ' · ' : '') + titreBase;
    if (pousser) { try { history.pushState(null, '', '#' + id); } catch (e) { /* cadre restreint */ } }
    fermerMenu();
    if (haut) window.scrollTo({ top: 0 });
  }
  const titreBase = document.title;
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-go]');
    if (a) {
      e.preventDefault(); afficher(a.dataset.go);
      if (a.dataset.cible) {   // lien vers une fiche précise d'une autre vue
        const code = a.dataset.go.split('-')[0];
        const el = document.getElementById(a.dataset.cible) || document.getElementById(code + '-fiche-' + a.dataset.cible) || document.getElementById(code + '-ex-' + a.dataset.cible);
        if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
      }
      return;
    }
    const ancre = e.target.closest('[data-ancre]');
    if (ancre) { const cible = document.getElementById(ancre.dataset.ancre); if (cible) cible.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
  window.addEventListener('popstate', () => afficher((location.hash || '#manuels').slice(1), { pousser: false }));

  // ---- Menu (tiroir sur téléphone) ----
  const menu = $('#menu'), voile = $('.voile'), boutonMenu = $('.bouton-menu');
  function fermerMenu() { menu.classList.remove('ouvert'); voile.hidden = true; boutonMenu.setAttribute('aria-expanded', 'false'); }
  boutonMenu.addEventListener('click', () => {
    const ouvert = !menu.classList.contains('ouvert');
    menu.classList.toggle('ouvert', ouvert); voile.hidden = !ouvert; boutonMenu.setAttribute('aria-expanded', String(ouvert));
  });
  voile.addEventListener('click', fermerMenu);

  // ---- Progression ----
  function majEtats() {
    $$('[data-etat]').forEach(el => el.classList.toggle('oui', stock.lire('fini:' + el.dataset.etat) === '1'));
    $$('[data-fini]').forEach(b => b.setAttribute('aria-pressed', String(stock.lire('fini:' + b.dataset.fini) === '1')));
  }
  $$('[data-fini]').forEach(b => b.addEventListener('click', () => {
    const oui = b.getAttribute('aria-pressed') !== 'true';
    stock.ecrire('fini:' + b.dataset.fini, oui ? '1' : null);
    majEtats();
    if (oui) toast('Étape cochée');
  }));
  majEtats();

  // ---- Taille du texte, thème ----
  const racine = document.documentElement;
  const tailles = ['', 't2', 't3'];
  function appliquerTaille(n) { racine.classList.remove('t2', 't3'); if (tailles[n]) racine.classList.add(tailles[n]); }
  let taille = Number(stock.lire('taille')) || 0;
  appliquerTaille(taille);
  $('#taille').addEventListener('click', () => {
    taille = (taille + 1) % 3; appliquerTaille(taille); stock.ecrire('taille', String(taille));
    toast(['Texte normal', 'Texte agrandi', 'Texte très grand'][taille]);
  });
  const themeMemo = stock.lire('theme');
  if (themeMemo) racine.dataset.theme = themeMemo;
  $('#theme').addEventListener('click', () => {
    const sombre = racine.dataset.theme ? racine.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    racine.dataset.theme = sombre ? 'light' : 'dark';
    stock.ecrire('theme', racine.dataset.theme);
  });

  // ---- Copier un tableau ----
  document.addEventListener('click', e => {
    const bc = e.target.closest('.copier-code');
    if (bc) {
      const pre = bc.closest('.code').querySelector('pre');
      try { navigator.clipboard.writeText(pre.innerText).then(() => toast('Code copié'), () => toast('Sélectionnez le code pour le copier')); } catch (err) { toast('Sélectionnez le code pour le copier'); }
      return;
    }
    const b = e.target.closest('.copier');
    if (!b) return;
    const table = b.parentElement.querySelector('table');
    const tsv = Array.from(table.rows).map(r => Array.from(r.cells).map(c => c.innerText.trim()).join('\t')).join('\n');
    const repli = () => { const sel = getSelection(), r = document.createRange(); r.selectNodeContents(table); sel.removeAllRanges(); sel.addRange(r); toast('Tableau sélectionné : copiez-le avec Ctrl + C'); };
    try { navigator.clipboard.writeText(tsv).then(() => toast('Tableau copié : collez-le dans un tableur'), repli); } catch (err) { repli(); }
  });

  // ---- Calques ----
  let dernierFocus = null;
  function ouvrir(id) {
    dernierFocus = document.activeElement;
    const c = $('#calque-' + id); c.hidden = false;
    if (id === 'recherche') { const champ = $('#champ-recherche'); champ.value = ''; $('#resultats').innerHTML = ''; champ.focus(); }
    if (id === 'qr') { remplirQr(); c.querySelector('[data-ferme]').focus(); }
  }
  function fermer() { $$('.calque').forEach(c => { c.hidden = true; }); if (dernierFocus) dernierFocus.focus(); }
  $$('[data-ouvre]').forEach(b => b.addEventListener('click', () => ouvrir(b.dataset.ouvre)));
  $$('.calque').forEach(c => c.addEventListener('click', e => { if (e.target === c || e.target.closest('[data-ferme]')) fermer(); }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { fermer(); fermerMenu(); }
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName))) { e.preventDefault(); ouvrir('recherche'); }
  });

  // ---- QR code ----
  function remplirQr() {
    const base = (M.url || location.href.split('#')[0]);
    const adresse = base + '#' + vueActive;
    $('#qr-titre').textContent = $('#vue-' + vueActive).dataset.titre || titreBase;
    $('#qr-lien').textContent = adresse;
    if (typeof qrcode === 'function') {
      const qr = qrcode(0, 'M'); qr.addData(adresse); qr.make();
      $('#qr-image').innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true });
    } else {
      $('#qr-image').textContent = 'Le QR code n’a pas pu être généré.';
    }
  }

  // ---- Recherche ----
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const index = M.index.map(e => ({ ...e, n: norm(e.t + ' ' + e.x) }));
  $('#champ-recherche').addEventListener('input', e => {
    const q = norm(e.target.value.trim());
    const ul = $('#resultats');
    if (q.length < 2) { ul.innerHTML = ''; return; }
    const mots = q.split(/\s+/);
    const res = index.filter(x => mots.every(m => x.n.includes(m))).slice(0, 8);
    if (!res.length) { ul.innerHTML = '<li class="vide">Aucun résultat. Essayez un autre mot.</li>'; return; }
    ul.innerHTML = '';
    res.forEach(r => {
      const pos = norm(r.x).indexOf(mots[0]);
      const debut = Math.max(0, pos - 50);
      const extrait = (debut ? '…' : '') + r.x.slice(debut, debut + 140) + '…';
      const li = document.createElement('li');
      const b = document.createElement('button'); b.type = 'button';
      const s = document.createElement('strong'); s.textContent = r.t + (r.c && r.t.indexOf(r.c) < 0 ? ' · ' + r.c : '');
      const sp = document.createElement('span'); sp.textContent = extrait;
      b.append(s, sp);
      b.addEventListener('click', () => { fermer(); afficher(r.id); });
      li.append(b); ul.append(li);
    });
  });


  // ---- Animation : dérivée d'un polynôme de degré 3 ----
  const nb = (v, d = 2) => { const r = Number(v.toFixed(d)); return (Object.is(r, -0) ? 0 : r).toLocaleString('fr-FR', { maximumFractionDigits: d }); };
  function polynome(coefs, puissances) {
    let t = '';
    coefs.forEach((c, i) => {
      if (Math.abs(c) < 1e-9) return;
      const p = puissances[i], abs = Math.abs(c);
      const coef = (abs === 1 && p > 0) ? '' : nb(abs);
      const x = p === 0 ? '' : p === 1 ? 'x' : 'x' + (p === 2 ? '²' : '³');
      t += (t ? (c < 0 ? ' − ' : ' + ') : (c < 0 ? '−' : '')) + coef + x;
    });
    return t || '0';
  }
  function animDerivee(fig) {
    const cv = fig.querySelector('canvas'), cx = cv.getContext('2d');
    const P = () => Object.fromEntries($$('[data-param]', fig).map(i => [i.dataset.param, Number(i.value)]));
    const defaut = Object.fromEntries($$('[data-param]', fig).map(i => [i.dataset.param, i.value]));
    function dessiner() {
      const { a, b, c, d, x0 } = P();
      $$('[data-sortie]', fig).forEach(o => { o.textContent = nb(P()[o.dataset.sortie], 1); });
      const f = x => a * x ** 3 + b * x ** 2 + c * x + d, fp = x => 3 * a * x ** 2 + 2 * b * x + c;
      const m = fp(x0), y0 = f(x0);
      fig.querySelector('[data-res="f"]').textContent = polynome([a, b, c, d], [3, 2, 1, 0]);
      fig.querySelector('[data-res="fp"]').textContent = polynome([3 * a, 2 * b, c], [2, 1, 0]);
      fig.querySelector('[data-res="pt"]').textContent = `f(${nb(x0, 1)}) = ${nb(y0)} et f′(${nb(x0, 1)}) = ${nb(m)}`;
      fig.querySelector('[data-res="tg"]').textContent = 'y = ' + polynome([m, y0 - m * x0], [1, 0]);
      fig.querySelector('[data-res="etapes"]').innerHTML = [
        `(${nb(a)}x³)′ = 3 × ${nb(a)}x² = ${nb(3 * a)}x²`, `(${nb(b)}x²)′ = 2 × ${nb(b)}x = ${nb(2 * b)}x`,
        `(${nb(c)}x)′ = ${nb(c)}`, `(${nb(d)})′ = 0 : la constante disparaît`, `f′(x) = ${polynome([3 * a, 2 * b, c], [2, 1, 0])}`,
      ].map(t => `<li>${t}</li>`).join('');
      const r = window.devicePixelRatio || 1, W = cv.clientWidth, H = cv.clientHeight;
      cv.width = W * r; cv.height = H * r; cx.setTransform(r, 0, 0, r, 0, 0); cx.clearRect(0, 0, W, H);
      const st = getComputedStyle(fig), col = n => st.getPropertyValue(n).trim();
      const xm = 5, ym = 12, X = x => (x + xm) / (2 * xm) * W, Y = y => H / 2 - y / ym * (H / 2);
      cx.lineWidth = 1; cx.strokeStyle = col('--trait');
      for (let g = -xm; g <= xm; g++) { cx.beginPath(); cx.moveTo(X(g), 0); cx.lineTo(X(g), H); cx.stroke(); }
      for (let g = -ym; g <= ym; g += 2) { cx.beginPath(); cx.moveTo(0, Y(g)); cx.lineTo(W, Y(g)); cx.stroke(); }
      cx.strokeStyle = col('--encre-2'); cx.lineWidth = 1.4;
      cx.beginPath(); cx.moveTo(0, Y(0)); cx.lineTo(W, Y(0)); cx.moveTo(X(0), 0); cx.lineTo(X(0), H); cx.stroke();
      const courbe = (g, couleur, l) => { cx.strokeStyle = couleur; cx.lineWidth = l; cx.beginPath(); for (let i = 0; i <= W; i++) { const x = -xm + 2 * xm * i / W; const y = g(x); i ? cx.lineTo(i, Y(y)) : cx.moveTo(i, Y(y)); } cx.stroke(); };
      courbe(fp, col('--bleu'), 2.2);
      courbe(x => m * (x - x0) + y0, col('--turquoise'), 1.6);
      courbe(f, col('--ambre-vif'), 3);
      cx.fillStyle = col('--encre'); cx.beginPath(); cx.arc(X(x0), Y(y0), 4.5, 0, 7); cx.fill();
    }
    $$('[data-param]', fig).forEach(i => i.addEventListener('input', dessiner));
    fig.querySelector('.anim-reinit').addEventListener('click', () => { $$('[data-param]', fig).forEach(i => { i.value = defaut[i.dataset.param]; }); dessiner(); });
    new ResizeObserver(dessiner).observe(cv);
    new MutationObserver(dessiner).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    dessiner();
  }
  $$('[data-anim="derivee-cube"]').forEach(animDerivee);

  // ---- Démarrage ----
  afficher((location.hash || '#manuels').slice(1), { pousser: false, haut: false });
})();
