import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { UnidadProductiva } from '../models/unidad-productiva'

@Injectable({
  providedIn: 'root'
})
export class UnidadProductivaService {
  private apiUrl = 'http://localhost:8080/api/V1/unidad-productiva';

  constructor( private http: HttpClient) { }


  obtenerUnidadProductiva(): Observable<UnidadProductiva[]> {
    return this.http.get<UnidadProductiva[]>(this.apiUrl);
  }

  obtenerUnidadProductivaPorId(id: number): Observable<UnidadProductiva> {
    return this.http.get<UnidadProductiva>(this.apiUrl + `/${id}`);
  }


  addEditUnidadProductiva(postData: any, selectUp: any){

    if(!selectUp){
      return this.http.post(this.apiUrl, postData);
    }else {
      return this.http.put(this.apiUrl + `/${selectUp}`, postData);
    }
  }

  eliminarUnidadProductiva(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
