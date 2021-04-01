# Protocol L2P

Supposons que sur Aave: 
- pour le DAI, le taux en LEND à l'instant t est 10% et le taux en BORROW est 20%
- pour l' ETH, le taux en LEND à l'instant t est 1% et le taux en BORROW est 11%

## Avantages pour les prêteurs/delegators

Comme on a compris qu'avec le credit delegation on avait pas les aTokens, il faut une autre incentive pour que les pinpins prêtent sur notre plateforme. 
Contrairement à Aave, on peut leur proposer un taux de rémunération fixé à l'avance. Si par exemple, le prêteur de DAI pense que les taux DAI sont haut, il préfèrera venir sur notre plateforme que de prêter sur Aave.
Dans l'exemple ci-dessus, on lui proposerait par exemple la moyenne des deux taux DAI : 15%. 

## Avantages pour les Dapps

Emprunter sans bloquer des tokens en collatéral
Emprunter à un taux moins élevé que sur la plateforme Aave ? 

Dans l'exemple ci-dessus, on lui proposerait par exemple d'emprunter de l'ETH à la moyenne donc 6%+1% (notre marge)

## Questions ouvertes:
- Comment savoir qu'une Dapp se comporte mal sur le protocol ? On a dit que si la Dapp ne repaie pas son prêt non collatéralisé, on la sanctionne en l'empêchant tout autre emprunt sur le protocol. Or, si les prêts n'ont pas de durée, comment savoir que la Dapp se comporte mal ? 
solution possible: 
1) durée de prêt maximum où la Dapp doit rembourser (hard limit pour toutes les Dapp ou par Dapp en mode KYC)
2) total d'intérêt à rembourser maximum (hard limit pour toutes les Dapp ou par Dapp) et on bloque les prêts suivants
