import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Lote } from '../models/lote';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  private apiUrl = 'http://localhost:8080/api/V1/lote'

  constructor( private http: HttpClient) { }

  obtenerLote(): Observable<Lote[]>{
    return this.http.get<Lote[]>(this.apiUrl);
  }

  obtenerLotePorId(id: number): Observable<Lote> {
    return this.http.get<Lote>(this.apiUrl + `/${id}`);
  }

  addEditLote(postData: any, selectL: any){
    
    if(!selectL){
      return this.http.post(this.apiUrl, postData);
    }else {
      return this.http.put(this.apiUrl + `/${selectL}`, postData);
    }
  }

  eliminarLote(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
