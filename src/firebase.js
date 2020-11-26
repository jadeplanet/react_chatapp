import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: 'AIzaSyA2YrIzgRmLPnkmflTRWXEo8StwxOFQKLM',
	authDomain: 'react-chatapp-b8ee2.firebaseapp.com',
	databaseURL: 'https://react-chatapp-b8ee2.firebaseio.com',
	projectId: 'react-chatapp-b8ee2',
	storageBucket: 'react-chatapp-b8ee2.appspot.com',
	messagingSenderId: '549462782216',
	appId: '1:549462782216:web:315617023be31c9cea3cbd',
	measurementId: 'G-PKDK6ZEJSC',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
