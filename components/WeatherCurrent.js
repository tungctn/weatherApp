import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import {
  haze,
  humidityImg,
  rainy,
  snow,
  sunny,
  tempImg,
} from "../assets/index";
import Forecast from "./ForecastCurrent";
import { API_KEY } from "../constants";

const Weather = ({ weatherData, setWeatherData, forecast }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [state, setState] = useState();
  const {
    weather,
    name,
    main: { temp, humidity, pressure, feels_like },
    wind: { speed },
  } = weatherData;

  const [current, setCurrent] = useState(null);
  const url = `http://api.openweathermap.org/data/2.5/onecall?units=metric&eclude=minutely&appid=${API_KEY}`;
  const loadCurrent = async () => {
    const response = await fetch(
      `${url}&lat=${weatherData?.coord.lat}&lon=${weatherData?.coord.lon}`
    );
    const data = await response.json();
    if (!response.ok) {
      Alert.alert("Error", data.message);
    } else {
      console.log(data);
      setCurrent(data);
    }
  };

  const [{ main }] = weather;
  useEffect(() => {
    console.log(weatherData);
    console.log(forecast);
    setBackgroundImage(getBackgroundImg(main));
    loadCurrent();
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

  let textColor = "black";

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#232f34" />
        <ImageBackground
          source={{
            uri: "https://img.freepik.com/free-vector/blue-cloudy-daylight-background-weather-design_33099-512.jpg",
          }}
          style={styles.backgroundImg}
          resizeMode="cover">
          <View style={styles.weatherInfo}>
            <Text style={{ ...styles.cityName, color: textColor }}>{name}</Text>

            <Text style={{ ...styles.stateName, color: textColor }}>
              <Image
                style={{ width: 200, height: 100 }}
                source={{
                  uri: `http://openweathermap.org/img/w/${weather[0].icon}.png`,
                }}
              />
            </Text>
            <Text style={{ ...styles.temperature, color: textColor }}>
              {temp}°C
            </Text>
            <Text style={{ color: textColor, fontSize: 20 }}>{state}</Text>
          </View>
          <View style={styles.extraInfo}>
            <View style={styles.info}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/drop.png")}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: "white",
                  fontWeight: "bold",
                }}>
                {humidity}%
              </Text>
            </View>
            <View style={styles.info}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/wind.png")}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: "white",
                  fontWeight: "bold",
                }}>
                {speed} m/s
              </Text>
            </View>
            <View style={styles.info}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../assets/pressure.png")}
              />
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  color: "white",
                  fontWeight: "bold",
                }}>
                {pressure} hPa
              </Text>
            </View>
          </View>
          <View style={styles.forecastContainer}>
            <Forecast forecast={forecast} />
          </View>
          <View style={styles.infoA}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 30,
                  fontSize: 20,
                  color: "white",
                }}>
                Cảm giác như:
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 50,
                  fontSize: 30,
                  paddingBottom: 10,
                  color: "white",
                }}>
                {feels_like} °C
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 30,
                  fontSize: 20,
                  color: "white",
                }}>
                Độ ẩm:
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 50,
                  fontSize: 30,
                  paddingBottom: 10,
                  color: "white",
                }}>
                {humidity} %
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 30,
                  fontSize: 20,
                  color: "white",
                }}>
                Có thể mưa:
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 50,
                  fontSize: 30,
                  paddingBottom: 10,
                  color: "white",
                }}>
                {current?.current?.clouds} %
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 30,
                  fontSize: 20,
                  color: "white",
                }}>
                Áp suất:
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 50,
                  fontSize: 30,
                  paddingBottom: 10,
                  color: "white",
                }}>
                {pressure} mbar
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 30,
                  fontSize: 20,
                  color: "white",
                }}>
                Tốc độ gió:
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 50,
                  fontSize: 30,
                  paddingBottom: 10,
                  color: "white",
                }}>
                {current?.current?.wind_speed} km/h
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 30,
                  fontSize: 20,
                  color: "white",
                }}>
                Chỉ số UV:
              </Text>
              <Text
                style={{
                  paddingLeft: 10,
                  lineHeight: 50,
                  fontSize: 30,
                  paddingBottom: 10,
                  color: "white",
                }}>
                {current?.current?.uvi}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
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
  weatherInfo: {
    marginTop: 50,
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    marginBottom: 10,
  },
  stateName: {
    fontSize: 28,
    // marginBottom: 20,
  },
  temperature: {
    fontSize: 40,
    marginBottom: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    padding: 10,
  },
  info: {
    // width: Dimensions.get("screen").width / 2.5,
    height: 50,
    backgroundColor: "rgba(0,0,0, 0.5)",
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "row",
  },
  infoText: {
    fontSize: 20,
    // marginTop: 10,
  },
  infoA: {
    // width: Dimensions.get("screen").width / 2.5,
    height: 300,
    backgroundColor: "rgba(0,0,0, 0.5)",
    // padding: 10,
    paddingTop: 20,
    marginTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "row",
  },
});

export default Weather;
