import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pesca } from '../models/pesca';


@Injectable({
  providedIn: 'root'
})
export class PescaService {

  private apiUrl = 'http://localhost:8080/api/V1/pesca'

  constructor( private http: HttpClient) { }

  obtenerPesca(): Observable<Pesca[]>{
    return this.http.get<Pesca[]>(this.apiUrl);
  }
  obtenerPescaPorId(id: number): Observable<Pesca>{
    return this.http.get<Pesca>(this.apiUrl + `/${id}`);
  }

  addEditPesca(postData: any, select: any){
    
    if(!select){
      return this.http.post(this.apiUrl + `/registrar`, postData);
    }else {
      return this.http.put(this.apiUrl + `/${select}`, postData);
    }
  }

  eliminarPesca(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
