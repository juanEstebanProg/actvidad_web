// =========================================================
// Jay-wallet - JavaScript principal (lo usan todas las paginas)
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Inicializa los componentes de Materialize
    //    (menu lateral del celular, collapsibles, modals, etc.)
    M.AutoInit();

    // 2. Validacion del formulario de contacto
    //    Solo se ejecuta si la pagina tiene el formulario (contacto.html)
    const formulario = document.getElementById('form-contacto');
    if (formulario) {
        iniciarFormularioContacto(formulario);
    }
});

// ---------------------------------------------------------
// Formulario de contacto
// ---------------------------------------------------------
function iniciarFormularioContacto(formulario) {
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');

    // Al escribir en un campo, se borra su mensaje de error
    [nombre, correo, mensaje].forEach(function (campo) {
        campo.addEventListener('input', function () {
            limpiarError(campo);
        });
    });

    // Al dar clic en "Enviar mensaje"
    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault(); // evita que la pagina se recargue

        let esValido = true;

        // --- Nombre: obligatorio, minimo 3 letras, solo letras y espacios ---
        const valorNombre = nombre.value.trim();
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
        if (valorNombre === '') {
            mostrarError(nombre, 'El nombre es obligatorio.');
            esValido = false;
        } else if (valorNombre.length < 3) {
            mostrarError(nombre, 'El nombre debe tener al menos 3 letras.');
            esValido = false;
        } else if (!soloLetras.test(valorNombre)) {
            mostrarError(nombre, 'El nombre solo puede tener letras.');
            esValido = false;
        }

        // --- Correo: obligatorio y con formato valido (algo@algo.algo) ---
        const valorCorreo = correo.value.trim();
        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (valorCorreo === '') {
            mostrarError(correo, 'El correo es obligatorio.');
            esValido = false;
        } else if (!formatoCorreo.test(valorCorreo)) {
            mostrarError(correo, 'Escribe un correo válido, por ejemplo: nombre@correo.com');
            esValido = false;
        }

        // --- Mensaje: obligatorio, minimo 10 caracteres ---
        const valorMensaje = mensaje.value.trim();
        if (valorMensaje === '') {
            mostrarError(mensaje, 'El mensaje es obligatorio.');
            esValido = false;
        } else if (valorMensaje.length < 10) {
            mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres.');
            esValido = false;
        }

        // --- Resultado ---
        if (esValido) {
            M.toast({
                html: '¡Gracias, ' + valorNombre + '! Tu mensaje fue enviado.',
                classes: 'jw-toast-ok'
            });
            formulario.reset();
            M.updateTextFields();                // baja las etiquetas de Materialize
            M.textareaAutoResize(mensaje);       // devuelve el textarea a su tamaño
        } else {
            M.toast({
                html: 'Revisa los campos marcados en rojo.',
                classes: 'jw-toast-error'
            });
        }
    });
}

// Pone el campo en rojo y escribe el error debajo
function mostrarError(campo, texto) {
    campo.classList.add('invalid');
    document.getElementById('error-' + campo.id).textContent = texto;
}

// Quita el rojo y borra el error
function limpiarError(campo) {
    campo.classList.remove('invalid');
    document.getElementById('error-' + campo.id).textContent = '';
}