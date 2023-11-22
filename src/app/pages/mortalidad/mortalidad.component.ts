import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Mortaliad } from 'src/app/components/models/mortalidad';
import { MortalidadService } from 'src/app/components/services/mortalidad.service';

@Component({
  selector: 'app-mortalidad',
  templateUrl: './mortalidad.component.html',
  styleUrls: ['./mortalidad.component.css']
})
export class MortalidadComponent {

  mortalidads: Mortaliad[] = [];
  displayAddEditModal = false;
  selectedMortalidad: any = null;
  subscriptions: Subscription[] = [];
  LSubscription: Subscription = new Subscription();
  fechaFiltro:Date | null = null;

  constructor(
    private mortalidadService: MortalidadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  
  ngOnInit(): void {
    this.obtenerMortalidad();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedMortalidad = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerMortalidad();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditarMortalidadList(newData: any) {
    if (this.selectedMortalidad && newData.id === this.selectedMortalidad.id) {
      const mortalidadIndex = this.mortalidads.findIndex(data => data.id === newData.id);
      this.mortalidads[mortalidadIndex] = newData;
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
        this.mortalidadService.eliminarMortalidad(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerMortalidad();
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
    this.selectedMortalidad = id;
  }

  obtenerMortalidad(): void {
    this.mortalidadService.obtenerMortalidad().subscribe(mortalidad => {

      this.mortalidads = mortalidad;
      console.log(this.mortalidads);

    });
    this.subscriptions.push(this.LSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  
}
