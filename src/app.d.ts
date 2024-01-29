// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {

		interface Window {
			initMap: () => void;
		}
		
		interface Locals {
			// user populated from session cookie
			user: import('firebase-admin/auth').DecodedIdToken | null
		}

		interface PageData {
			session: import('$lib/types').Session
		}

		// interface Error {}
		// interface Platform {}
	}
}

export {};
