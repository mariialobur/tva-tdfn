# Entraînement TVA suisse — méthode TDFN · v13.0

Simulateur pédagogique en français consacré à la méthode des taux de la dette fiscale nette (TDFN), conçu pour passer d’un raisonnement d’assistant comptable à un contrôle plus autonome des décomptes TVA.

## Principe de v13.0

L’interface privilégie une seule question: **qu’est-ce que l’utilisateur doit comprendre et faire maintenant?**

Chaque cas présente, dans cet ordre:

1. **Votre mission** — la décision ou le calcul attendu.
2. **Données utiles** — les seules informations nécessaires pour répondre.
3. **Base légale du cas** — la compétence travaillée et le ou les articles précis LTVA/OTVA qui l’ancrent.
4. **Analyser → Calculer → Décompte** — le travail à effectuer.
5. **Feedback** — erreurs à corriger d’abord, réponses correctes repliées.
6. **Dossier complet et sources** — disponibles à la demande, sans surcharger l’écran.

Aucune durée d’apprentissage estimée n’est affichée: la progression se mesure par les cas réellement maîtrisés.

## Contenu

- 37 cas répartis en 10 modules.
- Parcours essentiel, parcours avancé et atelier autonome.
- Admissibilité TDFN, plusieurs activités, règle des 10 %, opérations internationales, rubriques courantes, corrections, changements de méthode, procédure de déclaration et option.
- Calculateur TDFN et représentation pédagogique du décompte AFC.
- Tableaux spécifiques pour les corrections ch. 410 / ch. 415.
- Checklist professionnelle par dossier.
- Base légale dédiée à chacun des 37 cas.
- Référentiel officiel LTVA, OTVA, AFC et prototype du décompte.
- Sauvegarde locale, export/import de progression et reprise des cas non maîtrisés.

## Principes UX

- **Mission-first**: la mission apparaît avant le contexte de module et avant le dossier complet.
- **Progressive disclosure**: théorie, checklist et dossier complet ne s’ouvrent que si l’utilisateur en a besoin.
- **Un seul CTA principal** à chaque étape.
- **Langage pédagogique** autour des termes officiels: par exemple `ch.` est expliqué comme la rubrique du décompte et `contre-prestations convenues` comme une déclaration selon les factures émises.
- **Mobile first**: données et base légale restent dans le flux principal; le dossier complet est replié.
- **Mastery plutôt que vitesse**: pas de temps estimé, pas de gamification; le statut distingue `maîtrisé`, `à corriger`, `solution consultée` et `à faire`.

## Base légale par cas

Le fichier `legal-basis.js` associe chaque cas à:

- une compétence professionnelle formulée en une phrase;
- une ou plusieurs références précises LTVA/OTVA;
- une courte explication du lien entre la norme et le geste attendu;
- un lien vers la source officielle correspondante.

Le bloc est volontairement compact dans l’interface. Les explications détaillées restent repliées sous `Pourquoi ces références?`.

## Architecture

- `index.html` — structure et dialogues.
- `styles.css` — design system et responsive.
- `data.js` — cas, sources et données de décompte.
- `legal-basis.js` — base légale dédiée aux 37 cas.
- `logic.js` — calculs et validations.
- `transition.js` — tableaux des changements de méthode.
- `components.js` — composants pédagogiques.
- `store.js` — persistance et migrations.
- `app.js` — orchestration de l’interface.
- `tests/` + `smoke-test.mjs` — garde-fous fonctionnels, juridiques et UX.

## Progression et migration

La v13 utilise `tva_tdfn_v130_state`. Une progression v12 (`tva_tdfn_v120_state`) est migrée automatiquement afin de ne pas perdre les cas déjà travaillés.

## Tests

```bash
npm run test:smoke
npm run test:unit
npm run test:e2e
```

Les tests unitaires vérifient notamment que les 37 cas possèdent chacun une base légale, que les sources citées existent dans le référentiel officiel, ainsi que la cohérence des calculs et des tableaux ch. 410 / ch. 415.

Le contrôle final visuel doit être exécuté après déploiement sur desktop et mobile, notamment sur J1, D3, N, M, P et L5.
