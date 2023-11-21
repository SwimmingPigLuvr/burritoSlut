declare global {
    interface Window {
        initMap: () => void;
    }
} 

import type { Timestamp, GeoPoint, DocumentReference } from "firebase/firestore";

export interface Address {
    city: string;
    state: string;
    street: string;
    zip_code: number;
    coordinates: GeoPoint;
}

export interface RestaurantData {
    address: Address;
    name: string;
    menu: BurritoData[];
    fullMenu: MenuItem[];
    profilePicture: {
        url: string,
        altText: string,
    };
    reviews: ReviewData[];
    owner: UserData;
    hours: {
        [key: string]: {
            open: string;
            close: string;
        };
    };

    // is this part of a chain?
    chain: string | null;

    // ads & offers

}

export interface MyUser {
    uid?: string;
    userData?: UserData;
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
    restaurant: RestaurantData;
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

