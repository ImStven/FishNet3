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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AddEditLoteModule } from 'src/app/components/modal/add-edit-lote/add-edit-lote.module';

import { LoteComponent } from './lote.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    LoteComponent,
    
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
    AddEditLoteModule,
    RouterModule

  ],
  providers: [ConfirmationService,
    MessageService
  ],
})
export class LoteModule { }
