---
titre: "Prime de fin de contrat"
type: "programme"
basthon: "https://console.basthon.fr/?script=eJx1UEFqwzAQvBv8h8FQarfGhEJyMORkegj0D0bYaxDIayOvIDTkP3W_4Y9VsZKGFiIhFmZnZ7TTUodGmcYZsnWjRi3KpFUOycFZGUfw54A9KrxA_OMAVbUMnrk2XnEIoCVxlm-9OIqjyhM6MyhJNY9O0uSdxdInDOHqBc1atK8pMcjZYcpQIsmyOJLHw6LcEe2zZllmu3wLFLOjINIuc6N7ZXLQkfrRs3f59slrbYrNbvurzh7x8_-1FVpnl5l8wWhUQz2xrLrewuP378XRdYW607xG8TDHC3m0F7cu-bivHiJUo12-Jpz4fLMATYKWcPpjUBZv3TlEVCSrZLg_C8uOJQ"
---

La rentrée approche et Louise vient de terminer son job d’été. À la fin de son contrat, elle a gagné une prime de 1 400 € qu’elle souhaite placer temporairement. Elle choisit un compte à intérêt simple au taux annuel de 6,2 %. Le placement est prévu pour 3 ans.

::: problematique
De quelle somme d'argent disposera-t-elle au bout de 3 ans ?
:::

1. Quelle est la valeur du capital initial ?

2.
   1. Quel est le taux d'intérêt pour le placement de cette somme ?
   2. Convertir cette valeur en nombre décimal.

3. Quelle est la durée de placement ?

4. En langage Python, **def** est un mot-clé qui sert à définir une fonction. Une fonction est définie avec des paramètres, que l'on appelle aussi les arguments, que la fonction utilise pour réaliser une tâche.

   Observer le programme ci-dessous (il est aussi recopié en bas de la fiche) et donner le nom et les arguments de la fonction.

   ::: coup-de-pouce x-fonction-python
   :::

   ::: ouvrir https://console.basthon.fr/?script=eJx1UEFqwzAQvBv8h8FQarfGhEJyMORkegj0D0bYaxDIayOvIDTkP3W_4Y9VsZKGFiIhFmZnZ7TTUodGmcYZsnWjRi3KpFUOycFZGUfw54A9KrxA_OMAVbUMnrk2XnEIoCVxlm-9OIqjyhM6MyhJNY9O0uSdxdInDOHqBc1atK8pMcjZYcpQIsmyOJLHw6LcEe2zZllmu3wLFLOjINIuc6N7ZXLQkfrRs3f59slrbYrNbvurzh7x8_-1FVpnl5l8wWhUQz2xrLrewuP378XRdYW607xG8TDHC3m0F7cu-bivHiJUo12-Jpz4fLMATYKWcPpjUBZv3TlEVCSrZLg_C8uOJQ
   :::

5. Quelle est la nature de la variable $C$ ? De la variable $t$ ? De la variable $n$ ?

6. Exécuter le programme pour calculer la valeur acquise par Louise au bout de 3 ans.

7. Répondre à la problématique.

```python
def calculer_capital(C, t, n):
    I = C * t * n
    C_total = C + I
    return C_total

C = float(input("Entrez le capital initial (en euros) : "))
t = float(input("Entrez le taux d'intérêt annuel (en décimal, exemple 6,5% = 0.065) : "))
n = int(input("Entrez la durée du placement (en années) : "))

capital_final = calculer_capital(C, t, n)

print(f"Le capital total après {n} années est de {capital_final:.2f} euros.")
```
