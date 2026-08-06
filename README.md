# Entraînement au décompte TVA suisse — méthode TDFN

Simulateur pédagogique interactif consacré au décompte TVA suisse selon la méthode des taux de la dette fiscale nette (TDFN).

Le projet propose **35 cas progressifs** répartis en huit modules:

1. fondamentaux TDFN;
2. activités multiples, plusieurs TDFN et seuil de 10 %;
3. opérations internationales;
4. admissibilité et maintien de la méthode;
5. passage de la méthode effective aux TDFN — ch. 415;
6. passage des TDFN à la méthode effective — ch. 410;
7. rubriques et procédures particulières;
8. atelier libre.

## Positionnement

Cet outil est un projet pédagogique indépendant, sans affiliation à l’Administration fédérale des contributions (AFC). Il ne transmet aucune donnée et ne remplace ni «Décompte TVA pro», ni l’analyse fiscale d’un dossier réel.

Les cas utilisent des hypothèses explicites et renvoient aux sources officielles applicables, notamment la LTVA, l’OTVA, l’Info TVA 12, les listes de TDFN et les prototypes de décompte de l’AFC.

## Architecture intégrée

La version actuelle n’utilise plus de fichiers correctifs successifs. Les responsabilités sont séparées ainsi:

- `data.js` — cas, sources et tableaux de transition;
- `logic.js` — calculs et contrôles du décompte;
- `store.js` — état unique, sauvegarde locale et migrations;
- `components.js` — composants d’interface;
- `transition.js` — tableaux ch. 410 et ch. 415;
- `app.js` — navigation, rendu et interactions;
- `styles.css` — feuille de style unique;
- `index.html` — structure de la page.

La progression est enregistrée uniquement dans le navigateur sous la clé `tva_tdfn_v100_state`.

## Utilisation locale

Aucune compilation n’est nécessaire. Un serveur HTTP local suffit:

```bash
python3 -m http.server 4173
```

Puis ouvrir `http://127.0.0.1:4173/`.

## Contrôles qualité

```bash
npm install
npm run test:smoke
npm run test:unit
npm run test:e2e
```

Le workflow `.github/workflows/quality.yml` exécute les contrôles statiques, les tests unitaires et les tests Playwright sur GitHub Actions.

## Publication

Le site public est destiné à GitHub Pages:

`https://mariialobur.github.io/tva-tdfn/`

Dernière révision juridique et pédagogique indiquée dans l’interface: **06.08.2026**.
