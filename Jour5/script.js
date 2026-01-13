function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateCodePostal(cp) {
    return /^\d{5}$/.test(cp);
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearError(id) {
    document.getElementById(id).textContent = '';
}


function checkEmailExists(email) {
    return fetch('users.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check_email', email: email })
    })
    .then(response => response.json())
    .then(data => data.exists);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            clearError('email-error');
            clearError('password-error');
            const email = this.email.value.trim();
            const password = this.password.value;

            let valid = true;
            if (!validateEmail(email)) {
                showError('email-error', 'Email invalide');
                valid = false;
            }
            if (!password) {
                showError('password-error', 'Mot de passe requis');
                valid = false;
            }

            if (valid) {
                fetch('users.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'login', email: email, password: password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        window.location.href = 'index.html';
                    } else {
                        const result = document.getElementById('result');
                                result.textContent = data.message;
                                result.className = data.success ? 'success' : 'error';

                    }
                })
                .catch(error => console.error('Erreur:', error));
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {

        registerForm.email.addEventListener('blur', function() {
            const email = this.value.trim();
            if (validateEmail(email)) {
                checkEmailExists(email).then(exists => {
                    if (exists) {
                        showError('email-error', 'Email déjà utilisé');
                    } else {
                        clearError('email-error');
                    }
                });
            } else if (email) {
                showError('email-error', 'Email invalide');
            }
        });

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            ['nom-error', 'prenom-error', 'email-error', 'password-error', 'adresse-error', 'code_postal-error'].forEach(id => clearError(id));

            const nom = this.nom.value.trim();
            const prenom = this.prenom.value.trim();
            const email = this.email.value.trim();
            const password = this.password.value;
            const adresse = this.adresse.value.trim();
            const code_postal = this.code_postal.value.trim();

            let valid = true;
            if (!nom) {
                showError('nom-error', 'Nom requis');
                valid = false;
            }
            if (!prenom) {
                showError('prenom-error', 'Prénom requis');
                valid = false;
            }
            if (!validateEmail(email)) {
                showError('email-error', 'Email invalide');
                valid = false;
            }
            if (!validatePassword(password)) {
                showError('password-error', 'Mot de passe doit contenir au moins 8 caractères');
                valid = false;
            }
            if (!adresse) {
                showError('adresse-error', 'Adresse requise');
                valid = false;
            }
            if (!validateCodePostal(code_postal)) {
                showError('code_postal-error', 'Code postal invalide (5 chiffres)');
                valid = false;
            }

            if (valid) {
                checkEmailExists(email).then(exists => {
                    if (exists) {
                        showError('email-error', 'Email déjà utilisé');
                    } else {
                        fetch('users.php', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                action: 'register',
                                nom: nom,
                                prenom: prenom,
                                email: email,
                                password: password,
                                adresse: adresse,
                                code_postal: code_postal
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            document.getElementById('result').textContent = data.message;
                            if (data.success) {
                                // Redirect
                                setTimeout(() => window.location.href = 'connexion.html', 2000);
                            }
                        })
                        .catch(error => console.error('Erreur:', error));
                    }
                });
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const userInfo = document.getElementById('user-info');
    const message = document.getElementById('message');

    if (userInfo && message) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("loggedin") === "1") {
            message.textContent = "Vous êtes maintenant connecté.";
        }

        fetch("users.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "get_current_user" }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.loggedin) {
                userInfo.innerHTML = `
                    <h2>Informations utilisateur</h2>
                    <p>Nom: ${data.user.nom}</p>
                    <p>Prénom: ${data.user.prenom}</p>
                    <p>Email: ${data.user.email}</p>
                    <button id="logout-btn">Se déconnecter</button>
                `;

                document.getElementById("logout-btn").addEventListener("click", function () {
                    fetch("users.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "logout" }),
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) location.reload();
                    });
                });
            }
        })
        .catch(err => console.error("Erreur:", err));
    }
});
