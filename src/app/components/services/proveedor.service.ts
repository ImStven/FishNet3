import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Proveedor } from '../models/proveedor'

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = 'http://localhost:8080/api/V1/proveedor'

  constructor( private http: HttpClient) { }


  obtenerProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  obtenerProveedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(this.apiUrl + `/${id}`);
  }

  // agregarProveedor(proveedor:any): Observable<any> {
  //   return this.http.post(this.apiUrl, proveedor);
  // }

  // actualizarProveedor(id: number, proveedor: Proveedor): Observable<any> {
  //   return this.http.put(this.apiUrl + `/${id}`, proveedor);
  // }

  addEditProveedor(postData: any, selectP: any){
    if(!selectP){
      return this.http.post(this.apiUrl, postData);
    }else{
      return this.http.put(this.apiUrl + `/${selectP}`, postData);
    }
  }

  eliminarProveedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
