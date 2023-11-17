import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable} from 'rxjs';
import { Roles } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl= 'http://localhost:8080/api/V1/auth/roles'

  constructor(
    private http: HttpClient
  ) { }

  obtenerRoles(): Observable<Roles[]>{
    return this.http.get<Roles[]>(this.apiUrl);
  }
  obtenerRolesPorId(id: number): Observable<Roles[]>{
    return this.http.get<Roles[]>(this.apiUrl + `${id}`);
  }
}