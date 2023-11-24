import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnidadProductiva } from 'src/app/components/models/unidad-productiva';
import { UnidadProductivaService } from 'src/app/components/services/unidad-productiva.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Especies } from 'src/app/components/models/especies';
import { EspeciesService } from 'src/app/components/services/especies.service';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})
export class EspeciesComponent implements OnInit, OnDestroy {

  especie: Especies[] = [];
  displayAddEditModal = false;
  selectedEspecie: any = null;
  subscriptions: Subscription[] = [];
  EsSubscription: Subscription = new Subscription();
  fechaFiltro:Date | null = null;
  nombreFiltro: string = '';

  constructor(
    private especiesService: EspeciesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ){

  }
  ngOnInit(): void {
    this.obtenerEspecies();
  }


  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedEspecie = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerEspecies();
    this.displayAddEditModal = !isClosed;
  }




  guardaroEditerEspeciesList(newData: any){
    if(this.selectedEspecie && newData.id == this.selectedEspecie.id){
      const especiesIndex = this.especie.findIndex(data => data.id === newData.id);
      this.especie[especiesIndex] = newData;
    }
  }

  eliminar(id: number): void{
    this.confirmationService.confirm({
        message: '¿Quieres Eliminar este Registro?',
      header: 'Confirmacion de Eliminar Registro',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'bg-green-500 text-white py-2 px-2',
      rejectButtonStyleClass: 'bg-red-500 py-2 px-2 text-white mr-2',
      accept: () => {
        this.especiesService.eliminarEspecies(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerEspecies();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error })
          }
        )
      },
    })
  };

  showEdit(id: number){
    this.displayAddEditModal = true;
    this.selectedEspecie = id;
  }
  obtenerEspecies(): void{
    this.especiesService.obtenerEspecies().subscribe(especies => {
      
      this.especie = especies;
      console.log(this.especie);
    });

    this.subscriptions.push(this.EsSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  filtro(){
    if(this.fechaFiltro || this.nombreFiltro){
      this.especie = this.especie.filter((especie) => {
          const fechaMatch = !this.fechaFiltro || especie.fechaCreacion === this.fechaFiltro;
          const nombreMatch = !this.nombreFiltro || especie.nombreEspecie.toLowerCase().includes(this.nombreFiltro.toLowerCase());
          return fechaMatch && nombreMatch;
    });
  }else{
    this.obtenerEspecies();
  }
}


  borrarBusqueda() {
    // Restaura la lista completa de unidades
    this.obtenerEspecies();
    // Limpia la fecha de filtro
    this.fechaFiltro = null;
  }
}
