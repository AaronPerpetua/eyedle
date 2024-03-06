import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./App";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
} from "react-native";
import FirebaseConsole from "./FirebaseConsole";

export default function LoginScreen({ navigation }) {
  const { name, setNameValue, code, setCodeValue } = useContext(AppContext);

  const onLoginPress = async () => {
    navigation.navigate("BackgroundFetchScreen");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

      <TouchableOpacity onPress={() => onLoginPress()}>
        <Text>Log in</Text>
      </TouchableOpacity>

      <Text>Your Client Name: {name} </Text>
      <Text>Your Client Name: {code} </Text>
    </View>
  );
}
