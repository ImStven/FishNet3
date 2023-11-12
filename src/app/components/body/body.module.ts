import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[BodyComponent]
})
export class BodyModule { }
