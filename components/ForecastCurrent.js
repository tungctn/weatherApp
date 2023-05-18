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
    console.log(forecast);
  }, []);
  return (
    <SafeAreaView>
      {!forecast && <ActivityIndicator size="large" color="black" />}
      <ScrollView>
        <FlatList
          horizontal
          data={forecast?.hourly?.slice(0, 24)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
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
                <Text style={{ color: "white" }}>{dt.getHours()}:00</Text>
                <Image
                  style={{ width: 50, height: 60 }}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                  }}
                />
                <Text style={{ color: "white" }}>
                  {Math.round(item.temp)}°C
                </Text>
                <Text style={{ color: "white" }}>
                  {dt.toLocaleDateString()}
                </Text>
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Forecast;
