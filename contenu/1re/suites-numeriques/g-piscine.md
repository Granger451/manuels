---
titre: "Évaporation de l'eau dans une piscine"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJxlj90KwjAMhe8LeYfQ3ShO8fdGEF9g7zDqDBpp19m1-vq2c0OnuQk5fDk5ybDgS024AvGwOhgquWbPSuMBj6lAZD2yBtFSYF1WLhL3QP_IBkRDzlPZKFfebHAfZPCPyvgQiB5cJmhw2oJ4XlnTex33IDBWT3ZtljIn8ccX5zjO8G27iwEd134iC4UNtxVHsSV0ZBrNHlXw1qjuO0N1mvFkg8czybw7m6NMrV3IKYgXHGJffw"
---

Une piscine rectangulaire contient au départ 50 000 litres d’eau. Chaque jour, une partie de cette eau – environ 400 litres – s’évapore sous l’effet du soleil.

Pour protéger la pompe de filtration, on ne doit jamais laisser le volume d’eau descendre en dessous de 30 000 litres. Lorsqu’on atteint ou franchit ce seuil, un système automatique rétablit immédiatement le niveau d’eau initial.

1. **Modélisation**

   On s'intéresse au volume d’eau restant dans la piscine au fil des jours.
   Pourquoi peut-on modéliser cette situation à l’aide d’une suite arithmétique ? Indiquer la raison et préciser l’expression du terme général de la suite.

2. **Compléter le programme**

   On dispose d'un programme Python partiellement complété. Il simule la baisse du volume d’eau jour après jour et affiche au bout de combien de jours le seuil critique est atteint (avant le déclenchement du remplissage automatique).

   ::: ouvrir https://console.basthon.fr/?script=eJxlj90KwjAMhe8LeYfQ3ShO8fdGEF9g7zDqDBpp19m1-vq2c0OnuQk5fDk5ybDgS024AvGwOhgquWbPSuMBj6lAZD2yBtFSYF1WLhL3QP_IBkRDzlPZKFfebHAfZPCPyvgQiB5cJmhw2oJ4XlnTex33IDBWT3ZtljIn8ccX5zjO8G27iwEd134iC4UNtxVHsSV0ZBrNHlXw1qjuO0N1mvFkg8czybw7m6NMrV3IKYgXHGJffw
   :::

   Compléter les lignes 1 à 5 pour que le programme fonctionne correctement.

3. **Variante**

   Vous disposez maintenant d’une autre piscine contenant initialement 40 000 litres. Elle perd cette fois 300 litres par jour. Le seuil critique est fixé à 25 000 litres.

   À l’aide du même programme adapté, déterminer au bout de combien de jours cette seconde piscine atteindra le seuil critique.

```python
# Ligne 1
volume_initial = ?????
# Ligne 2
seuil_critique = ?????
# Ligne 3
perte_par_jour = ?????

volume = volume_initial
jour = 0

# Ligne 4
while ????? :
    jour = jour + 1
    volume = volume - perte_par_jour

# Ligne 5
print("La piscine se remplit automatiquement au bout de", jour, "jours.")
```
