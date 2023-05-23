import { Parcel, ParcelType, ParcelUse, Vehicle, VehicleMaker, VehicleType } from "./interfaces-acme";

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
    sqFt: 2000,
    age: 10,
    price: 1000000,
    use: ParcelUse.RESIDENTIAL,

}

export const PARCEL_2: Parcel = {
    entityId: 'parcel-2',
    displayName: 'Office building',
    parcelType: ParcelType.OFFICE,
    address: '555 Busy Ave., Ste. 100 Overthere, NY 11111',
    sqFt: 100000,
    age: 20,
    price: 5000000,
    use: ParcelUse.COMMERCIAL,

}

export const PARCEL_3: Parcel = {
    entityId: 'parcel-3',
    displayName: 'Vacant land',
    parcelType: ParcelType.LAND,
    address: '200 Smith Rd. Ruralville, TX 55555',
    sqFt: 10000000,
    age: 100,
    price: 200000,
    use: ParcelUse.UNDEVELOPED,

}

export const PARCELS: Parcel[] = [PARCEL_1, PARCEL_2, PARCEL_3];

export const PARCEL_4: Parcel = {
    entityId: 'parcel-4',
    displayName: 'Spiffy tiny home',
    parcelType: ParcelType.SINGLE_FAM_RES,
    address: '456 Shady Bend Ln, Mellowtown, CO 88888',
    sqFt: 200,
    age: 1,
    price: 50000,
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