import { Injectable } from '@angular/core';
import { EntityComponentStoreInterface, Parcel } from '../common/interfaces-acme';
import { EntityStoreBase } from '../entity-store-base';
import { PARCEL_STORE_INITIALIZER } from '../common/constants-acme';

@Injectable()
export abstract class ParcelsViewStoreBase extends EntityStoreBase<Parcel> 
    implements EntityComponentStoreInterface<Parcel> {

    constructor() {
        super(PARCEL_STORE_INITIALIZER)
    }

}