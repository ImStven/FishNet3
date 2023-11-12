import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lote } from 'src/app/components/models/lote';
import { LoteService } from 'src/app/components/services/lote.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.css']
})
export class LoteComponent implements OnInit, OnDestroy {

  lotes: Lote[] = [];
  displayAddEditModal = false;
  selectedLote: any = null;
  subscriptions: Subscription[] = [];
  LSubscription: Subscription = new Subscription();
  
  constructor(
    private loteService: LoteService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.obtenerLote();

  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedLote = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerLote();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditarLoteList(newData: any) {
    if (this.selectedLote && newData.id === this.selectedLote.id) {
      const loteIndex = this.lotes.findIndex(data => data.id === newData.id);
      this.lotes[loteIndex] = newData;
    }
  }
  eliminar(id: number): void {
    this.confirmationService.confirm({
      message: '¿Quieres Eliminar este Registro?',
      header: 'Confirmacion de Eliminar Registro',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loteService.eliminarLote(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerLote();
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
    this.selectedLote = id;
  }

  obtenerLote(): void {
    this.loteService.obtenerLote().subscribe(lote => {

      this.lotes = lote;
      console.log(this.lotes);

    });
    this.subscriptions.push(this.LSubscription)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
