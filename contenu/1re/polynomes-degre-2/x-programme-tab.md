---
titre: "Comprendre le programme"
type: "aide"
---

On considère la fonction $f$ définie par $f(x)=5x^2-2x+1$.

Dans le programme Python de la console Basthon :

- On définit la fonction $f()$ (au sens mathématique), à un paramètre $x$ qui renvoie la valeur de $f(x)$.

**Exemple :** après exécution, si on tape **f(0)** le programme calcule $5\times 0^2-2 \times 0+1$ et renvoie la valeur **1**.

- On définit la fonction **tab()** à 3 paramètres (**début**, **fin** et **pas**) qui calcule chacune des valeurs de la fonction $f$ en attribuant à $x$ les valeurs allant de « **début** » jusqu'à « **fin** » par pas de « **pas** ».

**Exemple :** si on tape **tab(0,3,1)**, le programme affiche les valeurs de **f(0)**, **f(1)**, **f(2)**, et **f(3)**.

```python
def f(x):
    y=5*x**2-2*x+1
    return(y)

def tab(debut,fin,pas):
    for n in range(debut,fin+1,pas):
        print("f(",n,")=",f(n))
```
