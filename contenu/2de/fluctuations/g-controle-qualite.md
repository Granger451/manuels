---
titre: "Contrôle qualité"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJx9UUFOwzAQvPsVo3AgEVWUHnqp6LFXDvAA5CYbsJTYZm1XSIgH8A8OzRM45ye8BDukaoVUfPDuzo5Hu2PVW8MeLHVjeiEaauFUHzriR6qfpfaq64zO7QK6WAvEk2XZFB8mGoLGOJyYaAhexpSgYU3gRKgly9qPB6bUbnkcXgLpmmCRV_j--IxJupdFOUnfk94bRUgipt_Nz4xyMONXQs8EyXmYnSPejwPyE92Fuh4PblY8Dp1QctigmsrWMBSUTvs_UX5cMR3VzqaUvyEvcAt76p-p3WywnHAmH1jPsBBX2L5Sb-O8zXWI9ignvYoWrf8xbVlVi8t-VYuV0HH6yBI2bVGuBJMLnZc-lhd_TlhW2udtdvfXnzjM21HhPSt-ANqory0"
---

Melissa est technicienne qualité et travaille dans une chaîne de production, où elle prélève des échantillons afin d'en contrôler la qualité.

Pour savoir si les taux d'objets défaillants qu'elle observe sont normaux, elle crée un programme Python qui simule un échantillon de taille $n$ pour un caractère de fréquence $p$ connue.

::: ouvrir https://console.basthon.fr/?script=eJx9UUFOwzAQvPsVo3AgEVWUHnqp6LFXDvAA5CYbsJTYZm1XSIgH8A8OzRM45ye8BDukaoVUfPDuzo5Hu2PVW8MeLHVjeiEaauFUHzriR6qfpfaq64zO7QK6WAvEk2XZFB8mGoLGOJyYaAhexpSgYU3gRKgly9qPB6bUbnkcXgLpmmCRV_j--IxJupdFOUnfk94bRUgipt_Nz4xyMONXQs8EyXmYnSPejwPyE92Fuh4PblY8Dp1QctigmsrWMBSUTvs_UX5cMR3VzqaUvyEvcAt76p-p3WywnHAmH1jPsBBX2L5Sb-O8zXWI9ignvYoWrf8xbVlVi8t-VYuV0HH6yBI2bVGuBJMLnZc-lhd_TlhW2udtdvfXnzjM21HhPSt-ANqory0
:::

```python
import random

def simuler_echantillon(p, n):
    """
    Simule un échantillon de taille n pour un caractère de fréquence p (0 ≤ p ≤ 1).
    Renvoie le nombre de fois où le caractère est observé (nombre de succès).
    """
    succes = 0
    for i in range(n):
        if random.random() < p:
            succes += 1
    return succes

# Exemple d'utilisation : un échantillon de taille 100, caractère de fréquence 0,5
n = 100
p = 0.5
resultat = simuler_echantillon(p, n)
print(f"Nombre de succès : {resultat}")
```

1. Ouvrir le programme dans la console Basthon et l'exécuter plusieurs fois. Que réalise-t-il ?
2. Dans la ligne de production de Melissa, le taux de défaut est de 2 %. Dans la journée, elle a contrôlé 340 pièces et en a trouvé 8 défectueuses. En modifiant les valeurs de $n$ et $p$, exécuter plusieurs fois le programme et comparer les résultats simulés avec celui de Melissa. Le nombre de pièces défectueuses paraît-il normal ?
3. Afin d'éviter de relancer manuellement son programme plusieurs fois, Melissa souhaite le modifier pour qu'il réalise 15 simulations en une seule exécution, en affichant les résultats. Modifier le code afin de produire ce résultat.
