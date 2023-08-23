import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInAnonymously,
  getRedirectResult
} from "firebase/auth";

import {
  Notify
} from "quasar";

import {
  useAuthStore
} from "src/stores/auth.store";

export default function useFirebaseAuth() {

  const auth = getAuth();

  const getFirebaseAuthRedirectResult = () => {
    getRedirectResult(auth)
      .then((result) => {
        const authStore = useAuthStore();
        authStore.checkingForRedirectionResult = false;
        if (result) {
          const credential = result.providerId == 'google.com' ? GoogleAuthProvider.credentialFromResult(result) : FacebookAuthProvider.credentialFromResult(result);
          // console.log(result, credential)

          if (credential) {
            console.log(credential)
            const token = credential.accessToken;

            const accessToken = result._tokenResponse.oauthIdToken;
            // The signed-in user info.
            const user = result.user;

            if (result.providerId == 'google.com') {
              authStore.loginWithGoogle(accessToken);
            } else {
              authStore.loginWithFacebook(token);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error)
        //const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);

        Notify.create({
          message: errorMessage,
          icon: "warning",
          position: "bottom",
          color: "negative",
        });
      });
  }

  const loginAnonymously = () => {

    signInAnonymously(auth)
      .then(() => {
        console.log("signedIN");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email");
    signInWithRedirect(auth, provider);
  };

  return {
    loginAnonymously,
    loginWithGoogle,
    loginWithFacebook,
    getFirebaseAuthRedirectResult
  };
}
