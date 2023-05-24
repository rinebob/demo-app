import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { EntityBase } from '../../common/interfaces-acme';
import { EntityStoreBase } from '../../entity-store-base';

@Component({
  template: '',
})
export abstract class EntitiesViewBaseComponent<T extends EntityBase> implements OnDestroy {

  entities$ = this.entityStore.entities$;
  selectedParcel$ = this.entityStore.selectedEntity$;
  entitiesTableData$ = this.entityStore.tableData$;
  searchResults$ = this.entityStore.searchResults$;

  constructor(@Inject(EntityStoreBase) readonly entityStore: EntityStoreBase<T> ) {

    // this.entities$.pipe().subscribe(items => {
    //   console.log('eVB ctor entities sub: ', items);
    // });
    
    // this.selectedParcel$.pipe().subscribe(item => {
    //   console.log('eVB ctor selected parcel sub: ', item);
    // });
    
    // this.entitiesTableData$.pipe().subscribe(items => {
    //   console.log('eVB ctor entities table data sub: ', items);
    // });
    
    this.searchResults$.pipe().subscribe(items => {
      // console.log('eVB ctor search results sub: ', items);
      this.entityStore.setTableData(items);
    });
  }

  ngOnDestroy(): void {
    
  }

  handleSearchTerm(searchTerm: string) {
    // console.log('pV hST search term: ', searchTerm);
    this.entityStore.setSearchTerm(searchTerm);
  }

}
