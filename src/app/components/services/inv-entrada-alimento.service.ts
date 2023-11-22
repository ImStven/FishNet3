import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

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

  addEditEntrada(postData: any, select: any){
    
    if(!select){
      return this.http.post(this.apiUrl + `/registrar`, postData);
    }else {
      return this.http.put(this.apiUrl + `/${select}`, postData);
    }
  }
  eliminarEntradaAlimentos(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
