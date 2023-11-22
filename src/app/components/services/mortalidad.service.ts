import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mortaliad } from '../models/mortalidad';

@Injectable({
  providedIn: 'root'
})
export class MortalidadService {

  private apiUrl = 'http://localhost:8080/api/V1/mortalidad'

  constructor( private http: HttpClient) { }

  obtenerMortalidad(): Observable<Mortaliad[]>{
    return this.http.get<Mortaliad[]>(this.apiUrl);
  }
  obtenerMortalidadPorId(id: number): Observable<Mortaliad>{
    return this.http.get<Mortaliad>(this.apiUrl + `/${id}`);
  }

  addEditMortalidad(postData: any, select: any){
    
    if(!select){
      return this.http.post(this.apiUrl + `/registrar`, postData);
    }else {
      return this.http.put(this.apiUrl + `/${select}`, postData);
    }
  }

  eliminarMortalidad(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
