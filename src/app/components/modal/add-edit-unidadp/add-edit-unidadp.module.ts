import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { AddEditUnidadpComponent } from './add-edit-unidadp.component'; 



@NgModule({
  declarations: [
    AddEditUnidadpComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
  ],
  exports: [AddEditUnidadpComponent]
})
export class AddEditUnidadpModule { }
