import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { MessageService } from 'primeng/api';
import { RolesService } from '../../services/roles.service';
import { Roles } from '../../models/roles';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-edit-usuarios',
  templateUrl: './add-edit-usuarios.component.html',
  styleUrls: ['./add-edit-usuarios.component.css']
})
export class AddEditUsuariosComponent implements OnInit, OnChanges {
  rol: Roles[] = [];

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedUsuarios: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Guardar";

  form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    telefono: [0, Validators.required],
    email: ["", Validators.required],
    roles: [0, Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private rolService: RolesService
  ){}

  ngOnInit(): void {
    this.getRoles();
  }

  ngOnChanges(): void {
    if(this.selectedUsuarios){
      this.modalType = "Actualizar";
      this.form.patchValue(this.selectedUsuarios);
    }else {
      this.modalType = 'Guardar'
    }
  }

  closeModal(){
    this.form.reset();
    this.clickClose.emit(true);
  }
  
  obtenerUsers(){
    if(this.displayAddEditModal && this.selectedUsuarios){
      this.usuariosService.obtenerUsuariosPorId(this.selectedUsuarios).subscribe(
        response => {
          this.form.get('username')?.setValue(response.username);
          this.form.get('nombre')?.setValue(response.nombre);
          this.form.get('apellido')?.setValue(response.apellido);
          this.form.get('password')?.setValue(response.password);
          this.form.get('telefono')?.setValue(response.telefono);
          this.form.get('telefono')?.setValue(response.telefono);
          this.form.get('email')?.setValue(response.email);
          this.form.controls['roles']?.setValue(response.roles.id);
        }
      )
    }
  }


  addEditUsuarios(){
    const password = this.form.get('password')?.value;

    const hashedPassword = CryptoJS.SHA256(password ?? '').toString();
    const usersData = {
      username: this.form.get('username')?.value,
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      password: hashedPassword,
      telefono: this.form.get('telefono')?.value,
      email: this.form.get('email')?.value,
      roles: {
        id: this.form.get('roles')?.value
      }
    }
    
    this.usuariosService.addEditUsuarios(usersData, this.selectedUsuarios).subscribe(
      response => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Guardar' ? 'Registro Guardado' : 'Registro Actualizado';
        this.messageService.add({severity: 'success', summary: 'Success', detail: msg});
        console.log(this.modalType);
      },
      error => { 
        const msg = this.modalType === 'Guardar'? 'No puede Guardar este Registro': 'No puede Actulizar este Registro';
        this.messageService.add({severity: 'error', summary: 'Error', detail: error})
      }
    )
  }

  getRoles(){
    this.rolService.obtenerRoles().subscribe(
      response => {
        this.rol = response
      }
    )
  }
}

