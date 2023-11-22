import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import { TipoProveedor } from '../../models/tipo-proveedor';
import { TipoIdentificacion } from '../../models/tipo-identificacion';

import { ProveedorService } from '../../services/proveedor.service';
import { TipoProveedorService } from '../../services/tipo-proveedor.service';
import { TipoIdentificacionService } from '../../services/tipo-identificacion.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-proveedor',
  templateUrl: './add-edit-proveedor.component.html',
  styleUrls: ['./add-edit-proveedor.component.css']
})
export class AddEditProveedorComponent implements OnInit, OnChanges {

  tipoProveedor: TipoProveedor[] = [];
  tipoIdentificacion: TipoIdentificacion[] = [];


  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProveedor: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  proveedorForm= this.fb.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    telefono: [0, Validators.required],
    correo: ["", Validators.required],
    direccion: ["", Validators.required],
    razonSocial: ["", Validators.required],
    numeroIdentificacion: [0, Validators.required],
    tipoProveedor: [0, Validators.required],
    tipoIdentificacion: [0, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private proveedorService:  ProveedorService,
    private tipoProveedorService: TipoProveedorService,
    private tipoIdentificacionService: TipoIdentificacionService
  ){}

  ngOnInit(): void {
    this.obtenerProveedor();
    this.getTipoIdentificacion();
    this.getTipoProveedor();
  }

  ngOnChanges(): void {
    if (this.selectedProveedor) {
      this.modalType = 'Actualizar';
      this.proveedorForm.patchValue(this.selectedProveedor);
    } else {
      this.proveedorForm.reset();
      this.modalType = 'Guardar';
    }
  }
  
  closeModal(){
    this.proveedorForm.reset();
    this.clickClose.emit(true);
  }
  
  obtenerProveedor(){
    if(this.displayAddEditModal && this.selectedProveedor){
      this.proveedorService.obtenerProveedorPorId(this.selectedProveedor).subscribe(
        response => {
          this.proveedorForm.get('nombre')?.setValue(response.nombre);
          this.proveedorForm.get('apellido')?.setValue(response.apellido);
          this.proveedorForm.get('telefono')?.setValue(response.telefono);
          this.proveedorForm.get('correo')?.setValue(response.correo);
          this.proveedorForm.get('direccion')?.setValue(response.direccion);
          this.proveedorForm.get('razonSocial')?.setValue(response.razonSocial);
          this.proveedorForm.controls['tipoIdentificacion'].setValue(response.tipoIdentificacion.id);
          this.proveedorForm.get('numeroIdentificacion')?.setValue(response.numeroIdentificacion);
          this.proveedorForm.controls['tipoProveedor'].setValue(response.tipoProveedor.id);
        }
      )
    }
  }

  addEditProveedor(){
    const proveedorData = {
      nombre: this.proveedorForm.get('nombre')?.value,
      apellido: this.proveedorForm.get('apellido')?.value,
      telefono: this.proveedorForm.get('telefono')?.value,
      correo: this.proveedorForm.get('correo')?.value,
      direccion: this.proveedorForm.get('direccion')?.value,
      razonSocial: this.proveedorForm.get('razonSocial')?.value,
      numeroIdentificacion: this.proveedorForm.get('numeroIdentificacion')?.value,
      tipoProveedor:{
        id: this.proveedorForm.get('tipoProveedor')?.value
      },
      tipoIdentificacion: {
        id: this.proveedorForm.get('tipoIdentificacion')?.value
      }
    }
    
    this.proveedorService.addEditProveedor(proveedorData, this.selectedProveedor).subscribe(
      response => {
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
  
  getTipoProveedor(){
    this.tipoProveedorService.obtenerTipoProveedor().subscribe(
      response => {
        this.tipoProveedor =  response
      }
    )
  }

  getTipoIdentificacion(){
    this.tipoIdentificacionService.obtenerTipoIdentificacion().subscribe(
      response =>{
        this.tipoIdentificacion = response
      }
    )
  }
}
