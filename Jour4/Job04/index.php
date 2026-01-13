<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Gestion des Utilisateurs</title>
</head>

<body>
    <?php
    session_start();
    if (isset($_GET['logout'])) {
        session_destroy();
        header('Location: index.php');
        exit;
    }
    if (!isset($_SESSION['user_id'])) {
    ?>
        <h1>Connexion</h1>
        <form id="login-form">
            <label>Email: <input type="email" name="email" required></label><br>
            <button type="submit">Se connecter</button>
        </form>
        <div id="login-result"></div>
    <?php
    } else {
    ?>
        <h1>Mon Profil</h1>
        <form id="update-profile-form">
            <label>Nom: <input type="text" name="nom" value="<?php echo $_SESSION['user']['nom']; ?>" required></label><br>
            <label>Prénom: <input type="text" name="prenom" value="<?php echo $_SESSION['user']['prenom']; ?>" required></label><br>
            <label>Email: <input type="email" name="email" value="<?php echo $_SESSION['user']['email']; ?>" required></label><br>
            <button type="submit">Mettre à jour</button>
        </form>
        <div id="update-result"></div>
        <a href="?logout=1">Se déconnecter</a>
    <?php
    }
    ?>

    <h1>Ajouter un Utilisateur</h1>
    <form id="add-user-form">
        <label>Nom: <input type="text" name="nom" required></label><br>
        <label>Prénom: <input type="text" name="prenom" required></label><br>
        <label>Email: <input type="email" name="email" required></label><br>
        <button type="submit">Ajouter</button>
    </form>
    <div id="add-user-result"></div>

    <?php if (isset($_SESSION['user_id'])) { ?>
        <h1>Liste des Utilisateurs</h1>
        <button id="update-btn">Update</button>
        <table id="users-table" border="1">
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
            </tr>
        </table>
    <?php } ?>

    <script src="script.js"></script>
</body>

</html>