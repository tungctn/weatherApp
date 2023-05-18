import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, TextInput, Alert } from "react-native";
import SearchBar from "../../components/SearchBar";
import Weather from "../../components/WeatherCurrent";
import styles from "./style";
import { getCurrentData } from "../../api/weatherAPI";
import { API_KEY } from "../../constants";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);

  const [loaded, setLoaded] = useState(true);

  const fetchWeatherData = async (cityName) => {
    setLoaded(false);
    const response = await getCurrentData(cityName);
    if (response) {
      setWeatherData(response);
    }
    setLoaded(true);
  };
  const url = `http://api.openweathermap.org/data/2.5/onecall?units=metric&eclude=minutely&appid=${API_KEY}`;
  const [forecast, setForecast] = useState(null);

  const loadForecast = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: 6,
    });

    const response = await fetch(
      `${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`
    );
    const data = await response.json();
    if (!response.ok) {
      Alert.alert("Error", data.message);
    } else {
      setForecast(data);
    }
  };

  useEffect(() => {
    loadForecast();
    fetchWeatherData("Hanoi, Vietnam");
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    );
  } else if (weatherData === null) {
    return (
      <View style={styles.container}>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>
          City Not Found! Try Different City
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Weather
        weatherData={weatherData}
        setWeatherData={setWeatherData}
        forecast={forecast}
      />
      {/*  */}
    </View>
  );
};

export default Home;
