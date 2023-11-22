import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { EntradaAlimentos } from 'src/app/components/models/inv-entrada-alimento';
import { InvEntradaAlimentoService } from 'src/app/components/services/inv-entrada-alimento.service';

@Component({
  selector: 'app-entrada-alimento',
  templateUrl: './entrada-alimento.component.html',
  styleUrls: ['./entrada-alimento.component.css']
})
export class EntradaAlimentoComponent {
  entradas: EntradaAlimentos[] = [];
  displayAddEditModal = false;
  selectedEntrada: any = null;
  subscriptions: Subscription[] = [];
  LSubscription: Subscription = new Subscription();
  fechaFiltro:Date | null = null;

  constructor(
    private entradaService: InvEntradaAlimentoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerEntradaAlimentos();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedEntrada = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerEntradaAlimentos();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditarEntradaList(newData: any) {
    if (this.selectedEntrada && newData.id === this.selectedEntrada.id) {
      const entradaIndex = this.entradas.findIndex(data => data.id === newData.id);
      this.entradas[entradaIndex] = newData;
    }
  }

  eliminar(id: number): void {
    this.confirmationService.confirm({
        message: '¿Quieres Eliminar este Registro?',
      header: 'Confirmacion de Eliminar Registro',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 text-white py-2 px-2',
      rejectButtonStyleClass: 'bg-red-500 py-2 px-2 text-white mr-2',
      accept: () => {
        this.entradaService.eliminarEntradaAlimentos(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerEntradaAlimentos();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
          }
        )
      },
    })
  };

  showEdit(id: number) {
    this.displayAddEditModal = true;
    this.selectedEntrada = id;
  }

  obtenerEntradaAlimentos(): void {
    this.entradaService.obtenerEntradaAlimentos().subscribe(entrada => {

      this.entradas = entrada;
      console.log(this.entradas);

    });
    this.subscriptions.push(this.LSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  filtro(){
    if(this.fechaFiltro){
      this.entradas = this.entradas.filter(u => u.fechaCreacion === this.fechaFiltro)
    }else {
      this.obtenerEntradaAlimentos()
    }
  }


  borrarBusqueda() {
    // Restaura la lista completa de unidades
    this.obtenerEntradaAlimentos();
    // Limpia la fecha de filtro
    this.fechaFiltro = null;
  }
}
