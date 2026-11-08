export type UserRole = "admin" | "cliente";

export interface User {
  id: string;
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  contrasena: string;
  fechaNacimiento?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  tipoUsuario: UserRole;
}