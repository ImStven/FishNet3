import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { TipoProveedor } from '../models/tipo-proveedor';

@Injectable({
  providedIn: 'root'
})
export class TipoProveedorService {
  private apiUrl = 'http://localhost:8080/api/V1/tipo-proveedor'

  constructor( private http: HttpClient) { }


  obtenerTipoProveedor(): Observable<TipoProveedor[]> {
    return this.http.get<TipoProveedor[]>(this.apiUrl);
  }

  obtenerTipoProveedorPorId(id: number): Observable<TipoProveedor> {
    return this.http.get<TipoProveedor>(this.apiUrl + `/${id}`);
  }

  agregarTipoProveedor(tipoProveedor:any): Observable<any> {
    return this.http.post(this.apiUrl, tipoProveedor);
  }

  actualizarTipoProveedor(id: number, tipoProveedor: TipoProveedor): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, tipoProveedor);
  }

  eliminarTipoProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
