
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Usuarios } from 'src/app/components/models/usuarios';
import { UsuariosService } from 'src/app/components/services/usuarios.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  usuario: Usuarios[] = [];
  displayAddEditModal = false;
  selectedUsuarios: any = null;
  subscriptions: Subscription[] = [];
  UsSubscription: Subscription = new Subscription();

  constructor(
    private usuariosService: UsuariosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  showAddModal(){
    this.displayAddEditModal = true;
    this.selectedUsuarios = null;
  }

  hideAddModal(isClosed: boolean) {
    this.obtenerUsuarios();
    this.displayAddEditModal = !isClosed;
  }

  guardaroEditerUsuariosList(newData: any){
    if(this.selectedUsuarios && newData.id == this.selectedUsuarios.id){
      const usersIndex = this.usuario.findIndex(data => data.id === newData.id);
      this.usuario[usersIndex] = newData;
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
        this.usuariosService.eliminarUsuarios(id).subscribe(
          response => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registro Elimindo' })
            this.obtenerUsuarios();
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
    this.selectedUsuarios = id;
  }

  obtenerUsuarios(): void {
    this.usuariosService.obtenerUsuarios().subscribe(usuarios => {

      this.usuario = usuarios
      
      ;
      console.log(this.usuario);
    });

    this.subscriptions.push(this.UsSubscription)

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
