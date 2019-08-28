import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyASdPT_XZlYxTSgi-ZVKztJPkqneyiXF4g",
    authDomain: "floor-on-firebase.firebaseapp.com",
    databaseURL: "https://floor-on-firebase.firebaseio.com",
    projectId: "floor-on-firebase",
    storageBucket: "floor-on-firebase.appspot.com",
    messagingSenderId: "546325043830",
    appId: "1:546325043830:web:8846af38dcd854a5"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        return firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    }

    ReactDOM.render(<App />, document.getElementById('root'));

    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
});
