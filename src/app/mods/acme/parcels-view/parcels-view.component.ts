import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PARCELS, PARCEL_4 } from '../common/acme-mock-data';
import { Parcel } from '../common/interfaces-acme';
import { ParcelsViewStore } from './parcels-view-store';

@Component({
  selector: 'app-parcels-view',
  templateUrl: './parcels-view.component.html',
  styleUrls: ['./parcels-view.component.scss'],
  providers: [ParcelsViewStore],
})
export class ParcelsViewComponent implements OnInit {

  parcels$ = this.parcelsStore.entities$;
  selectedParcel$ = this.parcelsStore.selectedEntity$;
  parcelsTableData$ = this.parcelsStore.tableData$;

  constructor(readonly parcelsStore: ParcelsViewStore) {

  }

  ngOnInit(): void {
  }

  saveParcel() {
    this.parcelsStore.setEntities([...PARCELS, {...PARCEL_4}])
    this.parcelsStore.setSelectedEntity(PARCEL_4);

  }


}
