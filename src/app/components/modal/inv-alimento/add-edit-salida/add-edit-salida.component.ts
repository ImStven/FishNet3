import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { InvSalidaAlimentosService } from 'src/app/components/services/inv-salida-alimento.service';
import { TipoAlimento } from 'src/app/components/models/tipo-alimento';
import { Lote } from 'src/app/components/models/lote';
import { TipoAlimentoService } from 'src/app/components/services/tipo-alimento.service';
import { LoteService } from 'src/app/components/services/lote.service';

@Component({
  selector: 'app-add-edit-salida',
  templateUrl: './add-edit-salida.component.html',
  styleUrls: ['./add-edit-salida.component.css']
})
export class AddEditSalidaComponent {
  
  tipoAlimentos: TipoAlimento[] = [];
  lotes: Lote[] = [];

  @Input () displayAddEditModal: boolean = true;
  @Input() selectedSalida: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    numeroFactura: ["", Validators.required],
    numeroKilos: [0, Validators.required],
    tipoAlimento: [0, Validators.required],
    lote: [0, Validators.required]    
  });

  constructor(
    private fb: FormBuilder,
    private salidaService: InvSalidaAlimentosService,
    private tipoAlimentoService: TipoAlimentoService,
    private loteService: LoteService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getTipoAlimento();
    this.getLote();
    this.obtenerSalidaAlimentos();
  }

  ngOnChanges(): void {
    if (this.selectedSalida) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selectedSalida);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  }

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }

  obtenerSalidaAlimentos(){
    if (this.displayAddEditModal && this.selectedSalida) {
      this.salidaService.obtenerSalidaAlimentosPorId(this.selectedSalida).subscribe(
        response =>{
          this.form.get('numeroFactura')?.setValue(response.numeroFactura);                                     
          this.form.get('numeroKilos')?.setValue(response.numeroKilos);                 
          this.form.controls['tipoAlimento'].setValue(response.tipoAlimento.id);
          this.form.controls['lote'].setValue(response.lote.id);

        }
      )
    }
  }

  addEditSalida(){
    const SalidaData = {
      numeroFactura: this.form.get('numeroFactura')?.value,
      numeroKilos: this.form.get('numeroKilos')?.value,
      tipoAlimentoId: this.form.get('tipoAlimento')?.value,
      loteId: this.form.get('lote')?.value
    }
  
    this.salidaService.addEditSalida(SalidaData, this.selectedSalida).subscribe(
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

  getTipoAlimento(){
    this.tipoAlimentoService.obtenerTipoAlimento().subscribe(
      response => {
        this.tipoAlimentos = response
      }
    )
  }

  getLote(){
    this.loteService.obtenerLote().subscribe(
      response => {
        this.lotes = response
      }
    )
  }
}
