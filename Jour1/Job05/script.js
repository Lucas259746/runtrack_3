// Fonction qui affiche les jours de la semaine dans la console
function afficherjourssemaines() {
    // Tableau contenant les jours de la semaine
    const jourssemaines = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    // Boucle for pour parcourir et afficher chaque jour
    for (let i = 0; i < jourssemaines.length; i++) {
        console.log(jourssemaines[i]);
    }
}

// Appel de la fonction pour exécuter l'affichage
afficherjourssemaines();
