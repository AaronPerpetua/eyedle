// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAs-QZO5gnU8O1lxYCL35tV7GVtvyu9ZQ4",
//   authDomain: "eyedle-9ae29.firebaseapp.com",
//   projectId: "eyedle-9ae29",
//   storageBucket: "eyedle-9ae29.appspot.com",
//   messagingSenderId: "19775847167",
//   appId: "1:19775847167:web:168efa0ea6d0e792c9aaca",
//   measurementId: "G-YFWBLBFGCN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAs-QZO5gnU8O1lxYCL35tV7GVtvyu9ZQ4',
  authDomain: 'eyedle-9ae29.firebaseapp.com',
  databaseURL: 'https://eyedle-9ae29.firebaseio.com',
  projectId: 'eyedle-9ae29',
  storageBucket: 'eyedle-9ae29.appspot.com',
  messagingSenderId: '19775847167',
  appId: '1:19775847167:web:168efa0ea6d0e792c9aaca',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
