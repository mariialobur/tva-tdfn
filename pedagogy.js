// Couche pédagogique — version 16.2.0
export const CASE_PEDAGOGY = {
 Q:{difficulty:'x'},
  S1:{difficulty:'Intermédiaire',kind:'Période',theory:'Le mode de décompte détermine le moment où une contre-prestation entre dans le décompte. Le mode «convenues» est la règle de base; le mode «reçues» est soumis à autorisation.',example:'Exemple distinct: facture émise le 28 juin et encaissée le 5 juillet. Sous convenues, la facturation rattache l’opération à la première période; sous reçues autorisées, l’encaissement devient déterminant.'},
  S2:{difficulty:'Intermédiaire',kind:'Période',theory:'Un paiement anticipé lié à une prestation imposable doit être identifié séparément de la facture finale et de la date d’exécution.',example:'Exemple distinct: acompte reçu le 15 décembre pour une prestation de février. La piste d’audit doit relier le paiement à la prestation future et déterminer le moment de naissance de la créance fiscale.'},
  S3:{difficulty:'Intermédiaire',kind:'Correction',theory:'Une modification documentée de la contre-prestation adapte la base imposable au moment prévu par l’art. 41 LTVA. Une simple créance en retard ne suffit pas: la correction doit être établie.',example:'Exemple distinct: rabais commercial de CHF 2’000 accordé et comptabilisé après la facture initiale. La correction reste liée à la facture d’origine tout en étant prise en compte dans la période déterminante de la modification.'},
  S4:{difficulty:'Intermédiaire',kind:'Concordance',theory:'La qualité d’un décompte se contrôle par la concordance entre les comptes, le ch. 200, les déductions et les bases TDFN. Toute différence doit pouvoir être expliquée par une rubrique ou une pièce.',example:'Exemple distinct: ch. 200 CHF 100’000 moins export CHF 10’000 et avoir CHF 5’000 → ch. 299 CHF 85’000. Les bases TDFN doivent totaliser exactement CHF 85’000.'},
  S5:{difficulty:'Intermédiaire',kind:'Procédure',theory:'Sous TDFN, le décompte est semestriel, mais la remise et le paiement restent soumis à des échéances précises. Un retard de paiement peut générer un intérêt moratoire.',example:'Exemple distinct: une période se termine à une date donnée; le calendrier interne doit déclencher la préparation suffisamment tôt pour respecter le délai légal de 60 jours sans attendre un rappel.'}
};
export const SHOW_CONTRAST = {};
export const CASE_PRACTICE = {
 Q:[],
  S1:[{citation:'LTVA — modes de décompte et naissance de la créance',sourceId:'ltva'}],
  S2:[{citation:'LTVA — paiement anticipé et naissance de la créance',sourceId:'ltva'}],
  S3:[{citation:'Prototype AFC — diminution de contre-prestation, ch. 235',sourceId:'prototype'}],
  S4:[{citation:'Prototype AFC — concordance ch. 200 / 299 / 379',sourceId:'prototype'}],
  S5:[{citation:'AFC — paiement et intérêt moratoire',sourceId:'payment-interest'}]
};
