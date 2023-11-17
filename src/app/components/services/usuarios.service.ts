import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:8080/api/V1/usuario'
  
  constructor(
    private http: HttpClient
  ) { }

  obtenerUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(this.apiUrl);
  }

  obtenerUsuariosPorId(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.apiUrl + `/${id}`);
  }

  addEditUsuarios(postData: any, selectUsuarios: any){

    if(!selectUsuarios){
      return this.http.post(this.apiUrl, postData);
    }else{
      return this.http.put(this.apiUrl + `/${selectUsuarios}`, postData);
    }
  }
  eliminarUsuarios(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}