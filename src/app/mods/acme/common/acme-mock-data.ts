import { Collectible, CollectibleCondition, CollectibleType, Parcel, ParcelType, ParcelUse, Vehicle, VehicleMaker, VehicleType } from "./interfaces-acme";

///////////////////////// PARCELS ///////////////////////////

// export const PARCEL_: Parcel = {
//     entityId: '',
//     displayName: '',
//     parcelType: ParcelType.SINGLE_FAM_RES,
//     address: '',
//     sqFt: 0,
//     age: 0,
//     price: 0,
//     use: ParcelUse.RESIDENTIAL,

// }

export const PARCEL_1: Parcel = {
    entityId: 'parcel-1',
    displayName: 'Beautiful home',
    parcelType: ParcelType.SINGLE_FAM_RES,
    address: '123 Any St., Sometown CA, 99999',
    sqFt: 2158,
    age: 12,
    price: 1995250,
    use: ParcelUse.RESIDENTIAL,

}

export const PARCEL_2: Parcel = {
    entityId: 'parcel-2',
    displayName: 'Office building',
    parcelType: ParcelType.OFFICE,
    address: '555 Busy Ave., Ste. 100 Overthere, NY 11111',
    sqFt: 103875,
    age: 17,
    price: 5959970,
    use: ParcelUse.COMMERCIAL,

}

export const PARCEL_3: Parcel = {
    entityId: 'parcel-3',
    displayName: 'Vacant land',
    parcelType: ParcelType.LAND,
    address: '200 Smith Rd. Ruralville, TX 55555',
    sqFt: 12365022,
    age: 100,
    price: 219987,
    use: ParcelUse.UNDEVELOPED,

}

export const PARCELS: Parcel[] = [PARCEL_1, PARCEL_2, PARCEL_3];

export const PARCEL_4: Parcel = {
    entityId: 'parcel-4',
    displayName: 'Spiffy tiny home',
    parcelType: ParcelType.SINGLE_FAM_RES,
    address: '456 Shady Bend Ln, Mellowtown, CO 88888',
    sqFt: 235,
    age: 1,
    price: 59590,
    use: ParcelUse.RESIDENTIAL,

}

////////////////////// VEHICLES /////////////////////////////////

// export const VEHICLE_: Vehicle = {
//     entityId: 'vehicle-',
//     displayName: '',
//     vehicleType: VehicleType.CAR,
//     maker: VehicleMaker.FORD,
//     model: '',
//     year: '',
//     price: 0,
//     miles: 0,

// }

export const VEHICLE_1: Vehicle = {
    entityId: 'vehicle-1',
    displayName: 'Awesome Ford Mustang',
    vehicleType: VehicleType.CAR,
    maker: VehicleMaker.FORD,
    model: 'Mustang',
    year: '1968',
    price: 250000,
    miles: 100000,

}

export const VEHICLE_2: Vehicle = {
    entityId: 'vehicle-2',
    displayName: 'Tesla Prototype Pickup Truck',
    vehicleType: VehicleType.TRUCK,
    maker: VehicleMaker.TESLA,
    model: 'EV Pickup',
    year: '2024',
    price: 100000,
    miles: 0,

}

export const VEHICLE_3: Vehicle = {
    entityId: 'vehicle-3',
    displayName: 'Superfast Racer Motorcycle',
    vehicleType: VehicleType.MOTORCYCLE,
    maker: VehicleMaker.KAWASAKI,
    model: 'Viper',
    year: '2022',
    price: 45000,
    miles: 25000,

}

export const VEHICLE_4: Vehicle = {
    entityId: 'vehicle-4',
    displayName: 'Used Road Bike',
    vehicleType: VehicleType.BICYCLE,
    maker: VehicleMaker.SPECIALIZED,
    model: 'Sleek One',
    year: '2020',
    price: 3000,
    miles: 2000,

}

export const VEHICLES: Vehicle[] = [VEHICLE_1, VEHICLE_2, VEHICLE_3, VEHICLE_4];

/////////////////////////// COLLECTIBLES ////////////////////////

// export interface Collectible extends EntityBase {
//     collectibleType: CollectibleType;
//     age: number;
//     subject: string;    // who/what the collectible refers to (i.e. baseball card)
//     price: number;
//     condition: CollectibleCondition;
// }

// export const COLLECTIBLE_: Collectible = {
    // entityId: '',
    // displayName: '',
//     collectibleType: CollectibleType.,
//     age: 0,
//     subject: '',
//     price: 0,
//     condition: CollectibleCondition.,
// }

export const COLLECTIBLE_1: Collectible = {
    entityId: 'collectible-1',
    displayName: 'paris in spring',
    collectibleType: CollectibleType.ART,
    age: 200,
    subject: 'monay',
    price: 1250500,
    condition: CollectibleCondition.FAIR,
}

export const COLLECTIBLE_2: Collectible = {
    entityId: 'collectible-2',
    displayName: 'hank aaron rookie card',
    collectibleType: CollectibleType.MEMORABILIA,
    age: 65,
    subject: 'hank aaron',
    price: 1125750,
    condition: CollectibleCondition.LIKE_NEW,
}

export const COLLECTIBLE_3: Collectible = {
    entityId: 'collectible-3',
    displayName: 'american revolution uniform',
    collectibleType: CollectibleType.CLOTHING,
    age: 265,
    subject: 'soldier',
    price: 295500,
    condition: CollectibleCondition.POOR,
}

export const COLLECTIBLES: Collectible[] = [
    COLLECTIBLE_1, COLLECTIBLE_2, COLLECTIBLE_3,
];