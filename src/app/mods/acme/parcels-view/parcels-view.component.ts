import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PARCELS } from '../common/acme-mock-data';
import { Parcel } from '../common/interfaces-acme';

@Component({
  selector: 'app-parcels-view',
  templateUrl: './parcels-view.component.html',
  styleUrls: ['./parcels-view.component.scss']
})
export class ParcelsViewComponent implements OnInit {

  parcelsBS = new BehaviorSubject<Parcel[]>([]);
  parcels$: Observable<Parcel[]> = this.parcelsBS;

  ngOnInit(): void {
    this.parcelsBS.next([...PARCELS]);
  }


}
