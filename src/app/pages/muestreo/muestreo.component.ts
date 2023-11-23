import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Muestreo } from 'src/app/components/models/muestreo';
import { MuestreoService } from 'src/app/components/services/muestreo.service';

@Component({
  selector: 'app-muestreo',
  templateUrl: './muestreo.component.html',
  styleUrls: ['./muestreo.component.css']
})
export class MuestreoComponent implements OnInit, OnDestroy {


  muestreo: Muestreo[] = [];
  displayAddEditModal = false;
  selected: any = null;
  subscriptions: Subscription[] = [];
  MSubscription: Subscription = new Subscription();

  constructor(
    private muestreoService: MuestreoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.obtener();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selected = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtener();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditarList(newData: any) {
    if (this.selected && newData.id === this.selected.id) {
      const Index = this.muestreo.findIndex(data => data.id === newData.id);
      this.muestreo[Index] = newData;
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
        this.muestreoService.eliminar(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtener();
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
    this.selected = id;
  }

  obtener(): void {
    this.muestreoService.obtener().subscribe(muestreo => {
      this.muestreo = muestreo;
      console.log(this.muestreo);

    });

    this.subscriptions.push(this.MSubscription)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}

