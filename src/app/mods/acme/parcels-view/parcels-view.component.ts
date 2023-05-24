import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { PARCELS, PARCEL_4, VEHICLES } from '../common/acme-mock-data';
import { Parcel, Vehicle } from '../common/interfaces-acme';
import { PARCEL_TABLE_COLUMNS, VEHICLE_TABLE_COLUMNS } from '../common/constants-acme';
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

  readonly PARCEL_TABLE_COLUMNS = PARCEL_TABLE_COLUMNS;

  readonly VEHICLE_TABLE_COLUMNS = VEHICLE_TABLE_COLUMNS;

  constructor(readonly parcelsStore: ParcelsViewStore) {

  }

  ngOnInit(): void {
  }

  saveParcel() {
    this.parcelsStore.setEntities([...PARCELS, {...PARCEL_4}])
    this.parcelsStore.setSelectedEntity(PARCEL_4);

  }


}
