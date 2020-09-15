

import * as firebase from "firebase/app";
//import "firebase/firestore";

import "firebase/auth";
import "firebase/database";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDiSb91PpH4om5OqHCrVc7O1JR3pC4oJ2Q",
    authDomain: "awesome-todo-552ca.firebaseapp.com",
    databaseURL: "https://awesome-todo-552ca.firebaseio.com",
    projectId: "awesome-todo-552ca",
    storageBucket: "awesome-todo-552ca.appspot.com",
    messagingSenderId: "938842564443",
    appId: "1:938842564443:web:dd63cbcbfcdcea0bb55c7e",
    measurementId: "G-KGNTDQJ329"
    
  }
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig)
  let firebaseAuth = firebaseApp.auth()
  let firebaseDb = firebaseApp.database()

  export { firebaseAuth , firebaseDb }
  //export default firebaseAuth.firestore()
  