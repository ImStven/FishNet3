import { Component } from '@angular/core';
import { AuthService } from './components/services/auth/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Usuarios } from './components/models/usuarios';
import { Observable } from 'rxjs';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FishNet';

  usuarios!: Usuarios;

  isSideNavCollapsed = false;
  screenWidth = 0;


  constructor(
    public router: Router,
    public authService: AuthService
    ) {}

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  // logout(){
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }

}
