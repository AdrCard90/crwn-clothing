import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCKZ-Akb0nJ0wTcatGoeU77wvBrSFx7ojo",
  authDomain: "crwn-db-33644.firebaseapp.com",
  databaseURL: "https://crwn-db-33644.firebaseio.com",
  projectId: "crwn-db-33644",
  storageBucket: "crwn-db-33644.appspot.com",
  messagingSenderId: "959903314036",
  appId: "1:959903314036:web:2ff0c260bd39ea933a2121",
  measurementId: "G-72EFQPNCFB"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;