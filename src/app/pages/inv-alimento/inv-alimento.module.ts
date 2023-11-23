import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';

import { EntradaAlimentoComponent } from './entrada-alimento/entrada-alimento.component';
import { SalidaAlimentoComponent } from './salida-alimento/salida-alimento.component';
import { AddEditInvAlimentoModule } from 'src/app/components/modal/inv-alimento/add-edit-inv-alimento.module';
import { InvAlimentoComponent } from './inv-alimento.component';


@NgModule({
  declarations: [
    InvAlimentoComponent,
    EntradaAlimentoComponent,
    SalidaAlimentoComponent

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
    RouterModule,
    AddEditInvAlimentoModule,
    

  ],
  providers: [ConfirmationService,
    MessageService
  ],
})
export class InvAlimentoModule { }
