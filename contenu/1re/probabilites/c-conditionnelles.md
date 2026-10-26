---
titre: "Probabilités conditionnelles"
type: "connaissance"
---

**Définition :** on considère deux événements $A$ et $B$. La probabilité que l'événement $B$ se réalise sachant que l'événement $A$ est réalisé se note $p_{A}(B)$ et se lit « p de B sachant A ».

**Formule :** pour calculer une probabilité conditionnelle, on utilise la relation : $p_{A}(B) = \frac{p(A\cap B)}{p(A)}$ si $p(A) \neq 0$.

**Exemple :** on tire une carte au hasard dans un jeu de 52 cartes. Quelle est la probabilité que ce soit un roi, sachant que c’est une carte rouge ?

On considère les deux événements suivants.

- L'événement $A$ : « *La carte est rouge.* »
- L'événement $B$ : « *La carte est un roi.* »

Il y a 26 cartes rouges, donc la probabilité que la carte tirée soit rouge est : $p(A)=\frac{26}{52}=\frac{1}{2}=0{,}5$.

Il y a deux rois rouges (le roi de cœur et le roi de carreau), donc la probabilité que la carte tirée soit un roi rouge est $p(A\cap B)= \frac{2}{52}=\frac{1}{26}\approx0{,}038$.

La probabilité de tirer un roi sachant que c'est une carte rouge est : $p_{A}(B) = \frac{p(A\cap B)}{p(A)}=\frac{\frac{1}{26}}{\frac{1}{2}}=\frac{2}{26}=\frac{1}{13}\approx0{,}077$.
