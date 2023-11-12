import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadProductivaComponent } from './unidad-productiva.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AddEditUnidadpModule } from 'src/app/components/modal/add-edit-unidadp/add-edit-unidadp.module';
import { FilterUnidadpModule } from 'src/app/components/filtros/filter-unidadp/filter-unidadp.module';

@NgModule({
  declarations: [
    UnidadProductivaComponent
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
    AddEditUnidadpModule,
    FilterUnidadpModule
    
  ],
  providers: [ConfirmationService,
    MessageService
  ],

})
export class UnidadProductivaModule { }
