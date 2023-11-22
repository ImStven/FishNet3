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

import { MortalidadComponent } from './mortalidad.component';
import { AddEditMortalidadModule } from "../../components/modal/add-edit-mortalidad/add-edit-mortalidad.module";


@NgModule({
    declarations: [
        MortalidadComponent
    ],
    providers: [ConfirmationService,
        MessageService],
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
        AddEditMortalidadModule
    ]
})
export class MortalidadModule { }
