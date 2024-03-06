import React, { useEffect, useState, useContext} from "react";
import { Text, View } from "react-native";
import * as Location from "expo-location";
import { initializeApp } from "firebase/app";
import { AppContext } from "./App";
import {
  getFirestore,
  query,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAs-QZO5gnU8O1lxYCL35tV7GVtvyu9ZQ4",
  authDomain: "eyedle-9ae29.firebaseapp.com",
  databaseURL: "https://eyedle-9ae29.firebaseio.com",
  projectId: "eyedle-9ae29",
  storageBucket: "eyedle-9ae29.appspot.com",
  messagingSenderId: "19775847167",
  appId: "1:19775847167:web:168efa0ea6d0e792c9aaca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default async function HomeScreen() {
 

//  const { name, code } = useContext(AppContext);
//  console.log(name, code);

 

  const onSaveFirebase = async (resp_longitude, respt_latitude, resplace) => {
    await addDoc(collection(db, "location"), {
      code: "test code",
      name: "test Name",
      place: resplace,
      longitude: resp_longitude,
      latitude: respt_latitude,
      time: Timestamp.now(),
    });

    console.log(resp_longitude, respt_latitude, resplace);
  };

  const onPrep = async (resp_longitude, respt_latitude) => {
    const exact_location = await Location.reverseGeocodeAsync({
      longitude: resp_longitude,
      latitude: respt_latitude,
    });

    const resplace = JSON.stringify(exact_location[0]["formattedAddress"]);
    onSaveFirebase(resp_longitude, respt_latitude, resplace);
  };







  const performBackgroundTask = async () => {
    // const { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   console.log("Permission to access location was denied");
    //   return;
    // }

    const location = await Location.getCurrentPositionAsync({});

    const resp_longitude = location.coords.longitude;
    const respt_latitude = location.coords.latitude;

    onPrep(resp_longitude, respt_latitude);
    console.log(resp_longitude);
  };

  performBackgroundTask();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Your Client Name: {name} </Text>
      <Text>Your Client Code:{code} </Text>
     
    </View>
  );
}
