import firebase from "firebase";
import friestore from "firebase/firestore";
import analytics from "firebase/analytics";

// Your web app's Firebase configuration, fill from firebase console.
var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

//export firestore databse
export default firebaseApp.firestore();
