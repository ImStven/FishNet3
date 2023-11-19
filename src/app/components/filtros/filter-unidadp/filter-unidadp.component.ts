import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs'; 

import { UnidadProductivaService } from '../../services/unidad-productiva.service';

@Component({
  selector: 'app-filter-unidadp',
  templateUrl: './filter-unidadp.component.html',
  styleUrls: ['./filter-unidadp.component.css']
})
export class FilterUnidadpComponent implements OnInit {

selectedUnidadP: string;
nombre: string [] = [];
subscriptions: Subscription[] = [];
unidadPSubscription: Subscription = new Subscription();



@Output() selectnombreUnidadP: EventEmitter<string> = new EventEmitter<string>();
ngOnInit(): void {
  
}

}
