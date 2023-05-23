import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { filter, tap, map, withLatestFrom, pairwise, skip } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Entity, AcmeState, EntityBase } from './common/interfaces-acme';

export abstract class EntityStoreBase<T extends EntityBase> extends ComponentStore<AcmeState<T>> {

    readonly setEntities = this.updater((state, entities: T[]) => ({
        ...state,
        entities: [...entities],
    }));
    
    readonly setSelectedEntity = this.updater((state, selectedEntity: T) => ({
        ...state,
        selectedEntity: {...selectedEntity},
    }));

    readonly setTableData = this.updater((state, tableData: T[]) => ({
        ...state,
        tableData: [...tableData],
    }));

    readonly entities$ = this.select((state) => {
        return state.entities;
    });
    
    readonly selectedEntity$ = this.select((state) => {
        return state.selectedEntity;
    });

    readonly tableData$ = this.select((state) => {
        return state.tableData;
    });

}
