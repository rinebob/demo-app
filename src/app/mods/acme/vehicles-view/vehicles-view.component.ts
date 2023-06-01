import { Component, OnInit } from '@angular/core';
import { withLatestFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EntitiesViewBaseComponent } from '../base/entities-view/entities-view-base.component';
import { Vehicle } from '../common/interfaces-acme';
import { VEHICLE_TABLE_COLUMNS } from '../common/constants-acme';
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

  label = 'vehicles';
  
  readonly VEHICLE_TABLE_COLUMNS = VEHICLE_TABLE_COLUMNS;

  constructor(readonly vehiclesStore: VehiclesViewStore) {
    super(vehiclesStore);
  }

  ngOnInit(): void {
    this.searchTerm$.pipe(
      withLatestFrom(this.entities$),
      takeUntil(this.destroy$)
      ).subscribe(([term, vehicles]) => {
        // console.log('pV ngOI search term sub: ', term);
        const results = search<Vehicle>(vehicles, term)
        // console.log('pV hST search results: ', results);
        this.vehiclesStore.setSearchResults(results);
    });
  }

}
