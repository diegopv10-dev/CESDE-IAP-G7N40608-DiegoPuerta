let progresosList = [];
let mentoriasList = [];



document.getElementById('progreso-slider').addEventListener('input', function() {
    document.getElementById('progreso-valor').textContent = this.value + '%';
});


function guardarProgreso() {
    const estudiante = document.getElementById('estudiante').value;
    const progreso = document.getElementById('progreso-slider').value;
    const notas = document.getElementById('notas-progreso').value;

    if (!notas.trim()) {
        alert('Por favor escribe las notas');
        return;
    }

    
    const registro = {
        id: Date.now(),
        estudiante: estudiante,
        progreso: progreso,
        notas: notas
    };

    
    progresosList.push(registro);

   
    document.getElementById('progreso-slider').value = 0;
    document.getElementById('progreso-valor').textContent = '0%';
    document.getElementById('notas-progreso').value = '';

    
    mostrarTablaProgreso();
    alert('✅ Progreso guardado');
}


function mostrarTablaProgreso() {
    const tabla = document.getElementById('tabla-progreso');
    
    
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    if (progresosList.length === 0) {
        const fila = tabla.insertRow();
        fila.innerHTML = '<td colspan="4" class="vacio">No hay registros</td>';
        return;
    }

    progresosList.forEach(item => {
        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${item.estudiante}</td>
            <td>${item.progreso}%</td>
            <td>${item.notas}</td>
            <td><button onclick="eliminarProgreso(${item.id})">Eliminar</button></td>
        `;
    });
}

function eliminarProgreso(id) {
    progresosList = progresosList.filter(item => item.id !== id);
    mostrarTablaProgreso();
    alert('❌ Registro eliminado');
}


document.getElementById('calificacion-slider').addEventListener('input', function() {
    document.getElementById('calificacion-valor').textContent = this.value + '/10';
});


function guardarMentoria() {
    const mentor = document.getElementById('mentor').value;
    const calificacion = document.getElementById('calificacion-slider').value;
    const comentarios = document.getElementById('comentarios-mentoria').value;

    if (!comentarios.trim()) {
        alert('Por favor escribe un comentario');
        return;
    }

    const registro = {
        id: Date.now(),
        mentor: mentor,
        calificacion: calificacion,
        comentarios: comentarios,
        estrellas: '⭐'.repeat(Math.round(calificacion / 2))
    };

    mentoriasList.push(registro);

    document.getElementById('calificacion-slider').value = 1;
    document.getElementById('calificacion-valor').textContent = '1/10';
    document.getElementById('comentarios-mentoria').value = '';

    mostrarTablaMentoria();
    alert('✅ Evaluación guardada');
}

function mostrarTablaMentoria() {
    const tabla = document.getElementById('tabla-mentoria');
    
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }

    if (mentoriasList.length === 0) {
        const fila = tabla.insertRow();
        fila.innerHTML = '<td colspan="4" class="vacio">No hay evaluaciones</td>';
        return;
    }

    mentoriasList.forEach(item => {
        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${item.mentor}</td>
            <td>${item.calificacion}/10 ${item.estrellas}</td>
            <td>${item.comentarios}</td>
            <td><button onclick="eliminarMentoria(${item.id})">Eliminar</button></td>
        `;
    });
}

function eliminarMentoria(id) {
    mentoriasList = mentoriasList.filter(item => item.id !== id);
    mostrarTablaMentoria();
    alert('❌ Evaluación eliminada');
}


function mostrarTab(tabName) {

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');

    event.target.classList.add('active');
}