---
titre: "Drone médical face au vent — aide"
type: "aide"
---

**Questions 6 et 9 :** dans le plan rapporté à un repère orthogonal, on considère deux points $A$ et $B$ de coordonnées $A (x_A;y_A)$ et $B(x_B;y_B)$.

**Définition :** la norme du vecteur $\overrightarrow{AB}$ notée $\left\|\overrightarrow{AB}\right\|$ est la longueur du segment $[AB]$.

**Formule :** connaissant les coordonnées des points $A$ et $B$, on calcule la norme du vecteur $\overrightarrow{AB}$ en appliquant la relation : $\left\|\overrightarrow{AB}\right\| = \sqrt {(x_B- x_A)^2+ (y_B-y_A)^2}$.

**Question 8 :** le vent pousse le drone et modifie sa trajectoire. On veut trouver à quelle vitesse le programmer pour qu’il arrive exactement au point $B$, malgré le vent.

Commencer par analyser à quoi correspond chaque vecteur :

- $\overrightarrow{VR}$ : la vitesse à programmer pour le drone ;
- $\overrightarrow{AC}$ : la vitesse du vent (c'est une force qui s'ajoute au mouvement du drone) ;
- $\overrightarrow{AB}$ : la vitesse souhaitée, qui permettrait d’atteindre la cible sans vent.

Analyser ensuite le problème posé : quelle est la somme des deux vecteurs qui donne la vitesse réelle au départ du point $A$ (vitesse du vent compris) ?

Le drone doit aller de $A$ vers $B$, donc sa vitesse réelle doit être le vecteur $\overrightarrow{AB}$.

Poser l'équation qui permettra de corriger la trajectoire, puis la résoudre.
