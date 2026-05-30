// ============================
// ESTADO DE LA APLICACIÓN
// ============================
let rolSeleccionado = null;

const rolesInfo = {
    administrador: {
        titulo: 'Administrador',
        subtitulo: 'Gestiona usuarios y sistema',
        mensaje: 'Gestiona usuarios y sistema'
    },
    docente: {
        titulo: 'Docente',
        subtitulo: 'Administra cursos y notas',
        mensaje: 'Administra cursos y notas'
    },
    estudiante: {
        titulo: 'Estudiante',
        subtitulo: 'Consulta materias y progreso',
        mensaje: 'Consulta materias y progreso'
    }
};

// ============================
// FUNCIONES PRINCIPALES
// ============================

/**
 * Selecciona un rol y muestra el panel de login
 */
function seleccionarRol(rol) {
    rolSeleccionado = rol;
    
    // Obtener información del rol
    const info = rolesInfo[rol];
    
    // Actualizar textos
    document.getElementById('rolTitulo').textContent = `Bienvenido ${info.titulo}`;
    document.getElementById('rolSubtitulo').textContent = info.subtitulo;
    
    // Transición suave
    const rolPanel = document.getElementById('rolPanel');
    const loginPanel = document.getElementById('loginPanel');
    
    rolPanel.style.animation = 'fadeOutDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    
    setTimeout(() => {
        rolPanel.style.display = 'none';
        loginPanel.style.display = 'block';
        loginPanel.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Enfoque automático en el campo de usuario
        document.getElementById('username').focus();
    }, 400);
}

/**
 * Vuelve al panel de roles
 */
function volverARoles() {
    const rolPanel = document.getElementById('rolPanel');
    const loginPanel = document.getElementById('loginPanel');
    
    loginPanel.style.animation = 'fadeOutDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    
    setTimeout(() => {
        loginPanel.style.display = 'none';
        rolPanel.style.display = 'block';
        rolPanel.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Limpiar formulario
        limpiarFormulario();
        rolSeleccionado = null;
    }, 400);
}

/**
 * Inicia sesión con validaciones
 */
function iniciarSesion(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validaciones
    if (!username || !password) {
        mostrarError('Por favor completa todos los campos');
        return;
    }
    
    if (username.length < 3) {
        mostrarError('El nombre de usuario debe tener al menos 3 caracteres');
        return;
    }
    
    if (password.length < 4) {
        mostrarError('La contraseña debe tener al menos 4 caracteres');
        return;
    }
    
    // Simular inicio de sesión
    procesarLogin(username, password);
}

/**
 * Procesa el login con simulación
 */
function procesarLogin(username, password) {
    const btnLogin = document.querySelector('.btn-login');
    const textoOriginal = btnLogin.textContent;
    
    // Desactivar botón y mostrar carga
    btnLogin.disabled = true;
    btnLogin.textContent = 'Cargando...';
    btnLogin.style.opacity = '0.7';
    
    // Simular petición al servidor
    setTimeout(() => {
        // Validación simulada (en producción ir a backend)
        const credencialesValidas = validarCredenciales(username, password);
        
        if (credencialesValidas) {
            // Login exitoso
            mostrarExito(username);
        } else {
            // Login fallido
            btnLogin.disabled = false;
            btnLogin.textContent = textoOriginal;
            btnLogin.style.opacity = '1';
            mostrarError('Usuario o contraseña incorrectos');
        }
    }, 1500);
}

/**
 * Valida credenciales (simulado)
 */
function validarCredenciales(username, password) {
    // Simulación: cualquier usuario con contraseña válida funciona
    // En producción, esto iría al backend
    return username.length >= 3 && password.length >= 4;
}

/**
 * Muestra mensaje de error
 */
function mostrarError(mensaje) {
    const alerta = crearAlerta(mensaje, 'error');
    document.body.insertBefore(alerta, document.body.firstChild);
    
    setTimeout(() => {
        alerta.style.animation = 'slideOutUp 0.4s ease-out forwards';
        setTimeout(() => alerta.remove(), 400);
    }, 4000);
}

/**
 * Muestra mensaje de éxito
 */
function mostrarExito(username) {
    const alerta = crearAlerta(
        `¡Bienvenido ${username}! Iniciando sesión como ${rolSeleccionado}...`,
        'exito'
    );
    document.body.insertBefore(alerta, document.body.firstChild);
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
        // Aquí iría la redirección real
        console.log(`Redirigiendo a ${rolSeleccionado} dashboard`);
        alert(`Sesión iniciada exitosamente como ${rolSeleccionado}`);
        
        // Limpiar y volver a roles
        limpiarFormulario();
        volverARoles();
    }, 2000);
}

/**
 * Crea un elemento de alerta
 */
function crearAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.innerHTML = `
        <div class="alerta-contenido">
            <span class="alerta-icono">${tipo === 'error' ? '✕' : '✓'}</span>
            <span class="alerta-texto">${mensaje}</span>
        </div>
    `;
    
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.4s ease-out;
        max-width: 500px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        ${tipo === 'error' 
            ? 'background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); color: white;'
            : 'background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white;'
        }
    `;
    
    return alerta;
}

/**
 * Limpia el formulario
 */
function limpiarFormulario() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// ============================
// ANIMACIONES CSS DINÁMICAS
// ============================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-100px);
        }
    }
    
    .alerta-contenido {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .alerta-icono {
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    .alerta-texto {
        flex: 1;
    }
    
    @media (max-width: 480px) {
        .alerta {
            top: 10px !important;
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(style);

// ============================
// EVENT LISTENERS
// ============================

// Permitir Enter para iniciar sesión
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.querySelector('.btn-login').click();
            }
        });
    }
});

// Validar campos en tiempo real
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.form-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', (e) => {
            e.target.parentElement.style.transform = 'scale(1.02)';
            e.target.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', (e) => {
            e.target.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Prevenir envío múltiple
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('.btn-login');
            if (btn.disabled) {
                e.preventDefault();
            }
        });
    }
});