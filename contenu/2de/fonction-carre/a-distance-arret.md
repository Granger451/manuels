---
titre: "Distance d'arrêt selon différents facteurs"
type: "activite"
lien: "https://www.geogebra.org/classic/mfcj2ypu"
---

La distance d’arrêt $D_A$ d'une voiture dépend de deux composantes :

- la distance de réaction $D_R$, qui est influencée par l'état du conducteur (santé, fatigue, taux d'alcoolémie, etc.) ;
- la distance de freinage $D_F$, qui est liée à la vitesse, à l’adhérence de la route, à la masse et à l’état du véhicule.

Distance totale d’arrêt = distance de réaction + distance de freinage

::: problematique
Un conducteur roule sur une nationale où la vitesse est limitée à 90 km/h. Sachant que les conditions météorologiques sont favorables et que le conducteur se trouve dans un état optimal, quelle distance lui sera nécessaire pour s'arrêter ?
:::

### Partie A — Représentation graphique de la distance de réaction en fonction de la vitesse

Dans le fichier GeoGebra ci-dessous sont tracées :

- la fonction $f_1$ : distance de réaction $D_R$ (en m) pour un état « normal » du conducteur, en fonction de la vitesse $v$ (en m/s) de la voiture ;
- la fonction $f_2$ : distance de réaction $D_R$ (en m) pour un état « fatigué » du conducteur, en fonction de la vitesse $v$ (en m/s) de la voiture.

::: ouvrir https://www.geogebra.org/classic/mfcj2ypu
:::

1. Quelle est la nature de ces deux fonctions ?
2. Combien vaut le coefficient directeur dans chacun des cas ?

### Partie B — Représentation graphique de la distance de freinage en fonction de la vitesse

1. Dans le fichier GeoGebra de la partie A :

   - créer un curseur $a$ et un curseur $b$ de type « nombre », variant chacun entre $-1{,}5$ et $1{,}5$ avec un pas de 0,01 ;
   - créer la fonction $g_1(x)=ax^2$ ;
   - créer la fonction $g_2(x)=bx^2$.

   ::: remarque Aide
   [Créer un curseur dans GeoGebra](#outils-geogebra/o-gg-curseur)
   :::

2. Faire varier $a$ et choisir les bonnes réponses.

   1. La valeur du curseur est positive ; la fonction est croissante puis décroissante.
   2. La valeur du curseur est positive ; la fonction est décroissante puis croissante.
   3. La valeur du curseur est négative ; la fonction est croissante puis décroissante.
   4. La valeur du curseur est négative ; la fonction est décroissante puis croissante.

3. Faire varier $b$. Que remarque-t-on sur les valeurs des images ?
4. Conclusion : si on note la fonction sous la forme $f(x)=kx^2$, que peut-on dire de la courbe représentative de la fonction selon la valeur de $k$ ?
5. Fixer $a=0{,}07$ (route sèche) et $b=0{,}08$ (route mouillée).

   1. Déterminer graphiquement la distance de freinage d'une voiture roulant à 90 km/h sur une route sèche.
   2. Déterminer graphiquement la distance de freinage d'une voiture roulant à 90 km/h sur une route mouillée.

### Partie C — Représentation graphique de la distance d'arrêt en fonction de la vitesse

On rappelle que $D_A=D_R+D_F$.

1. Tracer la représentation graphique de la fonction $h_1$ définie par $h_1(x)=f_1(x)+g_1(x)$.
2. En déduire graphiquement la distance d'arrêt d'un conducteur dans un état normal, roulant sur une route sèche à 90 km/h. Répondre à la problématique.
