import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBHZn9I7pannM6aEVR6jG6F2rXHb91Hank',
  authDomain: 'mytheorie-317c9.firebaseapp.com',
  databaseURL: 'https://mytheorie-317c9.firebaseio.com',
  projectId: 'mytheorie-317c9',
  storageBucket: 'mytheorie-317c9.appspot.com',
  messagingSenderId: '675898618947',
};

const app = firebase.initializeApp(config);

const db = app.database();

export default db;
