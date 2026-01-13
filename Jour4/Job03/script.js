document.getElementById('filterBtn').addEventListener('click', function() {
    const id = document.getElementById('id').value.trim();
    const nom = document.getElementById('nom').value.trim().toLowerCase();
    const type = document.getElementById('type').value;

    fetch('json/pokemon.json')
        .then(response => response.json())
        .then(data => {
            const filtered = data.filter(pokemon => {
                let match = true;
                if (id && pokemon.id != id) match = false;
                if (nom && !pokemon.name.english.toLowerCase().includes(nom)) match = false;
                if (type && !pokemon.type.includes(type)) match = false;
                return match;
            });

            displayResults(filtered);
        })
        .catch(error => console.error('Erreur:', error));
});

function displayResults(pokemons) {
    const resultsDiv = document.getElementById('results');
    if (pokemons.length === 0) {
        resultsDiv.innerHTML = '<p>Aucun Pokémon trouvé.</p>';
        return;
    }

    let html = '<ul>';
    pokemons.forEach(pokemon => {
        html += `<li>ID: ${pokemon.id}, Nom: ${pokemon.name.english}, Types: ${pokemon.type.join(', ')}</li>`;
    });
    html += '</ul>';
    resultsDiv.innerHTML = html;
}
