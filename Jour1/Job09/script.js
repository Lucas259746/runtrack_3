// Fonction de tri
function tri(numbers, order) {
    // Copie du tableau pour ne pas modifier l’original
    let arr = [...numbers];
    let n = arr.length;

    // Tri à bulles (bubble sort)
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Comparaison selon le type de tri demandé
            if ((order === "asc" && arr[j] > arr[j + 1]) ||
                (order === "desc" && arr[j] < arr[j + 1])) {
                // Échange des valeurs
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

// === Tests ===
let tableau = [5, 2, 9, 1, 7, 3];

console.log("Tableau original :", tableau);
console.log("Tri ascendant :", tri(tableau, "asc"));  
console.log("Tri décroissant :", tri(tableau, "desc")); 



