import { Component,EventEmitter,Input,OnChanges,OnInit,Output, SimpleChanges } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { LoteService } from '../../services/lote.service';
import {MessageService} from 'primeng/api';
import { Proveedor } from '../../models/proveedor';
import { Especies } from '../../models/especies';
import { UnidadProductiva } from '../../models/unidad-productiva';
import { ProveedorService } from '../../services/proveedor.service';
import { EspeciesService } from '../../services/especies.service';
import { UnidadProductivaService } from '../../services/unidad-productiva.service';


@Component({
  selector: 'app-add-edit-lote',
  templateUrl: './add-edit-lote.component.html',
  styleUrls: ['./add-edit-lote.component.css']
})
export class AddEditLoteComponent implements OnInit, OnChanges {


  proveedores: Proveedor[] = [];
  especies: Especies[] = [];
  unidadProductiva: UnidadProductiva[] = [];

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedLote: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  loteForm = this.fb.group({
    nombreLote: ["", Validators.required],
    numeroAnimales: ["", Validators.required],
    proveedor: [0, Validators.required],
    especies: [0, Validators.required],
    unidadProductiva: [0, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private loteService: LoteService,
    private provedorService: ProveedorService,
    private especiesService: EspeciesService,
    private unidadPService: UnidadProductivaService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {

    this.getUnidadProductiva();
    this.getProveedores();
    this.getEspecies();
    this.obtenerLote();
    
  }

  ngOnChanges(): void {
    if (this.selectedLote) {
      this.modalType = 'Actualizar';
      this.loteForm.patchValue(this.selectedLote);
    } else {
      this.loteForm.reset();
      this.modalType = 'Guardar';
    }
  }
  closeModal(){
    this.loteForm.reset();
    this.clickClose.emit(true);
  }

  obtenerLote(){
    if (this.displayAddEditModal && this.selectedLote) {
      this.loteService.obtenerLotePorId(this.selectedLote).subscribe(
        response =>{
          this.loteForm.get('nombreLote')?.setValue(response.nombreLote);
          this.loteForm.get('numeroAnimales')?.setValue(response.numeroAnimales);
          this.loteForm.controls['proveedor'].setValue(response.proveedor.id);
          this.loteForm.controls['especies'].setValue(response.especies.id);
          this.loteForm.controls['unidadProductiva'].setValue(response.unidadP.id);

        }
      )
    }
  }

  addEditLote(){
    const loteData = {
      nombreLote: this.loteForm.get('nombreLote')?.value,
      numeroAnimales: this.loteForm.get('numeroAnimales')?.value,
      proveedor: {
        id: this.loteForm.get('proveedor')?.value
      },
      especies: {
        id: this.loteForm.get('especies')?.value
      }, 
      unidadProductiva: {
        id: this.loteForm.get('unidadProductiva')?.value
      }
    }
    
    this.loteService.addEditLote(loteData, this.selectedLote).subscribe(
      response =>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar' ? 'Registro Guardado' : 'Registro Actualizado';
        this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
        console.log(this.modalType);
        
      },
      
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: error});
      }
    )
  }

  getProveedores(){
    this.provedorService.obtenerProveedor().subscribe(
      response => {
        this.proveedores = response
      }
    )
  }


  getEspecies(){
    this.especiesService.obtenerEspecies().subscribe(
      response => {
        this.especies = response
      }
    )
  }
  getUnidadProductiva(){
    this.unidadPService.obtenerUnidadProductiva().subscribe(
      response => {
        this.unidadProductiva = response
      }
    )
  }
}
