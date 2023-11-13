import type { PageLoad } from "../../$types";
import { fetchUserData } from "$lib/fetchData";

export const load = (async ({ params }) => {
  const { username } = params;
  try {
    const data = await fetchUserData(username);
    return data;
  } catch (error) {
    console.error("An error occurred:", error); // Logging any errors
    throw error; // Re-throwing the error so that it gets handled appropriately
  }
}) satisfies PageLoad;