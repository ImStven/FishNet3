import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Especies } from '../models/especies';

@Injectable({
  providedIn: 'root'
})
export class EspeciesService {
  private apiUrl = 'http://localhost:8080/api/V1/especies'

  constructor( private http: HttpClient) { }


  obtenerEspecies(): Observable<Especies[]> {
    return this.http.get<Especies[]>(this.apiUrl);
  }

  obtenerEspeciesPorId(id: number): Observable<Especies> {
    return this.http.get<Especies>(this.apiUrl + `/${id}`);
  }

  addEditEspecies(postData: any, selectEspecie: any){

    if(!selectEspecie){
      return this.http.post(this.apiUrl, postData);
    }else{
      return this.http.put(this.apiUrl + `/${selectEspecie}`, postData);
    }
  }

  eliminarEspecies(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
