<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Taquin</title>
</head>

<body>

    <div id="game" style="
    display:grid;
    grid-template-columns:repeat(3,100px);
    grid-template-rows:repeat(3,100px);
    gap:2px;
"></div>

    <p id="message" style="font-weight:bold;"></p>
    <button id="restart" style="display:none;">Recommencer</button>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
</body>

</html>