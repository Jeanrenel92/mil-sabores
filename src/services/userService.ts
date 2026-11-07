
import type { User } from "../types/User";

const STORAGE_KEY = "milSabores_usuarios";

// Obtener todos los usuarios
export function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data) as User[];
}

// Guardar usuarios
function saveUsers(users: User[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(users)
  );
}

// Buscar usuario por correo
export function getUserByEmail(
  correo: string
): User | undefined {
  return getUsers().find(
    user => user.correo.toLowerCase() === correo.toLowerCase()
  );
}

// Registrar usuario
export function registerUser(
  user: User
): User {
  const users = getUsers();

  const existingUser = users.find(
    u => u.correo.toLowerCase() === user.correo.toLowerCase()
  );

  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  users.push(user);

  saveUsers(users);

  return user;
}

// Actualizar usuario
export function updateUser(
  updatedUser: User
): void {
  const users = getUsers();

  const updatedUsers = users.map(user =>
    user.id === updatedUser.id
      ? updatedUser
      : user
  );

  saveUsers(updatedUsers);
}

// Eliminar usuario
export function deleteUser(
  id: string
): void {
  const users = getUsers();

  const updatedUsers = users.filter(
    user => user.id !== id
  );

  saveUsers(updatedUsers);
}
