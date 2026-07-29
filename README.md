# Entraînement au décompte TVA — méthode TDFN v6.2

Projet pédagogique indépendant conçu par Mariia Lobur.

## Hypothèse du parcours

Sauf indication contraire, chaque entreprise est déjà assujettie à la TVA et a reçu une confirmation écrite de l’AFC autorisant la méthode TDFN ainsi que le ou les TDFN indiqués.

Les cas précisent désormais le **mode de décompte** retenu: contre-prestations convenues ou reçues. Dans les situations signalées comme simplifiées, la qualification fiscale ou un montant complexe est fourni comme hypothèse; l’exercice porte alors sur son traitement et son report.

## Positionnement

Cet outil est un **entraînement fondé sur le prototype public AFC**. Il ne reproduit pas le service AFC en production, ne confirme pas l’autorisation d’un TDFN et ne transmet aucune déclaration.

La version 6.1 propose:

- **13 cas guidés**;
- **1 atelier libre** utilisant uniquement des activités et TDFN déjà confirmés dans le courrier ou le profil AFC de l’entreprise;
- un parcours guidé compact;
- une vue complète séparée, inspirée du prototype AFC;
- des contrôles arithmétiques et structurels.

## Logique du décompte

1. déterminer le mode de décompte du dossier: contre-prestations convenues ou reçues;
2. saisir les contre-prestations au ch. 200;
3. détailler les déductions des ch. 220 à 280;
4. obtenir les totaux ch. 289 et 299;
5. ventiler les contre-prestations brutes TTC par activité dans la fenêtre **Calcul TDFN**;
6. reporter le résultat agrégé au ch. 323;
7. contrôler la concordance ch. 379 = ch. 299;
8. déterminer ch. 383, 399, 479 et le solde ch. 500 ou 510;
9. déclarer séparément les mouvements de fonds aux ch. 900 et 910.

## Améliorations v6.2

- mode de décompte visible dans le dossier;
- cas B corrigé: le total TTC n’est plus donné avant l’exercice;
- en-tête et rappel TDFN raccourcis;
- hypothèses du parcours placées dans un bloc repliable;
- progression affichée par module plutôt que sur les 13 cas;
- stepper placé avant le contenu de l’étape;
- une seule action principale, adaptée à l’étape en cours;
- solution, bilan et réinitialisation regroupés dans un menu secondaire;
- dossier latéral automatiquement masqué pendant le calcul et le décompte, avec possibilité de le rouvrir;
- décompte guidé limité aux rubriques utiles au cas;
- formulaire complet conservé dans la vue séparée **Prototype AFC**;
- disparition de la barre horizontale de la déclaration dans le parcours guidé;
- affichage mobile du calcul TDFN sous forme de cartes;
- cache-busting des fichiers CSS et JavaScript (`v=6.2.0`).


## Correction UX v6.2

- le dossier reste visible par défaut pendant l’étape **Calcul TDFN** sur ordinateur;
- un bloc **Rappel du dossier** est affiché directement au-dessus des champs de saisie;
- les montants, taux et hypothèses utiles restent accessibles sur mobile;
- chaque activité indique clairement si le montant doit être reporté, reconstruit ou limité à la part imposable;
- l’étape de calcul ne dépend plus de la mémoire de l’utilisateur ni d’un retour manuel à l’étape précédente.

## Structure

- `index.html` — interface;
- `styles.css` — design responsive et impression;
- `data.js` — cas et registre des sources;
- `logic.js` — calculs et contrôles indépendants de l’interface;
- `app.js` — interactions, progression et atelier libre;
- `preview.png` — visuel Open Graph;
- `run-tests.mjs` — tests des scénarios corrects;
- `error-cases.mjs` — tests des incohérences;
- `AUDIT.md` — décisions métier et limites;
- `lien-vers-tdfn.html` — bloc à intégrer au parcours méthode effective.

## Tests

```bash
node --check data.js
node --check logic.js
node --check app.js
node run-tests.mjs
node error-cases.mjs
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`.

## Publication GitHub Pages

Déposer le contenu de ce dossier à la racine du dépôt `tva-tdfn`, puis activer GitHub Pages depuis la branche principale et le dossier `/(root)`.

Les fichiers portent un paramètre de version dans `index.html`. Lors d’une future mise à jour, remplacer par exemple `v=6.2.0` par `v=6.2.0` afin d’éviter l’affichage d’anciens fichiers depuis le cache du navigateur.

## Sources principales

- AFC — formulaires TVA: https://www.estv.admin.ch/fr/formulaires-tva
- AFC — TDFN et taux forfaitaires: https://www.estv.admin.ch/fr/tva-taux-de-la-dette-fiscale-nette-et-taux-forfaitaires
- Prototype de décompte TVA TDFN: https://www.estv2.admin.ch/mwst/formulare/mwst-form-abr-muster-sss-fr.pdf

## Limites

- l’atelier libre suppose que les activités et TDFN sont déjà confirmés par l’AFC;
- le contrôle libre vérifie la cohérence arithmétique et structurelle, pas la qualification juridique;
- l’algorithme de production des options d’arrondi du Portail AFC n’est pas reproduit;
- les rubriques disponibles peuvent dépendre du profil, de la période et des opérations déclarées;
- les sources ont été consultées le 29.07.2026 et doivent être revérifiées lors d’une future mise à jour.
