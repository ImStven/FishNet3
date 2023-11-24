import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

import { InvEntradaAlimentoService } from 'src/app/components/services/inv-entrada-alimento.service';
import { Proveedor } from 'src/app/components/models/proveedor';
import { TipoAlimento } from 'src/app/components/models/tipo-alimento';
import { ProveedorService } from 'src/app/components/services/proveedor.service';
import { TipoAlimentoService } from 'src/app/components/services/tipo-alimento.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-entrada',
  templateUrl: './add-edit-entrada.component.html',
  styleUrls: ['./add-edit-entrada.component.css']
})
export class AddEditEntradaComponent {

  proveedores: Proveedor[] = [];
  tipoAlimentos: TipoAlimento[] = [];


  ahora: any;
  deshabilitar: any;
  fIngreso: string;

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedEntrada: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    numeroFactura: ["", Validators.required],
    fechaVencimiento: ["", Validators.required],
    registroIca: [0, Validators.required],
    numeroKilos: [0, Validators.required],
    proveedor: [0, Validators.required],
    tipoAlimento: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private entradaService: InvEntradaAlimentoService,
    private provedorService: ProveedorService,
    private tipoAlimentoService: TipoAlimentoService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.obtenerEntradaAlimentos();
    this.getProveedor();
    this.getTipoAlimento();

    const date = new DatePipe('en-us')
    this.ahora = date.transform(new Date(), 'yyyy-MM-dd')
  }

  ngOnChanges(): void {
    if (this.selectedEntrada) {
      this.modalType = 'Actualizar';
      this.form.patchValue(this.selectedEntrada);
    } else {
      this.form.reset();
      this.modalType = 'Guardar';
    }
  }

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }

  obtenerEntradaAlimentos(){
    if (this.displayAddEditModal && this.selectedEntrada) {
      this.entradaService.obtenerEntradaAlimentosPorId(this.selectedEntrada).subscribe(
        response =>{
          this.form.get('numeroFactura')?.setValue(response.numeroFactura);                 
          this.form.get('registroIca')?.setValue(response.registroIca);                 
          this.form.get('numeroFactura')?.setValue(response.numeroFactura);                 
          this.form.get('numeroKilos')?.setValue(response.numeroKilos);                 
          this.form.controls['proveedor'].setValue(response.proveedor.id);
          this.form.controls['tipoAlimento'].setValue(response.tipoAlimento.id);

        }
      )
    }
  }

  addEditEntrada(){
    const entradaData = {
      numeroFactura: this.form.get('numeroFactura')?.value,
      fechaVencimiento: this.form.get('fechaVencimiento')?.value,
      registroIca: this.form.get('registroIca')?.value,
      numeroKilos: this.form.get('numeroKilos')?.value,
      proveedorId: this.form.get('proveedor')?.value,
      tipoAlimentoId: this.form.get('tipoAlimento')?.value
    }
    
    this.entradaService.addEditEntrada(entradaData, this.selectedEntrada).subscribe(
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

  cambioFecha(){
    this.deshabilitar = this.fIngreso
  }
  getProveedor(){
    this.provedorService.obtenerProveedor().subscribe(
      response => {
        this.proveedores = response
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
