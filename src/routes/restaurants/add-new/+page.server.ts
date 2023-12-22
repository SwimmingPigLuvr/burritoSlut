import { db, user, userData, storage } from "$lib/firebase";
import { doc, setDoc, addDoc, updateDoc, writeBatch, collection } from "firebase/firestore";
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';


const dayHoursSchema = z.object({
    open: z.string().optional(),
    close: z.string().optional(),
});

const hoursSchema = z.record(dayHoursSchema);

const geoPointSchema = z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
});

const schema = z.object({
    name: z.string(),
    chain: z.
        object({
            name: z.string().optional(),
            restaurantIDs: z.array(z.string()).optional(),
        }).optional(),
    address: z
        .object({
            street: z.string(),
            streetLine2: z.string(),
            city: z.string(),
            state: z.string(),
            zip: z.number(),
            coordinates: geoPointSchema.optional(),
        }),
    hours: hoursSchema.optional(),
    menu: z.array(z.string()).optional(),
    fullMenu: z.array(z.string()).optional(),
    profilePictue: z
        .object({
            url: z.string(),
            alt: z.string().optional(),
        }).optional(),
    reviewIDs: z.array(z.string()).optional(),
    ownerID: z.string().optional(),
});

export const load = (async () => {
    const form = await superValidate(schema);
    return { form };
});


export const actions = {
    default: async ({ request }) => {

        const form = await request.formData();
        
        const street = form.get('street') || '';
        const streetLine2 = form.get('streetLine2') || '';
        const city = form.get('city') || '';
        const state = form.get('state') || '';
        const zip = form.get('zip') || '';

        const formattedAddress = `${street} ${streetLine2}, ${city}, ${state}, ${zip}`;
        const location = await geocode({ address: formattedAddress });
        
        const restaurantData = {
            name: form.get('name'),
            chain: form.get('chain-name'),
            address: {
                street: street,
                streetLine2: streetLine2,
                city: city,
                state: state,
                zip: zip,
            },
            location: location,
        };

        if (location) {
            console.log('geocoding results:');
            console.log('lat: ', location.lat, ' lng: ', location.lng);
            console.log('formatted_address: ', location.formattedAddress);
        }

        console.log('+page.server.ts** - restaurantData: ', restaurantData);

        // You may want to validate the data here before sending it to the database function

        // Call the function to save to DB
        try {
            const response = await saveRestaurantData(restaurantData);
            return response;
        } catch (error) {
            return { success: false, error };
        }
    },
}



async function saveRestaurantData(restaurantData: any) {
    const restaurantsCollectionRef = collection(db, "restaurants");

    try {
        const restaurantRef = await addDoc(restaurantsCollectionRef, restaurantData);
        console.log("New restaurant added with ID:", restaurantRef.id);

        return { success: true, id: restaurantRef.id };
    } catch (error) {
        console.error("Error adding restaurant: ", error);
        return { success: false, error };
    }
}

async function geocode(request: google.maps.GeocoderRequest) {
    try {
        const geocoder = new google.maps.Geocoder();
        const result = await geocoder.geocode(request);
        const { results } = result;

        if (results && results.length > 0) {
            const firstResult = results[0];
            const location = firstResult.geometry.location;

            return {
                lat: location.lat(),
                lng: location.lng(),
                formattedAddress: firstResult.formatted_address
            };
        } else {
            console.log('no results found for given address.');
            return null;
        }
    } catch (e) {
        console.error('geocode unsuccessful: ', e);
        return null;
    }
}


