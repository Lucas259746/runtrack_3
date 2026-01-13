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
            $result = $db->query("SELECT id, nom, prenom, email FROM utilisateurs WHERE email='$email'");
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user'] = $user;
                echo json_encode(["success" => true, "message" => "Connexion réussie"]);
            } else {
                echo json_encode(["success" => false, "message" => "Email non trouvé"]);
            }
            break;

        case 'add':
            $nom = $db->real_escape_string($input['nom']);
            $prenom = $db->real_escape_string($input['prenom']);
            $email = $db->real_escape_string($input['email']);
            $success = $db->query("INSERT INTO utilisateurs (nom, prenom, email) VALUES ('$nom', '$prenom', '$email')");
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
            $success = $db->query("UPDATE utilisateurs SET nom='$nom', prenom='$prenom', email='$email' WHERE id=$id");
            if ($success) {
                $_SESSION['user'] = array_merge($_SESSION['user'], ['nom' => $nom, 'prenom' => $prenom, 'email' => $email]);
            }
            echo json_encode(["success" => $success, "message" => $success ? "Profil mis à jour" : "Erreur: " . $db->error]);
            break;

        default:
            echo json_encode(["success" => false, "message" => "Action inconnue"]);
    }
    $db->close();
    exit;
}

// GET: return users list
$result = $db->query("SELECT id, nom, prenom, email FROM utilisateurs");
$users = $result->fetch_all(MYSQLI_ASSOC);
header('Content-Type: application/json');
echo json_encode($users);
$db->close();
