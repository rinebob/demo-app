import { Component, OnInit } from '@angular/core';

import { VEHICLES } from '../common/acme-mock-data';
import { Vehicle } from '../common/interfaces-acme';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles-view',
  templateUrl: './vehicles-view.component.html',
  styleUrls: ['./vehicles-view.component.scss']
})
export class VehiclesViewComponent implements OnInit {

  vehiclesBS = new BehaviorSubject<Vehicle[]>([]);
  vehicles$: Observable<Vehicle[]> = this.vehiclesBS;

  ngOnInit(): void {
    this.vehiclesBS.next([...VEHICLES]);
  }

}
