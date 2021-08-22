import React, { useEffect } from "react";
import { Alert, StyleSheet, BackHandler } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tasks from "./Tasks";
import Done from "./Done";
import NoDone from "./NoDone";
import Fontawesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Dasturdan chiqish", "Rostdan ham dasturdan chiqasizmi?", [
        {
          text: "Yo'q",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Ha", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Tasks") {
            iconName = "clipboard-list";
          } else if (route.name === "Done") {
            iconName = "check-square";
          } else {
            iconName = "times";
          }
          return (
            <Fontawesome5
              name={iconName}
              color={color}
              size={focused ? 25 : 20}
            />
          );
        },
        tabBarActiveBackgroundColor: "#f4511e",
        tabBarInactiveBackgroundColor: "#ff6500",
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontSize: 15,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Tasks"
        component={Tasks}
        style={styles.container}
        options={{
          tabBarLabel: "Topshiriqlar",
        }}
      />
      <Tab.Screen
        name="Done"
        component={Done}
        options={{
          tabBarLabel: "Bajarilgan",
        }}
      />
      <Tab.Screen
        name="NoDone"
        component={NoDone}
        options={{
          tabBarLabel: "Bajarilmagan",
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Home;
