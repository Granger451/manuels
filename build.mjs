// Générateur du manuel : contenu/<niveau>/<chapitre>/*.md + chapitre.yml  →  une page HTML avec tous les chapitres.
// Usage : node build.mjs --cible forge       (site dans dist/, fichiers téléchargeables)
//         node build.mjs --cible artifact [--url https://…]   (aperçu dans dist-apercu/)
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import katex from 'katex';

const args = Object.fromEntries(process.argv.slice(2).join(' ').split('--').filter(Boolean)
  .map(s => s.trim().split(/\s+/)).map(([k, ...v]) => [k, v.join(' ') || true]));
const CIBLE = args.cible === 'artifact' ? 'artifact' : 'forge';
const URL_PUBLIQUE = typeof args.url === 'string' ? args.url : '';
const RACINE = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.join(RACINE, 'contenu');
const SORTIE = path.join(RACINE, CIBLE === 'artifact' ? 'dist-apercu' : 'dist');
const lire = f => fs.readFileSync(f, 'utf8');
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const NIVEAUX = { '2de': 'Seconde', '1re': 'Première', 'Tle': 'Terminale' };

// ---------- Icônes (trait 1.8, 24×24) ----------
const I = {
  activite: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  retenir: '<path d="M9 4h6l-1 5 3 3H7l3-3z"/><path d="M12 12v8"/>',
  connaissance: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  pouce: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  methode: '<path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6L21 13l-8 8-3-3 2-2-5-5-2 2-2-2 8-8z"/>',
  exercice: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
  probleme: '<path d="M12 3 3 8l9 5 9-5z"/><path d="M3 13l9 5 9-5"/>',
  evaluation: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
  appli: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12h8M12 8v8"/>',
  code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  rappel: '<path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v4h4M12 8v4l3 2"/>',
  fichier: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 14h6M9 17h4"/>',
  memo: '<path d="M5 4h11l3 3v13H5z"/><path d="M9 9h6M9 13h6M9 17h3"/>',
  prof: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
  maison: '<path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/>',
  livres: '<path d="M5 4h4v16H5zM10 4h4v16h-4z"/><path d="m15 5 3.5-1 3 15-3.5 1z"/>',
  chercher: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  texte: '<path d="M4 18 9 6l5 12M5.8 14h6.4"/><path d="M17 9v6M14 12h6"/>',
  theme: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  fermer: '<path d="m6 6 12 12M18 6 6 18"/>',
  coche: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  gauche: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  droite: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  externe: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  copier: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;

// ---------- Motifs : vrais graphes calculés, arbres pondérés ----------
function trace(f, { x0 = 0, x1 = 1, pts = 7 } = {}) {
  const W = 120, H = 64, P = 8;
  const xs = Array.from({ length: 41 }, (_, i) => x0 + (x1 - x0) * i / 40);
  const ys = xs.map(f), ymin = Math.min(...ys), ymax = Math.max(...ys);
  const sx = x => P + (x - x0) / (x1 - x0) * (W - 2 * P), sy = y => H - P - (y - ymin) / (ymax - ymin || 1) * (H - 2 * P);
  const d = xs.map((x, i) => `${i ? 'L' : 'M'}${sx(x).toFixed(1)} ${sy(ys[i]).toFixed(1)}`).join('');
  const nuage = Array.from({ length: pts }, (_, i) => {
    const x = x0 + (x1 - x0) * (i + 0.5) / pts, j = ((i * 37) % 7 - 3) / 3 * 0.06 * (ymax - ymin);
    return `<circle cx="${sx(x).toFixed(1)}" cy="${sy(f(x) + j).toFixed(1)}" r="2.6"/>`;
  }).join('');
  return `<svg class="trace" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="trace-axes" d="M${P} ${P - 2}V${H - P}H${W - P + 2}"/><path class="trace-courbe" d="${d}"/><g class="trace-points">${nuage}</g></svg>`;
}
// Arbre à deux étapes ; « chemins » = indices des feuilles (0 à 3) dont le chemin est mis en valeur
function arbre(chemins = []) {
  const r = [8, 32], n1 = [[50, 16], [50, 48]], f = [[96, 6], [96, 24], [96, 40], [96, 58]];
  const seg = (a, b, on) => `<path class="${on ? 'trace-courbe' : 'trace-axes'}" d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}"/>`;
  let s = '';
  f.forEach((p, k) => { const m = n1[k >> 1], on = chemins.includes(k); s += seg(m, p, on); });
  n1.forEach((m, k) => { const on = chemins.some(c => c >> 1 === k); s += seg(r, m, on); });
  const pts = [r, ...n1, ...f].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="2.6"/>`).join('');
  return `<svg class="trace" viewBox="0 0 120 64" aria-hidden="true">${s}<g class="trace-points">${pts}</g></svg>`;
}
// Repère de l'espace (x à droite, y en oblique, z vers le haut) et vecteurs fléchés
function vecteurs(fleches, { cercle = false } = {}) {
  const O = [22, 52];
  const fl = ([a, b], on = true) => {
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), t = 5.5, l = 0.45;
    const p1 = [b[0] - t * Math.cos(ang - l), b[1] - t * Math.sin(ang - l)], p2 = [b[0] - t * Math.cos(ang + l), b[1] - t * Math.sin(ang + l)];
    return `<path class="${on ? 'trace-courbe' : 'trace-axes'}" d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}M${p1[0].toFixed(1)} ${p1[1].toFixed(1)}L${b[0]} ${b[1]}L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}"/>`;
  };
  const axes = cercle
    ? `<circle class="trace-axes" cx="60" cy="32" r="24" fill="none"/><path class="trace-axes" d="M30 32H92M60 6V58"/>`
    : `<path class="trace-axes" d="M${O[0]} ${O[1]}H112M${O[0]} ${O[1]}V6M${O[0]} ${O[1]}L4 62"/>`;
  const pts = fleches.map(f => `<circle cx="${f[0][0]}" cy="${f[0][1]}" r="2.6"/>`).join('');
  return `<svg class="trace" viewBox="0 0 120 64" aria-hidden="true">${axes}${fleches.map(f => fl(f, f[2] !== false)).join('')}<g class="trace-points">${pts}</g></svg>`;
}
// Diagramme en barres (tableau d'amortissement : capital restant dû qui diminue)
function barres(vals) {
  const W = 120, H = 64, P = 8, l = (W - 2 * P) / vals.length;
  const r = vals.map((v, i) => `<rect class="${i % 2 ? 'trace-barre trace-barre-2' : 'trace-barre'}" x="${(P + i * l + 2).toFixed(1)}" y="${(H - P - v * (H - 2 * P)).toFixed(1)}" width="${(l - 4).toFixed(1)}" height="${(v * (H - 2 * P)).toFixed(1)}" rx="1.5"/>`).join('');
  return `<svg class="trace" viewBox="0 0 ${W} ${H}" aria-hidden="true"><path class="trace-axes" d="M${P} ${P - 2}V${H - P}H${W - P + 2}"/>${r}</svg>`;
}
const MOTIFS = {
  amortissement: barres([1, 0.8, 0.6, 0.4, 0.2]),
  vecteur: vecteurs([[[34, 46], [86, 20]]]),
  'vecteurs-somme': vecteurs([[[30, 48], [70, 40]], [[70, 40], [92, 14]], [[30, 48], [92, 14], false]]),
  'vecteurs-colineaires': vecteurs([[[30, 50], [62, 34]], [[60, 52], [104, 30]]]),
  'vecteur-norme': vecteurs([[[34, 50], [96, 14]], [[34, 50], [96, 50], false], [[96, 50], [96, 14], false]]),
  sinus: trace(x => Math.sin(2 * Math.PI * 1.5 * x), { pts: 7 }),
  'sinus-dephasage': trace(x => Math.sin(2 * Math.PI * 1.5 * x + 1) + 0.0001 * x, { pts: 7 }).replace('class="trace-courbe"', 'class="trace-courbe trace-pointille"'),
  fresnel: vecteurs([[[60, 32], [80, 16]], [[80, 16], [100, 26]], [[60, 32], [100, 26], false]], { cercle: true }),
  affine: trace(x => 0.8 * x + 0.1),
  quadratique: trace(x => (x - 0.55) ** 2),
  logarithmique: trace(x => Math.log(x), { x0: 0.08, x1: 1 }),
  exponentiel: trace(x => Math.exp(3.2 * x)),
  arbre: arbre([0]),
  'arbre-totales': arbre([0, 2]),
  'arbre-independance': arbre([0, 1, 2, 3]),
  suite: trace(x => Math.pow(1.9, 6 * x), { pts: 7 }).replace('class="trace-courbe"', 'class="trace-courbe trace-pointille"'),
  cube: trace(x => Math.pow(2 * x - 1, 3)),
  'cube-extremums': trace(x => 4 * Math.pow(2 * x - 1, 3) - 3 * (2 * x - 1)),
  derivee: trace(x => 3 * Math.pow(2 * x - 1, 2) - 0.8),
  somme: trace(x => Math.pow(2, 6 * x) - 1, { pts: 6 }),
  code: '<svg class="trace" viewBox="0 0 120 64" aria-hidden="true"><path class="trace-courbe" d="M44 18 26 32l18 14M76 18l18 14-18 14"/><path class="trace-axes" d="M66 12 54 52"/></svg>',
};

// ---------- Cartes de liens externes ----------
function carteLien(url, titre) {
  const u = String(url);
  const [ico, texte, meta] = /geogebra/.test(u) ? ['activite', 'Ouvrir le fichier GeoGebra', 'GeoGebra, dans le navigateur']
    : /basthon/.test(u) ? ['code', 'Ouvrir le programme dans Basthon', 'Console Python en ligne, sans installation']
    : /learningapps/.test(u) ? ['appli', 'Faire l’exercice sur LearningApps', 'Exercice interactif']
    : /youtube\.com|youtu\.be/.test(u) ? ['video', 'Regarder la vidéo', 'YouTube']
    : ['externe', 'Ouvrir le lien', new URL(u).hostname];
  return `<a class="appli" href="${esc(u)}" target="_blank" rel="noopener"><span class="appli-texte"><span class="appli-titre">${esc(titre || texte)}</span><span class="appli-meta">${ic(ico)}${esc(meta)}</span></span><span class="appli-ouvrir">Ouvrir ${ic('externe', 'petit')}</span></a>`;
}

// ---------- Animations intégrées ----------
const curseur = (id, lab, min, max, pas, val) => `<label class="anim-curseur"><span>${lab} = <output data-sortie="${id}">${val}</output></span><input type="range" data-param="${id}" min="${min}" max="${max}" step="${pas}" value="${val}"></label>`;
const ANIMATIONS = {
  'derivee-cube': () => `<figure class="anim anim-derivee" data-anim="derivee-cube">
    <div class="anim-graphe"><canvas aria-label="Courbes de f et de sa dérivée f prime, avec la tangente au point choisi"></canvas>
      <figcaption class="anim-legende"><span class="l-f">f</span><span class="l-fp">f′</span><span class="l-t">tangente en x₀</span></figcaption></div>
    <div class="anim-reglages">
      ${curseur('a', 'a', -3, 3, 0.1, 1)}${curseur('b', 'b', -5, 5, 0.1, 0)}${curseur('c', 'c', -10, 10, 0.1, -3)}${curseur('d', 'd', -10, 10, 0.1, 0)}${curseur('x0', 'x₀', -4, 4, 0.1, 1)}
      <div class="anim-resultats">
        <p><span>f(x) =</span> <strong data-res="f"></strong></p>
        <p><span>f′(x) =</span> <strong data-res="fp"></strong></p>
        <p><span>Au point x₀ :</span> <strong data-res="pt"></strong></p>
        <p><span>Tangente :</span> <strong data-res="tg"></strong></p>
      </div>
      <details class="anim-etapes"><summary>Voir le calcul pas à pas</summary><ol data-res="etapes"></ol></details>
      <button type="button" class="anim-reinit">Réinitialiser</button>
    </div>
  </figure>`,
};

// ---------- Markdown ----------
function webpTaille(fichier) {
  try {
    const b = fs.readFileSync(fichier), f = b.toString('ascii', 12, 16);
    if (f === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (f === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; }
    if (f === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
  } catch { /* image absente */ }
  return null;
}

function creerMd(ctx) {
  const md = new MarkdownIt({ html: false, typographer: false });
  md.core.ruler.push('typo_fr', state => {
    for (const t of state.tokens) for (const c of t.children || []) if (c.type === 'text')
      c.content = c.content.replace(/ ([;:!?»])/g, ' $1').replace(/« /g, '« ').replace(/(\d) (\d{3})/g, '$1 $2');
  });
  const etat = md.etat = { profondeur: 0, items: [] };
  md.renderer.rules.ordered_list_open = (t, i) => {
    const profondeur = ++etat.profondeur, debut = t[i].attrGet('start');
    return `<ol class="questions${profondeur > 1 ? ' sous' : ''}"${debut ? ` start="${debut}"` : ''}>`;
  };
  md.renderer.rules.ordered_list_close = () => { etat.profondeur--; return '</ol>'; };
  md.renderer.rules.list_item_open = (t, i) => {
    const n = t[i].info, numerote = t[i].markup === '.' || t[i].markup === ')';
    etat.items.push(numerote);
    if (!numerote) return '<li>';
    const lettre = etat.profondeur > 1 || t[i].markup === ')';
    return `<li><span class="qn">${lettre ? String.fromCharCode(96 + Number(n)) : n}</span><div class="q">`;
  };
  md.renderer.rules.list_item_close = () => (etat.items.pop() ? '</div></li>' : '</li>');
  md.renderer.rules.image = (t, i) => {
    const tok = t[i], src = tok.attrGet('src'), alt = tok.content, titre = tok.attrGet('title');
    const taille = webpTaille(path.join(ctx.dossier, src));
    const genre = /numworks-/.test(src) ? 'fig-ecran' : /photo-/.test(src) ? 'fig-photo' : 'fig-graphe';
    ctx.images.add(src);
    return `<figure class="fig ${genre}"><img src="${esc(ctx.prefixe + src)}" alt="${esc(alt)}" loading="lazy" decoding="async"${taille ? ` width="${taille[0]}" height="${taille[1]}"` : ''}>${titre ? `<figcaption>${esc(titre)}</figcaption>` : ''}</figure>`;
  };
  // Lien vers une autre vue du site : [texte](#outils-tableur/o-tab-modelisation)
  md.renderer.rules.link_open = (t, i, o, e, s) => {
    const href = t[i].attrGet('href') || '';
    const m = href.match(/^#([\w-]+)(?:\/([\w-]+))?$/);
    if (m) return `<a href="#${esc(m[1])}" data-go="${esc(m[1])}"${m[2] ? ` data-cible="${esc(m[2])}"` : ''} class="lien-interne">`;
    t[i].attrSet('target', '_blank'); t[i].attrSet('rel', 'noopener');
    return s.renderToken(t, i, o);
  };
  md.renderer.rules.table_open = () => '<div class="tableau"><div class="tableau-defile"><table>';
  md.renderer.rules.table_close = () => `</table></div>${ctx.sansCopie ? '' : `<button class="copier" type="button">${ic('copier')}<span>Copier le tableau</span></button>`}</div>`;
  md.renderer.rules.fence = (t, i) => `<div class="code"><div class="code-tete">${ic('code')}<span>${esc(t[i].info || 'code')}</span><button class="copier-code" type="button">${ic('copier')}<span>Copier</span></button></div><pre><code>${esc(t[i].content)}</code></pre></div>`;

  const pile = [];
  const bloc = (nom, ouvrir, fermer) => md.use(container, nom, {
    render(t, i) {
      if (t[i].nesting === 1) { const info = t[i].info.trim().slice(nom.length).trim(); pile.push(info); return ouvrir(info); }
      return fermer(pile.pop());
    },
  });
  bloc('problematique', () => `<div class="problematique"><span class="etiquette">Problématique</span>`, () => '</div>');
  bloc('remarque', t => `<aside class="remarque"><span class="etiquette">${esc(t || 'Remarque')}</span>`, () => '</aside>');
  bloc('important', () => `<aside class="remarque important"><span class="etiquette">Important</span>`, () => '</aside>');
  bloc('modeles', () => '<div class="modeles">', () => '</div><!--/modeles-->');
  bloc('competence', t => `<section class="competence"><h4 class="competence-nom">${esc(t)}</h4><div class="competence-corps">`, () => '</div></section>');
  bloc('coup-de-pouce', id => `<details class="cdp"><summary>${ic('pouce')}<span class="cdp-mot">Coup de pouce</span><span class="cdp-titre">${esc(ctx.fiche(id).titre)}</span></summary><div class="cdp-corps"><div class="cdp-contexte">`,
    id => `</div>${ctx.html(id)}</div></details>`);
  bloc('fiches-methode', () => `<details class="cdp cdp-fiches"><summary>${ic('pouce')}<span class="cdp-mot">Coup de pouce</span><span class="cdp-titre">Les fiches méthode</span></summary><div class="cdp-corps"><div class="cdp-contexte">`,
    () => `</div>${ctx.chapitre.memo.methodes.map(id => `<details class="cdp cdp-interne"><summary>${ic('methode')}<span class="cdp-titre">${esc(ctx.fiche(id).titre)}</span></summary><div class="cdp-corps">${ctx.html(id)}</div></details>`).join('')}</div></details>`);
  bloc('aides', ids => `<details class="cdp cdp-fiches"><summary>${ic('pouce')}<span class="cdp-mot">Coups de pouce</span><span class="cdp-titre">${ids.split(/\s+/).length} fiches pour vous aider</span></summary><div class="cdp-corps"><div class="cdp-contexte">`,
    ids => `</div>${ids.split(/\s+/).map(id => `<details class="cdp cdp-interne"><summary>${ic('methode')}<span class="cdp-titre">${esc(ctx.fiche(id).titre)}</span></summary><div class="cdp-corps">${ctx.html(id)}</div></details>`).join('')}</div></details>`);
  bloc('ouvrir', url => '', url => carteLien(url));
  bloc('video', chemin => { ctx.images.add(chemin); return ''; }, chemin => `<figure class="video-locale"><video controls preload="metadata" playsinline src="${esc(ctx.prefixe + chemin)}"></video></figure>`);
  bloc('animation', nom => '', nom => ANIMATIONS[nom] ? ANIMATIONS[nom]() : '');
  bloc('fichier', chemin => {
    ctx.fichiers.add(chemin);
    const nom = path.basename(chemin), ext = path.extname(nom).slice(1).toUpperCase();
    return `<div class="fichier"><span class="fichier-type">${ext}</span><div class="fichier-texte"><strong>${esc(nom)}</strong><div class="fichier-desc">`;
  }, chemin => `</div></div>${CIBLE === 'forge' ? `<a class="bouton" href="${esc(ctx.prefixe + chemin)}" download>${ic('fichier')}Télécharger</a>` : '<span class="fichier-note">Téléchargement actif sur le site en ligne</span>'}</div>`);
  return md;
}

function rendre(md, source) {
  const formules = [];
  const blocs = [];
  source = source.replace(/```[\s\S]*?```/g, m => { blocs.push(m); return `@@C${blocs.length - 1}@@`; });
  let protege = source.replace(/\$([^$\n]+?)\$/g, (_, tex) => {
    // Chrome n'applique pas mathvariant="double-struck" : on écrit directement ℝ, ℕ, ℤ…
    formules.push(katex.renderToString(tex, { output: 'mathml', throwOnError: false, strict: 'ignore' })
      .replace(/<mi mathvariant="double-struck">([A-Z])<\/mi>/g, (m, l) => `<mi mathvariant="normal">${({ R: 'ℝ', N: 'ℕ', Z: 'ℤ', Q: 'ℚ', C: 'ℂ', D: '𝔻' })[l] || l}</mi>`)
      // espaces fines autour de log, ln, sin… que Chrome n'ajoute pas (« 20 log x » et non « 20logx »)
      // flèche de \vec : Chrome place mal l'accent combinant U+20D7 ; une vraie flèche → au-dessus
      .replace(/<mo>\u20d7<\/mo><\/mover>/g, '<mo stretchy="false" style="font-size:.75em">→</mo></mover>')
      .replace(/(<\/m[ni]>)(<mi>(?:log|ln|exp|sin|cos|tan)<\/mi>)/g, '$1<mspace width="0.17em"></mspace>$2')
      .replace(/(<mi>(?:log|ln|exp|sin|cos|tan)<\/mi><mo>\u2061<\/mo>)(?=<m[in][ >])/g, '$1<mspace width="0.17em"></mspace>'));
    return `@@M${formules.length - 1}@@`;
  });
  protege = protege.replace(/@@C(\d+)@@/g, (_, n) => blocs[n]);
  const sauve = { profondeur: md.etat.profondeur, items: md.etat.items };
  md.etat.profondeur = 0; md.etat.items = [];
  let h = md.render(protege);
  md.etat.profondeur = sauve.profondeur; md.etat.items = sauve.items;
  h = h.replace(/@@M(\d+)@@/g, (_, n) => formules[n]);
  h = h.replace(/<p>(<figure[\s\S]*?<\/figure>)<\/p>/g, '$1');
  h = h.replace(/<div class="modeles">([\s\S]*?)<\/div><!--\/modeles-->/g, (_, corps) =>
    `<div class="modeles">${corps.split(/(?=<h4>)/).filter(s => s.trim()).map(s => `<article class="modele">${s}</article>`).join('')}</div>`);
  h = h.replace(/<table>([\s\S]*?)<\/table>/g, (tout, corps) => {
    const lignes = (corps.match(/<tr>/g) || []).length, cols = (corps.match(/<th/g) || []).length;
    if (lignes <= 4 && cols >= 4) {
      corps = corps.replace(/<tr>\s*<td([^>]*)>([\s\S]*?)<\/td>/g, '<tr><th scope="row"$1>$2</th>');
      return `<table class="en-ligne">${corps}</table>`;
    }
    return tout;
  });
  return h;
}

function lireFiche(fichier) {
  const brut = lire(fichier);
  const m = brut.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { ...yaml.load(m[1]), corps: m[2] } : { corps: brut };
}

// ---------- Chapitre ----------
function construireChapitre(niveau, slug) {
  const dossier = path.join(CONTENU, niveau, slug);
  const chapitre = yaml.load(lire(path.join(dossier, 'chapitre.yml')));
  const code = chapitre.code || slug;
  const prefixe = CIBLE === 'artifact' ? `${code}/` : `${niveau}/${slug}/`;
  const fiches = {};
  for (const f of fs.readdirSync(dossier)) if (f.endsWith('.md')) fiches[f.slice(0, -3)] = lireFiche(path.join(dossier, f));
  const ctx = {
    dossier, chapitre, images: new Set(), fichiers: new Set(), prefixe, cache: {}, sansCopie: false,
    fiche: id => { if (!fiches[id]) throw new Error(`${slug} : fiche introuvable « ${id} »`); return fiches[id]; },
  };
  const md = creerMd(ctx);
  ctx.html = id => (ctx.cache[id] ??= rendre(md, ctx.fiche(id).corps));
  const html = ctx.html;
  const V = id => `${code}-${id}`;
  const etapes = chapitre.etapes;
  const ou = {};
  etapes.forEach((e, n) => (e.exercices || []).forEach(x => (ou[x] = n + 1)));
  const tousExercices = etapes.flatMap(e => e.exercices || []);
  const nomNiveau = NIVEAUX[chapitre.niveau] || chapitre.niveau;

  const lien = (vue, contenu, cls = '') => `<a href="#${V(vue)}" data-go="${V(vue)}"${cls ? ` class="${cls}"` : ''}>${contenu}</a>`;
  const puce = (type, texte) => `<span class="puce puce-${type}">${ic(type)}${texte}</span>`;
  const niveauPb = n => `<span class="niveau" aria-label="Niveau ${n} sur 3">${[1, 2, 3].map(k => `<i class="${k <= n ? 'plein' : ''}"></i>`).join('')}<span>Niveau ${n}</span></span>`;
  const video = v => { ctx.images.add(v.image); return `<a class="video" href="https://www.youtube.com/watch?v=${v.video}" target="_blank" rel="noopener"><img src="${esc(prefixe + v.image)}" alt="" loading="lazy"><span class="video-texte"><span class="video-titre">${esc(v.titre)}</span><span class="video-source">${ic('video')}Vidéo YouTube ${ic('externe', 'petit')}</span></span></a>`; };
  const appli = (a, n) => {
    const yt = /youtube\.com|youtu\.be/.test(a.lien);
    return `<a class="appli" href="${esc(a.lien)}" target="_blank" rel="noopener">${n != null ? `<span class="appli-num">${n}</span>` : ''}<span class="appli-texte"><span class="appli-titre">${esc(a.titre)}</span><span class="appli-meta">${ic(yt ? 'video' : 'appli')}${yt ? 'Vidéo YouTube' : 'Exercice interactif LearningApps'}${a.duree ? ` · ${esc(a.duree)}` : ''}</span></span><span class="appli-ouvrir">Ouvrir ${ic('externe', 'petit')}</span></a>`;
  };

  const vues = [];
  const vue = (id, parent, titreCourt, contenu) => vues.push({ id: V(id), parent: V(parent), titreCourt, contenu, chapitre: code });
  const boutonFini = id => `<button class="fini" type="button" data-fini="${V(id)}" aria-pressed="false"><span class="fini-case">${ic('coche')}</span><span class="fini-texte">J'ai terminé cette étape</span></button>`;
  function navEtapes(n) {
    const prec = n < 0 ? { id: 'accueil', t: 'Accueil du chapitre' } : n === 0 ? { id: 'preparation', t: '0 · Je me prépare' } : { id: etapes[n - 1].id, t: `${n} · ${etapes[n - 1].titre}` };
    const suiv = n + 1 < etapes.length ? { id: etapes[n + 1].id, t: `${n + 2} · ${etapes[n + 1].titre}` } : { id: 'entrainement', t: "Je m'entraîne" };
    return `<nav class="nav-etapes" aria-label="Étapes">${lien(prec.id, `${ic('gauche')}<span><small>Précédent</small>${esc(prec.t)}</span>`, 'nav-prec')}${lien(suiv.id, `<span><small>Suivant</small>${esc(suiv.t)}</span>${ic('droite')}`, 'nav-suiv')}</nav>`;
  }
  const carteExercice = (id, avecEtape) => {
    const f = fiches[id];
    return `<article class="exercice" id="${V('ex-' + id)}">
      <header><span class="puce puce-exercice">${ic(f.lien && /learningapps/.test(f.lien) ? 'appli' : 'exercice')}${f.lien && /learningapps/.test(f.lien) ? 'Exercice interactif' : 'Exercice'}</span>${avecEtape && ou[id] ? `<span class="apres">Après l'étape ${ou[id]}</span>` : ''}<h3>${esc(f.titre)}</h3></header>
      ${html(id)}${f.lien && !f.corps.includes('::: ouvrir') ? carteLien(f.lien) : ''}
    </article>`;
  };
  const elementPrepa = (p, n) => {
    if (p.lien) return appli(p, n);
    const f = fiches[p.fiche];
    if (f.type === 'conseil') return `<article class="fiche fiche-rappel"><div class="bloc-tete"><span class="puce puce-rappel">${ic('pouce')}Conseil</span><h3>${esc(f.titre)}</h3></div>${html(p.fiche)}</article>`;
    if (f.type === 'rappel') return `<article class="fiche fiche-rappel"><div class="bloc-tete"><span class="puce puce-rappel">${ic('rappel')}Rappel</span><h3>${esc(f.titre)}</h3></div>${html(p.fiche)}</article>`;
    return carteExercice(p.fiche, false);
  };
  const nbPrepa = chapitre.preparation.length;

  // Accueil du chapitre
  vue('accueil', 'accueil', 'Accueil du chapitre', `
    <header class="hero">
      <div class="hero-texte">
        <p class="surtitre">${esc(nomNiveau)} · ${grp(chapitre.groupements)}</p>
        <h1>${esc(chapitre.titre)}</h1>
        <p class="hero-objectif">${esc(chapitre.objectif)}</p>
      </div>
      <div class="hero-nuage" aria-hidden="true">${MOTIFS[chapitre.motif] || ''}</div>
    </header>
    <section class="encadre-objectifs"><h2>${esc(fiches[chapitre.objectifs].titre)}</h2>${html(chapitre.objectifs)}</section>
    <section>
      <h2 class="titre-section">Le parcours</h2>
      <ol class="parcours">
        <li>${lien('preparation', `<span class="parcours-num">0</span><span class="parcours-texte"><span class="parcours-titre">Je me prépare</span><span class="parcours-resume">${nbPrepa} révisions pour démarrer</span></span><span class="parcours-etat" data-etat="${V('preparation')}"></span>`, 'parcours-carte')}</li>
        ${etapes.map((e, n) => `<li>${lien(e.id, `<span class="parcours-num">${n + 1}</span><span class="parcours-texte"><span class="parcours-titre">${esc(e.titre)}</span><span class="parcours-resume">${esc(e.resume)}</span></span>${MOTIFS[e.motif] || ''}<span class="parcours-etat" data-etat="${V(e.id)}"></span>`, 'parcours-carte')}</li>`).join('')}
      </ol>
    </section>
    <section class="raccourcis">
      ${lien('memo', `${ic('memo')}<span><strong>Mémo</strong><span>${chapitre.memo.connaissances.length} fiches connaissances, ${chapitre.memo.methodes.length} fiches méthode</span></span>`, 'raccourci')}
      ${lien('entrainement', `${ic('exercice')}<span><strong>Je m'entraîne</strong><span>${tousExercices.length} exercices, ${chapitre.problemes.length} problèmes${(chapitre.programmes || []).length ? `, ${chapitre.programmes.length} programme` : ''}</span></span>`, 'raccourci')}
      ${lien('evaluation', `${ic('evaluation')}<span><strong>Je m'évalue</strong><span>${chapitre.evaluations.length} sujet${chapitre.evaluations.length > 1 ? 's' : ''}</span></span>`, 'raccourci')}
    </section>`);

  vue('preparation', 'preparation', 'Je me prépare', `
    <header class="entete-vue"><p class="surtitre">Étape 0 · avant de commencer</p><h1>Je me prépare</h1>
    <p class="chapeau">${esc(chapitre.preparation_intro || 'Pour vérifier ce qu’il faut savoir avant d’attaquer le chapitre.')}</p></header>
    <div class="applis">${chapitre.preparation.map((p, n) => elementPrepa(p, p.lien ? n + 1 : null)).join('')}</div>
    ${boutonFini('preparation')}
    ${navEtapes(-1)}`);

  etapes.forEach((e, n) => {
    const acts = e.activites || (e.activite ? [e.activite] : []);
    const rets = e.retenir ? [].concat(e.retenir) : [];
    vue(e.id, e.id, `${n + 1} · ${e.titre}`, `
      <header class="entete-vue">
        <p class="surtitre">Étape ${n + 1} sur ${etapes.length}</p>
        <h1>${esc(e.titre)}</h1>
        <p class="chapeau">${esc(e.resume)}</p>
        <div class="segments" aria-hidden="true">${etapes.map((_, k) => `<i class="${k <= n ? 'actif' : ''}"></i>`).join('')}</div>
      </header>
      ${acts.map((a, k) => `<section class="bloc bloc-activite" aria-labelledby="${V(e.id)}-act${k}">
        <div class="bloc-tete">${puce('activite', acts.length > 1 ? `Activité ${k + 1}` : 'Activité')}<h2 id="${V(e.id)}-act${k}">${esc(fiches[a].titre)}</h2></div>
        ${html(a)}${fiches[a].lien && !fiches[a].corps.includes('::: ouvrir') ? carteLien(fiches[a].lien) : ''}
      </section>`).join('')}
      ${(e.methodes || []).map(m => `<section class="fiche fiche-methode"><div class="bloc-tete">${puce('methode', `Méthode${fiches[m].outil ? ` · ${esc(fiches[m].outil)}` : ''}`)}<h2>${esc(fiches[m].titre)}</h2></div>${html(m)}</section>`).join('')}
      ${rets.map((r, k) => `<section class="bloc bloc-retenir" aria-labelledby="${V(e.id)}-ret${k}">
        <div class="bloc-tete">${puce('retenir', 'À retenir')}<h2 id="${V(e.id)}-ret${k}">${esc(fiches[r].titre)}</h2></div>
        ${html(r)}
      </section>`).join('')}
      ${(e.exercices || []).length ? `<section class="groupe-exercices"><h2 class="titre-section">${ic('exercice')}Je m'exerce</h2>${e.exercices.map(x => carteExercice(x, false)).join('')}</section>` : ''}
      ${(e.plus_loin || []).length ? `<section class="plus-loin"><h2 class="titre-section">Pour aller plus loin</h2><div class="videos">${e.plus_loin.filter(v => v.video).map(video).join('')}</div>${e.plus_loin.filter(v => v.fiche).map(v => `<article class="exercice"><header><span class="puce puce-activite">${ic('activite')}Pour aller plus loin</span><h3>${esc(fiches[v.fiche].titre)}</h3></header>${html(v.fiche)}</article>`).join('')}</section>` : ''}
      ${boutonFini(e.id)}
      ${navEtapes(n)}`);
  });

  const memoFiche = (id, type) => `<article class="fiche fiche-${type}" id="${V('fiche-' + id)}"><div class="bloc-tete">${puce(type, type === 'methode' ? `Méthode${fiches[id].outil ? ` · ${esc(fiches[id].outil)}` : ''}` : 'Connaissance')}<h3>${esc(fiches[id].titre)}</h3></div>${html(id)}</article>`;
  vue('memo', 'memo', 'Mémo', `
    <header class="entete-vue"><p class="surtitre">Toutes les fiches du chapitre</p><h1>Mémo</h1>
    <p class="chapeau">Les connaissances et les méthodes à garder sous la main, réunies au même endroit.</p>
    <div class="sommaire-local">${[...chapitre.memo.connaissances, ...chapitre.memo.methodes].map(id => `<button type="button" data-ancre="${V('fiche-' + id)}">${esc(fiches[id].titre)}</button>`).join('')}</div></header>
    <section><h2 class="titre-section">Connaissances</h2>${chapitre.memo.connaissances.map(id => memoFiche(id, 'connaissance')).join('')}</section>
    <section><h2 class="titre-section">Méthodes</h2>${chapitre.memo.methodes.map(id => memoFiche(id, 'methode')).join('')}</section>`);

  const resume = p => {
    const debut = p.corps.split('\n').find(l => l.trim() && !/^[!:|#`-]/.test(l.trim())) || '';
    const t = debut.replace(/\$([^$]*)\$/g, (_, m) => m.replace(/\\text\{([^}]*)\}/g, '$1').replace(/[_\\{}]/g, '')).replace(/\*\*/g, '');
    return esc(t.slice(0, 150)) + (t.length > 150 ? '…' : '');
  };
  vue('entrainement', 'entrainement', "Je m'entraîne", `
    <header class="entete-vue"><p class="surtitre">Exercices et problèmes</p><h1>Je m'entraîne</h1>
    <p class="chapeau">Les exercices reprennent une compétence à la fois. Les problèmes mélangent tout le chapitre, du niveau 1 au niveau 3.</p></header>
    <section><h2 class="titre-section">Problèmes</h2><div class="cartes-pb">${chapitre.problemes.map(id => {
      const p = fiches[id];
      return lien(id, `<span class="carte-pb-tete">${niveauPb(p.niveau || 1)}${p.outil ? `<span class="outil">${esc(p.outil)}</span>` : ''}</span><span class="carte-pb-titre">${esc(p.titre)}</span><span class="carte-pb-resume">${resume(p)}</span>`, 'carte-pb');
    }).join('')}</div></section>
    ${(chapitre.programmes || []).length ? `<section><h2 class="titre-section">${ic('code')}Je programme</h2>${chapitre.programmes.map(id => `
      <article class="exercice programme" id="${V('ex-' + id)}"><header><span class="puce puce-exercice">${ic('code')}Python</span><h3>${esc(fiches[id].titre)}</h3></header>
      ${html(id)}${fiches[id].basthon && !fiches[id].corps.includes('::: ouvrir') ? carteLien(fiches[id].basthon) : ''}</article>`).join('')}</section>` : ''}
    <section><h2 class="titre-section">Exercices</h2>${tousExercices.map(x => carteExercice(x, true)).join('')}</section>`);
  chapitre.problemes.forEach(id => {
    const p = fiches[id];
    vue(id, 'entrainement', p.titre, `
      <header class="entete-vue">${lien('entrainement', `${ic('gauche')}Je m'entraîne`, 'retour')}
      <p class="surtitre">Problème</p><h1>${esc(p.titre)}</h1>
      <div class="meta-pb">${niveauPb(p.niveau || 1)}${p.outil ? `<span class="outil">${esc(p.outil)}</span>` : ''}</div></header>
      <section class="bloc bloc-probleme">${html(id)}</section>
      ${p.video ? `<section class="plus-loin"><h2 class="titre-section">Pour aller plus loin</h2><div class="videos">${video({ video: p.video, titre: p.video_titre, image: p.video_image })}</div></section>` : ''}`);
  });

  vue('evaluation', 'evaluation', "Je m'évalue", `
    <header class="entete-vue"><p class="surtitre">Sujets d'évaluation</p><h1>Je m'évalue</h1>
    <p class="chapeau">Pour faire le point sur tout le chapitre.</p></header>
    <div class="cartes-pb">${chapitre.evaluations.map(id => lien(id, `<span class="carte-pb-tete"><span class="puce puce-evaluation">${ic('evaluation')}Évaluation</span></span><span class="carte-pb-titre">${esc(fiches[id].titre)}</span><span class="carte-pb-resume">${fiches[id].grille ? 'Sujet organisé par compétences, avec sa grille.' : resume(fiches[id])}</span>`, 'carte-pb carte-eval')).join('')}</div>`);
  chapitre.evaluations.forEach(id => vue(id, 'evaluation', fiches[id].titre, `
    <header class="entete-vue">${lien('evaluation', `${ic('gauche')}Je m'évalue`, 'retour')}<p class="surtitre">Évaluation</p><h1>${esc(fiches[id].titre)}</h1></header>
    <section class="bloc bloc-evaluation">${html(id)}</section>`));

  ctx.sansCopie = true;
  const grilles = [...new Set([chapitre.enseignant?.grille, ...chapitre.evaluations.map(id => fiches[id].grille)].filter(Boolean))];
  const grillesHtml = grilles.map(g => {
    if (fiches[g].fichier) ctx.fichiers.add(fiches[g].fichier);
    return `<section class="bloc-prof"><h2 class="titre-section">${esc(fiches[g].titre)}</h2>${rendre(md, fiches[g].corps)}
      ${fiches[g].fichier ? (CIBLE === 'forge' ? `<a class="bouton" href="${esc(prefixe + fiches[g].fichier)}" download>${ic('fichier')}Télécharger la grille (.docx)</a>` : '<p class="note">La version .docx sera téléchargeable sur le site en ligne.</p>') : ''}</section>`;
  }).join('');
  ctx.sansCopie = false;
  vue('enseignant', 'enseignant', 'Espace enseignant', `
    <header class="entete-vue"><p class="surtitre">${esc(nomNiveau)} · ${esc(chapitre.titre)}</p><h1>Espace enseignant</h1>
    <p class="chapeau">${esc(chapitre.objectif)}</p></header>
    <section class="bloc-prof"><h2 class="titre-section">Le chapitre en un coup d'œil</h2>
      <div class="tableau"><div class="tableau-defile"><table class="synthese">
        <thead><tr><th>Étape</th><th>Activité</th><th>À retenir</th><th>Exercices</th><th>Plus loin</th></tr></thead>
        <tbody>
          <tr><td>${lien('preparation', '0 · Je me prépare')}</td><td>${chapitre.preparation.map(p => esc(p.titre || fiches[p.fiche].titre)).join('<br>')}</td><td>—</td><td>—</td><td>—</td></tr>
          ${etapes.map((e, n) => `<tr><td>${lien(e.id, `${n + 1} · ${esc(e.titre)}`)}</td><td>${(e.activites || [e.activite]).filter(Boolean).map(a => esc(fiches[a].titre)).join('<br>') || '—'}</td><td>${[].concat(e.retenir || []).map(r => esc(fiches[r].titre)).join('<br>') || '—'}</td><td>${(e.exercices || []).map(x => esc(fiches[x].titre)).join('<br>') || '—'}</td><td>${(e.plus_loin || []).map(v => esc(v.titre)).join('<br>') || '—'}</td></tr>`).join('')}
        </tbody></table></div></div>
      <p class="note">Problèmes : ${chapitre.problemes.map(id => `${esc(fiches[id].titre)} (niveau ${fiches[id].niveau})`).join(', ')}. Évaluations : ${chapitre.evaluations.map(id => esc(fiches[id].titre)).join(', ')}.${(chapitre.programmes || []).length ? ` Programmes : ${chapitre.programmes.map(id => esc(fiches[id].titre)).join(', ')}.` : ''}</p>
    </section>
    <section class="bloc-prof"><h2 class="titre-section">En classe</h2>
      <ul class="liste-prof">
        <li><strong>QR code :</strong> le bouton ${ic('qr', 'inline')} en haut de chaque page affiche un QR code en grand. Les élèves qui le scannent arrivent directement sur la page projetée.</li>
        <li><strong>Projection :</strong> le bouton ${ic('texte', 'inline')} agrandit le texte et les formules, en trois tailles.</li>
        <li><strong>Progression :</strong> chaque élève coche « J'ai terminé cette étape ». C'est mémorisé dans son navigateur uniquement : aucun compte, aucune donnée collectée.</li>
      </ul>
    </section>
    ${grillesHtml}
    ${(chapitre.enseignant?.a_completer || []).length ? `<section class="bloc-prof"><h2 class="titre-section">À vérifier ou compléter</h2><ul class="liste-prof">${chapitre.enseignant.a_completer.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>` : ''}`);

  return { chapitre, code, vues, ctx, nomNiveau, slug, niveau, etapes, V };
}

// ---------- Boîte à outils (contenu/outils) ----------
const MOTIFS_OUTILS = { numworks: 'affine', tableur: 'amortissement', geogebra: 'cube', python: 'code' };
function construireOutils() {
  const dossier = path.join(CONTENU, 'outils');
  if (!fs.existsSync(path.join(dossier, 'outils.yml'))) return null;
  const carte = yaml.load(lire(path.join(dossier, 'outils.yml')));
  const fiches = {};
  for (const f of fs.readdirSync(dossier)) if (f.endsWith('.md')) fiches[f.slice(0, -3)] = lireFiche(path.join(dossier, f));
  const ctx = {
    dossier, chapitre: { memo: { methodes: [] } }, images: new Set(), fichiers: new Set(), prefixe: 'outils/', cache: {}, sansCopie: false,
    fiche: id => { if (!fiches[id]) throw new Error(`outils : fiche introuvable « ${id} »`); return fiches[id]; },
  };
  const md = creerMd(ctx);
  ctx.html = id => (ctx.cache[id] ??= rendre(md, ctx.fiche(id).corps));
  const vues = [];
  const vue = (id, titreCourt, contenu) => vues.push({ id: `outils-${id}`, parent: `outils-${id}`, titreCourt, contenu, chapitre: 'outils' });
  const nb = p => p.groupes.reduce((s, g) => s + g.fiches.length, 0);
  vue('accueil', 'Boîte à outils', `
    <header class="hero">
      <div class="hero-texte"><p class="surtitre">Tous niveaux · fiches outils</p><h1>${esc(carte.titre)}</h1><p class="hero-objectif">${esc(carte.objectif)}</p></div>
      <div class="hero-nuage" aria-hidden="true">${MOTIFS.code}</div>
    </header>
    <ol class="parcours parcours-outils">${carte.parties.map(p => `<li><a href="#outils-${p.id}" data-go="outils-${p.id}" class="parcours-carte"><span class="parcours-texte"><span class="parcours-titre">${esc(p.titre)}</span><span class="parcours-resume">${esc(p.resume)} · ${nb(p)} fiche${nb(p) > 1 ? 's' : ''}</span></span>${MOTIFS[MOTIFS_OUTILS[p.id]] || ''}</a></li>`).join('')}</ol>`);
  for (const p of carte.parties) {
    const ids = p.groupes.flatMap(g => g.fiches);
    vue(p.id, p.titre, `
    <header class="entete-vue"><p class="surtitre">Boîte à outils</p><h1>${esc(p.titre)}</h1><p class="chapeau">${esc(p.resume)}</p>
      <nav class="sommaire-fiches" aria-label="Fiches">${ids.map(id => `<a href="#outils-${p.id}" data-ancre="outils-fiche-${id}">${esc(fiches[id].titre)}</a>`).join('')}</nav></header>
    ${p.groupes.map(g => `<section>${g.titre ? `<h2 class="titre-section">${esc(g.titre)}</h2>` : ''}${g.fiches.map(id => `
      <article class="fiche fiche-methode" id="outils-fiche-${id}"><div class="bloc-tete"><span class="puce puce-methode">${ic('methode')}Fiche outil</span><h3>${esc(fiches[id].titre)}</h3></div>
      ${ctx.html(id)}</article>`).join('')}</section>`).join('')}`);
  }
  return { carte, vues, ctx, fiches, code: 'outils', niveau: 'outils', slug: 'outils' };
}

const texteBrut = h => h.replace(/<math[\s\S]*?<\/math>/g, m => (m.match(/<annotation[^>]*>([\s\S]*?)<\/annotation>/) || [, ''])[1])
  .replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

// ---------- Page ----------
function page(chapitres, outils) {
  const css = lire(path.join(RACINE, 'gabarit', 'style.css'));
  const js = lire(path.join(RACINE, 'gabarit', 'app.js'));
  const navLien = (id, contenu, cls = '') => `<a href="#${id}" data-go="${id}" class="nav-lien ${cls}">${contenu}</a>`;
  const menus = chapitres.map(({ chapitre, code, etapes, V, nomNiveau }) => `
  <div class="menu-chapitre" data-chapitre="${code}">
    <p class="menu-titre">${esc(nomNiveau)}<strong>${esc(chapitre.titre)}</strong></p>
    ${navLien(V('accueil'), `${ic('maison')}<span>Accueil du chapitre</span>`)}
    <p class="menu-groupe">Le parcours</p>
    ${navLien(V('preparation'), `<span class="nav-num">0</span><span>Je me prépare</span><span class="nav-etat" data-etat="${V('preparation')}">${ic('coche')}</span>`)}
    ${etapes.map((e, n) => navLien(V(e.id), `<span class="nav-num">${n + 1}</span><span>${esc(e.titre)}</span><span class="nav-etat" data-etat="${V(e.id)}">${ic('coche')}</span>`)).join('')}
    <p class="menu-groupe">Pour réviser et s'entraîner</p>
    ${navLien(V('memo'), `${ic('memo')}<span>Mémo</span>`)}
    ${navLien(V('entrainement'), `${ic('exercice')}<span>Je m'entraîne</span>`)}
    ${navLien(V('evaluation'), `${ic('evaluation')}<span>Je m'évalue</span>`)}
    <p class="menu-groupe">Enseignants</p>
    ${navLien(V('enseignant'), `${ic('prof')}<span>Espace enseignant</span>`)}
  </div>`).join('') + (outils ? `
  <div class="menu-chapitre" data-chapitre="outils">
    <p class="menu-titre">Tous niveaux<strong>${esc(outils.carte.titre)}</strong></p>
    ${navLien('outils-accueil', `${ic('maison')}<span>Accueil de la boîte à outils</span>`)}
    <p class="menu-groupe">Les outils</p>
    ${outils.carte.parties.map(p => navLien(`outils-${p.id}`, `${ic('methode')}<span>${esc(p.titre)}</span>`)).join('')}
  </div>` : '');
  const parNiveau = Object.entries(NIVEAUX).map(([cle, nom]) => [cle, nom, chapitres.filter(c => c.chapitre.niveau === cle)]);
  const accueil = {
    id: 'manuels', parent: 'manuels', titreCourt: 'Les manuels', chapitre: '', contenu: `
    <header class="hero hero-site">
      <div class="hero-texte"><p class="surtitre">Lycée professionnel · mathématiques</p><h1>Les manuels de maths pro</h1>
      <p class="hero-objectif">Seconde, Première et Terminale bac pro. Chaque chapitre est un parcours en étapes : une activité, ce qu'il faut retenir, des exercices.</p></div>
      <div class="hero-nuage" aria-hidden="true">${MOTIFS.exponentiel}</div>
    </header>
    ${outils ? `<a class="carte-outils" href="#outils-accueil" data-go="outils-accueil"><span class="lc-motif">${MOTIFS.code}</span><span><strong>${esc(outils.carte.titre)}</strong><span>${outils.carte.parties.map(p => esc(p.titre)).join(' · ')}</span></span>${ic('droite')}</a>` : ''}
    <div class="manuels">${parNiveau.map(([, nom, cs]) => `
      <section class="manuel"><h2>${nom}</h2>${cs.length ? `<ul class="liste-chapitres">${cs.map(c => `<li><a href="#${c.V('accueil')}" data-go="${c.V('accueil')}"><span class="lc-motif">${MOTIFS[c.chapitre.motif] || ''}</span><span><strong>${esc(c.chapitre.titre)}</strong><span>${c.etapes.length} étapes · ${grp(c.chapitre.groupements)}</span></span></a></li>`).join('')}</ul>` : '<p class="note">Chapitres à venir.</p>'}</section>`).join('')}</div>` };
  const vues = [accueil, ...(outils ? outils.vues : []), ...chapitres.flatMap(c => c.vues)];
  const index = vues.map(v => {
    const c = chapitres.find(x => x.code === v.chapitre);
    return { id: v.id, t: v.titreCourt, c: c ? c.chapitre.titre : v.chapitre === 'outils' ? outils.carte.titre : '', x: texteBrut(v.contenu) };
  });
  const infos = Object.fromEntries(chapitres.map(c => [c.code, { titre: c.chapitre.titre, niveau: c.chapitre.niveau }]));
  if (outils) infos.outils = { titre: outils.carte.titre, niveau: '' };
  const doc = `<title>Maths pro</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Manuels de mathématiques pour le lycée professionnel, en parcours d'étapes.">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Math&display=swap">
<style>${css}</style>
<a class="evitement" href="#contenu">Aller au contenu</a>
<header class="barre">
  <button class="icone-bouton bouton-menu" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu">${ic('menu')}</button>
  <a class="marque" href="#manuels" data-go="manuels"><span class="marque-logo" aria-hidden="true">${MOTIFS.affine}</span><span class="marque-texte"><span class="marque-niveau" id="marque-niveau">Maths pro</span><span class="marque-chapitre" id="marque-chapitre">Les manuels</span></span></a>
  <div class="barre-outils">
    <button class="icone-bouton" type="button" data-ouvre="recherche" aria-label="Rechercher">${ic('chercher')}</button>
    <button class="icone-bouton" type="button" data-ouvre="qr" aria-label="Afficher le QR code de cette page">${ic('qr')}</button>
    <button class="icone-bouton" type="button" id="taille" aria-label="Agrandir le texte">${ic('texte')}</button>
    <button class="icone-bouton" type="button" id="theme" aria-label="Changer de thème">${ic('theme')}</button>
  </div>
</header>
<div class="cadre">
  <nav class="menu" id="menu" aria-label="Navigation">
    ${menus}
    <div class="menu-site">
      <p class="menu-groupe">Les manuels</p>
      ${navLien('manuels', `${ic('livres')}<span>Tous les chapitres</span>`)}
      ${outils ? navLien('outils-accueil', `${ic('methode')}<span>${esc(outils.carte.titre)}</span>`) : ''}
      <div class="menu-autres">${chapitres.map(c => navLien(c.V('accueil'), `<span class="nav-niveau">${esc(c.chapitre.niveau)}</span><span>${esc(c.chapitre.titre)}</span>`, 'nav-autre')).join('')}</div>
    </div>
  </nav>
  <div class="voile" hidden></div>
  <main id="contenu" tabindex="-1">
    ${vues.map(v => `<div class="vue" id="vue-${v.id}" data-vue="${v.id}" data-parent="${v.parent}" data-chapitre="${v.chapitre}" data-titre="${esc(v.titreCourt)}"${v.id === 'manuels' ? '' : ' hidden'}>${v.contenu}</div>`).join('\n')}
    <footer class="pied"><p>Manuels de mathématiques pour le lycée professionnel · ressource libre et gratuite.</p></footer>
  </main>
</div>
<div class="calque" id="calque-recherche" role="dialog" aria-modal="true" aria-label="Rechercher dans les manuels" hidden>
  <div class="calque-boite">
    <div class="recherche-champ">${ic('chercher')}<input id="champ-recherche" type="search" placeholder="Chercher : R², arbre, indépendants…" autocomplete="off"><button class="icone-bouton" type="button" data-ferme aria-label="Fermer">${ic('fermer')}</button></div>
    <ul class="resultats" id="resultats"></ul>
  </div>
</div>
<div class="calque" id="calque-qr" role="dialog" aria-modal="true" aria-label="QR code de la page" hidden>
  <div class="calque-boite calque-qr">
    <button class="icone-bouton fermer-coin" type="button" data-ferme aria-label="Fermer">${ic('fermer')}</button>
    <p class="qr-titre" id="qr-titre"></p>
    <div class="qr-image" id="qr-image"></div>
    <p class="qr-lien" id="qr-lien"></p>
  </div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
<script>window.MANUEL=${JSON.stringify({ cle: 'maths-pro', url: URL_PUBLIQUE, index, chapitres: infos, niveaux: NIVEAUX })};</script>
<script>${js}</script>`;
  if (CIBLE === 'artifact') return doc;
  return `<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${doc.replace('<a class="evitement"', '</head>\n<body>\n<a class="evitement"')}\n</body>\n</html>\n`;
}

// « groupement B » au singulier, « groupements A, B et C » au pluriel
const grp = g => `${/[, ]et |,/.test(String(g)) ? 'groupements' : 'groupement'} ${esc(g)}`;
// ---------- Construction ----------
fs.rmSync(SORTIE, { recursive: true, force: true });
fs.mkdirSync(SORTIE, { recursive: true });
// Réglages : site.yml (manuels publiés ou cachés). --tout affiche tout, pour relire.
const REGLAGES = fs.existsSync(path.join(RACINE, 'site.yml')) ? yaml.load(lire(path.join(RACINE, 'site.yml'))) || {} : {};
const oui = v => v === undefined || v === true || /^(oui|true|yes)$/i.test(String(v));
const publie = c => args.tout || (oui((REGLAGES.publie || {})[c.chapitre.niveau]) && oui(c.chapitre.publie));
const chapitres = [], masques = [];
for (const niveau of fs.readdirSync(CONTENU).sort()) {
  if (niveau === 'outils' || !fs.statSync(path.join(CONTENU, niveau)).isDirectory()) continue;
  for (const slug of fs.readdirSync(path.join(CONTENU, niveau)).sort()) {
    if (!fs.existsSync(path.join(CONTENU, niveau, slug, 'chapitre.yml'))) continue;
    const c = construireChapitre(niveau, slug);
    if (publie(c)) chapitres.push(c); else masques.push(`${c.chapitre.niveau} · ${c.chapitre.titre}`);
  }
}
const outils = args.tout || oui(REGLAGES.boite_a_outils) ? construireOutils() : null;
// Ordre des chapitres : clé « ordre » du chapitre.yml, sinon ordre alphabétique du dossier.
chapitres.sort((a, b) => a.niveau.localeCompare(b.niveau) || (a.chapitre.ordre ?? 99) - (b.chapitre.ordre ?? 99) || a.slug.localeCompare(b.slug));
fs.writeFileSync(path.join(SORTIE, 'index.html'), page(chapitres, outils));
const publies = [];
for (const c of [...(outils ? [outils] : []), ...chapitres]) {
  for (const f of [...c.ctx.images, ...(CIBLE === 'forge' ? c.ctx.fichiers : [])]) {
    const dest = path.join(SORTIE, c.ctx.prefixe, f);
    if (!fs.existsSync(path.join(c.ctx.dossier, f))) { console.warn(`  ⚠ fichier manquant : ${c.slug}/${f}`); continue; }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(c.ctx.dossier, f), dest);
    publies.push(path.join(c.ctx.prefixe, f));
  }
  console.log(`${c.niveau}/${c.slug} [${c.code}] : ${c.vues.length} vues, ${c.ctx.images.size} images, ${c.ctx.fichiers.size} fichiers`);
}
if (masques.length) console.log(`Cachés (site.yml) : ${masques.join(' ; ')}`);
fs.writeFileSync(path.join(SORTIE, 'fichiers-publies.json'), JSON.stringify(publies, null, 1));
