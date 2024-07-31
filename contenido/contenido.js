document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#payments-table tbody');
    const filterForm = document.getElementById('filter-form');
    const searchInput = document.getElementById('search');
    const adminSection = document.getElementById('admin-section');
    const adminForm = document.getElementById('admin-form');
    const userSelect = document.getElementById('user-select');
    const userPaymentsSection = document.getElementById('user-payments');
    
    // Datos de ejemplo para los usuarios
    const users = [
        { username: 'pepe', roles: [] },
        { username: 'juan', roles: [] },
        // Agregar más usuarios si es necesario
    ];
    
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

    function renderTable(data) {
        tableBody.innerHTML = '';
        data.forEach(payment => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${payment.id}</td>
                <td>${payment.name}</td>
                <td>${payment.date}</td>
                <td>${payment.amount}</td>
                <td>${payment.status}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    function renderUserSelect() {
        userSelect.innerHTML = '';
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.username;
            option.textContent = user.username;
            userSelect.appendChild(option);
        });
    }

    function renderUserPayments() {
        const user = users.find(user => user.username === loggedUser.username);
        if (user && user.roles.length > 0) {
            userPaymentsSection.innerHTML = '';
            user.roles.forEach(role => {
                const paymentItem = document.createElement('div');
                paymentItem.className = 'payment-item';
                paymentItem.innerHTML = `
                    <p>Fecha: ${role.date}</p>
                    <p>Monto: ${role.amount}</p>
                `;
                userPaymentsSection.appendChild(paymentItem);
            });
        } else {
            userPaymentsSection.innerHTML = '<p id="no-payments-message">No tienes roles de pagos registrados. Por favor, espere.</p>';
        }
    }

    filterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPayments = payments.filter(payment =>
            payment.name.toLowerCase().includes(searchTerm) || payment.id.includes(searchTerm)
        );
        renderTable(filteredPayments);
    });

    adminForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (loggedUser.username === 'admin1' && loggedUser.password === '12345') {
            const selectedUser = userSelect.value;
            const paymentDate = document.getElementById('payment-date').value;
            const paymentAmount = document.getElementById('payment-amount').value;

            const user = users.find(user => user.username === selectedUser);
            if (user) {
                user.roles.push({ date: paymentDate, amount: paymentAmount });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Rol de pago agregado exitosamente.');
                document.getElementById('admin-form').reset();
            } else {
                alert('Usuario no encontrado.');
            }
        } else {
            alert('No tienes permiso para realizar esta acción.');
        }
    });

    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('loggedUser');
        window.location.href = '../index.html'; // Redirigir a la página de inicio
    });

    renderTable(payments);
    renderUserSelect();
    renderUserPayments();

    if (loggedUser.username === 'admin1' && loggedUser.password === '12345') {
        adminSection.classList.add('active');
    }
});
