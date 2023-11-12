import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Proveedor } from 'src/app/components/models/proveedor';
import { ProveedorService } from 'src/app/components/services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit, OnDestroy {

  proveedores: Proveedor[] = [];
  displayAddEditModal = false;
  selectedProveedor: any = null;
  subscriptions: Subscription[] = [];
  PSubscription: Subscription = new Subscription();

  constructor(
    private proveedorService: ProveedorService,
    private confirationService: ConfirmationService,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.obtenerProveedor();
  }

  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedProveedor = null;
  }

  hideAddModal(isClosed: boolean){
    this.obtenerProveedor();
    this.displayAddEditModal = !isClosed;
  }


guardaroEditarProveedorList(newData: any){
  if(this.selectedProveedor && newData.id === this.selectedProveedor.id){
    const proveedorIndex = this.proveedores.findIndex(data => data.id === newData.id);
    this.proveedores[proveedorIndex] = newData;
  }
}

eliminar(id: number): void{
  this.confirationService.confirm({
    message: '¿Quieres Eliminar este Registro?',
      header: 'Confirmacion de Eliminar Registro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proveedorService.eliminarProveedor(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerProveedor();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
          }
        )
      }
  })
}

  showEdit(id: number){
    this.displayAddEditModal = true;
    this.selectedProveedor = id;
  }

  obtenerProveedor():void{
    this.proveedorService.obtenerProveedor().subscribe(proveedor =>{

      this.proveedores = proveedor;
      console.log(this.proveedores);
      
    });

    this.subscriptions.push(this.PSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
