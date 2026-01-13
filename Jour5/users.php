<?php
session_start();

$db = new mysqli('localhost', 'root', '', 'utilisateurs');
if ($db->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';

    switch ($action) {
        case 'login':
            $email = $db->real_escape_string($input['email']);
            $result = $db->query("SELECT id, nom, prenom, email, password FROM utilisateurs WHERE email='$email'");
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                if (password_verify($input['password'], $user['password'])) {
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user'] = $user;
                    echo json_encode(["success" => true, "message" => "Connexion réussie"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Mot de passe incorrect"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Email non trouvé"]);
            }
            break;

        case 'register':
            $nom = $db->real_escape_string($input['nom']);
            $prenom = $db->real_escape_string($input['prenom']);
            $email = $db->real_escape_string($input['email']);
            $password = password_hash($input['password'], PASSWORD_DEFAULT);
            $adresse = $db->real_escape_string($input['adresse']);
            $code_postal = $db->real_escape_string($input['code_postal']);
            // Check if email exists
            $check = $db->query("SELECT id FROM utilisateurs WHERE email='$email'");
            if ($check->num_rows > 0) {
                echo json_encode(["success" => false, "message" => "Email déjà utilisé"]);
            } else {
                $success = $db->query("INSERT INTO utilisateurs (nom, prenom, email, password, adresse, code_postal) VALUES ('$nom', '$prenom', '$email', '$password', '$adresse', '$code_postal')");
                echo json_encode(["success" => $success, "message" => $success ? "Utilisateur inscrit" : "Erreur: " . $db->error]);
            }
            break;

        case 'check_email':
            $email = $db->real_escape_string($input['email']);
            $result = $db->query("SELECT id FROM utilisateurs WHERE email='$email'");
            echo json_encode(["exists" => $result->num_rows > 0]);
            break;

        case 'add':
            $nom = $db->real_escape_string($input['nom']);
            $prenom = $db->real_escape_string($input['prenom']);
            $email = $db->real_escape_string($input['email']);
            $password = password_hash($input['password'], PASSWORD_DEFAULT);
            $success = $db->query("INSERT INTO utilisateurs (nom, prenom, email, password) VALUES ('$nom', '$prenom', '$email', '$password')");
            echo json_encode(["success" => $success, "message" => $success ? "Utilisateur ajouté" : "Erreur: " . $db->error]);
            break;

        case 'update':
            if (!isset($_SESSION['user_id'])) {
                echo json_encode(["success" => false, "message" => "Non connecté"]);
                break;
            }
            $id = $_SESSION['user_id'];
            $nom = $db->real_escape_string($input['nom']);
            $prenom = $db->real_escape_string($input['prenom']);
            $email = $db->real_escape_string($input['email']);
            $password = password_hash($input['password'], PASSWORD_DEFAULT);
            $success = $db->query("UPDATE utilisateurs SET nom='$nom', prenom='$prenom', email='$email', password='$password' WHERE id=$id");
            if ($success) {
                $_SESSION['user'] = array_merge($_SESSION['user'], ['nom' => $nom, 'prenom' => $prenom, 'email' => $email]);
            }
            echo json_encode(["success" => $success, "message" => $success ? "Profil mis à jour" : "Erreur: " . $db->error]);
            break;

        case 'get_current_user':
            if (isset($_SESSION['user'])) {
                echo json_encode([
                    "loggedin" => true,
                    "user" => $_SESSION['user']
                ]);
            } else {
                echo json_encode([
                    "loggedin" => false
                ]);
            }
            break;


        case 'logout':
            session_destroy();
            echo json_encode(["success" => true]);
            break;
            $db->close();
            exit;
    }
    $db->close();
};
