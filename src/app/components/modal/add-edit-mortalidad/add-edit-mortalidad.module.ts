import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditMortalidadComponent } from './add-edit-mortalidad.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AddEditMortalidadComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ToastModule
  ],
  exports: [AddEditMortalidadComponent]
})
export class AddEditMortalidadModule { }
