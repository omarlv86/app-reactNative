import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvYHXwf9dX20IAXFwwf7cWkJe-piGyX10",
    authDomain: "tenedores-aff87.firebaseapp.com",
    projectId: "tenedores-aff87",
    storageBucket: "tenedores-aff87.appspot.com",
    messagingSenderId: "771807296669",
    appId: "1:771807296669:web:152870d765b6a77d31a874"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);