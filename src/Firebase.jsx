import 'firebase/compat/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 import { Timestamp } from 'firebase/firestore';
 import { getFirestore} from "@firebase/firestore";




 const firebaseConfig = {

   apiKey: import.meta.env.VITE_API_KEY,

   authDomain: import.meta.env.VITE_SOME_KEY_AUTHDOM,

   projectId: import.meta.env.VITE_SOME_KEY_PID,

   storageBucket: import.meta.env.VITE_SOME_KEY_SB,

   messagingSenderId: import.meta.env.VITE_SOME_KEY_MSI,

   appId: import.meta.env.VITE_SOME_KEY_AI,

   measurementId: import.meta.env.VITE_SOME_KEY_MI

 };


const app = firebase.initializeApp(firebaseConfig)
//const analytics = getAnalytics(app);
const auth = firebase.auth();
const storage = firebase.storage()
const fs = firebase.firestore()
const timestamp = firebase.firestore()
const db = getFirestore(app)


export { auth, timestamp, db,storage,fs }
