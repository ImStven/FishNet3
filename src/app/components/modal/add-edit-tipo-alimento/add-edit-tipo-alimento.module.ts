import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTipoAlimentoComponent } from './add-edit-tipo-alimento.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    AddEditTipoAlimentoComponent
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
    ToastModule,
  ],
  exports: [
    AddEditTipoAlimentoComponent
  ]
})
export class AddEditTipoAlimentoModule { }
