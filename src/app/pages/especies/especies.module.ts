import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EspeciesComponent } from './especies.component';
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
import { AddEditEspeciesModule } from 'src/app/components/modal/add-edit-especies/add-edit-especies.module';

@NgModule({
  declarations: [
    EspeciesComponent
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
    AddEditEspeciesModule,
    DialogModule,
  ],
  providers: [ConfirmationService,
    MessageService]
})
export class EspeciesModule { }
