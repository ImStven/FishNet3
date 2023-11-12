import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})

export class AppStorage {


  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string {
    return localStorage.getItem("token")!;
  }

  setUser(user: string) {
    localStorage.setItem("user", user);
  }

  getUser(): string {
    return localStorage.getItem("user")!;
  }

  clear() {
    localStorage.clear();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

}
