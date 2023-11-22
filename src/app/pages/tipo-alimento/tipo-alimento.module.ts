import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTipoAlimentoModule } from 'src/app/components/modal/add-edit-tipo-alimento/add-edit-tipo-alimento.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TipoAlimentoComponent } from './tipo-alimento.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TipoAlimentoComponent
  ],
  imports: [
    CommonModule,
    AddEditTipoAlimentoModule,
    ConfirmDialogModule,
    TableModule,
    ToastModule,
    FormsModule
    
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class TipoAlimentoModule { }
