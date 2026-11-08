

import { useState } from "react";
import { getUserByEmail } from "../services/userService";

const dominiosPermitidos = [
  "@duoc.cl",
  "@profesor.duoc.cl",
  "@gmail.com"
];

function correoValido(correo: string): boolean {
  const correoMinuscula = correo.toLowerCase();

  return dominiosPermitidos.some((dominio) =>
    correoMinuscula.endsWith(dominio)
  );
}

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Limpiar mensajes anteriores
    setErrorCorreo("");
    setErrorContrasena("");
    setMensajeLogin("");

    // Obtener los valores ingresados
    const correoIngresado = correo.trim();
    const contrasenaIngresada = contrasena.trim();

    let valido = true;

    // ==========================================
    // 1. VALIDAR CORREO
    // ==========================================

    if (correoIngresado === "") {
      setErrorCorreo("El correo es obligatorio.");
      valido = false;
    } else if (correoIngresado.length > 100) {
      setErrorCorreo("El correo no puede superar los 100 caracteres.");
      valido = false;
    } else if (!correoValido(correoIngresado)) {
      setErrorCorreo(
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );
      valido = false;
    }

    // ==========================================
    // 2. VALIDAR CONTRASEÑA
    // ==========================================

    if (contrasenaIngresada === "") {
      setErrorContrasena("La contraseña es obligatoria.");
      valido = false;
    } else if (
      contrasenaIngresada.length < 4 ||
      contrasenaIngresada.length > 10
    ) {
      setErrorContrasena(
        "La contraseña debe tener entre 4 y 10 caracteres."
      );
      valido = false;
    }

    // Detener el inicio de sesión si hay errores
    if (!valido) {
      return;
    }

    // ==========================================
    // 3. BUSCAR USUARIO
    // ==========================================

    const usuario = getUserByEmail(correoIngresado);

    if (!usuario || usuario.contrasena !== contrasenaIngresada) {
      setMensajeLogin("Correo o contraseña incorrectos.");
      return;
    }

    // ==========================================
    // 4. INICIO DE SESIÓN CORRECTO
    // ==========================================

    setMensajeLogin("Inicio de sesión correcto.");

    console.log("Usuario conectado:", usuario);
  };

  return (
    <>
      {/* Header */}
      <header>
        {/* Aquí incorporaremos el componente Header */}
      </header>

      <main className="login-container">
        <section className="login-card">
          <h1>Iniciar sesión</h1>

          <p>Ingresa a tu cuenta de Pastelería 1000 Sabores</p>

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="campo">
              <label htmlFor="correo">Correo electrónico</label>

              <input
                type="email"
                id="correo"
                name="correo"
                maxLength={100}
                placeholder="ejemplo@gmail.com"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
              />

              <span className="error" id="errorCorreo">
                {errorCorreo}
              </span>
            </div>

            <div className="campo">
              <label htmlFor="contrasena">Contraseña</label>

              <input
                type="password"
                id="contrasena"
                name="contrasena"
                minLength={4}
                maxLength={10}
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(event) => setContrasena(event.target.value)}
              />

              <span className="error" id="errorContrasena">
                {errorContrasena}
              </span>
            </div>

            <span className="error mensaje-login" id="mensajeLogin">
              {mensajeLogin}
            </span>

            <button type="submit">Iniciar sesión</button>
          </form>

          <div className="crear-cuenta">
            <span>¿No tienes una cuenta todavía?</span>
            <a href="/registro">Crear cuenta</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        {/* Aquí incorporaremos el componente Footer */}
      </footer>
    </>
  );
}

export default Login;

