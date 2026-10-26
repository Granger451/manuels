# Manuel de maths pro

Le contenu est dans `contenu/<niveau>/<chapitre>/` (niveaux : `2de`, `1re`, `tle`) :

- `chapitre.yml` : la carte du chapitre (quelle fiche va dans quelle étape, code, ordre, niveau) ;
- un fichier `.md` par fiche (activité, à retenir, méthode, exercice, problème, évaluation, grille) ;
- `images/` et `fichiers/`.

La boîte à outils commune est dans `contenu/outils/` (`outils.yml` + fiches `o-*.md`).

## Conventions dans les fiches

- formules entre `$…$` (LaTeX) ;
- questions en liste numérotée `1.`, sous-questions indentées ;
- `::: problematique`, `::: remarque`, `::: important` ; `::: remarque Appel` pour un appel au professeur ;
- `::: coup-de-pouce m-nuage` (+ une ligne de contexte facultative) pour ouvrir une fiche méthode ou une aide sous la question ;
- `:::: competence Réaliser` … `::::` (quatre deux-points) pour les évaluations par compétences : un `:::` imbriqué (remarque, coup de pouce) ne ferme alors pas le bloc trop tôt ;
- `::: fichier fichiers/donnees.xlsx` pour un fichier à télécharger ;
- `::: video fichiers/tutoriel.mp4` pour une vidéo lue dans la page ;
- `::: ouvrir https://…` pour une carte de lien (GeoGebra, Basthon, LearningApps, YouTube, autre site) ;
- `[texte](#outils-tableur/o-tab-modelisation)` pour un lien vers une autre page du site (ici, une fiche de la boîte à outils).

## Publier ou cacher un manuel

Dans `site.yml` : `oui` ou `non` devant chaque niveau, puis relancer la construction.
Un chapitre seul se cache avec `publie: non` dans son `chapitre.yml`. L'option `--tout` affiche tout, pour relire.

## Mise en ligne

Chaque envoi sur la branche `main` reconstruit le site (`npm run build`) et le publie sur GitHub Pages (`.github/workflows/site.yml`). Pour cacher ou afficher un niveau, modifier `site.yml` puis envoyer la modification.

## Commandes

- `npm run build` : site complet dans `dist/` (pour la Forge) ;
- `npm run apercu` : page unique d'aperçu dans `dist-apercu/`.
