import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import SearchBar from "../../components/SearchBar";
import Weather from "../../components/Weather";
import styles from "./style";

const Home = () => {
  const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  const fetchWeatherData = async (cityName) => {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    try {
      const response = await axios.get(API);
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData("Mumbai");
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
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
};

export default Home;
