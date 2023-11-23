import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { Lote } from '../../models/lote';
import { LoteService } from '../../services/lote.service';
import { MuestreoService } from '../../services/muestreo.service';


@Component({
  selector: 'app-add-edit-muestreo',
  templateUrl: './add-edit-muestreo.component.html',
  styleUrls: ['./add-edit-muestreo.component.css']
})
export class AddEditMuestreoComponent implements OnInit, OnChanges {

  lote: Lote[] = [];

  @Input() displayAddEditModal: boolean = true;
  @Input() selected: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    pesoInicial: [0, Validators.required],
    pesoActual: [0, Validators.required],
    lote: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private loteService: LoteService,
    private muestreoService: MuestreoService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    
  }

ngOnChanges(): void {
    if (this.selected) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selected);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  
}

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }

  obtener(){
    if (this.displayAddEditModal && this.selected) {
      this.muestreoService.obtenerPorId(this.selected).subscribe(
        response =>{
          this.form.get('pesoInicial')?.setValue(response.pesoInicial);
          this.form.get('pesoActual')?.setValue(response.pesoActual);
          this.form.controls['lote'].setValue(response.lote.id);
        }
      )
    }
  }

  addEdit(){
    const Data = {
      pesoInicial: this.form.get('nombreLote')?.value,
      pesoActual: this.form.get('fechaSiembra')?.value,
      lote: {
        id: this.form.get('lote')?.value
      },
    }
    
    this.muestreoService.addEdit(Data, this.selected).subscribe(
      response =>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar' ? 'Registro Guardado' : 'Registro Actualizado';
        this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
        console.log(this.modalType);
        
      },
      
      error => { 
        const msg = this.modalType === 'Guardar'? 'No puede Guardar este Registro': 'No puede Actulizar este Registro';
        this.messageService.add({severity: 'error', summary: 'Error', detail: error})
      }
    )
  }
}
