
import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";

import "../usuarios_admin.css";

import {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
} from "../services/userService";

import type { User } from "../types/User";
import { regiones } from "../data/regiones";

type FormularioAdmin = {
  run: string;
  contrasena: string;
  nombre: string;
  apellidos: string;
  correo: string;
  fechaNacimiento: string;
  direccion: string;
  region: string;
  comuna: string;
  tipoUsuario: "cliente" | "admin";
};

type ErroresAdmin = Partial<Record<keyof FormularioAdmin, string>>;

const dominiosPermitidos = [
  "@duoc.cl",
  "@profesor.duoc.cl",
  "@gmail.com",
];

const formularioInicial: FormularioAdmin = {
  run: "",
  contrasena: "",
  nombre: "",
  apellidos: "",
  correo: "",
  fechaNacimiento: "",
  direccion: "",
  region: "",
  comuna: "",
  tipoUsuario: "cliente",
};

function obtenerFechaActual(): string {
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${anio}-${mes}-${dia}`;
}

function normalizarRUN(run: string): string {
  return run.replace(/[.\-]/g, "").trim().toUpperCase();
}

function validarRUN(runOriginal: string): boolean {
  const run = normalizarRUN(runOriginal);
  const cuerpo = run.slice(0, -1);
  const digitoIngresado = run.slice(-1);

  if (!/^\d+[0-9K]$/.test(run)) return false;

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador++;

    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  const resultado = 11 - (suma % 11);

  let digitoEsperado: string;

  if (resultado === 11) {
    digitoEsperado = "0";
  } else if (resultado === 10) {
    digitoEsperado = "K";
  } else {
    digitoEsperado = resultado.toString();
  }

  return digitoIngresado === digitoEsperado;
}

function correoValido(correo: string): boolean {
  const correoMinuscula = correo.toLowerCase();

  return dominiosPermitidos.some((dominio) =>
    correoMinuscula.endsWith(dominio)
  );
}

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [usuarioEditando, setUsuarioEditando] =
    useState<User | null>(null);

  const [formulario, setFormulario] =
    useState<FormularioAdmin>(formularioInicial);

  const [errores, setErrores] = useState<ErroresAdmin>({});
  const [mensajeGlobal, setMensajeGlobal] = useState("");

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function cargarUsuarios() {
    setUsuarios(getUsers());
  }

  const comunasDisponibles = formulario.region
    ? regiones[formulario.region] ?? []
    : [];

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termino = busqueda.toLowerCase().trim();

    return (
      usuario.run.toLowerCase().includes(termino) ||
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.apellidos.toLowerCase().includes(termino) ||
      usuario.correo.toLowerCase().includes(termino) ||
      usuario.tipoUsuario.toLowerCase().includes(termino)
    );
  });

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

    setMensajeGlobal("");
  }

  function validarFormulario(): ErroresAdmin {
    const nuevosErrores: ErroresAdmin = {};

    const run = normalizarRUN(formulario.run);
    const nombre = formulario.nombre.trim();
    const apellidos = formulario.apellidos.trim();
    const correo = formulario.correo.trim();
    const contrasena = formulario.contrasena;
    const fechaNacimiento = formulario.fechaNacimiento;
    const direccion = formulario.direccion.trim();

    if (!run) {
      nuevosErrores.run = "El RUN es obligatorio.";
    } else if (run.length < 7 || run.length > 9) {
      nuevosErrores.run =
        "El RUN debe tener entre 7 y 9 caracteres.";
    } else if (!/^[0-9]+[0-9K]$/.test(run)) {
      nuevosErrores.run =
        "El RUN debe contener solo números y K.";
    } else if (!validarRUN(run)) {
      nuevosErrores.run = "El RUN no es válido.";
    }

    if (!nombre) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (nombre.length > 50) {
      nuevosErrores.nombre =
        "El nombre no puede superar los 50 caracteres.";
    }

    if (!apellidos) {
      nuevosErrores.apellidos = "Los apellidos son obligatorios.";
    } else if (apellidos.length > 100) {
      nuevosErrores.apellidos =
        "Los apellidos no pueden superar los 100 caracteres.";
    }

    if (!correo) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (correo.length > 100) {
      nuevosErrores.correo =
        "El correo no puede superar los 100 caracteres.";
    } else if (!correoValido(correo)) {
      nuevosErrores.correo =
        "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }

    // En edición, una contraseña vacía conserva la anterior.
    if (!usuarioEditando || contrasena) {
      if (!contrasena) {
        nuevosErrores.contrasena =
          "La contraseña es obligatoria.";
      } else if (
        contrasena.length < 4 ||
        contrasena.length > 10
      ) {
        nuevosErrores.contrasena =
          "La contraseña debe tener entre 4 y 10 caracteres.";
      }
    }

    if (!fechaNacimiento) {
      nuevosErrores.fechaNacimiento =
        "La fecha de nacimiento es obligatoria.";
    } else if (fechaNacimiento > obtenerFechaActual()) {
      nuevosErrores.fechaNacimiento =
        "La fecha de nacimiento no puede ser futura.";
    }

    if (!formulario.region) {
      nuevosErrores.region = "Debes seleccionar una región.";
    }

    if (!formulario.comuna) {
      nuevosErrores.comuna = "Debes seleccionar una comuna.";
    } else if (
      !comunasDisponibles.includes(formulario.comuna)
    ) {
      nuevosErrores.comuna =
        "La comuna no corresponde a la región seleccionada.";
    }

    if (!direccion) {
      nuevosErrores.direccion =
        "La dirección es obligatoria.";
    } else if (direccion.length > 300) {
      nuevosErrores.direccion =
        "La dirección no puede superar los 300 caracteres.";
    }

    return nuevosErrores;
  }

  function abrirCrear() {
    setUsuarioEditando(null);
    setFormulario(formularioInicial);
    setErrores({});
    setMensajeGlobal("");
    setIsFormOpen(true);
  }

  function abrirEditar(usuario: User) {
    setUsuarioEditando(usuario);

    setFormulario({
      run: usuario.run,
      contrasena: "",
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      correo: usuario.correo,
      fechaNacimiento: usuario.fechaNacimiento ?? "",
      direccion: usuario.direccion ?? "",
      region: usuario.region ?? "",
      comuna: usuario.comuna ?? "",
      tipoUsuario: usuario.tipoUsuario,
    });

    setErrores({});
    setMensajeGlobal("");
    setIsFormOpen(true);
  }

  function cerrarFormulario() {
    setIsFormOpen(false);
    setUsuarioEditando(null);
    setFormulario(formularioInicial);
    setErrores({});
  }

  function manejarSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensajeGlobal("");

    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const runLimpio = normalizarRUN(formulario.run);
    const correoTrim = formulario.correo.trim();

    // Evitar RUN y correo duplicados.
    const duplicado = usuarios.some((usuario) => {
      if (
        usuarioEditando &&
        usuario.id === usuarioEditando.id
      ) {
        return false;
      }

      return (
        normalizarRUN(usuario.run) === runLimpio ||
        usuario.correo.toLowerCase() ===
          correoTrim.toLowerCase()
      );
    });

    if (duplicado) {
      setMensajeGlobal(
        "Ya existe un usuario registrado con este RUN o correo."
      );
      return;
    }

    const nuevoUsuario: User = {
      id: usuarioEditando?.id ?? crypto.randomUUID(),
      run: runLimpio,
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      correo: correoTrim,
      contrasena:
        formulario.contrasena ||
        usuarioEditando?.contrasena ||
        "",
      fechaNacimiento: formulario.fechaNacimiento,
      direccion: formulario.direccion.trim(),
      region: formulario.region,
      comuna: formulario.comuna,
      tipoUsuario: formulario.tipoUsuario,
    };

    try {
      if (usuarioEditando) {
        updateUser(nuevoUsuario);
      } else {
        registerUser(nuevoUsuario);
      }

      cargarUsuarios();

      setMensajeGlobal(
        usuarioEditando
          ? "Usuario actualizado correctamente."
          : "Usuario creado correctamente."
      );

      cerrarFormulario();
    } catch {
      setMensajeGlobal(
        "No fue posible guardar el usuario. Comprueba los datos."
      );
    }
  }

  function eliminar(id: string, nombre: string) {
    if (
      confirm(
        `¿Seguro que deseas eliminar la cuenta de ${nombre}?`
      )
    ) {
      deleteUser(id);
      cargarUsuarios();
      setMensajeGlobal("Usuario eliminado correctamente.");
    }
  }

  return (
    <main>
      <section className="usuarios-admin">
        <div className="contenedor">
          <div className="usuarios-encabezado">
            <span>ADMINISTRACIÓN</span>
            <h1>Gestión de Usuarios</h1>
            <p>
              Administra las cuentas y permisos de los usuarios.
            </p>
          </div>

          {mensajeGlobal && (
            <div className="mensaje-global" role="status">
              {mensajeGlobal}
            </div>
          )}

          <div className="usuarios-panel">
            <div className="usuarios-toolbar">
              <input
                type="search"
                id="buscarUsuario"
                placeholder="Buscar usuario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                type="button"
                id="btnCrearUsuario"
                onClick={abrirCrear}
              >
                + Crear usuario
              </button>
            </div>

            {isFormOpen && (
              <div className="formulario-usuario activo">
                <div className="formulario-usuario-encabezado">
                  <div>
                    <span>ADMINISTRACIÓN</span>
                    <h2>
                      {usuarioEditando
                        ? "Editar usuario"
                        : "Crear usuario"}
                    </h2>
                    <p>
                      {usuarioEditando
                        ? "Modifica los datos de la cuenta."
                        : "Completa los datos para crear una cuenta."}
                    </p>
                  </div>

                  <button
                    type="button"
                    id="btnCerrarFormulario"
                    onClick={cerrarFormulario}
                  >
                    ✕
                  </button>
                </div>

                <form
                  id="formCrearUsuario"
                  onSubmit={manejarSubmit}
                  noValidate
                >
                  <div className="formulario-usuario-grid">
                    <div className="campo">
                      <label htmlFor="nuevoRun">RUN</label>
                      <input
                        type="text"
                        id="nuevoRun"
                        name="run"
                        value={formulario.run}
                        onChange={manejarCambio}
                        minLength={7}
                        maxLength={9}
                        placeholder="Ej: 19011022K"
                      />
                      {errores.run && (
                        <span className="error">
                          {errores.run}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoNombre">Nombre</label>
                      <input
                        type="text"
                        id="nuevoNombre"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        maxLength={50}
                        placeholder="Ingresa el nombre"
                      />
                      {errores.nombre && (
                        <span className="error">
                          {errores.nombre}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoApellidos">
                        Apellidos
                      </label>
                      <input
                        type="text"
                        id="nuevoApellidos"
                        name="apellidos"
                        value={formulario.apellidos}
                        onChange={manejarCambio}
                        maxLength={100}
                        placeholder="Ingresa los apellidos"
                      />
                      {errores.apellidos && (
                        <span className="error">
                          {errores.apellidos}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoCorreo">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="nuevoCorreo"
                        name="correo"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        maxLength={100}
                        placeholder="ejemplo@gmail.com"
                      />
                      {errores.correo && (
                        <span className="error">
                          {errores.correo}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoContrasena">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="nuevoContrasena"
                        name="contrasena"
                        value={formulario.contrasena}
                        onChange={manejarCambio}
                        minLength={4}
                        maxLength={10}
                        placeholder={
                          usuarioEditando
                            ? "Vacío para conservar la actual"
                            : "4 a 10 caracteres"
                        }
                      />
                      {errores.contrasena && (
                        <span className="error">
                          {errores.contrasena}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoFecha">
                        Fecha de nacimiento
                      </label>
                      <input
                        type="date"
                        id="nuevoFecha"
                        name="fechaNacimiento"
                        value={formulario.fechaNacimiento}
                        onChange={manejarCambio}
                        max={obtenerFechaActual()}
                      />
                      {errores.fechaNacimiento && (
                        <span className="error">
                          {errores.fechaNacimiento}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoDireccion">
                        Dirección
                      </label>
                      <input
                        type="text"
                        id="nuevoDireccion"
                        name="direccion"
                        value={formulario.direccion}
                        onChange={manejarCambio}
                        maxLength={300}
                        placeholder="Ingresa la dirección"
                      />
                      {errores.direccion && (
                        <span className="error">
                          {errores.direccion}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoRegion">Región</label>
                      <select
                        id="nuevoRegion"
                        name="region"
                        value={formulario.region}
                        onChange={manejarCambio}
                      >
                        <option value="">
                          Selecciona una región
                        </option>

                        {Object.keys(regiones).map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>

                      {errores.region && (
                        <span className="error">
                          {errores.region}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoComuna">Comuna</label>
                      <select
                        id="nuevoComuna"
                        name="comuna"
                        value={formulario.comuna}
                        onChange={manejarCambio}
                        disabled={!formulario.region}
                      >
                        <option value="">
                          Selecciona una comuna
                        </option>

                        {comunasDisponibles.map((comuna) => (
                          <option key={comuna} value={comuna}>
                            {comuna}
                          </option>
                        ))}
                      </select>

                      {errores.comuna && (
                        <span className="error">
                          {errores.comuna}
                        </span>
                      )}
                    </div>

                    <div className="campo">
                      <label htmlFor="nuevoTipo">
                        Tipo de usuario
                      </label>
                      <select
                        id="nuevoTipo"
                        name="tipoUsuario"
                        value={formulario.tipoUsuario}
                        onChange={manejarCambio}
                      >
                        <option value="cliente">Cliente</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                  </div>

                  <div className="formulario-usuario-acciones">
                    <button
                      type="submit"
                      className="btn-guardar-usuario"
                    >
                      {usuarioEditando
                        ? "Guardar cambios"
                        : "Crear usuario"}
                    </button>

                    <button
                      type="button"
                      className="btn-cancelar-usuario"
                      id="btnCancelarFormulario"
                      onClick={cerrarFormulario}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="tabla-contenedor">
              <table className="tabla-usuarios">
                <thead>
                  <tr>
                    <th>RUN</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Tipo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody id="listaUsuarios">
                  {usuariosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{ textAlign: "center" }}
                      >
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  ) : (
                    usuariosFiltrados.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.run}</td>

                        <td>
                          {usuario.nombre} {usuario.apellidos}
                        </td>

                        <td>{usuario.correo}</td>

                        <td>
                          {usuario.tipoUsuario === "admin"
                            ? "Administrador"
                            : "Cliente"}
                        </td>

                        <td>
                          <button
                            type="button"
                            onClick={() => abrirEditar(usuario)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="btn-eliminar"
                            onClick={() =>
                              eliminar(usuario.id, usuario.nombre)
                            }
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
