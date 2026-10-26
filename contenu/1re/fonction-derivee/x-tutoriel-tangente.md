---
titre: "Tutoriel : suivre le nombre dérivé avec GeoGebra"
type: "aide"
---

1. Créer un curseur pour faire varier $a$.

   - Cliquer sur **« Outils → Curseur »** (ou directement sur l’icône curseur).
   - Créer un curseur nommé $a$, par exemple entre -5 et 5, avec un pas de 0,5.
   - Cela représente l’abscisse du point où l'on veut tracer la tangente.

2. Créer un point M de coordonnées $(a\,;f(a))$ : cela crée un point qui se déplace sur la courbe lorsque l'on bouge le curseur $a$.

3. Tracer la tangente au point M.

   - Dans la fenêtre algèbre, saisir la commande suivante : `t = Tangente(point, fonction)`.
   - Puis saisir : `t = Tangente(M, f)`.
   - La tangente au point M apparaît.

4. Créer une variable $m$ correspondant à la pente de la tangente.

   - Dans la fenêtre algèbre, saisir la commande suivante : `m = Pente(droite)`.
   - Puis saisir : `m = Pente(t)`.

5. Créer un point P de coordonnées $(a\,;m)$ : cela crée un point dont $a$ représente l'abscisse et $m$ le coefficient directeur de la droite tangente en ce point.

6. Lancer la trace du point P.

   - Aller dans les propriétés du point P.
   - Cliquer sur **« Afficher la trace active »**.

7. Faire glisser le curseur $a$ lentement de gauche à droite.
