import { GeoPoint, collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { db } from "./firebase";
import { error } from "@sveltejs/kit";

import type { RestaurantData, Address, UserData, BurritoData } from "./types";

// create functions to fetch data
// user data
// review data
// burrito data
// Restaurant data
export async function fetchUserData(username: string): Promise<UserData> {
    const collectionRef = collection(db, "users");

    const q = query(collectionRef, where("username", "==", username), limit(1));

    const snapshot = await getDocs(q);
    const exists = snapshot.docs[0]?.exists();
    const data = snapshot.docs[0]?.data();

    if (!exists) {
        throw error(404, "user does not exist");
    }

    return {
        username: data.username,
        bio: data.bio,
        profilePictureURL: data.profilePictureURL,
        reviews: data.reviews,
        type: data.type
    };
}

interface FetchBurritoDataResult {
    burritos: BurritoData[];
}

export interface SearchResults {
    burritos: BurritoData[];
    restaurants: RestaurantData[];
    lastVisible: any;
    // location: GeoPoint | null;
}

export async function fetchSearchResults(
    mode: string, 
    maxLimit: number, 
    // location: GeoPoint, 
    // searchRadius: number,
    tags?: string[], 
    lastVisible?: any , 
): Promise<SearchResults> {

    console.log('hello from inside fetchSearchResults()');
    // console.log('executing a search for ', mode, 'wihtin ', searchRadius, 'of ', location);
    if (tags) {
        console.log('tags:')
        for (const tag of tags) {
            console.log(tag);
        }
    }
    console.log('maxlimit: ', maxLimit);

    const collectionRef = collection(db, mode);

    let q;
    if (tags && tags.length > 0) {
        q = query(collectionRef, where("tags", "array-contains-any", tags), orderBy("name"));
    } else {
        q = query(collectionRef, orderBy("name"));
    }

    if (lastVisible) {
        q = query(q, startAfter(lastVisible));
    }

    q = query(q, limit(maxLimit));

    const snapshot = await getDocs(q);
    let filteredResults = snapshot.docs.map(doc => doc.data() as RestaurantData | BurritoData);

    // if (location && searchRadius) {
    //     const start = 'gbsuv';
    //     const end = start + '~';

    //     collectionRef
    //         .orderBy('location')
    //         .startAt(start)
    //         .endAt(end);
    // }
    const lastVisibleDocument = snapshot.docs[snapshot.docs.length - 1];
    const lastVisibleSerializable = lastVisibleDocument ? { id: lastVisibleDocument.id } : null;

    let restaurants: RestaurantData[] = [];
    let burritos: BurritoData[] = [];

    if (mode === 'restaurants') {

        restaurants = filteredResults as RestaurantData[];

        // check first resty
        console.log(restaurants[0].name);

        return { restaurants, burritos, lastVisible: lastVisibleSerializable, /*location*/ };

    } else if (mode === 'burritos') {

        burritos = filteredResults as BurritoData[];
        return { restaurants, burritos, lastVisible: lastVisibleSerializable, /*location*/ };

    } else {
        throw new Error(`unsupported mode: ${mode}`);
    }
}

export async function fetchRestaurantData(restaurantId: string): Promise<RestaurantData> {

    // fetch restaurant by ID
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const restaurantDoc = await getDoc(restaurantRef);

    if (!restaurantDoc.exists()) {
        throw new Error("uh oh, restaurant not found");
    }

    const restaurantData = restaurantDoc.data() as RestaurantData;

    // fetch each burrito by ID
    const burritoIds = restaurantData.menu;
    const burritoDocs = await Promise.all(
        burritoIds.map(async (burritoId) => {
            const burritoRef = doc(db, "burritos", burritoId);
            return await getDoc(burritoRef);
        })
    );

    // map the docs to a list of burritos
    const burritos = burritoDocs.map(burritoDoc => {
        if (!burritoDoc.exists()) {
            throw new Error("uh oh, burrito not found");
        }
        return {
            id: burritoDoc.id,
            ...(burritoDoc.data() as BurritoData)
        };
    });

    // return the restaurant data with menu
    return {
        ...restaurantData,
        menu: burritos,
    };
}


