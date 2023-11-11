export interface Address {
    city: string;
    state: string;
    street: string;
    zip_code: number;
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Restaurant {
    address: Address;
    name: string;
    coordinates: Coordinates;
}

