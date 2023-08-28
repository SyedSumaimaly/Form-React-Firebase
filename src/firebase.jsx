
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCIGwnZ4x0mek-BVGUOGonrnEX18mGb4VY",
    authDomain: "practice-sumaim.firebaseapp.com",
    projectId: "practice-sumaim",
    storageBucket: "practice-sumaim.appspot.com",
    messagingSenderId: "300999668189",
    appId: "1:300999668189:web:2d6647b551a54913408634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app};