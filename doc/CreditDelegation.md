# Credit delegation

Le crédit delegation part d'un prêt/borrow classique:
- User A post 100 USDC
- User A reçoit des debt tokens. 
Les debt tokens ne sont pas `transferrable`, donc il utilise la fonction `delegate`
- User A delegate à User B
Dans les prêts, on peut emprunter à taux stable ou à taux variables. Faisons tous les prêts à taux stable pour le moment
- User B emprunte depuis la pool Aave à un taux stable X%
Pour clore le prêt
- User B rembourse le montant (100 x X% x temps emprunt)

***Où trouver le taux de X% ?***
Voici ce qui est fait dans le contrat `LendingPool`
Les taux sont dans la  `reserve`
```
DataTypes.ReserveData storage reserve = _reserves[vars.asset];
currentStableRate = reserve.currentStableBorrowRate;
```

***Qu'est ce que le User A gagne?***
Dans l'exemple ci-dessus, User A n'a rien gagné.
1) Il a bloqué ses tokens et autorisé User B à emprunter à sa place. 
User A aurait pu mettre ses tokens dans le protocole Aave et gagner un certain %. 
2) De plus, User A a pris le risque d'avoir ses USDC liquidé si le User B ne surveille pas le prêt correctement. 


Donc User B doit payer A. 

Pour le point 2), le fait que les users de ces prêts non collatéralisés soient des Dapps, ça réduit le risque. 

Combien User B doit rémunéré User A pour le point 1 ?
Ce qui est difficile, c'est qu'en réalité, on se sait pas combien User A aurait gagné grâce au protocole.

Explication: 
scenario 1 - User A prête des USDC au protocol Aave. Au moment où il prête le taux est de 10%. Après 1 mois, les taux ont monté, ils sont à 20%. User A décide de récupérer ses USDC et aura gagné environ 15% annuel sur ses tokens.
scenario 2 - User A prête des USDC au protocol Aave. Au moment où il prête le taux est de 10%. Après 1 mois, les taux ont baissé, ils sont à 5%. User A décide de récupérer ses USDC et aura gagné environ 7.5% annuel sur ses tokens.

==> à réfléchir, on peut mettre le taux de prêt du protocol au moment où le Credit Delegation a lieu

==> je vais regarder où trouver ce taux

A priori ici
```
DataTypes.ReserveData storage reserve = _reserves[vars.asset];
currentStableRate = reserve.currentLiquidityRate;
```



