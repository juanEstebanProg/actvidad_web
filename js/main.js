// =========================================================
// Jay-wallet - JavaScript principal (lo usan todas las paginas)
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Inicializa los componentes de Materialize
    //    (menu lateral del celular, collapsibles, modals, etc.)
    M.AutoInit();

    // 2. Mensaje de bienvenida (solo en index.html)
    if (document.getElementById('inicio')) {
        M.toast({ html: '¡Bienvenido a Jay-wallet! 👋', classes: 'jw-toast-ok' });
    }

    // 3. Validacion del formulario de contacto (solo en contacto.html)
    const formulario = document.getElementById('form-contacto');
    if (formulario) {
        iniciarFormularioContacto(formulario);
    }

    // 4. Filtros y "Ver detalle" de avances (solo en avances.html)
    iniciarAvances();
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

// ---------------------------------------------------------
// Avances: filtros por estado y boton "Ver detalle" (parte de Yilmar)
// ---------------------------------------------------------
function iniciarAvances() {
    const filterButtons = document.querySelectorAll("[data-filter]");
    const progressItems = document.querySelectorAll(".progress-item");
    const noResults = document.querySelector(".no-results");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.dataset.filter;
            let visibleItems = 0;

            filterButtons.forEach(function (filterButton) {
                const isActive = filterButton === button;
                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            progressItems.forEach(function (item) {
                const isVisible = filter === "todos" || item.dataset.status === filter;
                item.hidden = !isVisible;
                if (isVisible) {
                    visibleItems += 1;
                }
            });

            if (noResults) {
                noResults.hidden = visibleItems > 0;
            }
        });
    });

    document.querySelectorAll("[data-toggle-details]").forEach(function (button) {
        button.addEventListener("click", function () {
            const detail = document.getElementById(button.dataset.toggleDetails);
            if (!detail) {
                return;
            }

            const isExpanded = button.getAttribute("aria-expanded") === "true";
            detail.hidden = isExpanded;
            button.setAttribute("aria-expanded", String(!isExpanded));
            button.firstChild.textContent = isExpanded ? "Ver detalle " : "Ocultar detalle ";
        });
    });
}