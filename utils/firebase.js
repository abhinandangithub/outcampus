import firebase from "firebase/app"
import "firebase/auth"
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
} from "@react-firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyABZAlLUKPJr5ThGtyzn3U4NvNUtqQGH8g",
  authDomain: "outcampus-e5337.firebaseapp.com",
  databaseURL: "https://outcampus-e5337.firebaseio.com",
  projectid: "outcampus-e5337",
  storageBucket: "outcampus-e5337.appspot.com",
  messagingSenderId: "318172525006",
  appId: "1:318172525006:web:5e4e5a33495915f989bb9f",
  measurementId: "G-59YMSYPLC0",
}

export { FirebaseAuthProvider, FirebaseAuthConsumer, firebaseConfig, firebase }
