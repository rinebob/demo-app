import { Injectable } from '@angular/core';

import { EntityComponentStoreInterface, Vehicle } from '../common/interfaces-acme';
import { EntityStoreBase } from '../entity-store-base';
import { VEHICLE_STORE_INITIALIZER } from '../common/constants-acme';

@Injectable()
export abstract class VehiclesViewStoreBase extends EntityStoreBase<Vehicle>
    implements EntityComponentStoreInterface<Vehicle> {

        constructor() {
            super(VEHICLE_STORE_INITIALIZER);
        }
    }