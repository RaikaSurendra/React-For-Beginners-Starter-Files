import Rebase from "re-base";
//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyADRrZls5L-dDBjJejV1mhVFQ1wMeoyk38",
    authDomain: "catch-of-the-day-suren.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-suren.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export {firebaseApp};

//this is a default export
export default base;