import { Proveedor } from "./proveedor";
import { TipoAlimento } from "./tipo-alimento";

export class EntradaAlimentos {
id: number;
fechaCreacion: Date;
fechaVencimiento:Date;
numeroFactura: string;
registroIca: number;
kilosInicial: number;
numeroKilos: number;
tipoAlimento: TipoAlimento;
proveedor: Proveedor;
}