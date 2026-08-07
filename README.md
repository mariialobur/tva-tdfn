# Entraînement TVA suisse — méthode TDFN · v14.0

Simulateur pédagogique en français consacré à la méthode des taux de la dette fiscale nette (TDFN). Il est conçu pour un apprenant qui connaît déjà la théorie TVA de manière générale, mais qui doit transformer cette connaissance en réflexes de travail utilisables en fiduciaire.

## Modèle pédagogique de v14.0

La v14 suit une boucle courte dans chaque cas:

1. **À comprendre** — une seule règle opérationnelle, sans chapitre théorique long.
2. **Exemple guidé** — la règle est appliquée immédiatement sur d’autres chiffres ou une autre situation.
3. **À vous** — l’apprenant traite un nouveau dossier et doit transférer la règle au cas évalué.
4. **Vérification** — le feedback explique l’erreur avant d’afficher les réponses correctes.
5. **Fondement juridique / Pratique AFC** — la règle est reliée à la LTVA/OTVA et, lorsque nécessaire, à la pratique administrative ou à la rubrique du décompte.
6. **Révision sans aide** — lors de la reprise d’un cas non maîtrisé, la théorie est repliée par défaut afin de vérifier que la compétence est devenue autonome.

L’objectif n’est donc ni un examen «à froid», ni un cours à lire avant de pratiquer: **une règle → un exemple → une application → une justification**.

Aucune durée estimée n’est affichée. La progression se mesure uniquement par les cas réellement maîtrisés.

## Contenu

- 37 cas répartis en 10 modules.
- Parcours essentiel, parcours avancé et atelier autonome.
- Admissibilité TDFN, plusieurs activités, règle des 10 %, opérations internationales, rubriques du décompte, corrections, changements de méthode, procédure de déclaration et option.
- Calculateur TDFN et représentation pédagogique du décompte AFC.
- Tableaux spécifiques pour les corrections ch. 410 / ch. 415.
- Checklist professionnelle par dossier.
- Micro-théorie et exemple guidé dédiés à chacun des 37 cas.
- Fondement LTVA/OTVA dédié à chacun des 37 cas.
- Références de pratique AFC séparées de la base légale.
- Sauvegarde locale, export/import de progression et mode de révision des erreurs.

## Principes UX

- **Un seul canvas de travail**: le contenu principal ressemble à une feuille d’exercice, pas à un tableau de bord.
- **Action dans le flux de travail**: le CTA principal est placé sous l’exercice sur desktop et dans la barre mobile prévue à cet effet; il n’est plus dans le menu latéral.
- **Numérotation pédagogique**: l’utilisateur voit `1.1`, `1.2`, `2.1`…; les identifiants techniques `J1`, `A`, `K5` restent internes.
- **Progressive disclosure**: dossier complet, checklist et ressources secondaires restent disponibles sans occuper la zone de résolution.
- **Une colonne pour les QCM**: les réponses juridiques longues restent faciles à comparer et à lire.
- **Scaffolding progressif**: théorie + exemple visibles lors de l’apprentissage initial, puis repliés par défaut dans la révision.
- **Mastery plutôt que vitesse**: pas de minuterie, de badges ou de score ludique; l’état distingue `maîtrisé`, `à corriger`, `solution consultée` et `à faire`.

## Fondement juridique et pratique AFC

Le fichier `legal-basis.js` associe chaque cas à une ou plusieurs références LTVA/OTVA. Les liens Fedlex ouvrent la page avec l’ancre de l’article concerné lorsqu’elle est disponible.

Le fichier `pedagogy.js` associe séparément les cas à leur pratique AFC: Info TVA 12, pages AFC thématiques ou prototype du décompte. Cette distinction est volontaire:

- **Fondement juridique** = LTVA / OTVA;
- **Pratique AFC** = interprétation et application administrative;
- **Rubrique du décompte** = emplacement pratique dans le formulaire AFC.

Pour les changements de méthode, les références de pratique renvoient notamment aux ch. 2.2.2–2.2.3, 3.2.2–3.2.3 et 4.1 de l’Info TVA 12 actualisée.

## Architecture

- `index.html` — structure du simulateur et dialogues.
- `styles.css` — design system, canvas de travail et responsive.
- `data.js` — cas, sources et données du décompte.
- `pedagogy.js` — micro-théorie, exemples guidés, niveaux et pratique AFC.
- `legal-basis.js` — ancrage LTVA/OTVA des 37 cas.
- `logic.js` — calculs et validations.
- `transition.js` — tableaux des changements de méthode.
- `components.js` — composants pédagogiques et navigation.
- `store.js` — persistance, migrations et mode révision.
- `app.js` — orchestration de l’interface.
- `tests/` + `smoke-test.mjs` — garde-fous fonctionnels, juridiques, pédagogiques et UX.

## Progression et migration

La v14 utilise `tva_tdfn_v140_state`. Une progression v13 (`tva_tdfn_v130_state`) est migrée automatiquement. Les migrations plus anciennes conservées dans le projet restent également prises en charge.

## Tests

```bash
npm run test:smoke
npm run test:unit
npm run test:e2e
```

Avant packaging, les vérifications statiques et unitaires de la v14 passent avec **67/67 contrôles smoke** et **37/37 cas unitaires**.

Le test E2E Playwright est inclus et s’exécute via GitHub Actions après installation des dépendances navigateur. Le rendu final doit également être contrôlé sur le site GitHub Pages, notamment sur desktop et sur un viewport mobile 375–390 px.
