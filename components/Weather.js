import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import SearchBar from "./SearchBar";
import {
  haze,
  humidityImg,
  rainy,
  snow,
  sunny,
  tempImg,
} from "../assets/index";
import Forecast from "./Forecast";

const Weather = ({ weatherData, setWeatherData, forecast }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [state, setState] = useState();
  const {
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  } = weatherData;

  const [{ main }] = weather;
  const [data, setData] = useState({
    weather,
    name,
    main: { temp, humidity },
    wind: { speed },
  });
  const data1 = {
    clouds: 0,
    dew_point: 11.06,
    dt: 1677510000,
    feels_like: 17.48,
    humidity: 64,
    pop: 0,
    pressure: 1024,
    temp: 17.96,
    uvi: 0,
    visibility: 10000,
    weather: [
      { id: 800, main: "Clear", description: "clear sky", icon: "01n" },
    ],
    wind_deg: 149,
    wind_gust: 7.96,
    wind_speed: 4.13,
  };
  useEffect(() => {
    console.log(weatherData);
    setBackgroundImage(getBackgroundImg(main));
    if (main === "Clear") {
      setState("Trời nắng");
    } else if (main === "Rain") {
      setState("Trời mưa");
    } else if (main === "Snow") {
      setState("Trời tuyết");
    } else if (main === "Haze") {
      setState("Trời mây");
    } else {
      setState("Trời mưa");
    }
  }, [weatherData]);

  const getBackgroundImg = (weather) => {
    if (weather === "Snow") return snow;
    if (weather === "Clear") return sunny;
    if (weather === "Rain") return rainy;
    if (weather === "Haze") return haze;
    return haze;
  };

  let textColor = backgroundImage !== sunny ? "white" : "black";

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="darkgray" />
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImg}
        resizeMode="cover">
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
              fontSize: 46,
            }}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.headerText,
              color: textColor,
              fontWeight: "bold",
            }}>
            {state}
          </Text>
          <Text style={{ ...styles.headerText, color: textColor }}>
            {temp} °C
          </Text>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image style={{ width: 70, height: 70 }} source={tempImg} />

            <Text style={{ fontSize: 22, color: "white" }}>Độ ẩm</Text>
            <Text style={{ fontSize: 22, color: "white" }}>{humidity} %</Text>
          </View>

          <View style={styles.info}>
            <Image style={{ width: 70, height: 70 }} source={humidityImg} />
            <Text style={{ fontSize: 22, color: "white" }}>Tốc độ gió</Text>
            <Text style={{ fontSize: 22, color: "white" }}>{speed} m/s</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Forecast forecast={forecast} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get("screen").width,
  },
  headerText: {
    fontSize: 36,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  info: {
    width: Dimensions.get("screen").width / 2.5,
    backgroundColor: "rgba(0,0,0, 0.5)",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Weather;
