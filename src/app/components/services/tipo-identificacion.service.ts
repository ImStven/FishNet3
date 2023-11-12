import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { TipoIdentificacion } from '../models/tipo-identificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {
  private apiUrl = 'http://localhost:8080/api/V1/tipo-identificacion'

  constructor( private http: HttpClient) { }


  obtenerTipoIdentificacion(): Observable<TipoIdentificacion[]> {
    return this.http.get<TipoIdentificacion[]>(this.apiUrl);
  }

  obtenerTipoIdentificacionPorId(id: number): Observable<TipoIdentificacion> {
    return this.http.get<TipoIdentificacion>(this.apiUrl + `/${id}`);
  }

  agregarTipoIdentificacion(tipoIdentificacion:any): Observable<any> {
    return this.http.post(this.apiUrl, tipoIdentificacion);
  }

  actualizarTipoIdentificacion(id: number, tipoIdentificacion: TipoIdentificacion): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, tipoIdentificacion);
  }

  eliminarTipoIdentificacion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
