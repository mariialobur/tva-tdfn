# Entraînement au décompte TVA suisse — méthode TDFN

Simulateur pédagogique interactif consacré au décompte TVA suisse selon la méthode des taux de la dette fiscale nette (TDFN).

La version 11.0 conserve **35 cas** mais les organise désormais selon une progression pédagogique explicite: d’abord le travail quotidien indispensable, ensuite les changements de méthode plus techniques.

## Parcours pédagogique

### Parcours essentiel

1. **Avant de calculer — admissibilité**: limites, exclusions, maintien de la méthode et distinction avec le décompte annuel.
2. **Comprendre la méthode TDFN**: taux légal, TDFN, bases HT/TTC et dette fiscale.
3. **Plusieurs activités et plusieurs TDFN**: ventilation, règle des 10 %, taux moyen.
4. **Opérations internationales**: exportations, prestations à l’étranger et impôt sur les acquisitions.
5. **Remplir et corriger le décompte**: rubriques particulières, ch. 200/299/323/383, corrections et rectifications.

### Parcours avancé

6. **Méthode effective → TDFN**: admissibilité du changement et corrections de valeur résiduelle au ch. 415.
7. **TDFN → méthode effective**: dégrèvement ultérieur et ch. 410.

### Atelier autonome

8. **Atelier libre**: entraînement sur un dossier déjà paramétré.

Chaque module affiche son niveau, une durée indicative et les compétences à acquérir.

## Positionnement

Cet outil est un projet pédagogique indépendant, sans affiliation à l’Administration fédérale des contributions (AFC). Il ne transmet aucune donnée et ne remplace ni «Décompte TVA pro», ni l’analyse fiscale d’un dossier réel.

Les cas utilisent des hypothèses explicites et renvoient aux sources officielles applicables, notamment la LTVA, l’OTVA, l’Info TVA 12, les listes de TDFN et les prototypes de décompte de l’AFC.

## Architecture

- `data.js` — cas, sources et tableaux de transition;
- `logic.js` — calculs et contrôles du décompte;
- `store.js` — état unique, sauvegarde locale et migrations;
- `components.js` — composants d’interface;
- `transition.js` — tableaux ch. 410 et ch. 415;
- `app.js` — parcours, navigation, rendu et interactions;
- `styles.css` — feuille de style unique;
- `index.html` — structure de la page.

La progression est enregistrée uniquement dans le navigateur sous la clé `tva_tdfn_v100_state`. Une fonction d’export/import JSON permet de conserver une copie locale.

## Utilisation locale

Aucune compilation n’est nécessaire:

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

Le workflow `.github/workflows/quality.yml` exécute les contrôles automatisés sur GitHub Actions.

## Publication

Site public:

`https://mariialobur.github.io/tva-tdfn/`

Dernière révision juridique, pédagogique et UX indiquée dans l’interface: **07.08.2026**.

## Version 11.0

Principales évolutions:

- admissibilité placée avant les calculs;
- séparation claire entre parcours essentiel et avancé;
- correction du module art. 81 OTVA selon les règles en vigueur depuis 2025;
- contrôle explicite des exclusions de l’art. 77 OTVA;
- distinction CHF 5’024’000 TDFN / CHF 5’005’000 décompte annuel;
- explication du taux moyen lorsqu’il y a plusieurs TDFN;
- ch. 415 cadré par la procédure de déclaration correspondante, avec gestion explicite du signe négatif lorsqu’une correction constitue une charge fiscale;
- feedback QCM montrant le choix de l’utilisateur et la réponse attendue;
- contrôles préalables prioritaires avant le checklist complet;
- meilleure lisibilité des petits textes et cibles tactiles renforcées.
