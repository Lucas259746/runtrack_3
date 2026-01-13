document.querySelectorAll('button[data-key]').forEach(button => {
    button.addEventListener('click', function() {
        const key = this.getAttribute('data-key');
        fetch('json/ville.json')
            .then(response => response.json())
            .then(data => {
                if (data.hasOwnProperty(key)) {
                    document.getElementById('result').innerHTML = `<p>La valeur pour '${key}' est : ${data[key]}</p>`;
                } else {
                    document.getElementById('result').innerHTML = `<p>Clé '${key}' non trouvée.</p>`;
                }
            })
            .catch(error => {
                document.getElementById('result').innerHTML = '<p>Erreur lors du chargement du JSON.</p>';
            });
    });
});