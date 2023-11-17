<script lang="ts">
	import { browser } from "$app/environment";
	import { auth } from "$lib/firebase";
	import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
    import firebaseui from 'firebaseui';
	import { onMount } from "svelte";


    onMount(() => {
        if (browser) {
            const loadFirebaseUI = async () => {
                const firebaseui = await import('firebaseui');
                const ui = new firebaseui.auth.AuthUI(auth);
                let uiConfig = {
                    callbacks: {
                        signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
                            console.log(authResult);
                            console.log(redirectUrl);
                            // sign in success
                            // return type determines whether we continue the redirect automatically
                            // or whether we leave that to developer to handle
                            return true;
                        },
                        uiShown: function() {
                            // widget rendered
                            // hide the loader
                            document.getElementById('loader')!.style.display = 'none';
                        }
                    },
                    // will use popup for IDP Providers sign-in flow instead of the default, redirect.
                    signInFlow: 'popup',
                    signInSuccessUrl: '/',
                    signInOptions: [
                        GoogleAuthProvider.PROVIDER_ID,
                        EmailAuthProvider.PROVIDER_ID,
                    ],
                    tosUrl: '/tos',
                    privacyPolicyUrl: '/privacy',
                };
                ui.start('#firebase-auth-container', uiConfig);
            } 
            
        }
    });
</script>
<h2>Hello from firebaseui-auth-container</h2>
<div id="firebaseui-auth-container"></div>
<div id="loader">...loading</div>