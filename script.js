/* Captura y selección de todos los elementos del DOM (Pantalla de acceso y Agenda) */
const pantallaAcceso = document.getElementById('pantalla-acceso');
const seccionRegistro = document.getElementById('seccion-registro');
const seccionLogin = document.getElementById('seccion-login');
const formulario = document.getElementById('formulario-tarea');
const listaTareas = document.getElementById('lista-tareas');
const btnModo = document.getElementById('btn-modo');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');

/* Intercambio visual entre las pestañas de iniciar sesión y registrarse */
document.getElementById('ir-a-login').addEventListener('click', () => {
    seccionRegistro.classList.add('oculto');
    seccionLogin.classList.remove('oculto');
});

document.getElementById('ir-a-registro').addEventListener('click', () => {
    seccionLogin.classList.add('oculto');
    seccionRegistro.classList.remove('oculto');
});

/* Procesamiento del formulario de registro para guardar credenciales en localStorage */
document.getElementById('form-registro').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const usuario = document.getElementById('reg-usuario').value;
    const contrasena = document.getElementById('reg-password').value;

    localStorage.setItem('usuarioRegistrado', usuario);
    localStorage.setItem('contrasenaRegistrada', contrasena);

    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    seccionRegistro.classList.add('oculto');
    seccionLogin.classList.remove('oculto');
    this.reset();
});

/* Validación de credenciales de acceso contra los datos almacenados */
document.getElementById('form-login').addEventListener('submit', function(evento) {
    evento.preventDefault();
    const usuarioIngresado = document.getElementById('log-usuario').value;
    const contrasenaIngresada = document.getElementById('log-password').value;

    const usuarioGuardado = localStorage.getItem('usuarioRegistrado');
    const contrasenaGuardada = localStorage.getItem('contrasenaRegistrada');

    if (usuarioIngresado === usuarioGuardado && contrasenaIngresada === contrasenaGuardada) {
        alert('¡Bienvenido a EduPlan!');
        pantallaAcceso.classList.add('oculto');
    } else {
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});

/* Escucha el evento de envío del formulario para procesar y estructurar la nueva tarea */
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const materia = document.getElementById('materia').value;
    const descripcion = document.getElementById('descripcion').value;
    const fecha = document.getElementById('fecha').value;

    crearElementoTarea(materia, descripcion, fecha);
    formulario.reset();
});

/* Construye la estructura HTML de la tarea y la inserta con sus botones de control en la lista */
function crearElementoTarea(materia, descripcion, fecha) {
    const li = document.createElement('li');
    li.classList.add('item-tarea');

    li.innerHTML = `
        <div>
            <strong>[${materia}]</strong> ${descripcion} <br>
            <small> Entrega: ${fecha}</small>
        </div>
        <div>
            <button class="btn-completar">✔️</button>
            <button class="btn-eliminar">❌</button>
        </div>
    `;

    const btnCompletar = li.querySelector('.btn-completar');
    btnCompletar.addEventListener('click', function() {
        li.classList.toggle('completada');
    });

    const btnEliminar = li.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', function() {
        li.remove();
    });

    listaTareas.appendChild(li);
}

/* Maneja el cambio de estilos en el cuerpo de la página para alternar el Modo Oscuro */
btnModo.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        btnModo.textContent = '☀️ Modo Claro';
    } else {
        btnModo.textContent = '🌙 Modo Oscuro';
    }
});

/* Maneja el cierre de sesión devolviendo al usuario a la pantalla de acceso */
btnCerrarSesion.addEventListener('click', function() {
    const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');
    
    if (confirmar) {
        pantallaAcceso.classList.remove('oculto');
        seccionRegistro.classList.add('oculto');
        seccionLogin.classList.remove('oculto');
        
        document.getElementById('log-usuario').value = '';
        document.getElementById('log-password').value = '';
    }
});