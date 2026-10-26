---
titre: "Fille ou garçon ?"
type: "evaluation"
---

On prend au hasard une famille ayant deux enfants. On se demande quelle est la probabilité que cette famille ait une fille et un garçon.

Samantha propose la solution suivante. Une famille est composée :

- soit de deux filles ;
- soit de deux garçons ;
- soit d’une fille et d’un garçon.

La probabilité cherchée serait donc de $\dfrac{1}{3}$.

::: problematique
Samantha a-t-elle raison ?
:::

### Partie A — Approche probabiliste

1. Compléter le tableau des issues possibles.

   | Enfant 1 / Enfant 2 | Garçon (G) | Fille (F) |
   |---|---|---|
   | Garçon (G) | G-G | ... |
   | Fille (F) | ... | ... |

2. Calculer la probabilité d'avoir un garçon et une fille.

### Partie B — Approche fréquentiste

Afin de confirmer les résultats de la partie A, on souhaite simuler 1 000 familles de deux enfants à l'aide d'un tableur.

::: fichier fichiers/famille.xlsx
:::

1. Dans le fichier tableur, générer un nombre entier aléatoire égal à 0 ou 1 dans les cellules **C3** et **D3**. Dans la suite de l'exercice, on considérera que 0 correspond à un garçon et 1 à une fille.

2. Afficher en **E3** la somme de **C3** et **D3**.

3. Dans le cas où l'on a 1 garçon et 1 fille, combien doit valoir **E3** ?

4. À l'aide de la poignée de recopie, étendre la simulation à 1 000 familles.

5. À l'aide de la fonction **NB.SI()**, compter les familles ayant 1 garçon et 1 fille.

6. Calculer la fréquence des familles ayant eu 1 garçon et 1 fille.

7. Cette fréquence est-elle en accord avec la probabilité calculée dans la partie A ?

8. Commenter l'affirmation de Samantha.
