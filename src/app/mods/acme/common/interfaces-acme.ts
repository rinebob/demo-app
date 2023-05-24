import { Observable, Subject, Subscription } from "rxjs";


export enum AcmeRoutes {
    PARCELS = 'parcels',
    VEHICLES = 'vehicles',
}

export interface ButtonMetadata {
    url: string;
    fragment?: string;
    text: string;
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

/////////////////////// COMPONENT STORE ////////////////

export interface AcmeState<T extends EntityBase> {
    entities: T[];
    selectedEntity: T | undefined;
    tableData: T[];
}