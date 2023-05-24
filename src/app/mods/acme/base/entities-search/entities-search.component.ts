import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { EntityBase } from '../../common/interfaces-acme';

@Component({
  template: ``,
})
export class EntitiesSearchBaseComponent<T extends EntityBase> {
  @Input() 
  set entities(entities: T[]) {
    this.entitiesBS.next(entities);
    // console.log('eS @i entities: ', this.entitiesBS.value);
  };
  get entities() {
    return this.entitiesBS.value;
  };
  entitiesBS = new BehaviorSubject<T[]>([]);

  @Output() readonly searchTerm = new EventEmitter<string>();

  searchControl = new FormControl('');
  searchForm = new FormGroup({
    'searchControl': this.searchControl,
  });

  constructor() {
    this.searchControl.valueChanges.pipe().subscribe(changes => {
      // console.log('---------------------------')
      // console.log('eS ctor search control value changes sub: ', changes);
      this.searchTerm.emit(changes ?? '');
    });
  }

}
