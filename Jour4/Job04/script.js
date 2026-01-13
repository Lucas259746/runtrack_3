function loadUsers() {
    fetch('users.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('users-table');
            if (table) {
                // Clear existing rows except header
                while (table.rows.length > 1) {
                    table.deleteRow(1);
                }
                data.forEach(user => {
                    const row = table.insertRow();
                    row.insertCell(0).textContent = user.id;
                    row.insertCell(1).textContent = user.nom;
                    row.insertCell(2).textContent = user.prenom;
                    row.insertCell(3).textContent = user.email;
                });
            }
        })
        .catch(error => console.error('Erreur lors du chargement:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {
                action: 'login',
                email: formData.get('email')
            };
            fetch('users.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('login-result').innerHTML = `<p>${data.message}</p>`;
                if (data.success) {
                    location.reload();
                }
            })
            .catch(error => console.error('Erreur:', error));
        });
    }

    const updateProfileForm = document.getElementById('update-profile-form');
    if (updateProfileForm) {
        updateProfileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {
                action: 'update',
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                email: formData.get('email')
            };
            fetch('users.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('update-result').innerHTML = `<p>${data.message}</p>`;
                if (data.success) {
                    location.reload();
                }
            })
            .catch(error => console.error('Erreur:', error));
        });
    }

    const addUserForm = document.getElementById('add-user-form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {
                action: 'add',
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                email: formData.get('email')
            };
            fetch('users.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('add-user-result').innerHTML = `<p>${data.message}</p>`;
                if (data.success) {
                    loadUsers();
                    this.reset();
                }
            })
            .catch(error => console.error('Erreur:', error));
        });
    }

    const updateBtn = document.getElementById('update-btn');
    if (updateBtn) {
        updateBtn.addEventListener('click', loadUsers);
    }
});