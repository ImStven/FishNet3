import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TipoAlimento } from 'src/app/components/models/tipo-alimento';
import { TipoAlimentoService } from 'src/app/components/services/tipo-alimento.service';

@Component({
  selector: 'app-tipo-alimento',
  templateUrl: './tipo-alimento.component.html',
  styleUrls: ['./tipo-alimento.component.css']
})
export class TipoAlimentoComponent implements OnInit, OnDestroy {


  tipoAlimento: TipoAlimento[] = [];
  displayAddEditModal = false;
  selected: any = null;
  subscriptions: Subscription[] = [];
  TASubscription: Subscription = new Subscription();
  fechaFiltro: Date | null = null

  constructor(
    private tipoAlimentoService: TipoAlimentoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }



  ngOnInit(): void {
    this.obtenerT_Alimentos();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selected = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerT_Alimentos();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditarT_AlimentoList(newData: any) {
    if (this.selected && newData.id === this.selected.id) {
      const loteIndex = this.tipoAlimento.findIndex(data => data.id === newData.id);
      this.tipoAlimento[loteIndex] = newData;
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
        this.tipoAlimentoService.eliminarTipoAlimento(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerT_Alimentos();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
          }
        )
      },
    }
    )
  };

  showEdit(id: number) {
    this.displayAddEditModal = true;
    this.selected = id;
  }

  obtenerT_Alimentos(): void {
    this.tipoAlimentoService.obtenerTipoAlimento().subscribe(tipoAlimento => {

      this.tipoAlimento = this.tipoAlimento;
      console.log(this.tipoAlimento);

      // this.lotesFiltro = [...lote]

    });
    this.subscriptions.push(this.TASubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  filtro(){
    if(this.fechaFiltro){
      this.tipoAlimento = this.tipoAlimento.filter(u => u.fechaCreacion === this.fechaFiltro)
    }else {
      this.obtenerT_Alimentos()
    }
  }


  borrarBusqueda() {
    // Restaura la lista completa de unidades
    this.obtenerT_Alimentos();
    // Limpia la fecha de filtro
    this.fechaFiltro = null;
  }

}
