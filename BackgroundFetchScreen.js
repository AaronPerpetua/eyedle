import React, { useEffect, useState, useContext } from "react";

import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
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

const BACKGROUND_FETCH_TASK = "background-fetch";

const onSaveFirebase = async (resp_longitude, respt_latitude, resplace) => {
  const { name, code } = useContext(AppContext);

  await addDoc(collection(db, "location"), {
    code: name,
    name: code,
    place: resplace,
    longitude: resp_longitude,
    latitude: respt_latitude,
    time: Timestamp.now(),
  });

  console.log(resp_longitude, respt_latitude, resplace, name, code);
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
  const location = await Location.getCurrentPositionAsync({});

  const resp_longitude = location.coords.longitude;
  const respt_latitude = location.coords.latitude;

  onPrep(resp_longitude, respt_latitude);
};

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  performBackgroundTask();

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 1, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function BackgroundFetchScreen() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  const { name, setNameValue, code, setCodeValue } = useContext(AppContext);

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");

        return;
      }
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text>
          Background fetch status:{" "}
          <Text style={styles.boldText}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text>
          Background fetch task name:{" "}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : "Not registered yet!"}
          </Text>
        </Text>
      </View>
      <TextInput
        placeholder="Set your client name"
        placeholderTextColor="#aaaaaa"
        value={name}
        onChangeText={(text) => setNameValue(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Paste your Code here"
        placeholderTextColor="#aaaaaa"
        value={code}
        onChangeText={(text) => setCodeValue(text)}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />
      <View style={styles.textContainer}></View>
      <Button
        title={
          isRegistered
            ? "Unregister BackgroundFetch task"
            : "Register BackgroundFetch task"
        }
        onPress={toggleFetchTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
