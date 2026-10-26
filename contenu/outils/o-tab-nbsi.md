---
titre: Compter des cellules avec NB.SI
type: outil
---

**NB.SI** compte le nombre de cellules qui répondent à un critère :

`=NB.SI(où chercher ; quoi chercher)`

**Exemple 1.** Pour compter le nombre de fois où « Londres » apparaît dans les cellules A2 à A5, on écrit **=NB.SI(A2:A5;"Londres")**. Si « Londres » est écrit dans la cellule A4, on peut aussi écrire **=NB.SI(A2:A5;A4)**.

**Exemple 2.** Copier le tableau ci-dessous et le coller dans la cellule **A1** d'une nouvelle feuille.

| Fruit   | Nombre |
|---------|--------|
| Pommes  | 32     |
| Oranges | 54     |
| Pêches  | 75     |
| Pommes  | 86     |

| Formule                  | Résultat                                                         |
|--------------------------|------------------------------------------------------------------|
| `=NB.SI(A2:A5;"pommes")` | Nombre de cellules contenant « pommes » dans A2:A5 (ici 2)       |
| `=NB.SI(A2:A5;A4)`       | Nombre de cellules contenant « Pêches », la valeur de A4 (ici 1) |

::: ouvrir https://support.microsoft.com/fr-fr/office/fonction-nb-si-e0de10c6-f885-4e71-abb4-1f464816df34
:::
