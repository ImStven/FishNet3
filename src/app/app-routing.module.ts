import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoteComponent } from './pages/lote/lote.component';
import { HomeComponent } from './pages/home/home.component';
import { UnidadProductivaComponent } from './pages/unidad-productiva/unidad-productiva.component';
import { ProveedorComponent } from './pages/proveedor/proveedor.component';
import { EspeciesComponent } from './pages/especies/especies.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './components/services/guards/auth.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PescaComponent } from './pages/pesca/pesca.component';
import { MortalidadComponent } from './pages/mortalidad/mortalidad.component';
import { InvAlimentoComponent } from './pages/inv-alimento/inv-alimento.component';
import { EntradaAlimentoComponent } from './pages/inv-alimento/entrada-alimento/entrada-alimento.component';
import { SalidaAlimentoComponent } from './pages/inv-alimento/salida-alimento/salida-alimento.component';
import { MuestreoComponent } from './pages/muestreo/muestreo.component';
import { adminGuard } from './components/services/guards/admin.guard';
import { loginGuard } from './components/services/guards/login.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard, adminGuard] },
  { path: 'lote', component: LoteComponent, canActivate: [authGuard] },
  { path: 'pesca', component: PescaComponent, canActivate: [authGuard] },
  { path: 'muestreo', component: MuestreoComponent, canActivate: [authGuard] },
  { path: 'mortalidad', component: MortalidadComponent, canActivate: [authGuard] },
  { path: 'unidad-productiva', component: UnidadProductivaComponent, canActivate: [authGuard] },
  { path: 'proveedor', component: ProveedorComponent, canActivate: [authGuard] },
  { path: 'especies', component: EspeciesComponent, canActivate: [authGuard] },
  { path: 'inventario', component: InvAlimentoComponent, canActivate: [authGuard] },
  { path: 'entrada-alimentos', component: EntradaAlimentoComponent, canActivate: [authGuard] },
  { path: 'salida-alimentos', component: SalidaAlimentoComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
