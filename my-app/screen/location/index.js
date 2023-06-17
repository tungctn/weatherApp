import { View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Weather from "../../components/WeatherCurrent";
import { API_KEY } from "../../constants";
import { getCurrentData } from "../../api/weatherAPI";
import { Button, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Location = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  const fetchWeatherData = async () => {
    setLoaded(false);
    const response = await getCurrentData(location);
    console.log({ response: response });
    if (response) {
      setWeatherData(response);
    }
    setLoaded(true);
  };

  const [forecast, setForecast] = useState(null);

  const loadForecast = async () => {
    // const response1 = await getCurrentData(location);
    const data1 = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c598de62108b5c93a8212f54dc4b2fe0&lang=vi`
    );
    const response1 = await data1.json();
    const lat = response1?.coord?.lat;
    const lon = response1?.coord?.lon;
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=367cf3477e0345fa8d932522222409&q=${lat},${lon}&days=5`
    );
    const data = await response.json();
    console.log({
      data2: data,
    });
    if (!response.ok) {
      Alert.alert("Error", data.message);
    } else {
      const date = new Date().getTime() / 1000;
      const hourForecast1 = data?.forecast?.forecastday[0].hour.filter(
        (item) => item.time_epoch > date
      );
      const hourForecast2 = data?.forecast?.forecastday[0].hour.filter(
        (item) => item.time_epoch < date
      );
      setForecast(
        [hourForecast2[hourForecast2.length - 1], ...hourForecast1].slice(0, 24)
      );
    }
  };

  useEffect(() => {
    loadForecast();
    fetchWeatherData();
    console.log(location);
    console.log("Location");
  }, []);

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text>City Not Found! Try Different City</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}>
      <Weather
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        forecast={forecast}
      />
    </View>
  );
};

export default Location;
