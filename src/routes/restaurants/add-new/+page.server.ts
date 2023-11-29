import { db, user, userData, storage } from "$lib/firebase";
import { doc, setDoc, addDoc, updateDoc, writeBatch, collection } from "firebase/firestore";
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';


const dayHoursSchema = z
    .object({
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
        const restaurantData = {
            name: form.get('name'),
            chain: form.get('chain-name'),
            address: {
                street: form.get('street'),
                city: form.get('city'),
                state: form.get('state'),
                zip: form.get('zip'),
            },
        };
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
