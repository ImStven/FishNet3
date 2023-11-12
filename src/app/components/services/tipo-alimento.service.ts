import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { TipoAlimento } from '../models/tipo-alimento'

@Injectable({
  providedIn: 'root'
})
export class TipoAlimentoService {
  private apiUrl = 'http://localhost:8080/api/V1/tipo-alimento'

  constructor( private http: HttpClient) { }


  obtenerTipoAlimento(): Observable<TipoAlimento[]> {
    return this.http.get<TipoAlimento[]>(this.apiUrl);
  }

  obtenerTipoAlimentoPorId(id: number): Observable<TipoAlimento> {
    return this.http.get<TipoAlimento>(this.apiUrl + `/${id}`);
  }

  agregarTipoAlimento(tipoAlimento:any): Observable<any> {
    return this.http.post(this.apiUrl, tipoAlimento);
  }

  actualizarTipoAlimento(id: number, tipoAlimento: TipoAlimento): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, tipoAlimento);
  }

  eliminarTipoAlimento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
