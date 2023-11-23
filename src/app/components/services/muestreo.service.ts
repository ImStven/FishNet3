import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Muestreo } from '../models/muestreo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MuestreoService {

  private apiUrl = 'http://localhost:8080/api/V1/muestreo'
  constructor(
    private http: HttpClient
  ) { }

  obtener(): Observable<Muestreo[]>{
    return this.http.get<Muestreo[]>(this.apiUrl)
  }

  obtenerPorId(id: number): Observable<Muestreo> {
    return this.http.get<Muestreo>(this.apiUrl + `/${id}`);
  }
  addEdit(postData: any, select: any){
    
    if(!select){
      return this.http.post(this.apiUrl, postData);
    }else {
      return this.http.put(this.apiUrl + `/${select}`, postData);
    }
  }
  eliminar(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
