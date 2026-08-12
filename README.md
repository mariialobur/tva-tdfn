# Entraînement TVA suisse — méthode TDFN · v16.2

Simulateur pédagogique en français consacré à la méthode des taux de la dette fiscale nette (TDFN), conçu pour transformer la théorie TVA en réflexes de travail utilisables en fiduciaire.

## Contenu v16.2

- 44 cas au total: 43 cas évalués + 1 atelier libre.
- 11 modules: parcours essentiel, parcours avancé, dossier fiduciaire final et atelier autonome.
- Admissibilité TDFN, calcul sur CA TTC, plusieurs activités, règle des 10 %, opérations internationales, impôt sur les acquisitions, rubriques courantes, corrections, concordance, délais, changements de méthode et procédures particulières.
- Module 6 renforcé avec des situations de travail courant en fiduciaire.
- Dossier fiduciaire final en deux étapes: qualifier les pièces, puis établir et réconcilier le décompte sans solution préaffichée.
- Distinction pédagogique entre **Acquis** et **Maîtrisé**.
- Références séparées entre fondement juridique LTVA/OTVA et pratique AFC.
- Sources et règles sensibles revues le 12.08.2026.

## Parcours pédagogique

Chaque cas suit une boucle courte:

1. Comprendre une règle opérationnelle.
2. Voir un exemple guidé.
3. Appliquer la règle à un nouveau dossier.
4. Vérifier et diagnostiquer l’erreur.
5. Relier le traitement au fondement juridique et à la pratique AFC.
6. Refaire ultérieurement sans aide pour confirmer la maîtrise.

Le dossier final inverse progressivement cette logique: les pièces sont présentées sans qualification fiscale préremplie et l’apprenant doit construire lui-même le raisonnement TVA.

## Architecture principale

- `index.html` — structure du simulateur et dialogues.
- `styles.css` — design system et responsive.
- `data.js` — cas et données du décompte.
- `pedagogy.js` — micro-théorie, exemples et pratique AFC.
- `legal-basis.js` — fondements LTVA/OTVA.
- `logic.js` — calculs et validations.
- `transition.js` — tableaux des changements de méthode.
- `components.js` — composants pédagogiques et navigation.
- `store.js` — sauvegarde locale et progression.
- `app.js` — orchestration de l’interface.

## Version

Version publiée cible: **v16.2 audited**  
Progression affichée: **0 / 43 acquis · 0 maîtrisés** au premier lancement.
