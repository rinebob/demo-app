import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, withLatestFrom } from 'rxjs';

import { EntitiesViewBaseComponent } from '../base/entities-view/entities-view-base.component';
import { Vehicle } from '../common/interfaces-acme';
import { VEHICLE_TABLE_COLUMNS } from '../common/constants-acme';
import { VEHICLES } from '../common/acme-mock-data';
import { VehiclesViewStore } from './vehicles-view-store';
import { search } from '../common/acme-utils';

@Component({
  selector: 'app-vehicles-view',
  templateUrl: './vehicles-view.component.html',
  styleUrls: ['./vehicles-view.component.scss'],
  providers: [VehiclesViewStore],
})
export class VehiclesViewComponent extends EntitiesViewBaseComponent<Vehicle> implements OnInit {

  searchTerm$ = this.vehiclesStore.searchTerm$;
  
  readonly VEHICLE_TABLE_COLUMNS = VEHICLE_TABLE_COLUMNS;

  constructor(readonly vehiclesStore: VehiclesViewStore) {
    super(vehiclesStore);
    this.vehiclesStore.setEntities(VEHICLES);
    this.vehiclesStore.setTableData(VEHICLES);
  }

  ngOnInit(): void {
    this.searchTerm$.pipe(
      withLatestFrom(this.entities$),
      ).subscribe(([term, vehicles]) => {
        // console.log('pV ngOI search term sub: ', term);
        const results = search<Vehicle>(vehicles, term)
        // console.log('pV hST search results: ', results);
        this.vehiclesStore.setSearchResults(results);
    });
  }

}
