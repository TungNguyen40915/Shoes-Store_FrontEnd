import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDusFKebmjFEOzdWOQnMgwF6DZBRmRZBzc",
    authDomain: "chatbox-50976.firebaseapp.com",
    databaseURL: "https://chatbox-50976.firebaseio.com",
    projectId: "chatbox-50976",
    storageBucket: "chatbox-50976.appspot.com",
    messagingSenderId: "77533622093"
};
firebase.initializeApp(config);

export const database = firebase.database();