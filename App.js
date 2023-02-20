import React from "react";
import Home from "./screen/home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "./screen/search";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: "Weather",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-search" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
