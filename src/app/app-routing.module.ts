import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoteComponent } from './pages/lote/lote.component';
import { HomeComponent } from './pages/home/home.component';
import { UnidadProductivaComponent } from './pages/unidad-productiva/unidad-productiva.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { EspeciesComponent } from './pages/especies/especies.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './components/services/guards/auth.guard';

const routes: Routes = [
 {path: '', redirectTo: 'login', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'lote', component:LoteComponent, canActivate:[authGuard] },
  {path: 'unidad-productiva', component:UnidadProductivaComponent, canActivate:[authGuard]},
  {path: 'proveedor', component:ProveedorComponent, canActivate:[authGuard]},
  {path: 'especies', component:EspeciesComponent, canActivate:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
