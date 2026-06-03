let rolSeleccionado = null;

const rolesInfo = {
    administrador: {
        titulo: 'Administrador',
        pagina: 'administrador.html'
    },
    docente: {
        titulo: 'Docente',
        pagina: 'docente.html'
    },
    estudiante: {
        titulo: 'Estudiante',
        pagina: 'estudiante.html'
    }
};

function seleccionarRol(rol) {
    rolSeleccionado = rol;
    const info = rolesInfo[rol];
    
    document.getElementById('rolSubtitulo').textContent = info.titulo;
    
    document.getElementById('rolPanel').style.display = 'none';
    document.getElementById('loginPanel').style.display = 'grid';
    
    document.getElementById('username').focus();
}

function volverARoles() {
    document.getElementById('loginPanel').style.display = 'none';
    document.getElementById('rolPanel').style.display = 'block';
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    rolSeleccionado = null;
}

function iniciarSesion(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    if (username.length < 3) {
        alert('El nombre de usuario debe tener al menos 3 caracteres');
        return;
    }
    
    if (password.length < 4) {
        alert('La contraseña debe tener al menos 4 caracteres');
        return;
    }
    
    procesarLogin(username, password);
}

function procesarLogin(username, password) {
    const btn = document.querySelector('.btn-ingresar');
    const textoOriginal = btn.textContent;
    
    btn.disabled = true;
    btn.textContent = 'Cargando...';
    
    setTimeout(() => {
        if (validarCredenciales(username, password)) {
            localStorage.setItem('usuarioActual', username);
            localStorage.setItem('rolActual', rolSeleccionado);

            window.location.href = "paneles-mentorias/paneles.html";
        } else {
            btn.disabled = false;
            btn.textContent = textoOriginal;
            alert('Usuario o contraseña incorrectos');
        }
    }, 1000);
}

function validarCredenciales(username, password) {
    return username.length >= 3 && password.length >= 4;
}