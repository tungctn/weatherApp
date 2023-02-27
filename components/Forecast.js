import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

const Forecast = ({ forecast }) => {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    console.log("hover");
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };
  return (
    <SafeAreaView>
      {!forecast && <ActivityIndicator size="large" color="black" />}
      <ScrollView>
        <FlatList
          horizontal
          data={forecast?.hourly?.slice(0, 24)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(hour) => {
            const weather = hour.item.weather[0];
            let dt = new Date(hour.item.dt * 1000);
            return (
              <View
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={[
                  {
                    alignItems: "center",
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    margin: 5,
                  },
                  hover && {
                    backgroundColor: "rgba(0,0,0,0.8)",
                  },
                ]}>
                <Text style={{ color: "white" }}>{dt.getHours()}:00</Text>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                  }}
                />
                <Text style={{ color: "white" }}>
                  {Math.round(hour.item.temp)}°C
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
