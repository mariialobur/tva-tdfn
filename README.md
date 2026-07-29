# Entraînement au décompte TVA — méthode TDFN v5

Projet pédagogique indépendant conçu par Mariia Lobur.

## Positionnement

Cet outil est un **entraînement fondé sur le prototype public AFC**. Il ne reproduit pas le service AFC en production, ne confirme pas l’autorisation d’un TDFN et ne transmet aucune déclaration.

La version 5 propose deux parcours complémentaires:

- **13 cas guidés** pour apprendre progressivement les rubriques et contrôles;
- **1 cas libre** pour construire un décompte avec ses propres activités, TDFN et montants.

## Logique du décompte

1. saisir les contre-prestations au ch. 200;
2. détailler les déductions des ch. 220 à 280;
3. obtenir les totaux ch. 289 et 299;
4. ventiler les contre-prestations brutes TTC par activité dans la fenêtre **Calcul TDFN**;
5. reporter le résultat agrégé au ch. 323;
6. contrôler la concordance ch. 379 = ch. 299;
7. déterminer ch. 383, 399, 479 et le solde ch. 500 ou 510;
8. déclarer séparément les mouvements de fonds aux ch. 900 et 910.

## Améliorations v5

- vocabulaire corrigé: **Vue prototype AFC**, sans prétendre reproduire le portail réel;
- barre d’actions mobile fixe et sélecteur de cas par module;
- calcul à 0,01 CHF uniquement en mode **Sans arrondi**;
- options d’arrondi du prototype affichées, mais volontairement non simulées faute d’algorithme public documenté;
- cas F aligné sur trois périodes consécutives 2025–2027, avec effet dès 2028;
- cas ch. 415 enrichi avec contrat, inventaire, affectation, valeurs résiduelles et rapprochement comptable;
- contrôles universels: montants négatifs, déductions excessives, ch. 299, report ch. 323, concordance ch. 379, ch. 383 et solde final;
- architecture du ch. 479 fondée sur la somme des lignes de crédit;
- tolérance de contrôle ramenée au centime;
- atelier libre jusqu’à huit activités.

## Structure

- `index.html` — interface;
- `styles.css` — design responsive et impression;
- `data.js` — cas et registre des sources;
- `logic.js` — calculs et contrôles indépendants de l’interface;
- `app.js` — interactions, progression et cas libre;
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

Déposer le contenu de ce dossier à la racine du dépôt `tva-tdfn`, puis activer GitHub Pages depuis la branche principale et le dossier `/root`.

## Limites

- le TDFN choisi dans le cas libre doit correspondre à une autorisation réelle de l’AFC;
- le contrôle libre vérifie la cohérence arithmétique et structurelle, pas la qualification juridique;
- les rubriques disponibles dans le service AFC peuvent dépendre du profil, de la période et des opérations déclarées;
- les sources ont été consultées le 29.07.2026 et doivent être revérifiées lors d’une future mise à jour.
