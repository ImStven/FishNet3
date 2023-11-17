import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoteModule } from './pages/lote/lote.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavModule } from './components/sidenav/sidenav.module';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { BodyModule } from './components/body/body.module';
import { UnidadProductivaModule } from './pages/unidad-productiva/unidad-productiva.module';
import { ProveedorModule } from './pages/proveedor/proveedor.module';
import { EspeciesModule } from './pages/especies/especies.module';
import { LoginModule } from './components/login/login.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './components/services/auth/auth.service';
import { Interceptor } from './components/interceptor/interceptor';
import { UsuariosModule } from './pages/usuarios/usuarios.module';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,

  
  ],
  imports: [
    SidenavModule,
    BrowserModule,
    AppRoutingModule,
    LoteModule,
    BrowserAnimationsModule,
    BodyModule,
    UnidadProductivaModule,
    ProveedorModule,
    EspeciesModule,
    LoginModule,
    UsuariosModule




  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
