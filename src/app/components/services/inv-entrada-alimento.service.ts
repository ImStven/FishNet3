import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';

import { EntradaAlimentos } from '../models/inv-entrada-alimento'

@Injectable({
  providedIn: 'root'
})
export class InvEntradaAlimentoService {
  private apiUrl = 'http://localhost:8080/api/V1/entrada-alimentos'

  constructor( private http: HttpClient) { }


  obtenerEntradaAlimentos(): Observable<EntradaAlimentos[]> {
    return this.http.get<EntradaAlimentos[]>(this.apiUrl);
  }

  obtenerEntradaAlimentosPorId(id: number): Observable<EntradaAlimentos> {
    return this.http.get<EntradaAlimentos>(this.apiUrl + `/${id}`);
  }

  agregarEntradaAlimentos(entradaAlimentos:any): Observable<any> {
    return this.http.post(this.apiUrl, entradaAlimentos);
  }

  actualizarEntradaAlimentos(id: number, entradaAlimentos: EntradaAlimentos): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, entradaAlimentos);
  }

  eliminarEntradaAlimentos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
