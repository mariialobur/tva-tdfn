# Audit professionnel — version 5

## Décision de positionnement

Le produit est présenté comme un **entraînement pédagogique inspiré du prototype AFC**, et non comme une copie du Portail AFC. Le service en production demeure déterminant pour une déclaration réelle.

## Corrections critiques intégrées

### 1. Terminologie

Les mentions «mode Portail AFC» et «calcul officiel reproduit» ont été remplacées par des formulations prudentes: **Vue prototype AFC** et **calcul pédagogique basé sur le prototype**.

### 2. Mobile

- sélecteur de cas regroupé par modules;
- barre fixe: Contrôler, Solution, Suivant et Bilan;
- adaptation du cas libre sans bouton de solution;
- absence de débordement horizontal du document.

### 3. Arrondi

Le prototype public montre trois choix, sans publier l’algorithme complet des deux options d’arrondi. La version 5 calcule donc uniquement **Sans arrondi**, au centime. Les deux autres choix restent visibles mais désactivés.

### 4. Règle des 10 %

Le cas de dépassement régulier utilise les périodes 2025, 2026 et 2027. La conséquence est placée au début de la quatrième période, le 01.01.2028.

### 5. Ch. 415

Le cas ne présente plus un crédit sans origine. Le dossier comprend désormais:

- procédure de déclaration selon l’art. 38 LTVA;
- contrat de transfert;
- inventaire et affectation des actifs;
- valeurs résiduelles;
- méthode de décompte des parties;
- tableau de correction et rapprochement comptable.

Le montant à reporter reste fourni, car sa détermination complète dépasse un simple calcul de chiffre d’affaires.

### 6. Contrôles universels

Le moteur vérifie notamment:

- valeurs numériques et non négatives;
- ch. 205 ≤ ch. 200;
- ch. 289 ≤ ch. 200;
- ch. 299 ≥ 0;
- existence et actualité du report ch. 323;
- ch. 379 = ch. 299;
- ch. 383 = base × taux légal sélectionné;
- impossibilité d’un ch. 500 et d’un ch. 510 simultanément positifs.

### 7. Cas libre

L’atelier libre permet d’ajouter jusqu’à huit activités, de choisir un TDFN parmi les taux disponibles dans l’outil, de saisir les bases TTC et de contrôler la cohérence du décompte. Le choix d’un taux ne vaut jamais autorisation de l’AFC.

## Tests exécutés

- contrôle syntaxique des trois modules JavaScript;
- 13 cas guidés et 1 atelier libre;
- calculs ch. 323, 379, 383, 399, 479, 500, 510, 900 et 910;
- erreurs négatives, déductions excessives, report absent, ch. 383 erroné et discordance ch. 299/379;
- interaction desktop: changement de mode, ouverture de Calcul, ajout d’activités et report;
- interaction mobile: sélecteur, quatre actions visibles et largeur sans débordement;
- aucune erreur JavaScript lors des scénarios navigateur testés.

## Limite restante

L’outil ne valide pas la qualification d’une activité, le droit d’utiliser la méthode TDFN, l’exhaustivité des justificatifs ni les particularités d’un dossier réel. Ces éléments nécessitent l’analyse des faits et des sources en vigueur.
