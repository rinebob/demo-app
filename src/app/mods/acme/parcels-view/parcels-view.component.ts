import { Component, OnInit } from '@angular/core';
import { withLatestFrom } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PARCELS, PARCEL_4 } from '../common/acme-mock-data';
import { Parcel } from '../common/interfaces-acme';
import { PARCEL_TABLE_COLUMNS } from '../common/constants-acme';
import { ParcelsViewStore } from './parcels-view-store';
import { EntitiesViewBaseComponent } from '../base/entities-view/entities-view-base.component';
import { search } from '../common/acme-utils';

@Component({
  selector: 'app-parcels-view',
  templateUrl: './parcels-view.component.html',
  styleUrls: ['./parcels-view.component.scss'],
  providers: [ParcelsViewStore],
})
export class ParcelsViewComponent extends EntitiesViewBaseComponent<Parcel> implements OnInit {

  searchTerm$ = this.parcelsStore.searchTerm$;

  label = 'parcels';
  
  readonly PARCEL_TABLE_COLUMNS = PARCEL_TABLE_COLUMNS;

  constructor(readonly parcelsStore: ParcelsViewStore) {

    super(parcelsStore);
  }

  ngOnInit(): void {
    this.searchTerm$.pipe(
      withLatestFrom(this.entities$),
      takeUntil(this.destroy$)
      ).subscribe(([term, parcels]) => {
        // console.log('pV ngOI search term sub: ', term);
        const results = search<Parcel>(parcels, term)
        // console.log('pV hST search results: ', results);
        this.parcelsStore.setSearchResults(results);
    });
  }
}
