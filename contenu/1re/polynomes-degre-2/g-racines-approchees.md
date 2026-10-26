---
titre: "Valeurs approchées"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJxdUEFuwyAQvFvyH1bKoQ6xLYxyasKtL-g1ymFtQ4JEARGnJU_KvT_wxwq2K7ldCaHdmZ0Z2LyNT6mMGpQ10AvQCNKabmqd1Q8zfn-IBPTi4scnsDzrhQRZhO1rnkEsL4a7N1DRuiGBEFYxEqp9HYmQZ5t30V2FjycK3MBjp0y8HXpoUeMDL5O4flFmEP4TtRZwwkN7jsKz07JSYNmWDm-c1rT5tQ4clwwziZ_Oc_91VVEoHHm7MFPJhqfYqwFLg11UXQ1VfFxDJDtSsD7tcLrSmMy4t3fTF6Fk23_IHKNG50Qk-BUc-GT058sW-g_IwGqW"
---

Le programme en Python suivant parcourt un intervalle $[a;b]$ défini par l'utilisateur par pas de $0{,}01$ pour détecter les points où la fonction change de signe ou s'annule, ce qui permet de repérer les racines approximatives d’un polynôme du second degré.

1. Ouvrir et exécuter le programme.

   ::: coup-de-pouce x-balayage
   :::

   ::: ouvrir https://console.basthon.fr/?script=eJxdUEFuwyAQvFvyH1bKoQ6xLYxyasKtL-g1ymFtQ4JEARGnJU_KvT_wxwq2K7ldCaHdmZ0Z2LyNT6mMGpQ10AvQCNKabmqd1Q8zfn-IBPTi4scnsDzrhQRZhO1rnkEsL4a7N1DRuiGBEFYxEqp9HYmQZ5t30V2FjycK3MBjp0y8HXpoUeMDL5O4flFmEP4TtRZwwkN7jsKz07JSYNmWDm-c1rT5tQ4clwwziZ_Oc_91VVEoHHm7MFPJhqfYqwFLg11UXQ1VfFxDJDtSsD7tcLrSmMy4t3fTF6Fk23_IHKNG50Qk-BUc-GT058sW-g_IwGqW
   :::

2. Utiliser la fonction **racines(a,b)** avec les bons paramètres pour déterminer les valeurs approchées des racines du polynôme défini par $f(x)=-0{,}1x^2-2x-4{,}2$ (celui du programme) sur l'intervalle $[-20\,;20]$.

3. Modifier la fonction $f$ et utiliser le programme pour déterminer les valeurs approchées des racines du polynôme défini par :

   1. $f(x)=0{,}6x^2+0{,}5x-2{,}1$ sur l'intervalle $[-5\,;5]$.

   2. $f(x)=-0{,}3x^2+1{,}8x-1$ sur l'intervalle $[0\,;8]$.

   3. $f(x)=1{,}6x^2-1{,}4x+2{,}2$ sur l'intervalle $[-10\,;8]$.

```python
#Définition de la fonction polynôme de degré 2
def f(x):
    return -0.1*x**2-2*x-4.2
 
#Recherche des racines par balayage de l'intervalle [a;b]   
def racines(a,b,pas=0.01):
    x=a
    racines=[]
    while x<=b:
        f1=f(x)
        f2=f(x+pas)
        if f1*f2<0 or f1==0:
            r=round(x,2)
            racines.append(r)
        x=x+pas
    return racines
```
