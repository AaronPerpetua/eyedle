import React, { useState, useEffect,createContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LoginScreen from "./LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
 
import BackgroundFetchScreen from "./BackgroundFetchScreen";
import FirebaseConsole from "./FirebaseConsole";
 

export const AppContext = createContext();

const Stack = createNativeStackNavigator();
 
export default function App() {

 
  const [name, setNameValue] = useState('name');
  const [code, setCodeValue] = useState('code');



  return (
    <AppContext.Provider value={{ name, setNameValue, code, setCodeValue }}>
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name="BackgroundFetchScreen" component={BackgroundFetchScreen} />
      <Stack.Screen name="Login" component={LoginScreen} ></Stack.Screen>

       <Stack.Screen name="FirebaseConsole" component={FirebaseConsole} />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
