# Changelog

## v18.0.0 — 19.08.2026

### Navigation et UX

- Ajout du **Plan de spécialisation TDFN** pour les 44 cas.
- Regroupement du parcours en 11 modules: admissibilité, principes, activités multiples, règle des 10 %, international, pratique fiduciaire, changements de méthode, procédures particulières, dossier final et atelier libre.
- Statuts visibles dans le Plan: `À faire`, `En cours`, `Acquis`, `Maîtrisé` et `Atelier libre`.
- Vue desktop en grille et vue mobile plein écran.

### Évaluation finale structurée

- Passage de 12 à **15 questions**.
- Seuil harmonisé à **12/15 = 80 %**.
- Remplacement du tirage global non contraint par un **blueprint thématique**: chaque tentative couvre obligatoirement les principaux blocs de compétences.
- Nouvelle clé de résultat `tva_tdfn_final_evaluation_v4_blueprint`: une réussite de l’ancien examen ne délivre pas automatiquement l’attestation v18.
- Ajout de questions ciblées sur l’impôt sur les acquisitions sous TDFN et la qualification préalable d’une exportation.
- `evaluation.js` devient un point d’entrée léger vers la nouvelle évaluation v4 afin d’éviter le chargement simultané de deux moteurs d’examen.

### QA et accessibilité

- Extension des E2E: Plan 44 cas, navigation, progression, gate de l’examen, examen 15 questions, soumission/correction, export/import et réinitialisation complète.
- Ajout de tests **axe** sur l’espace principal, le Plan, le mémo et l’examen final.
- Ajout de captures de référence desktop/mobile dans les artifacts du workflow.
- Archivage du rapport Playwright et des résultats de test pendant 14 jours.
- Alignement des dépendances QA avec les deux parcours de la méthode effective.

### Progression / reset

- La réinitialisation complète efface aussi le résultat v4.
- Un garde de synchronisation recharge l’application lorsqu’un résultat final précédemment chargé est supprimé par un reset, afin d’éviter une attestation résiduelle en mémoire.

### Documentation

- README réécrit pour présenter la spécialisation dans le parcours global `Effective Niveau 1 → Effective Niveau 2 → TDFN distinct`.
- Documentation mise à jour sur le Plan, le blueprint d’examen, le QA et l’attestation.

---

## v16.2 — audited final — 12.08.2026

### Audit corrections

- Removed answer leakage from final dossier checklists T1/T2.
- Rewrote T1/T2 inputs as neutral accounting/documents instead of prequalified VAT categories.
- Removed numeric answer leakage from S4 checklist.
- Reframed S3 as a documented reduction of consideration and explicitly stated that overdue payment alone does not automatically justify a VAT correction.
- Added targeted post-validation diagnostics to T2 (rubrique / qualification / correction / base).
- Clarified acquisition-tax CHF 10'000 threshold for VAT-registered vs non-registered recipients.
- Aligned static progress placeholder with 43 scored cases.
- Updated SEO/OG description and cache version to 16.2.0.
- Added standalone structural/source/arithmetic validator and pre-v16.2 restore script.

### Preserved

- 44 total cases / 43 scored / Q free.
- Current sport TDFN correction: 2.1%, 3.0%, 3.7%, 4.5% where applicable.
- v16 refined onboarding, 2025 memo, entry reference table and integrated module context.
- Cloudflare Web Analytics optional setup/removal tools.
