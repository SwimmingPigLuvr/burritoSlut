import { db, user, userData, storage } from "$lib/firebase";
import { doc, setDoc, addDoc, updateDoc, writeBatch, collection } from "firebase/firestore";
let geocoder: google.maps.Geocoder;

export async function POST({ request }) {
    console.log('this is from inside the post request');


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
        // calulate geopoint from address here
        // calculate geohash from geopoint here
    };

    const street = form.get('street') || '';
    const city = form.get('city') || '';
    const state = form.get('state') || '';
    const zip = form.get('zip') || '';
    const formattedAddress = `${street}, ${city}, ${state}, ${zip}`;

    const location = await geocode({ address: formattedAddress });

    if (location) {
        console.log('geocoding results:');
        console.log('lat: ', location.lat, ' lng: ', location.lng);
        console.log('formatted_address: ', location.formattedAddress);
    }

    console.log('server.ts*****', restaurantData);

    const restuarantsCollectionRef = collection(db, "restaurants");

    try {
        const restaurantRef = await addDoc(restuarantsCollectionRef, restaurantData);

        console.log("New restaurant added with ID*********:", restaurantRef.id);
        
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


