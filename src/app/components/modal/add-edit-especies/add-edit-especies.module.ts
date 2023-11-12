import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditEspeciesComponent } from './add-edit-especies.component';

import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AddEditEspeciesComponent
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
  exports: [
    AddEditEspeciesComponent
  ]
})
export class AddEditEspeciesModule { }
