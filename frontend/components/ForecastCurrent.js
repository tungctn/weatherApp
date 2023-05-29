import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  convertCelsiusToFahrenheit,
  convertCelsiusToKelvin,
  convertKmToMph,
  convertKmToMs,
} from "../../constants";
import { useIsFocused } from "@react-navigation/native";

const Forecast = ({ forecast }) => {
  const [tempMode, setTempMode] = useState(null);
  const [speedMode, setSpeedMode] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    console.log({ forecast: forecast });
    AsyncStorage.getItem("temp").then((value) => {
      setTempMode(value);
    });
    AsyncStorage.getItem("speed").then((value) => {
      setSpeedMode(value);
    });
  }, [isFocused]);
  return (
    <SafeAreaView>
      {!forecast && <ActivityIndicator size="large" color="black" />}
      <ScrollView>
        <FlatList
          horizontal
          data={forecast}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            let dt = new Date(item.time_epoch * 1000);
            return (
              <View
                style={[
                  {
                    alignItems: "center",
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    margin: 5,
                    width: 100,
                  },
                ]}>
                <Text style={{ color: "white" }}>
                  {index === 0 ? "Bây giờ" : `${dt.getHours()}:00`}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginTop: 5,
                  }}>
                  {tempMode === "Celsius" && `${item.temp_c} °C`}
                  {tempMode === "Fahrenheit" &&
                    `${convertCelsiusToFahrenheit(item.temp_c)} °F`}
                  {tempMode === "Kelvin" &&
                    `${convertCelsiusToKelvin(item.temp_c)} °K`}
                </Text>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={{
                    uri: `https:${item.condition.icon}`,
                  }}
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 15, height: 15, marginRight: 5 }}
                    source={require("../assets/wind.png")}
                  />
                  <Text style={{ color: "white" }}>
                    {speedMode == "kmh" && `${item.wind_kph} km/h`}
                    {speedMode == "ms" && `${convertKmToMs(item.wind_kph)} m/s`}
                    {speedMode == "mph" &&
                      `${convertKmToMph(item.wind_kph)} mph`}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forecast;
