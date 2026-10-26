---
titre: "Générateur de suite avec Python"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJx9UrFOw0AM3SPlH57aoSmtUBlgqOgEYurAxIIQOhqntUguwedjQfwLa_mN_hhOkxYQEpfhdLbf8_NzhriVei2uqghNHQWuKHi1IUFJAR6NUMUkAUpSWSQfRU8IkZXghHVT7bbKL5HSJKeiSzx2CdrHMzeFTOHH8zSBnQ66wP0DMMSSg_aNg9ar575v16wDFLWAwR7i_JqyI1F79nVG5jCxmhNIy3lTSxVLwvyY7ofo3xNk7HNeUQtwHGo__mbcyzt1TUM-z_b1fVJIo_gunyZpMsQ1Vc7nveJXV1I0m3YfKEdRueTg1CJp4kzA2SxNxO7zNPF2XXQEd7utcNEKM5_MawpqVgRWLtKEC4tcLjDrx22EvWaDpRXW1ZMQcjrupGbF7lOFDvCBiaYyUI8d4sqVK_NEQPpjw-4wTjdgiKU6NX3_bPGnmMLUBLz5979_CR3JYf4q5oNfyEOvcWtE-30BiXfK_Q"
---

1. Exécuter le code de la console et décrire brièvement ce qu'il affiche.

   ::: ouvrir https://console.basthon.fr/?script=eJx9UrFOw0AM3SPlH57aoSmtUBlgqOgEYurAxIIQOhqntUguwedjQfwLa_mN_hhOkxYQEpfhdLbf8_NzhriVei2uqghNHQWuKHi1IUFJAR6NUMUkAUpSWSQfRU8IkZXghHVT7bbKL5HSJKeiSzx2CdrHMzeFTOHH8zSBnQ66wP0DMMSSg_aNg9ar575v16wDFLWAwR7i_JqyI1F79nVG5jCxmhNIy3lTSxVLwvyY7ofo3xNk7HNeUQtwHGo__mbcyzt1TUM-z_b1fVJIo_gunyZpMsQ1Vc7nveJXV1I0m3YfKEdRueTg1CJp4kzA2SxNxO7zNPF2XXQEd7utcNEKM5_MawpqVgRWLtKEC4tcLjDrx22EvWaDpRXW1ZMQcjrupGbF7lOFDvCBiaYyUI8d4sqVK_NEQPpjw-4wTjdgiKU6NX3_bPGnmMLUBLz5979_CR3JYf4q5oNfyEOvcWtE-30BiXfK_Q
   :::

2. Transformer le code pour qu'il affiche les 10 premiers termes de la suite arithmétique définie par $u_{n+1}=u_n +6$ et $u_0 = 4$.

3. Transformer le code pour qu'il affiche aussi la somme des termes affichés.

```python
# Programme pour afficher les n premiers termes d'une suite arithmétique
def suite_arithmetique(a, r, n):
    suite = []  # Liste pour stocker les termes
    for i in range(n):
        terme = a + i * r  # Formule : terme = premier terme + (indice * raison)
        suite.append(terme)
    return suite

# Demander les valeurs à l'utilisateur
a = 10
r = 5
n = 6

# Vérifier que n est positif
if n <= 0:
    print("Le nombre de termes doit être positif")
else:
    # Calculer et afficher la suite
    resultat = suite_arithmetique(a, r, n)
    print(f"Les {n} premiers termes de la suite sont :")
    print(resultat)
```
