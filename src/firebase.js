// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import {getDatabase} from "firebase/database";
import { getDatabase, ref, onValue } from "firebase/database";
import { getStorage } from "firebase/storage"; // <-- AÑADIR ESTO
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNvy_oBcHthIXcV8I4yO1U9NuPcUtShDc",
  authDomain: "chat-zosen.firebaseapp.com",
  databaseURL: "https://chat-zosen-default-rtdb.firebaseio.com",
  projectId: "chat-zosen",
  storageBucket: "chat-zosen.appspot.com",
  messagingSenderId: "1077366693270",
  appId: "1:1077366693270:web:2fb30da6710fdcdc7051b7",
  measurementId: "G-ZFTV70TNTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app); // <-- AÑADIR ESTO

export { ref, onValue };

/*const db = firebase.initializeApp(firebaseConfig);
export default db.database().ref();*/

/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
*/