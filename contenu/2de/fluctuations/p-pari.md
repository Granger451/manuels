---
titre: "Pari avec 2 dés"
type: "probleme"
niveau: 2
---

On imagine un jeu de pari très simple. Les joueurs misent chacun sur un nombre. On lance ensuite deux dés et on ajoute les deux valeurs obtenues. Si un des joueurs avait misé sur le résultat obtenu, il emporte la mise. Sinon, on relance les dés.

**Exemple**

Dé n° 1 : 3 ; dé n° 2 : 5 ; résultat : 3 + 5 = 8.

### Partie A — Simulation

Pour réaliser la simulation, ouvrir le fichier ci-dessous dans un tableur.

::: fichier fichiers/lancers-2-des-tableur.xlsx
:::

1. À l'aide de la fonction **=ALEA.ENTRE.BORNES(min;max)**, simuler un lancer de deux dés.

2. Calculer, dans la colonne **E**, la somme des deux dés.

3. À l'aide de la poignée de recopie, étendre la simulation à 5 000 lancers.

4. Dans la simulation, combien de fois observe-t-on le résultat 4 ? Compter de la même manière le nombre de fois où l'on observe les résultats 5, 6, 7, 8, 9 et 10.

5. A-t-on plus de chances d'obtenir 4 que 7 ?

6. Calculer la fréquence de chacun de ces résultats.

### Partie B — Probabilités

On aborde ici le problème avec une autre méthode.

1. Compléter le tableau suivant, qui donne la somme obtenue en fonction des valeurs des deux dés.

   | Dé 1 / Dé 2 | 1 | 2 | 3 | 4 | 5 | 6 |
   |---|---|---|---|---|---|---|
   | 1 | ... | ... | ... | ... | ... | ... |
   | 2 | ... | ... | ... | ... | ... | ... |
   | 3 | ... | ... | ... | ... | ... | ... |
   | 4 | ... | ... | ... | ... | ... | ... |
   | 5 | ... | ... | ... | ... | ... | ... |
   | 6 | ... | ... | ... | ... | ... | ... |

2. Combien d'issues possibles y a-t-il dans cette expérience ?

3. Quelle somme a le plus de chances de sortir ?

4. Calculer la probabilité d'obtenir un 7 dans ce jeu.

5. La comparer avec la fréquence obtenue dans la partie **A**. Les deux valeurs sont-elles éloignées ?
