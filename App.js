import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./screen/navigation";
import Location from "./screen/location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyPager from "./screen/weather";
import Search from "./screen/search";
import Info from "./screen/info";
import ForecastDay from "./screen/forecast";
import i18n from "./i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import ThemeContext from "./ThemeContext";
import ThemeProvider from "./ThemeProvider";
import Setting from "./screen/setting";
// import WeatherApp from "./screen/weather";

const Stack = createNativeStackNavigator();
const App = () => {
  useEffect(() => {
    AsyncStorage.getItem("location").then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MyPager}
            options={{
              title: "Weather",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Location"
            component={Location}
            options={{
              title: "Location",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{
              title: "Setting",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              title: "Search",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Info"
            component={Info}
            options={{
              title: "Info",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Forecast"
            component={ForecastDay}
            options={{
              title: "Forecast",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
