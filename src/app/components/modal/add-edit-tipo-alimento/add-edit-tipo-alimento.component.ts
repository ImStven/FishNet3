import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { TipoAlimentoService } from '../../services/tipo-alimento.service';

@Component({
  selector: 'app-add-edit-tipo-alimento',
  templateUrl: './add-edit-tipo-alimento.component.html',
  styleUrls: ['./add-edit-tipo-alimento.component.css']
})
export class AddEditTipoAlimentoComponent implements OnInit, OnChanges {

  @Input() displayAddEditModal: boolean = true;
  @Input() selected: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    tipoAlimento: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private tipoAlimentoService: TipoAlimentoService ,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.obtenerT_Proveedor();
  }

  ngOnChanges(): void {
    if (this.selected){
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selected);
    }else {
      this.form.reset();
      this.modalType = 'Guardar'
    }
  }

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }
  obtenerT_Proveedor(){
    if(this.displayAddEditModal && this.selected){
      this.tipoAlimentoService.obtenerTipoAlimentoPorId(this.selected).subscribe(
        response => {
          this.form.get('tipoAlimento')?.setValue(response.tipoAlimento);
        }
      )
    }
  }

  addEditT_Alimento(){
    const T_AlimentoData = {
      tipoAlimento: this.form.get('tipoAlimento')?.value,
    }

    this.tipoAlimentoService.addEditT_Alimento(T_AlimentoData, this.selected).subscribe(
      response => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar' ? 'Registro Guardado' : 'Registro Actualizar';
        this.messageService.add({severity: 'success', summary: 'Success', detail:msg})
        console.log(this.modalType);
      },
      error => { 
        const msg = this.modalType === 'Guardar'? 'No puede Guardar este Registro': 'No puede Actulizar este Registro';
        this.messageService.add({severity: 'error', summary: 'Error', detail: error})
      }
    )
  }
}
