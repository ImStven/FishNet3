import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuestreoComponent } from './muestreo.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { AddEditMuestreoModule } from 'src/app/components/modal/add-edit-muestreo/add-edit-muestreo.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MuestreoComponent,
  ],
  imports: [
    CommonModule,
    AddEditMuestreoModule,
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    RouterModule
    
  ],
  providers:[
    MessageService,
    ConfirmationService
  ]
})
export class MuestreoModule { }
