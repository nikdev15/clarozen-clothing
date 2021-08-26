import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyD9eaq9XVlHdLhCpqCDo7dWUtXcM7iSk0w",
  authDomain: "crwn-clothing-3f700.firebaseapp.com",
  projectId: "crwn-clothing-3f700",
  storageBucket: "crwn-clothing-3f700.appspot.com",
  messagingSenderId: "805390400754",
  appId: "1:805390400754:web:a4b992d88dfa03ad99a46b",
  measurementId: "G-LCJ5KYFTT3"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
