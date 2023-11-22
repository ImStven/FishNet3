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


  addEditProveedor(postData: any, select: any){
    if(!select){
      return this.http.get<TipoProveedor>(this.apiUrl, postData);
    }else {
      return this.http.put(this.apiUrl + `/${select}`, postData);
    }
  }

  eliminarTipoProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
