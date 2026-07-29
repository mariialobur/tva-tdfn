# Audit professionnel — version 6

## Décision de positionnement

Le produit reste un **entraînement pédagogique inspiré du prototype AFC**, et non une copie du Portail AFC. Le service en production et les décisions de l’AFC restent déterminants.

## Corrections intégrées

### 1. Hypothèse commune

L’assujettissement, la méthode TDFN et les taux utilisés dans les cas sont supposés déjà confirmés par écrit par l’AFC. Les cas simplifiés indiquent que la qualification ou le montant complexe est fourni comme hypothèse.

### 2. Atelier libre

L’atelier libre ne présente plus les TDFN comme un choix autonome. Il demande de reproduire uniquement les activités et taux déjà visibles dans le courrier ou le profil AFC. Le résultat est intitulé **Cohérence arithmétique vérifiée**.

### 3. Arrondi

Aucun arrondi n’est effectué par activité dans le moteur. Les montants bruts sont additionnés, les lignes sont affichées à quatre décimales et seul le total affiché est arrondi à CHF 0.01.

Cette méthode est explicitement présentée comme un calcul pédagogique transparent, et non comme la reproduction certifiée de l’algorithme du Portail AFC.

### 4. Changement de méthode

Le cas K distingue désormais clairement deux décomptes:

- effective → TDFN: correction au ch. 415 du dernier décompte avant le passage;
- TDFN → effective: déduction au ch. 410 du premier décompte selon la méthode effective.

Le ch. 410 est explicitement signalé comme absent du formulaire TDFN montré dans les autres cas.

### 5. Interface

- largeur maximale ramenée à 1180 px;
- zone principale limitée à environ 820 px;
- sélection des cas par modules dans un seul menu;
- navigation précédent/suivant;
- dossier latéral raccourci;
- références et contrôles repliables;
- actions rapprochées de la zone de saisie;
- barre mobile ramenée à trois actions;
- première étape condensée.

## Contrôles conservés

Le moteur vérifie notamment:

- valeurs numériques et non négatives;
- ch. 205 ≤ ch. 200;
- ch. 289 ≤ ch. 200;
- ch. 299 ≥ 0;
- existence et actualité du report ch. 323;
- ch. 379 = ch. 299;
- ch. 383 = base × taux légal sélectionné;
- impossibilité d’un ch. 500 et d’un ch. 510 simultanément positifs.

## Tests exécutés

- contrôle syntaxique de `data.js`, `logic.js` et `app.js`;
- 13 cas guidés et 1 atelier libre;
- calculs ch. 323, 379, 383, 399, 479, 500, 510, 900 et 910;
- test spécifique confirmant l’absence d’arrondi intermédiaire;
- erreurs négatives, déductions excessives, report absent, ch. 383 erroné et discordance ch. 299/379.

## Limites restantes

L’outil ne valide pas la qualification d’une activité, le droit d’utiliser la méthode TDFN, l’exhaustivité des justificatifs ni les particularités d’un dossier réel. Les options d’arrondi de production ne sont pas simulées faute de spécification publique complète.
