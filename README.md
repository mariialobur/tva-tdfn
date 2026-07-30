# Entraînement au décompte TVA — méthode TDFN v6.3

Projet pédagogique indépendant conçu par Mariia Lobur.

## Positionnement

Cet outil aide à comprendre et à contrôler un décompte TVA suisse selon la méthode des taux de la dette fiscale nette. Il ne reproduit pas le Portail AFC, ne détermine pas le TDFN applicable à une activité, ne confirme pas une autorisation et ne transmet aucune déclaration.

Chaque exercice suppose, sauf indication contraire, que l’entreprise est déjà assujettie et que l’AFC a confirmé par écrit la méthode TDFN ainsi que les taux utilisés dans le cas.

## Contenu de la version 6.3

- **16 cas guidés ou quiz de qualification**;
- **1 atelier libre** pour reproduire un décompte déjà paramétré par l’AFC;
- un **contrôle préalable avant le décompte** en 10 points, mémorisé localement;
- des cas dédiés aux **ch. 205**, **ch. 235** et au **solde en faveur ch. 510**;
- une vue guidée compacte et une vue complète inspirée du prototype AFC;
- des contrôles de concordance, de report et de cohérence arithmétique;
- une information actuelle sur la transmission par **«Décompte TVA pro»** dans le Portail AFC.

## Logique du parcours

1. identifier le mode de décompte: contre-prestations convenues ou reçues;
2. contrôler la qualification des opérations et les justificatifs;
3. saisir les contre-prestations au ch. 200;
4. renseigner, le cas échéant, le ch. 205 et les déductions des ch. 220 à 280;
5. obtenir les ch. 289 et 299;
6. ventiler les contre-prestations brutes TTC par activité et TDFN confirmé;
7. reporter le résultat au ch. 323;
8. vérifier la concordance ch. 379 = ch. 299;
9. contrôler les ch. 383, 399, 479 et le solde au ch. 500 ou 510;
10. déclarer séparément les mouvements de fonds aux ch. 900 et 910.

## Principales corrections techniques

- état local isolé sous la version `v63`, afin de ne pas réutiliser des résultats obsolètes;
- aperçu bloqué lorsque le calcul reporté n’est plus à jour ou que les concordances échouent;
- arrondi final appliqué au montant positif du ch. 500 sans modifier un solde en faveur au ch. 510;
- ch. 205 disponible dans le décompte compact lorsqu’il est utile;
- navigation étendue aux cas A à Q;
- registre des sources complété avec la page AFC relative à la transmission en ligne.

## Structure

- `index.html` — interface et métadonnées;
- `styles.css` et `ui-fixes.css` — design responsive;
- `data.js` — cas et registre des sources;
- `logic.js` — calculs et contrôles;
- `app.js` — interactions, progression, checklist et atelier libre;
- `ui-fixes.js` — compléments UX;
- `preview.png` — visuel Open Graph;
- `run-tests.mjs` — scénarios corrects;
- `error-cases.mjs` — scénarios incohérents;
- `AUDIT.md` — décisions métier et limites;
- `INSTALLATION-RU.md` — procédure de mise à jour.

## Tests

```bash
node --check data.js
node --check logic.js
node --check app.js
node --check ui-fixes.js
node run-tests.mjs
node error-cases.mjs
python3 -m http.server 8000
```

Ouvrir ensuite `http://localhost:8000`.

## Publication GitHub Pages

Déposer tous les fichiers du paquet à la racine du dépôt `tva-tdfn`, en remplaçant les versions existantes. GitHub Pages doit publier la branche principale depuis `/(root)`.

Les ressources utilisent le paramètre de cache `v=6.3.0`. Lors d’une future modification de ces fichiers, augmenter ce numéro, par exemple vers `v=6.3.1`.

## Sources principales

- AFC — TDFN et taux forfaitaires;
- LTVA et OTVA sur Fedlex;
- ordonnance AFC sur la valeur des TDFN;
- Info TVA 12 — TDFN;
- prototype de décompte TVA TDFN;
- AFC — Décompter la TVA en ligne.

Les URL exactes sont accessibles dans le registre «Sources officielles» du simulateur.

## Limites

- l’outil ne valide pas la qualification juridique d’une opération;
- l’atelier libre suppose que les activités et TDFN ont déjà été confirmés par l’AFC;
- le droit à une déduction, une correction ou une procédure particulière doit être documenté séparément;
- l’algorithme de production des options d’arrondi du Portail AFC n’est pas reproduit;
- les rubriques disponibles peuvent dépendre du profil et de la période;
- le contenu a été vérifié selon le droit et les publications en vigueur au **30.07.2026**; les projets futurs ne sont pas intégrés.
