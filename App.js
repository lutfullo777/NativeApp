import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import Login from "./components/screens/Login";
import Start from "./components/screens/Start";
import HomeScreen from "./components/screens/Home";
import Todo from "./components/screens/todo";
import DoneScreen from "./components/screens/doneScreen";
import NoDone from "./components/screens/noDoneScreen";
import AddTask from "./components/screens/Add-Task";
import { Provider } from "react-redux";
import { Store } from "./redux/store";

const Stack = createStackNavigator();

export default function App() {
  const [data, setData] = useState();

  const getData = async () => {
    (await AsyncStorage.getItem("user")) ? setData(false) : setData(true);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          {data && (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                header: () => null,
              }}
            />
          )}
          <Stack.Screen
            name="Start"
            component={Start}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="Add-Task"
            component={AddTask}
            options={{
              title: "Vazifa qo'shish",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerBackTitle: true,
              headerTitleStyle: {
                textAlign: "center",
                fontWeight: "bold",
              },
            }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "Vazifalarim",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerBackTitleVisible: false,
              headerLeft: false,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="Task"
            component={Todo}
            options={{
              title: "Vazifa",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="DoneScreen"
            component={DoneScreen}
            options={{
              title: "Bajardim",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="No-done"
            component={NoDone}
            options={{
              title: "Bajarilmaganlar",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
