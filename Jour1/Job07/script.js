// Fonction qui détermine si une date est un jour travaillé, un week-end ou un jour férié
function jourtravaille(date) {

    // Liste des jours fériés de 2020 (format MM-DD)
    const joursFeries2020 = [
        "01-01", // Jour de l'an
        "04-13", // Lundi de Pâques
        "05-01", // Fête du Travail
        "05-08", // Victoire 1945
        "05-21", // Ascension
        "06-01", // Lundi de Pentecôte
        "07-14", // Fête nationale
        "08-15", // Assomption
        "11-01", // Toussaint
        "11-11", // Armistice
        "12-25"  // Noël
    ];

    // Extraction du jour, du mois et de l'année
    const jour = date.getDate();
    const mois = date.getMonth() + 1; // getMonth() renvoie 0 pour janvier
    const annee = date.getFullYear();

    // Format MM-DD pour comparaison avec les jours fériés
    const dateFormatee = String(mois).padStart(2, "0") + "-" + String(jour).padStart(2, "0");

    // Vérification si jour férié
    if (annee === 2020 && joursFeries2020.includes(dateFormatee)) {
        console.log(`Le ${jour} / ${mois} / ${annee} est un jour férié.`);
    } 
    // Vérification si week-end
    else if (date.getDay() === 0 || date.getDay() === 6) { // 0 = dimanche, 6 = samedi
        console.log(`Non, le ${jour} / ${mois} / ${annee} est un week-end.`);
    } 
    // Sinon jour travaillé
    else {
        console.log(`Oui, le ${jour} / ${mois} / ${annee} est un jour travaillé.`);
    }
}

// === Tests ===
jourtravaille(new Date("2020-05-01")); // Jour férié
jourtravaille(new Date("2020-06-06")); // Week-end
jourtravaille(new Date("2020-06-03")); // Jour travaillé


