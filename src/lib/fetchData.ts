import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
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

interface SeachResults {
    burritos?: BurritoData[];
    restaurants?: RestaurantData[];
    lastVisible: any;
}

export async function fetchSearchResults(mode: string, maxLimit: number, lastVisible?: any, tags?: string[],): Promise<SeachResults> {
    console.log('hello from inside fetchSearchResults()');

    const collectionRef = collection(db, mode);

    let q;

    if (tags && tags.length > 0) {
        if (lastVisible) {
            q = query(collectionRef, where("tags", "array-contains-any", tags), orderBy("name"), startAfter(lastVisible), limit(maxLimit));
        } else {
            q = query(collectionRef, where("tags", "array-contains-any", tags), orderBy("name"), limit(maxLimit));
        }
    } else {
        if (lastVisible) {
            q = query(collectionRef, orderBy("name"), startAfter(lastVisible), limit(maxLimit));
        } else {
            q = query(collectionRef, orderBy("name"), limit(maxLimit));
        }
    }

    const snapshot = await getDocs(q);
    const lastVisibleDocument = snapshot.docs[snapshot.docs.length - 1];
    const lastVisibleSerializable = lastVisibleDocument ? { id: lastVisibleDocument.id } : null;

    if (mode === 'restaurants') {

        const restaurants = snapshot.docs.map(doc => doc.data() as RestaurantData);
        return { restaurants, lastVisible: lastVisibleSerializable };

    } else if (mode === 'burritos') {

        const burritos = snapshot.docs.map(doc => doc.data() as BurritoData);
        return { burritos, lastVisible: lastVisibleSerializable };

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
