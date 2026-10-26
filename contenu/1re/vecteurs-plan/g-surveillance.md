---
titre: "Surveillance dans un parc industriel"
type: "programme"
basthon: "https://console.basthon.fr/?script=eNqNkMFqhDAQhu95isFe4pYu6HHLHtb2WHrsXXSkgibZSQwJ4rv02H0OX6yjXUuhUPYQwpD5_m8mbW80OehL9y7EHTxpTbVWar6ghZqP0a1yFk6ADgoRMjhC0-nSyVaZwcnkFwAB6uEb4P4DJGkq4r9A_AuE_EZDsRnyGw0bwFu-YeVwIKjni-nKCntcJiiED5zFEzxAyISPXMSliJkwxBGySV4Q_BU-FYDWcagcfZjgEUYfpzRZBa-aelzUW7OsW-tKVWEq1Pp2XL98b8_kpA-7XQ734CPf6Y_r-YoA8SZdhzB_gCmp0gO1xN5xTTrs82aCfv50hJbtX7rwmqk"
---

Romane est agent de sécurité dans un parc industriel. Chaque jour, elle effectue une ronde de contrôle entre différents points du site, représentés dans un repère orthogonal. Aujourd’hui, elle doit se rendre du poste de sécurité situé au point $A(3 ; 4)$ à un local technique situé au point $B(90 ; 90)$, où une alarme s’est déclenchée.

Selon les consignes internes, si la distance à parcourir dépasse 100 mètres, l’agent doit utiliser un véhicule pour intervenir rapidement. En dessous de cette distance, il peut se déplacer à pied.

::: problematique
Romane doit-elle se déplacer à pied ou prendre un véhicule ?
:::

![](images/surveillance-dans-un-parc-44.webp)

1. Pour quelle raison Romane doit-elle se rendre au point $B$ ?

2. Quand est-il recommandé à Romane de se déplacer à pied ?

3. Calculer les coordonnées du vecteur $\overrightarrow{AB}$. À quoi correspond ce vecteur ?

4. Ouvrir la console Basthon et exécuter le programme Python.

   ::: ouvrir https://console.basthon.fr/?script=eNqNkMFqhDAQhu95isFe4pYu6HHLHtb2WHrsXXSkgibZSQwJ4rv02H0OX6yjXUuhUPYQwpD5_m8mbW80OehL9y7EHTxpTbVWar6ghZqP0a1yFk6ADgoRMjhC0-nSyVaZwcnkFwAB6uEb4P4DJGkq4r9A_AuE_EZDsRnyGw0bwFu-YeVwIKjni-nKCntcJiiED5zFEzxAyISPXMSliJkwxBGySV4Q_BU-FYDWcagcfZjgEUYfpzRZBa-aelzUW7OsW-tKVWEq1Pp2XL98b8_kpA-7XQ734CPf6Y_r-YoA8SZdhzB_gCmp0gO1xN5xTTrs82aCfv50hJbtX7rwmqk
   :::

   1. Décrire en quelques lignes le but du programme.
   2. Quelles sont les coordonnées du vecteur $\overrightarrow{AB}$ ?
   3. Quelle est la norme du vecteur $\overrightarrow{AB}$ ?

5. En déduire la distance parcourue par Romane pour arriver au point $B$.

6. Répondre à la problématique.

```python
import math

# Coordonnées des points A et B
x1 = float(input("Coordonnée x du point A : "))
y1 = float(input("Coordonnée y du point A : "))
x2 = float(input("Coordonnée x du point B : "))
y2 = float(input("Coordonnée y du point B : "))

# Vecteur déplacement AB
vx = x2 - x1
vy = y2 - y1
print(f"Le vecteur AB est : ({vx} ; {vy})")

# Norme du vecteur (distance)
norme = math.sqrt(vx**2 + vy**2)
print(f"Distance réelle à parcourir : {norme:.2f} mètres")
```
