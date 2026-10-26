---
titre: "Représenter graphiquement les fonctions sinus et cosinus"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJxNjDEOwyAQBHsk_kDns4Ui0qTjMY6DnZOAOx1Egd8HulQ72lntKZRM2itHqhGfN-6TDCYmqWbT6pyD_Enc_0qtmo-YC-9HAGcfG6O9O7dq1X3BDG3Q_IFmuz0okvjlkhDyMsQl-IKR5U1fWH8PvSko"
---

Le programme ci-dessous permet d'afficher en vert (green) la courbe représentative de la fonction sinus sur l'intervalle $[0\,;6\pi]$.

1. Cliquer sur **« Afficher la vue graphique »** et exécuter le programme pour afficher la représentation graphique de la fonction sinus.

   ::: ouvrir https://console.basthon.fr/?script=eJxNjDEOwyAQBHsk_kDns4Ui0qTjMY6DnZOAOx1Egd8HulQ72lntKZRM2itHqhGfN-6TDCYmqWbT6pyD_Enc_0qtmo-YC-9HAGcfG6O9O7dq1X3BDG3Q_IFmuz0okvjlkhDyMsQl-IKR5U1fWH8PvSko
   :::

2. Modifier le programme pour qu'il affiche en rouge (red) la courbe représentative de la fonction cosinus.

```python
from matplotlib.pyplot import *
from numpy import *

x=linspace(0,6*pi,100)
y=sin(x)
plot(x,y,color='green')
grid()
show()
```
