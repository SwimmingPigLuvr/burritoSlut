import { db, user, userData, storage } from "$lib/firebase";
import { doc, setDoc, addDoc, updateDoc, writeBatch, collection } from "firebase/firestore";

export async function POST({ request }) {
    const form = await request.formData();

    const restaurantData = {
        name: form.get('name'),
        address: {
            street: form.get('street'),
            city: form.get('city'),
            state: form.get('state'),
            zip: form.get('zip'),
        },
        chain: form.get('chain') || null,
        // Add other fields as necessary
    };
    console.log(restaurantData);

    const restuarantsCollectionRef = collection(db, "restaurants");

    try {
        const restaurantRef = await addDoc(restuarantsCollectionRef, restaurantData);

        console.log("New restaurant added with ID:", restaurantRef.id);
        
        return new Response(JSON.stringify({ success: true, id: restaurantRef.id }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("error adding restaurant: ", error);
        return new Response(JSON.stringify({ success: false, error: error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json'}
        });
    }
}
