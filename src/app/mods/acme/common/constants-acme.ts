import { PARCELS } from "./acme-mock-data";
import { AcmeRoutes, AcmeState, ButtonMetadata, ColumnMetadata, Entity, EntityBase, Parcel, ParcelTableColumn, VehicleTableColumn } from "./interfaces-acme";


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
    searchTerm: '',
    searchResults: [],
}






///////////////////// PARCEL ///////////////////////

export const PARCEL_STORE_INITIALIZER: AcmeState<Parcel> = {
    entities: [...PARCELS],
    selectedEntity: PARCELS[0],
    tableData: [...PARCELS],
    searchTerm: '',
    searchResults: [],
}

export const PARCEL_TABLE_COLUMNS: ColumnMetadata[] = [

    {columnName: ParcelTableColumn .ENTITY_ID, headerText: 'Id'},
    {columnName: ParcelTableColumn.DISPLAY_NAME, headerText: 'Name'},
    {columnName: ParcelTableColumn.PARCEL_TYPE, headerText: 'Type'},
    {columnName: ParcelTableColumn.ADDRESS, headerText: 'Address'},
    {columnName: ParcelTableColumn.SQ_FT, headerText: 'Square feet'},
    {columnName: ParcelTableColumn.AGE, headerText: 'Age'},
    {columnName: ParcelTableColumn.PRICE, headerText: 'Price'},
    {columnName: ParcelTableColumn.USE, headerText: 'Use'},

];


///////////////////// VEHICLE ////////////////////////

export const VEHICLE_TABLE_COLUMNS: ColumnMetadata[] = [

    {columnName: VehicleTableColumn.ENTITY_ID, headerText: 'Id'},
    {columnName: VehicleTableColumn.DISPLAY_NAME, headerText: 'Name'},
    {columnName: VehicleTableColumn.VEHICLE_TYPE, headerText: 'Type'},
    {columnName: VehicleTableColumn.MAKER, headerText: 'Make'},
    {columnName: VehicleTableColumn.MODEL, headerText: 'Model'},
    {columnName: VehicleTableColumn.YEAR, headerText: 'Year'},
    {columnName: VehicleTableColumn.PRICE, headerText: 'Price'},
    {columnName: VehicleTableColumn.MILES, headerText: 'Miles'},

];