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
  fechaFiltro:Date | null = null;
  nombreFiltro: string = '';

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
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 text-white py-2 px-2',
      rejectButtonStyleClass: 'bg-red-500 py-2 px-2 text-white mr-2',
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

  filtro(){
    if(this.fechaFiltro || this.nombreFiltro){
      this.proveedores = this.proveedores.filter((proveedor) => {
          const fechaMatch = !this.fechaFiltro || proveedor.fechaCreacion === this.fechaFiltro;
          const nombreMatch = !this.nombreFiltro || proveedor.razonSocial.toLowerCase().includes(this.nombreFiltro.toLowerCase());
          return fechaMatch && nombreMatch;
    });
  }else{
    this.obtenerProveedor();
  }
}


  borrarBusqueda() {
    // Restaura la lista completa de unidades
    this.obtenerProveedor();
    // Limpia la fecha de filtro
    this.fechaFiltro = null;
  }
}
