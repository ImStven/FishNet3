import { Proveedor } from "./proveedor";
import { TipoAlimento } from "./tipo-alimento";

export class EntradaAlimentos {
id: number;
fechaCreacion: Date;
fechaVencimiento:Date;
numeroFactura: number;
registroIca: string;
numeroKilos: number;
tipoAlimento: TipoAlimento;
proveedor: Proveedor;
}