export const MODULES = [
  {
    label: '1 · Admissibilité TDFN', track: 'Parcours essentiel', level: 'Débutant', ids: ['J1', 'J2', 'J3'],
    objectives: ['Vérifier l’accès initial aux TDFN', 'Suivre correctement les dépassements', 'Distinguer TDFN et décompte annuel']
  },
  {
    label: '2 · Comprendre la méthode', track: 'Parcours essentiel', level: 'Débutant', ids: ['A', 'B', 'C'],
    objectives: ['Distinguer taux légal et TDFN', 'Passer de HT à TTC lorsque nécessaire', 'Calculer la dette TDFN sur la bonne base']
  },
  {
    label: '3 · Plusieurs activités', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['D', 'D1', 'D2'],
    objectives: ['Ventiler le chiffre d’affaires par activité', 'Appliquer plusieurs TDFN confirmés', 'Regrouper les activités qui partagent le même TDFN']
  },
  {
    label: '4 · Règle des 10 %', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['D4', 'E', 'F'],
    objectives: ['Distinguer 10,0 % de plus de 10 %', 'Traiter une nouvelle activité', 'Appliquer la règle sur trois périodes fiscales pour une activité établie']
  },
  {
    label: '5 · International et synthèse', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['G', 'H', 'I', 'D3'],
    objectives: ['Distinguer exportation et prestation à l’étranger', 'Traiter l’impôt sur les acquisitions', 'Combiner plusieurs TDFN avec une opération internationale']
  },
  {
    label: '6 · Travail courant en fiduciaire', track: 'Parcours essentiel', level: 'Intermédiaire', ids: ['L', 'O', 'S1', 'S2', 'S3', 'S4', 'S5', 'R'],
    objectives: ['Rattacher les opérations à la bonne période', 'Traiter acomptes, diminutions et autres flux', 'Réconcilier comptabilité et décompte', 'Suivre remise, paiement et rectification']
  },
  {
    label: '7 · Méthode effective → TDFN', track: 'Parcours avancé', level: 'Avancé', ids: ['K0', 'K1', 'K2', 'K3', 'K4', 'K5'],
    objectives: ['Vérifier si le changement est possible', 'Calculer les corrections de valeur résiduelle', 'Compléter correctement le ch. 415']
  },
  {
    label: '8 · TDFN → méthode effective', track: 'Parcours avancé', level: 'Avancé', ids: ['L0', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'],
    objectives: ['Identifier les éléments ouvrant un dégrèvement ultérieur', 'Tenir compte de la part résiduelle et du droit à déduction', 'Compléter correctement le ch. 410']
  },
  {
    label: '9 · Procédures particulières', track: 'Parcours avancé', level: 'Avancé', ids: ['N', 'M', 'P'],
    objectives: ['Vérifier si une option est admissible sous TDFN', 'Qualifier une reprise de patrimoine avant toute correction', 'Saisir une charge fiscale au ch. 415 avec le bon signe']
  },
  {
    label: '10 · Dossier fiduciaire final', track: 'Mise en situation', level: 'Autonome', ids: ['T1', 'T2'],
    objectives: ['Qualifier un dossier non prérempli', 'Construire un décompte complet depuis les pièces', 'Réconcilier rubriques, TDFN et acquisitions']
  },
  {
    label: '11 · Atelier libre', track: 'Atelier autonome', level: 'Autonome', ids: ['Q'],
    objectives: ['Reproduire un décompte déjà paramétré par l’AFC', 'Contrôler la cohérence arithmétique', 'Conserver une piste d’audit exploitable']
  }
];
const casePublicId = ()=>'x';
const MODULE_INTRO_RULES_V16 = {};
