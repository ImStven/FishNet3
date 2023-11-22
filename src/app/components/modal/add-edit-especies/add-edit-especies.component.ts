import { Component,EventEmitter,Input,OnChanges,OnInit,Output } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import { EspeciesService } from '../../services/especies.service';

@Component({
  selector: 'app-add-edit-especies',
  templateUrl: './add-edit-especies.component.html',
  styleUrls: ['./add-edit-especies.component.css']
})
export class AddEditEspeciesComponent implements OnInit, OnChanges {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedEspecies: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  especiesForm = this.fb.group({
    nombreEspecie: ["", Validators.required]
  })


  constructor(
    private fb: FormBuilder,
    private especiesService: EspeciesService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.obtenerEspecies();
  }

  ngOnChanges(): void {
    if(this.selectedEspecies){
      this.modalType = 'Actualizar';
      this.especiesForm.patchValue(this.selectedEspecies);
    }else{
      this.especiesForm.reset();
      this.modalType = 'Guardar';
    }
  }
  closeModal(){
    this.especiesForm.reset();
    this.clickClose.emit(true);
  }

  obtenerEspecies(){
    if(this.displayAddEditModal && this.selectedEspecies){
      this.especiesService.obtenerEspeciesPorId(this.selectedEspecies).subscribe(
        response => {
          this.especiesForm.get('nombreEspecie')?.setValue(response.nombreEspecie);
        }
      )
    }
  }

  addEditEspecies(){
    const especiesData = {
      nombreEspecie: this.especiesForm.get('nombreEspecie')?.value
    }
    this.especiesService.addEditEspecies(especiesData, this.selectedEspecies).subscribe(
      response => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar'? 'Registro Guardado': 'Registro Actualizado';
        this.messageService.add({severity: 'success', summary: 'Exito', detail: msg});
      },
      error => { 
        const msg = this.modalType === 'Guardar'? 'No puede Guardar este Registro': 'No puede Actulizar este Registro';
        this.messageService.add({severity: 'error', summary: 'Error', detail: error})
      }
    )
  }
  
}
