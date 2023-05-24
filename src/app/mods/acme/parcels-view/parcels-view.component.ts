import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, take, withLatestFrom } from 'rxjs';

import { PARCELS, PARCEL_4 } from '../common/acme-mock-data';
import { Parcel } from '../common/interfaces-acme';
import { PARCEL_TABLE_COLUMNS } from '../common/constants-acme';
import { ParcelsViewStore } from './parcels-view-store';
import { EntitiesViewBaseComponent } from '../base/entities-view/entities-view.component';
import { search } from '../common/acme-utils';

@Component({
  selector: 'app-parcels-view',
  templateUrl: './parcels-view.component.html',
  styleUrls: ['./parcels-view.component.scss'],
  providers: [ParcelsViewStore],
})
export class ParcelsViewComponent extends EntitiesViewBaseComponent<Parcel> implements OnInit {

  searchTerm$ = this.parcelsStore.searchTerm$;
  
  readonly PARCEL_TABLE_COLUMNS = PARCEL_TABLE_COLUMNS;

  constructor(readonly parcelsStore: ParcelsViewStore) {

    super(parcelsStore);
    this.parcelsStore.setEntities(PARCELS);
    this.parcelsStore.setTableData(PARCELS);
  }

  ngOnInit(): void {
    this.searchTerm$.pipe(
      withLatestFrom(this.entities$),
      ).subscribe(([term, parcels]) => {
        // console.log('pV ngOI search term sub: ', term);
        const results = search<Parcel>(parcels, term)
        // console.log('pV hST search results: ', results);
        this.parcelsStore.setSearchResults(results);
    });
  }

  saveParcel() {
    this.parcelsStore.setEntities([...PARCELS, {...PARCEL_4}])
    this.parcelsStore.setSelectedEntity(PARCEL_4);

  }


}
