import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { UnidadProductivaService } from '../../services/unidad-productiva.service';
@Component({
  selector: 'app-add-edit-unidadp',
  templateUrl: './add-edit-unidadp.component.html',
  styleUrls: ['./add-edit-unidadp.component.css']
})
export class AddEditUnidadpComponent implements OnInit, OnChanges {

  

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedUnidadP: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  unidadPForm = this.fb.group({
    nombreUnidadP: ["", Validators.required],
    coordenadas: [0, Validators.required],
    area: [0, Validators.required],
    profundidad: [0, Validators.required],
    observacion: ["", Validators.required],

    

  })


  constructor(
    private fb: FormBuilder,
    private uniadadProductivaService: UnidadProductivaService,
    private messageService: MessageService
  ){}
  
  ngOnInit(): void {
    this.obtenerUnidadP();
  }

  ngOnChanges(): void {
    if(this.selectedUnidadP){
      this.modalType = 'Actualizar';
      this.unidadPForm.patchValue(this.selectedUnidadP);
    }else{
      this.unidadPForm.reset();
      this.modalType = 'Guardar';
    }
  }
  closeModal(){
    this.unidadPForm.reset();
    this.clickClose.emit(true);
  }

  obtenerUnidadP(){
    if(this.displayAddEditModal && this.selectedUnidadP){
      this.uniadadProductivaService.obtenerUnidadProductivaPorId(this.selectedUnidadP).subscribe(
        response => {
          this.unidadPForm.get('nombreUnidadP')?.setValue(response.nombreUnidadP);
          this.unidadPForm.get('coordenadas')?.setValue(response.coordenadas);
          this.unidadPForm.get('area')?.setValue(response.area);
          this.unidadPForm.get('observacion')?.setValue(response.observacion);
          this.unidadPForm.get('profundidad')?.setValue(response.profundidad);
        }
      )
    }
  }

  addEditUnidadP(){
    const unidadPData = {
      nombreUnidadP: this.unidadPForm.get('nombreUnidadP')?.value,
      coordenadas: this.unidadPForm.get('coordenadas')?.value,
      area: this.unidadPForm.get('area')?.value,
      profundidad: this.unidadPForm.get('profundidad')?.value,
      observacion: this.unidadPForm.get('observacion')?.value
    }

    this.uniadadProductivaService.addEditUnidadProductiva(unidadPData, this.selectedUnidadP).subscribe(
      response =>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar'? 'Registro Guardado': 'Registro Actualizado';
        this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error})
      }
    )
  }

  onKeyPress(event: KeyboardEvent) {
    // Obtiene el código de la tecla presionada
    const keyCode = event.which || event.keyCode;
  
    // Permite solo números (0-9)
    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  }

  
}
