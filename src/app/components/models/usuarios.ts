import { Roles } from "./roles";
export class  Usuarios {
    id: number;
    username: string;
    password: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: number;

    roles : Roles;
}