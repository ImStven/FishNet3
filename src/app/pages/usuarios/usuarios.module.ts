import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AddEditUsuariosModule } from 'src/app/components/modal/add-edit-usuarios/add-edit-usuarios.module';
import { UsuariosComponent } from './usuarios.component';
import { ConfirmationService, MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    AddEditUsuariosModule
  ],
  providers: [ConfirmationService,
    MessageService
  ],
})
export class UsuariosModule { }
