import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mortaliad } from '../models/mortalidad';

@Injectable({
  providedIn: 'root'
})
export class MortalidadService {

  private apirUrl = 'http://localhost:8080/api/V1/mortalidad'

  constructor( private http: HttpClient) { }

  obtenerMortalidad(): Observable<Mortaliad[]>{
    return this.http.get<Mortaliad[]>(this.apirUrl);
  }
  obtenerMortalidadPorId(id: number): Observable<Mortaliad>{
    return this.http.get<Mortaliad>(this.apirUrl + `/${id}`);
  }

  agregarMortalidad(mortalidad:any): Observable<any>{
    return this.http.post(this.apirUrl, mortalidad);
  }

  actualizarMortalidad(id: number, mortalidad: Mortaliad): Observable<any>{
    return this.http.put(this.apirUrl + `/${id}`, mortalidad);
  }

  eliminarMortalidad(id:number): Observable<any> {
    return this.http.delete(`${this.apirUrl}/${id}`);
  }
}
