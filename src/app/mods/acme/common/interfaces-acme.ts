import { Observable, Subject, Subscription } from "rxjs";


export enum AcmeRoutes {
    PARCELS = 'parcels',
    VEHICLES = 'vehicles',
    COLLECTIBLES = 'collectibles',
}

export interface ButtonMetadata {
    url: string;
    fragment?: string;
    text: string;
}

export interface ColumnMetadata {
    columnName: string;
    headerText: string;
}

/////////////////////// ENTITY ///////////////////////////

export interface EntityBase {
    id?: string;
    entityId: string;
    displayName: string;
}

export interface Entity extends EntityBase {

}

export interface EntityComponentStoreInterface<T extends EntityBase> {
    entities$: Observable<T[]>;
    selectedEntity$: Observable<T | undefined>;
    tableData$: Observable<T[]>;
    setEntities(observableOrValue: Observable<T[]> | T[]): Subscription;
    setSelectedEntity(observableOrValue: Observable<T> | T): Subscription;
    setTableData(observableOrValue: Observable<T[]> | T[]): Subscription;
}


/////////////////////// COMPONENT STORE ////////////////

export interface AcmeState<T extends EntityBase> {
    entities: T[];
    selectedEntity: T | undefined;
    tableData: T[];
    searchTerm: string;
    searchResults: T[];
}




/////////////////////// PARCEL ///////////////////////////

export enum ParcelType {
    SINGLE_FAM_RES = 'single family residence',
    OTHER_RES = 'other residential',
    OFFICE = 'office',
    LODGING = 'lodging',
    OTHER_COMMERCIAL = 'other commercial',
    LAND = 'land',
}

export enum ParcelUse {
    RESIDENTIAL = 'residential',
    COMMERCIAL = 'commercial',
    UNDEVELOPED = 'undeveloped',
}

export interface Parcel extends EntityBase {
    parcelType: ParcelType;
    address: string;
    sqFt: number;
    age: number;
    price: number;
    use: ParcelUse;
}

export interface ParcelComponentStoreInterface extends EntityComponentStoreInterface<Parcel> {
}

export enum ParcelTableColumn {
    ENTITY_ID = 'entityId',
    DISPLAY_NAME = 'displayName',
    PARCEL_TYPE = 'parcelType',
    ADDRESS = 'address',
    SQ_FT = 'sqFt',
    AGE = 'age',
    PRICE = 'price',
    USE = 'use',
}


  


////////////////////// VEHICLE ////////////////////////

export enum VehicleType {
    CAR = 'car',
    MOTORCYCLE = 'motorcycle',
    TRUCK = 'truck',
    BICYCLE = 'bicycle',
}

export enum VehicleMaker {
    FORD = 'ford',
    TESLA = 'tesla',
    KAWASAKI = 'kawasaki',
    SPECIALIZED = 'specialized',
}

export interface Vehicle extends EntityBase {
    vehicleType: VehicleType;
    maker: VehicleMaker;
    model: string;
    year: string;
    price: number;
    miles: number;
}

export interface VehicleComponentStoreInterface extends EntityComponentStoreInterface<Vehicle> {
}

export enum VehicleTableColumn {
    ENTITY_ID = 'entityId',
    DISPLAY_NAME = 'displayName',
    VEHICLE_TYPE = 'vehicleType',
    MAKER = 'maker',
    MODEL = 'model',
    YEAR = 'year',
    PRICE = 'price',
    MILES = 'miles',

}

////////////////////////// COLLECTIBLE ////////////////////////////

export enum CollectibleType {
    ART = 'art',
    MEMORABILIA = 'memorabilia',
    CLOTHING = 'clothing',
    BOOK = 'book',
}

export enum CollectibleCondition {
    NEW = 'new',
    LIKE_NEW = 'like new',
    GOOD = 'good',
    FAIR = 'fair',
    POOR = 'poor',
}

export interface Collectible extends EntityBase {
    collectibleType: CollectibleType;
    age: number;
    subject: string;    // who/what the collectible refers to (i.e. baseball card)
    price: number;
    condition: CollectibleCondition;
}

export interface collectibleComponentStoreInterface  extends EntityComponentStoreInterface<Collectible> {

}

export enum CollectibleTableColumn {
    ENTITY_ID = 'entityId',
    DISPLAY_NAME = 'displayName',
    COLLECTIBLE_TYPE = 'collectibleType',
    AGE = 'age',
    SUBJECT = 'subject',
    PRICE = 'price',
    CONDITION = 'condition',
}