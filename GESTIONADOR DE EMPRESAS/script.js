        // Función para encriptar la contraseña
        async function encriptarContraseña(contraseña) {
            const encoder = new TextEncoder();
            const data = encoder.encode(contraseña);
            const hash = await crypto.subtle.digest('SHA-256', data);
            return Array.from(new Uint8Array(hash))
                .map(byte => byte.toString(16).padStart(2, '0'))
                .join('');
        }

        // Función para registrar un nuevo usuario
        async function registrarUsuario(usuario, contraseña) {
            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};

            // Verificar si el usuario ya existe
            if (usuariosRegistrados[usuario]) {
                window.location.href = "inicio.html";
                return "Este usuario ya está registrado.";
            }   

            // Encriptar la contraseña
            const contraseñaEncriptada = await encriptarContraseña(contraseña);

            // Guardar usuario y contraseña en localStorage
            usuariosRegistrados[usuario] = contraseñaEncriptada;
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

            //Redirección a página de inicio de sesión
            window.location.href = "inicio.html";

            return "Usuario registrado exitosamente.";
        }

        // Función para verificar el inicio de sesión
        async function iniciarSesion(usuario, contraseña) {
            let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};

            // Verificar si el usuario existe
            if (!usuariosRegistrados[usuario]) {
                return "Este usuario no está registrado.";
            }

            // Encriptar la contraseña proporcionada
            const contraseñaEncriptada = await encriptarContraseña(contraseña);

            // Verificar si la contraseña coincide
            if (usuariosRegistrados[usuario] === contraseñaEncriptada) {
                // Redirigir a una página en blanco si la contraseña es correcta
                window.location.href = "pagina_blanca.html"; // Aquí pones la URL de destino
                return "Inicio de sesión exitoso.";
            } else {
                return "Contraseña incorrecta.";
            }
        }

        // Manejar el formulario de registro
        async function manejarRegistro(event) {
            event.preventDefault();
            const usuario = document.getElementById('usuario-registro').value;
            const contraseña = document.getElementById('contraseña-registro').value;

            const resultado = await registrarUsuario(usuario, contraseña);
            document.getElementById('mensaje-registro').textContent = resultado;
        }

        // Manejar el formulario de inicio de sesión
        async function manejarInicioSesion(event) {
            event.preventDefault();
            const usuario = document.getElementById('usuario-inicio').value;
            const contraseña = document.getElementById('contraseña-inicio').value;

            const resultado = await iniciarSesion(usuario, contraseña);
            document.getElementById('mensaje-inicio').textContent = resultado;
        }

        