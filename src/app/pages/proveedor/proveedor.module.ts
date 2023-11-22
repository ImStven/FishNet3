import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { MessageService } from 'primeng/api';
import { AddEditProveedorModule } from 'src/app/components/modal/add-edit-proveedor/add-edit-proveedor.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

import { ProveedorComponent } from './proveedor.component';
@NgModule({
  declarations: [
    ProveedorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    AddEditProveedorModule
  ],

  providers: [ConfirmationService,
  MessageService]
})
export class ProveedorModule { }
