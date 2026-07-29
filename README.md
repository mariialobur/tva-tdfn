# Entraînement au décompte TVA — méthode TDFN v6

Projet pédagogique indépendant conçu par Mariia Lobur.

## Hypothèse du parcours

Sauf indication contraire, chaque entreprise est déjà assujettie à la TVA et a reçu une confirmation écrite de l’AFC autorisant la méthode TDFN ainsi que le ou les TDFN indiqués.

Dans les cas signalés comme simplifiés, la qualification fiscale ou un montant complexe est fourni comme hypothèse. L’exercice porte alors sur son traitement et son report dans le décompte.

## Positionnement

Cet outil est un **entraînement fondé sur le prototype public AFC**. Il ne reproduit pas le service AFC en production, ne confirme pas l’autorisation d’un TDFN et ne transmet aucune déclaration.

La version 6 propose:

- **13 cas guidés**;
- **1 atelier libre** utilisant uniquement des activités et TDFN déjà confirmés dans le courrier ou le profil AFC de l’entreprise;
- une vue compacte inspirée du prototype AFC;
- des contrôles arithmétiques et structurels.

## Logique du décompte

1. saisir les contre-prestations au ch. 200;
2. détailler les déductions des ch. 220 à 280;
3. obtenir les totaux ch. 289 et 299;
4. ventiler les contre-prestations brutes TTC par activité dans la fenêtre **Calcul TDFN**;
5. reporter le résultat agrégé au ch. 323;
6. contrôler la concordance ch. 379 = ch. 299;
7. déterminer ch. 383, 399, 479 et le solde ch. 500 ou 510;
8. déclarer séparément les mouvements de fonds aux ch. 900 et 910.

## Améliorations v6

- interface resserrée à une largeur de travail maximale de 1180 px;
- sélection des cas par modules dans un menu unique, avec navigation précédent/suivant;
- dossier latéral raccourci et références regroupées dans un bloc repliable;
- barre d’actions proche de la zone de travail;
- étape «Comprendre» réduite à trois contrôles essentiels;
- atelier libre reformulé comme reproduction d’un paramétrage déjà confirmé par l’AFC;
- résultat libre renommé **Cohérence arithmétique vérifiée**;
- cas de changement de méthode identifié comme comparaison de deux décomptes distincts;
- ch. 410 explicitement limité au premier décompte sous méthode effective;
- calcul TDFN sans arrondi intermédiaire: les montants bruts sont additionnés, puis le total affiché est arrondi à CHF 0.01;
- les autres options d’arrondi restent désactivées faute d’algorithme public documenté.

## Structure

- `index.html` — interface;
- `styles.css` — design responsive et impression;
- `data.js` — cas et registre des sources;
- `logic.js` — calculs et contrôles indépendants de l’interface;
- `app.js` — interactions, progression et atelier libre;
- `tests/run-tests.mjs` — tests des scénarios corrects;
- `tests/error-cases.mjs` — tests des incohérences;
- `AUDIT.md` — décisions métier et limites;
- `lien-vers-tdfn.html` — bloc à intégrer au parcours méthode effective.

## Tests

```bash
node --check data.js
node --check logic.js
node --check app.js
node tests/run-tests.mjs
node tests/error-cases.mjs
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`.

## Publication GitHub Pages

Déposer le contenu de ce dossier à la racine du dépôt `tva-tdfn`, puis activer GitHub Pages depuis la branche principale et le dossier `/(root)`.

## Limites

- l’atelier libre suppose que les activités et TDFN sont déjà confirmés par l’AFC;
- le contrôle libre vérifie la cohérence arithmétique et structurelle, pas la qualification juridique;
- l’algorithme de production des options d’arrondi du Portail AFC n’est pas reproduit;
- les rubriques disponibles peuvent dépendre du profil, de la période et des opérations déclarées;
- les sources ont été consultées le 29.07.2026 et doivent être revérifiées lors d’une future mise à jour.
