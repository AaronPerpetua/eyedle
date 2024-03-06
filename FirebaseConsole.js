import React, {useContext } from "react";

import { StyleSheet, Text, View, Button } from 'react-native';

import { AppContext } from "./App";

function FirebaseConsole() {

  const { name, setNameValue, code, setCodeValue } = useContext(AppContext);

 console.log(name)
  return (
    <View >

  
  </View>
  )
}

export default FirebaseConsole