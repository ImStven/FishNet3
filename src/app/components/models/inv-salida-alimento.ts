import { Lote } from "./lote";
import { TipoAlimento } from "./tipo-alimento";

export class SalidaAlimentos {
    id: number;
    fechaCreacion: Date;
    numeroFactura: string;
    numeroKilos: number;
    lote: Lote;
    tipoAlimento: TipoAlimento;
    }