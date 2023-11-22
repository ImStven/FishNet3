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

import { PescaComponent } from './pesca.component';
import { AddEditPescaModule } from "../../components/modal/add-edit-pesca/add-edit-pesca.module";

@NgModule({
    declarations: [
        PescaComponent
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
        AddEditPescaModule
    ],
    providers: [
        ConfirmationService,
        MessageService
    ],
})
export class PescaModule { }
