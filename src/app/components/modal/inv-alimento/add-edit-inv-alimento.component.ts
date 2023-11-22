import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoAlimento } from '../../models/tipo-alimento';
import { FormBuilder, Validators } from '@angular/forms';
import { InvEntradaAlimentoService } from '../../services/inv-entrada-alimento.service';
import { TipoAlimentoService } from '../../services/tipo-alimento.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-inv-alimento',
  templateUrl: './add-edit-inv-alimento.component.html',
  styleUrls: ['./add-edit-inv-alimento.component.css']
})
export class AddEditInvAlimentoComponent {

  tipoAlimentos: TipoAlimento[] = [];

  @Input () displayAddEditModal: boolean = true;
  @Input() selectedInventario: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    numeroFactura: ["", Validators.required],
    numeroKilos: [0, Validators.required],
    tipoAlimento: [0, Validators.required],
    
  });

  constructor(
    private fb: FormBuilder,
    private inventarioService: InvEntradaAlimentoService,
    private tipoAlimentoService: TipoAlimentoService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.obtenerInventario();
    this.getTipoAlimento();
  }

  ngOnChanges(): void {
    if (this.selectedInventario) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selectedInventario);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  }

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }

  obtenerInventario(){
    if (this.displayAddEditModal && this.selectedInventario) {
      this.inventarioService.obtenerEntradaAlimentosPorId(this.selectedInventario).subscribe(
        response =>{
          this.form.get('numeroFactura')?.setValue(response.numeroFactura);                                     
          this.form.get('numeroKilos')?.setValue(response.numeroKilos);                 
          this.form.controls['tipoAlimento'].setValue(response.tipoAlimento.id);
        }
      )
    }
  }

  addEditInventario(){
    const InventarioData = {
      numeroFactura: this.form.get('numeroFactura')?.value,
      numeroKilos: this.form.get('numeroKilos')?.value,
      tipoAlimento: {
        id: this.form.get('tipoAlimento')?.value
      }
    }
    
    this.inventarioService.addEditEntrada(InventarioData, this.selectedInventario).subscribe(
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
}
