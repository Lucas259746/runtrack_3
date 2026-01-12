<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Arc-en-ciel jQuery</title>
</head>

<body>

    <button id="shuffleBtn">Mélanger</button>

    <div id="container" style="display:flex; gap:5px; margin-top:20px;">
        <img src="image/arc1.png" draggable="true" data-order="1">
        <img src="image/arc2.png" draggable="true" data-order="2">
        <img src="image/arc3.png" draggable="true" data-order="3">
        <img src="image/arc4.png" draggable="true" data-order="4">
        <img src="image/arc5.png" draggable="true" data-order="5">
        <img src="image/arc6.png" draggable="true" data-order="6">
    </div>

    <p id="message" style="font-weight:bold;"></p>


    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="script.js"></script>
</body>

</html>