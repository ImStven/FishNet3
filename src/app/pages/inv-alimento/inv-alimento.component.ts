import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EntradaAlimentos } from 'src/app/components/models/inv-entrada-alimento';
import { InvEntradaAlimentoService } from 'src/app/components/services/inv-entrada-alimento.service';

@Component({
  selector: 'app-inv-alimento',
  templateUrl: './inv-alimento.component.html',
  styleUrls: ['./inv-alimento.component.css']
})
export class InvAlimentoComponent {

  inventarios: EntradaAlimentos[] = [];
  displayAddEditModal = false;
  selectedInventario: any = null;
  subscriptions: Subscription[] = [];
  LSubscription: Subscription = new Subscription();
  
  constructor(
    private inventarioService: InvEntradaAlimentoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerInventario();
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedInventario = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerInventario();
    this.displayAddEditModal = !isClosed;
  }

  guardarInventarioList(newData: any) {
    if (this.selectedInventario && newData.id === this.selectedInventario.id) {
      const salidaIndex = this.inventarios.findIndex(data => data.id === newData.id);
      this.inventarios[salidaIndex] = newData;
    }
  }


  showEdit(id: number) {
    this.displayAddEditModal = true;
    this.selectedInventario = id;
  }

  obtenerInventario(): void {
    this.inventarioService.obtenerEntradaAlimentos().subscribe(inventario => {

      this.inventarios = inventario;
      console.log(this.inventarios);

    });
    this.subscriptions.push(this.LSubscription)
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
