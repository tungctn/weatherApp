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

const Forecast = ({ forecast }) => {
  useEffect(() => {
    console.log({ forecast: forecast });
  }, []);
  return (
    <SafeAreaView>
      {!forecast && <ActivityIndicator size="large" color="black" />}
      <ScrollView>
        <FlatList
          horizontal
          data={forecast?.hourly?.slice(0, 24)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const weather = item.weather[0];
            let dt = new Date(item.dt * 1000);
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
                  },
                ]}>
                <Text style={{ color: "white" }}>
                  {index === 0 ? "Bây giờ" : `${dt.getHours()}:00`}
                </Text>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                  {Math.round(item.temp)}°
                </Text>
                <Image
                  style={{ width: 40, height: 80 }}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                  }}
                />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 15, height: 15, marginRight: 5 }}
                    source={require("../assets/wind.png")}
                  />
                  <Text style={{ color: "white" }}>{item.wind_speed} m/s</Text>
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
