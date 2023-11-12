import { TipoIdentificacion } from "./tipo-identificacion";
import { TipoProveedor } from "./tipo-proveedor";

export class Proveedor {
    id: number;
    nombre : string;
    apellido : string;
    telefono : number;
    correo : string;
    direccion : string;
    razonSocial : string;
    fechaCreacion : Date;
    tipoProveedor: TipoProveedor;
    tipoIdentificacion: TipoIdentificacion;
    numeroIdentificacion: number;
    }