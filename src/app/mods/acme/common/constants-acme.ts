import { PARCELS } from "./acme-mock-data";
import { AcmeRoutes, AcmeState, ButtonMetadata, Entity, EntityBase, Parcel } from "./interfaces-acme";


export const ACME_SIDENAV_BUTTONS: ButtonMetadata[] = [
    {url: AcmeRoutes.PARCELS, text: 'parcels', },
    {url: AcmeRoutes.VEHICLES, text: 'vehicles', },
    
];

///////////////////// ENTITY ////////////////////// 

export const ENTITY_INITIALIZER: EntityBase = {
    entityId: '',
    displayName: '',
}

export const ACME_STORE_INITIALIZER: AcmeState<Parcel> = {
    entities: [],
    selectedEntity: undefined,
    tableData: [],
}






///////////////////// PARCEL ///////////////////////

export const PARCEL_STORE_INITIALIZER: AcmeState<Parcel> = {
    entities: [...PARCELS],
    selectedEntity: PARCELS[0],
    tableData: [...PARCELS],
}









///////////////////// VEHICLE ////////////////////////