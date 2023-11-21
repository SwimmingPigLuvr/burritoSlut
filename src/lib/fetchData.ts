import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
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

export async function fetchRestaurantData(lastVisible: any, tags: string[], maxLimit: number): Promise<RestaurantData[]> {
    console.log('hello from inside FetchRestaurantData()');
    const collectionRef = collection(db, "restaurants");

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

    const restaurants: RestaurantData[] = snapshot.docs.map(doc => doc.data() as RestaurantData);

    return restaurants;


}
