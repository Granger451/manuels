---
titre: "Tableaux de valeurs"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJxNyzEKwzAMheHd4DsIT5KjDgl0KeQwDraKFzWoDji3T0op6T8-vpeLgGCnh3dwts_32GOcblPsw_jdrLTNFHfyzrt8-pYWzGXZGktVXtP795aXgUJVsKTPcplh_FefVqvaMAgGVg40BxZUogsc408mkA"
---

1. Exécuter le programme Python dans la console Basthon :

   ::: ouvrir https://console.basthon.fr/?script=eJxNyzEKwzAMheHd4DsIT5KjDgl0KeQwDraKFzWoDji3T0op6T8-vpeLgGCnh3dwts_32GOcblPsw_jdrLTNFHfyzrt8-pYWzGXZGktVXtP795aXgUJVsKTPcplh_FefVqvaMAgGVg40BxZUogsc408mkA
   :::

2. Compléter le tableau de valeurs de la fonction $f$ en utilisant la fonction **tab()** avec les bons paramètres.

   ::: coup-de-pouce x-programme-tab
   :::

   ::: fichier fichiers/tableaux-de-valeurs-question-2.xlsx
   :::

3. Modifier la fonction $f$ dans le programme et utiliser la fonction **tab()** avec les bons paramètres pour compléter les tableaux de valeurs suivants.

   ::: coup-de-pouce x-instructions-python
   :::

   ::: fichier fichiers/tableaux-de-valeurs-question-3.xlsx
   :::

```python
def f(x):
    y=5*x**2-2*x+1
    return(y)

def tab(debut,fin,pas):
    for n in range(debut,fin+1,pas):
        print("f(",n,")=",f(n))
```
