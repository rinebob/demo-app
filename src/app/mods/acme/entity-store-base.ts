import { ComponentStore } from '@ngrx/component-store';

import { AcmeState, EntityBase } from './common/interfaces-acme';

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

    readonly setSearchTerm = this.updater((state, searchTerm: string) => ({
        ...state,
        searchTerm,
    }));

    readonly setSearchResults = this.updater((state, searchResults: T[]) => ({
        ...state,
        searchResults: [...searchResults],
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

    readonly searchTerm$ = this.select((state) => {
        return state.searchTerm;
    });

    readonly searchResults$ = this.select((state) => {
        return state.searchResults;
    });

}
