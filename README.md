# Entraînement TVA suisse — méthode TDFN · v12.0

Application pédagogique autonome pour apprendre à qualifier et préparer un décompte TVA suisse selon la méthode des taux de la dette fiscale nette (TDFN).

La version 12.0 privilégie la compréhension de l’utilisateur avant la densité du formulaire: une mission claire, les données utiles au même endroit, un parcours en trois verbes («Analyser → Calculer → Reporter»), puis un feedback centré d’abord sur les erreurs à corriger.

## Parcours

37 cas au total, dont 36 évalués et un atelier libre, répartis en 10 modules:

1. Admissibilité TDFN — J1, J2, J3
2. Comprendre la méthode — A, B, C
3. Plusieurs activités — D, D1, D2
4. Règle des 10 % — D4, E, F
5. International et synthèse — G, H, I, D3
6. Rubriques courantes et corrections — L, O, R
7. Méthode effective → TDFN — K0 à K5
8. TDFN → méthode effective — L0 à L7
9. Procédures particulières — N, M, P
10. Atelier libre — Q

Les modules 1 à 6 forment le parcours essentiel. Les modules 7 à 9 sont explicitement avancés.

## Principes UX de v12.0

- La mission est placée dans la zone de travail, pas uniquement dans le dossier latéral.
- Les données indispensables à la réponse restent visibles près de la question, y compris sur mobile.
- Le grand bloc théorique permanent a été remplacé par un «Réflexe TDFN» compact et un mémo ouvrable à la demande.
- Le mode de travail technique n’est plus demandé avant que l’utilisateur ait compris le cas.
- Le parcours guidé suit «Analyser → Calculer → Reporter».
- Le formulaire complet reste accessible à l’étape de report mais n’est plus imposé au débutant.
- La checklist professionnelle est disponible comme second niveau d’aide.
- Après validation, les erreurs sont affichées en premier; les réponses correctes sont repliées.
- Tant que le cas n’est pas maîtrisé, «Corriger mes réponses» est l’action principale.
- Une solution consultée marque le cas comme assisté et impose une reprise sans aide pour obtenir la maîtrise.
- La navigation affiche le module, le numéro du cas et un intitulé court.
- La typographie d’écran ne descend pas sous 13 px; les contrôles tactiles importants visent au moins 44 px sur mobile.

## Points juridiques protégés dans les tests

Le jeu de tests vérifie notamment la séparation des seuils TDFN et du décompte annuel, la logique actuelle de maintien des TDFN sur trois périodes fiscales consécutives, l’abandon de l’ancienne règle liée au dépassement de plus de 50 %, la limitation de l’option sous TDFN, ainsi que la qualification et le signe du ch. 415 dans les cas concernés.

Le site reste un outil pédagogique indépendant. Les sources AFC/ESTV intégrées au trainer restent la référence pour un dossier réel.

## Qualité technique

Commandes locales:

```bash
node smoke-test.mjs
node tests/unit.mjs
npm run test:e2e
```

- Smoke test: 62 contrôles structure/UX/juridique.
- Unit tests: 37 cas + calculs + migration + composants + tableaux ch. 410/415.
- Playwright + axe: prévu dans GitHub Actions pour desktop et mobile Chromium.

Dans l’environnement de génération de cette archive, Playwright n’a pas pu être installé depuis le registre npm disponible. L’E2E navigateur doit donc être confirmé par GitHub Actions après publication.

## Déploiement GitHub Pages

Le projet est statique. Publier le contenu du dossier à la racine de la branche servie par GitHub Pages. Les fichiers `styles.css` et `app.js` utilisent le cache-busting `v=12.0.0`.
