---
titre: "Jeu de casino"
type: "probleme"
niveau: 3
---

Dans un casino, on propose un jeu de roulette un peu spécial, dont voici les règles :

- on tire un premier numéro ;
- on tire un second numéro ;
- on calcule la différence entre le plus grand et le plus petit des deux numéros ;
- si le nombre obtenu est supérieur à 13, on gagne la mise. Sinon, on perd.

**Exemples**

- Si on tire 34 et 7, la différence fait 27. Comme 27 est supérieur à 13, on gagne la partie.
- Si on tire 4 et 12, la différence fait 8. Comme 8 est inférieur à 13, on perd.

::: problematique
Quelle est la probabilité de gagner à ce jeu ?
:::

Pour faciliter la recherche, on pourra s'appuyer sur le fichier tableur ci-dessous.

::: fichier fichiers/jeu-de-casino.xlsx
:::

1. Les numéros de la roulette sont répartis entre 0 et 36. À l'aide de la fonction **=ALEA.ENTRE.BORNES(min;max)**, remplir les cellules **C3** et **D3** afin de simuler les deux tirages d'une partie.

2. À l'aide de la fonction **=ABS()**, afficher en **E3** la différence entre la plus grande valeur des cases **C3:D3** et la plus petite.

   ::: remarque Aide
   **=ABS(A2-A1)** renvoie la différence entre le plus grand et le plus petit des nombres contenus dans **A1** et **A2**.
   :::

3. À l'aide de la poignée de recopie, simuler 5 000 parties.

4. À l'aide de la fonction **=NB.SI(plage;critère)**, compter le nombre de parties gagnées sur les 5 000.

5. En déduire la fréquence observée de parties gagnées.

6. Que peut-on dire de la probabilité de gagner à ce jeu ?

7. Le jeu est-il rentable pour le casino ? Justifier la réponse.
