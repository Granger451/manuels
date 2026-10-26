---
titre: "Affichage conditionnel"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJxlkU1OwzAQhfeWfIdRuyAVomrprqILEBt2SJzAJJ7UkuOkjgNGwB5uQs_Rm3ASZuyQTSMl8rz5eZ8n6NsGGhX2YJqu9QH6gw9SSDGH-9MRjTPBtA4q3dM7RMDWlaz0UlQaAYu42EoB9HgdBu9SfxHhEtYLHsNF9VlRzA6Pyqvm9BM8Tx_gWVn1pmotRYQdrKToVM-H5bUURELHTe570oOx0LWDh5JQTHU6eu3hMOgEBL_fX8lUij5V8ozVOvfejSZ0HbAXxgXtX5S1ZPq6N1ZDhJsdkNsIjIyCaRaHNYf1FFYGkfMRrijFBqzO4cH1GcmUhlwUoin3bEq4Vdqo05bL_xtupwrGUtOac77zxFngjM3f43a5xk_4yFclAUnZJKUelXpUZiNm_tJP2QGtVIo_U_2Pxw"
---

On considère deux fonctions définies par :

- $f(x) = \sqrt{x + 1}$
- $g(x)=x$

::: problematique
Pour chaque valeur de $x$ de 0 à 3 (par pas de 0,2), laquelle des deux fonctions est au-dessus de l’autre ?
:::

1. Compléter le programme avec des instructions conditionnelles **if** et **else** pour afficher la relation entre $f(x)$ et $g(x)$ (par exemple : $f(x) > g(x)$).

   ::: ouvrir https://console.basthon.fr/?script=eJxlkU1OwzAQhfeWfIdRuyAVomrprqILEBt2SJzAJJ7UkuOkjgNGwB5uQs_Rm3ASZuyQTSMl8rz5eZ8n6NsGGhX2YJqu9QH6gw9SSDGH-9MRjTPBtA4q3dM7RMDWlaz0UlQaAYu42EoB9HgdBu9SfxHhEtYLHsNF9VlRzA6Pyqvm9BM8Tx_gWVn1pmotRYQdrKToVM-H5bUURELHTe570oOx0LWDh5JQTHU6eu3hMOgEBL_fX8lUij5V8ozVOvfejSZ0HbAXxgXtX5S1ZPq6N1ZDhJsdkNsIjIyCaRaHNYf1FFYGkfMRrijFBqzO4cH1GcmUhlwUoin3bEq4Vdqo05bL_xtupwrGUtOac77zxFngjM3f43a5xk_4yFclAUnZJKUelXpUZiNm_tJP2QGtVIo_U_2Pxw
   :::

2. À quel moment les deux fonctions sont-elles les plus proches ?

   ::: coup-de-pouce x-affichage
   :::

```python
from math import sqrt

# Définition des deux fonctions
def f(x):
    return sqrt(x + 1)

def g(x):
    return x

# Paramètres du balayage
x = 0
pas = 0.2
fin = 3

# Seuil pour considérer que f(x) ≈ g(x)
seuil = 0.01

# Balayage de l'intervalle
while x <= fin:
    fx = f(x)
    gx = g(x)
    diff = fx - gx

    # Insérer ici l'affichage conditionnel

    # Affichage de la fonction
    print(f"x = {x:.1f} | f(x) = {fx:.3f} | g(x) = {gx:.3f} ")
    
    x += pas
```
