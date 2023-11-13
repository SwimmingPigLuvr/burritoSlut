import type { Timestamp, GeoPoint, DocumentReference } from "firebase/firestore";

export interface Address {
    city: string;
    state: string;
    street: string;
    zip_code: number;
    coordinates: GeoPoint;
}

export interface Restaurant {
    address: Address;
    name: string;
    menu: BurritoData[];
    fullMenu: MenuItem[];
    profilePictureURL: string;
    reviews: ReviewData[];
    owner: UserData;

    // is this part of a chain?
    chain: string | null;

    // ads & offers

}

export interface UserData {
    username: string;
    bio: string;
    profilePictureURL: string;
    reviews: ReviewData[];
    type: 'owner' | 'user';
}

export interface ReviewData {
    rating: number;
    burrito: BurritoData | null;
    imageURLS: string[];
    timestamp: Timestamp;
    tags: string[];
    author: UserData;
    text: string;
}

export interface Badge {
    criteria: string;
    imageURL: string;
    title: string;
    isSecret: boolean;
    pointsAwarded: number;
}

// 🛎️has todo!
export interface BurritoData {
    name: string;
    restaurant: Restaurant;
    imageURLs: string[];
    ingredients: string[];
    price: number;
    reviews: ReviewData[];
    tags: string[];
    // todo!
    // burrito rating properties
}

export interface MenuItem {
    name: string;
    price: number;
}

