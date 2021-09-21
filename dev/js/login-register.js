const topbar = document.getElementById('topbar');

//modal de login
const loginModal = document.getElementById('login-modal');
//modal de register
const registerModal = document.getElementById('register-modal');

// form de login
const loginForm = document.getElementById('login-form');
//form de register
const registerForm = document.getElementById('register-form');

if (topbar) {
    topbar.addEventListener('click', (e) => {
        // e.preventDefault();
        if (e.target.parentElement.dataset.type != undefined) {
            // console.log('Hola soy login');
            if (e.target.parentElement.dataset.type == 'login') {
                loginModal.classList.add('lightbox--show');
            } else if (e.target.parentElement.dataset.type == 'register') {
                registerModal.classList.add('lightbox--show');
            }
        }
    });
}

if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox')) {
            loginModal.classList.remove('lightbox--show');
        }
    });
}

if (registerModal) {
    registerModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox')) {
            if (confirm('Desea salir de la ventana de registro?')) {
                registerModal.classList.remove('lightbox--show');
            }
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        setTimeout(() => {
            e.target.button.blur();
        },200)
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}