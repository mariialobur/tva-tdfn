# Audit professionnel — version 6.3

## Décision de positionnement

Le produit reste un **entraînement pédagogique inspiré du prototype AFC**, et non une copie du Portail AFC. Le service en production et les décisions de l’AFC restent déterminants.

## Corrections métier intégrées

### 1. Contre-prestations convenues ou reçues

Le dossier affiche désormais le mode de décompte retenu. Le cas A utilise les contre-prestations reçues, conformément à sa donnée d’honoraires encaissés. Les autres cas chiffrés utilisent par défaut les contre-prestations convenues, sauf indication contraire.

La rubrique ch. 200 conserve la formulation officielle «convenues ou reçues», tout en rappelant le mode retenu pour le cas.

### 2. Cas B

Le total TTC de CHF 108’100 n’est plus affiché dans les données de départ. Le participant reçoit uniquement:

- CHF 100’000 HT;
- le taux légal de 8,1 %.

Il doit reconstruire lui-même le montant TTC avant de remplir le ch. 200 et le calcul TDFN.

### 3. Hiérarchie pédagogique

Le parcours guidé suit maintenant l’ordre:

1. étape;
2. contenu de l’étape;
3. action contextuelle.

Le bloc facture client / décompte AFC n’est affiché qu’à l’étape «Comprendre».

### 4. Décompte compact

L’étape 3 n’affiche que les rubriques utiles au cas. Les rubriques non concernées restent accessibles dans la vue séparée inspirée du prototype AFC.

Cette décision évite de transformer chaque exercice simple en une longue table administrative et supprime la navigation horizontale du parcours guidé.

### 5. Dossier contextuel

Le dossier latéral reste ouvert pendant l’analyse, puis se masque pendant le calcul et le remplissage. Une commande permet de l’afficher à nouveau. La zone de travail atteint ainsi une largeur suffisante pour le calcul et la vue complète.

### 6. Actions

Une seule action principale est affichée:

- étape 1: continuer vers le calcul;
- étape 2: reporter au décompte;
- étape 3: contrôler le décompte;
- quiz: vérifier les réponses;
- atelier libre: vérifier la cohérence.

La solution, le bilan et la réinitialisation sont regroupés dans un menu secondaire.

### 7. Cache

Les ressources CSS et JavaScript sont appelées avec `v=6.3.0`. Cette mesure évite la coexistence visuelle d’une ancienne feuille de styles et d’un nouveau fichier HTML après une mise à jour GitHub Pages.

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
- 16 cas guidés et 1 atelier libre;
- calculs ch. 323, 379, 383, 399, 479, 500, 510, 900 et 910;
- test spécifique confirmant l’absence d’arrondi intermédiaire;
- erreurs négatives, déductions excessives, report absent, ch. 383 erroné et discordance ch. 299/379.

## Limites restantes

L’outil ne valide pas la qualification d’une activité, le droit d’utiliser la méthode TDFN, l’exhaustivité des justificatifs ni les particularités d’un dossier réel. Les options d’arrondi de production ne sont pas simulées faute de spécification publique complète.


## Ajouts de la version 6.3

- checklist préalable en dix points, enregistrée localement;
- quiz de qualification sur le ch. 205 et distinction avec le ch. 230;
- cas chiffré sur une diminution de contre-prestation au ch. 235;
- cas chiffré produisant un solde en faveur au ch. 510;
- bloc d’information sur la remise actuelle via «Décompte TVA pro»;
- blocage de l’aperçu si le calcul reporté est absent, obsolète ou discordant;
- correction de l’arrondi afin qu’une option liée au ch. 500 ne modifie pas le ch. 510.
