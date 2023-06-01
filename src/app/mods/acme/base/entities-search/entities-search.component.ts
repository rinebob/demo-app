import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { EntityBase } from '../../common/interfaces-acme';

@Component({
  template: ``,
})
export class EntitiesSearchBaseComponent<T extends EntityBase> implements OnDestroy {
  readonly destroy$ = new Subject<void>()
  
  @Input() 
  set entities(entities: T[]) {
    this.entitiesBS.next(entities);
    // console.log('eS @i entities: ', this.entitiesBS.value);
  };
  get entities() {
    return this.entitiesBS.value;
  };
  entitiesBS = new BehaviorSubject<T[]>([]);

  @Input() 
  set label(label: string) {
    this.labelBS.next(label);
    // console.log('eS @i label: ', this.labelBS.value);
  };
  get label() {
    return this.labelBS.value;
  };
  labelBS = new BehaviorSubject<string>('');

  @Output() readonly searchTerm = new EventEmitter<string>();

  searchControl = new FormControl('');
  searchForm = new FormGroup({
    'searchControl': this.searchControl,
  });

  constructor() {
    this.searchControl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      // console.log('---------------------------')
      // console.log('eS ctor search control value changes sub: ', changes);
      this.searchTerm.emit(changes ?? '');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

}
