// REGISTRO
const formRegister = document.getElementById('form-register');
if (formRegister) {
    formRegister.addEventListener('submit', function (e) {
        e.preventDefault();
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            email: document.getElementById('email-registro').value,
            compania: document.getElementById('compania').value,
            pais: document.getElementById('pais').value,
            password: document.getElementById('pass-registro').value
        };

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html';
    });
}

// LOGIN
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email-login').value;
        const password = document.getElementById('pass-login').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
            alert(`Bienvenido, ${usuario.nombre}`);
           
            window.location.href = 'dashboard.html';
        } else {
            alert('Correo o contraseña incorrectos');
        }
    });
}

  