import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyA_MGCXXupXoWu6-oiJq1YIszTszLnOhNw",
    authDomain: "gamesource-22737.firebaseapp.com",
    projectId: "gamesource-22737",
    storageBucket: "gamesource-22737.firebasestorage.app",
    messagingSenderId: "433596698603",
    appId: "1:433596698603:web:aa30ca1262f8599128d3ae",
    measurementId: "G-318M7VZ8DG"
  };

initializeApp(firebaseConfig)

const DB = getFirestore();
const AUTH = getAuth();
 export {DB, AUTH}
