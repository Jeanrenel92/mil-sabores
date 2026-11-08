import { useState, type ChangeEvent, type FormEvent } from "react";
import "../registro.css";

import { getUserByEmail, registerUser } from "../services/userService";
import type { User } from "../types/User";
import { regiones } from "../data/regiones";

const dominiosPermitidos = [
  "@duoc.cl",
  "@profesor.duoc.cl",
  "@gmail.com",
];

function correoValido(correo: string): boolean {
  const correoMinuscula = correo.toLowerCase();
  return dominiosPermitidos.some((dominio) =>
    correoMinuscula.endsWith(dominio)
  );
}

export default function Registro() {
  const [formulario, setFormulario] = useState({
    run: "",
    contrasena: "",
    nombre: "",
    apellidos: "",
    correo: "",
    fechaNacimiento: "",
    direccion: "",
    region: "",
    comuna: "",
    tipoUsuario: "cliente" as const,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mensajeRegistro, setMensajeRegistro] = useState("");

  const comunasDisponibles = formulario.region
    ? regiones[formulario.region] ?? []
    : [];

  function manejarCambio(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setFormulario((actual) => ({
      ...actual,
      [name]: value,
      ...(name === "region" ? { comuna: "" } : {}),
    }));

    setErrores((actual) => ({
      ...actual,
      [name]: "",
      ...(name === "region" ? { comuna: "" } : {}),
    }));

    setMensajeRegistro("");
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensajeRegistro("");

    const nuevosErrores: Record<string, string> = {};

    if (!formulario.run.trim()) {
      nuevosErrores.run = "El RUN es obligatorio.";
    }
    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    
    // Validación del correo usando dominiosPermitidos
    const correoTrim = formulario.correo.trim();
    if (!correoTrim) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!correoValido(correoTrim)) {
      nuevosErrores.correo = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    if (!formulario.contrasena) {
      nuevosErrores.contrasena = "La contraseña es obligatoria.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    const usuarioExistente = getUserByEmail(correoTrim);
    if (usuarioExistente) {
      setMensajeRegistro("Ya existe una cuenta registrada con este correo.");
      return;
    }

    const nuevoUsuario: User = {
      id: crypto.randomUUID(),
      ...formulario,
      correo: correoTrim,
    };

    try {
      registerUser(nuevoUsuario);
      setMensajeRegistro("¡Cuenta creada exitosamente!");
    } catch {
      setMensajeRegistro("Error al registrar el usuario.");
    }
  };

  return (
    <main className="registro-container">
      <section className="registro-card">
        <h1>Crear cuenta</h1>
        <p>Regístrate en Pastelería 1000 Sabores</p>

        {mensajeRegistro && (
          <div className="mensaje-global" role="status">
            {mensajeRegistro}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="campo">
            <label htmlFor="run">RUN</label>
            <input
              type="text"
              id="run"
              name="run"
              value={formulario.run}
              onChange={manejarCambio}
              placeholder="Ej: 19011022K"
            />
            {errores.run && <span className="error">{errores.run}</span>}
          </div>

          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Tu nombre"
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          <div className="campo">
            <label htmlFor="correo">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formulario.correo}
              onChange={manejarCambio}
              placeholder="ejemplo@gmail.com"
            />
            {errores.correo && <span className="error">{errores.correo}</span>}
          </div>

          <div className="campo">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formulario.contrasena}
              onChange={manejarCambio}
              placeholder="Entre 4 y 10 caracteres"
            />
            {errores.contrasena && <span className="error">{errores.contrasena}</span>}
          </div>

          <div className="campo">
            <label htmlFor="region">Región</label>
            <select
              id="region"
              name="region"
              value={formulario.region}
              onChange={manejarCambio}
            >
              <option value="">Selecciona una región</option>
              {Object.keys(regiones).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="comuna">Comuna</label>
            <select
              id="comuna"
              name="comuna"
              value={formulario.comuna}
              onChange={manejarCambio}
              disabled={!formulario.region}
            >
              <option value="">Selecciona una comuna</option>
              {comunasDisponibles.map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Registrarse</button>
        </form>
      </section>
    </main>
  );
}