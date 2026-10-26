---
titre: "Guider un avion dans une zone montagneuse"
type: "probleme"
niveau: 3
---

Un avion de transport régional effectue une mission de ravitaillement dans une région montagneuse isolée. Pour des raisons de sécurité, il doit suivre une trajectoire précise entre deux points GPS. Mais un vent latéral souffle dans la vallée et modifie sa trajectoire réelle.

L’équipe au sol dispose d’un logiciel de simulation pour visualiser les déplacements. Votre rôle est d’aider l’équipe à analyser les effets du vent, proposer une correction et guider le pilote en toute sécurité.

**Données :**

- L’avion décolle du point $A(0;0)$.
- Il doit atteindre le point de ravitaillement $B(6;4)$.
- Le vent souffle selon le vecteur $\vec{w}(1;1)$.
- 1 unité équivaut à 40 km/h.

::: problematique
Quelle vitesse faut-il programmer pour que l’avion arrive au point prévu malgré le vent ?
:::

![](images/guider-un-avion-dans-une-43.webp)

1. Calculer les coordonnées du vecteur $\vec{u}=\overrightarrow{AB}$.

2. Sur un graphique papier ou avec GeoGebra, tracer les vecteurs $\vec{u}$ et $\vec{w}$ en partant du point $A$.

3. Que risque-t-il de se passer si on programme la trajectoire directe $\vec{u}$ sans tenir compte du vent ?

4. Que représente la somme des vecteurs $\vec{u} + \vec{w}$ dans ce contexte ?

5. Calculer les coordonnées de la somme des vecteurs $\vec{u} + \vec{w}$ et tracer le vecteur somme sur le graphique.

6. En déduire les coordonnées du point $C$ où se situera alors l'avion.

7. Calculer la norme $\left\|\vec{u}+\vec{w}\right\|$ et en déduire la vitesse de l'avion pour arriver au point $C$.

   **Rappel :** 1 unité équivaut à 40 km/h.

8. On considère le vecteur $\vec{v}$ comme représentant la vitesse corrigée pour atteindre l'objectif au point $B$.

   1. Résoudre l'équation $\vec{v} + \vec{w} = \vec{u}$ pour déterminer les coordonnées du vecteur $\vec{v}$.
   2. Calculer la norme $\left\|\vec{v}\right\|$.
   3. En déduire la direction et la vitesse corrigées à programmer.

9. Rédiger un bref message oral à transmettre au pilote pour lui expliquer comment corriger sa trajectoire et pourquoi.

10. Répondre à la problématique.
