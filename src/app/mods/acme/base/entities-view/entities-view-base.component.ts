import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { EntityBase } from '../../common/interfaces-acme';
import { EntityStoreBase } from '../../entity-store-base';
import { Subject, takeUntil } from 'rxjs';

@Component({
  template: '',
})
export abstract class EntitiesViewBaseComponent<T extends EntityBase> implements OnDestroy {
  readonly destroy$ = new Subject<void>();

  entities$ = this.entityStore.entities$;
  selectedEntity$ = this.entityStore.selectedEntity$;
  tableData$ = this.entityStore.tableData$;
  searchResults$ = this.entityStore.searchResults$;

  constructor(@Inject(EntityStoreBase) readonly entityStore: EntityStoreBase<T> ) {

    // this.entities$.pipe().subscribe(items => {
    //   console.log('eVB ctor entities sub: ', items);
    // });
    
    // this.selectedEntity$.pipe().subscribe(item => {
    //   console.log('eVB ctor selected entity sub: ', item);
    // });
    
    // this.entitiesTableData$.pipe().subscribe(items => {
    //   console.log('eVB ctor entities table data sub: ', items);
    // });
    
    this.searchResults$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      // console.log('eVB ctor search results sub: ', items);
      this.entityStore.setTableData(items);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSearchTerm(searchTerm: string) {
    // console.log('pV hST search term: ', searchTerm);
    this.entityStore.setSearchTerm(searchTerm);
  }

}
