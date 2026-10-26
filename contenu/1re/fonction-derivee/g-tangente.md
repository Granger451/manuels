---
titre: "Équation de la tangente"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJx1UjtuwzAM3Q34DoQ7VHLaDukWwEPRzwW6FgiYhEoEyLIry4HbwAfoUXIOX6y05aD5NJoo8fG9R1I6LwvnIUe_iaM4uoG3wi69LiyURe0AldLLDTkoXVE6ysl6qC3YIl84AsFXzclKM7qq9MKQjKMVKVCFY8p5wAkrZ3EEfLQCC1kG2vq_x_448rWzUHknQk6GHJmKLmEq2dnZw1S1SfD8jrrSBCsCgywdGoijQzRnWuhFy9qL5NV6R9_HSFCikXdQogNqKC8NwQyaNJ3CBB7Thi-JDEIv3V5pq4ciVuvrxn45Gn2OHmmLRhw7kKdeax4Ztwrk-3gc6KrbO73t9nGEbFiZAr24sM3ExKthfRysMbGal07nNL9aRecKoG4FykN9b-wZzbI2oS0cOAe2Ie7zT8NXwDXFEYvxkpIPm_Euu5_PGg8TYXse7Zr_BfGes35uAawSJXanvwJlK1nh7JVlZXtc9_UfZmxXtpCCaOD-HDFwT65yx9EvvZ_xBg"
---

On considère la fonction $f(x) = 3x^2 - 4x + 3$ définie sur $\mathbb{R}$.

1. Déterminer $f'$ la fonction dérivée de $f$.

2. On s'intéresse au point d'abscisse $a = 2$. Calculer $f'(2)$.

3. Ouvrir le programme Python ci-dessous et l'exécuter avec $a = 2$.

   ::: ouvrir https://console.basthon.fr/?script=eJx1UjtuwzAM3Q34DoQ7VHLaDukWwEPRzwW6FgiYhEoEyLIry4HbwAfoUXIOX6y05aD5NJoo8fG9R1I6LwvnIUe_iaM4uoG3wi69LiyURe0AldLLDTkoXVE6ysl6qC3YIl84AsFXzclKM7qq9MKQjKMVKVCFY8p5wAkrZ3EEfLQCC1kG2vq_x_448rWzUHknQk6GHJmKLmEq2dnZw1S1SfD8jrrSBCsCgywdGoijQzRnWuhFy9qL5NV6R9_HSFCikXdQogNqKC8NwQyaNJ3CBB7Thi-JDEIv3V5pq4ciVuvrxn45Gn2OHmmLRhw7kKdeax4Ztwrk-3gc6KrbO73t9nGEbFiZAr24sM3ExKthfRysMbGal07nNL9aRecKoG4FykN9b-wZzbI2oS0cOAe2Ie7zT8NXwDXFEYvxkpIPm_Euu5_PGg8TYXse7Zr_BfGes35uAawSJXanvwJlK1nh7JVlZXtc9_UfZmxXtpCCaOD-HDFwT65yx9EvvZ_xBg
   :::

4. Que permet de calculer ce programme ?

5. Noter l'équation obtenue.

6. Réduire cette expression.

```python
import math

# Fonction pour afficher proprement un nombre (entier si possible)
def format_nombre(n):
    if n == int(n):
        return str(int(n))
    else:
        return f"{n:.2f}"

# Saisie de la fonction
fonction_str = input("Entrez la fonction f(x), par exemple : x**2 + 3*x : ")

# Définition de f(x)
def f(x):
    return eval(fonction_str)

# Saisie du point et du nombre dérivé
a = float(input("Entrez la valeur de a : "))
f_prime_a = float(input("Entrez le nombre dérivé f'(a) : "))

# Calcul de f(a)
f_a = f(a)

# Affichage
print("\n=== Équation de la tangente ===")
print(f"f({format_nombre(a)}) = {format_nombre(f_a)}")
print(f"y = {format_nombre(f_prime_a)} * (x - {format_nombre(a)}) + {format_nombre(f_a)}")
```
