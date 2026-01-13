<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Filtre a Pokémon</title>
</head>

<body>
    <h1>Filtrer les Pokémon</h1>
    <form id="filterForm">
        <label for="id">ID:</label>
        <input type="text" id="id" name="id"><br><br>

        <label for="nom">Nom:</label>
        <input type="text" id="nom" name="nom"><br><br>

        <label for="type">Type:</label>
        <select id="type" name="type">
            <option value="">Tous</option>
            <option value="Grass">Grass</option>
            <option value="Poison">Poison</option>
            <option value="Fire">Fire</option>
            <option value="Flying">Flying</option>
            <option value="Water">Water</option>
            <option value="Bug">Bug</option>
            <option value="Electric">Electric</option>
            <option value="Ground">Ground</option>
            <option value="Fairy">Fairy</option>
            <option value="Normal">Normal</option>
            <option value="Fighting">Fighting</option>
            <option value="Psychic">Psychic</option>
            <option value="Steel">Steel</option>
            <option value="Ice">Ice</option>
        </select><br><br>

        <input type="button" id="filterBtn" value="Filtrer">
    </form>

    <div id="results"></div>

    <script src="script.js"></script>
</body>

</html>