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
import { haze, rainy, snow, sunny } from "../assets/index";
import Forecast from "./ForecastCurrent";
import {
  convertCelsiusToFahrenheit,
  convertCelsiusToKelvin,
  convertKmToMph,
  convertKmToMs,
  convertMbarToAtm,
} from "../constants";
import Svg, { Circle } from "react-native-svg";
import SunCycle from "./SunCycle";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { format, parseISO } from "date-fns";

const Weather = ({ weatherData, setWeatherData, forecast }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [state, setState] = useState();
  const isFocused = useIsFocused();
  const {
    weather,
    name,
    main: { temp, humidity, pressure, feels_like },
    wind: { speed },
  } = weatherData;
  const { t } = useTranslation();

  const [current, setCurrent] = useState(null);
  const [tempMode, setTempMode] = useState(null);
  const [speedMode, setSpeedMode] = useState(null);
  const [pressureMode, setPressureMode] = useState(null);
  const url1 = `https://api.weatherapi.com/v1/forecast.json?key=367cf3477e0345fa8d932522222409&q=${weatherData?.coord.lat},${weatherData?.coord.lon}&days=5&lang=vi`;
  const loadCurrent = async () => {
    const response = await fetch(url1);
    const data = await response.json();
    if (!response.ok) {
      Alert.alert("Error", data.message);
    } else {
      console.log({ data: data });

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
    AsyncStorage.getItem("temp").then((value) => {
      setTempMode(value);
    });
    AsyncStorage.getItem("speed").then((value) => {
      setSpeedMode(value);
    });
    AsyncStorage.getItem("pressure").then((value) => {
      setPressureMode(value);
    });
    console.log({ url: `https:${current?.current.condition.icon}` });
  }, [weatherData, isFocused]);

  const getBackgroundImg = (weather) => {
    if (weather === "Snow")
      return "https://freefrontend.com/assets/img/css-snow/thumb.jpg";
    if (weather === "Clear")
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdcSlmiqZTNer0aaGWm7titLnBwMd8cnd_2bVjjLdZpjJm7-qKGJHLumey28iqriSPlJ4&usqp=CAU";
    if (weather === "Rain")
      return "https://e0.pxfuel.com/wallpapers/207/33/desktop-wallpaper-rainy-day-romantic-couple-in-rain-rainy-day-for-your-mobile-tablet-explore-raining-s-rainy-background-animated-raining.jpg";
    return "https://motionarray.imgix.net/preview-89537-uPNkIXfFl5-high_0006.jpg?w=660&q=60&fit=max&auto=format";
  };

  let textColor = "white";

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#232f34" />
        <ImageBackground
          source={{
            uri: getBackgroundImg(main),
          }}
          style={styles.backgroundImg}
          resizeMode="cover">
          <View
            style={{
              ...styles.info1,
              marginTop: 150,
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: 20,
            }}>
            <Text style={{ ...styles.cityName, color: textColor }}>{name}</Text>
          </View>
          <View
            style={{
              ...styles.info2,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.temperature,
                  color: textColor,
                  fontSize: 70,
                }}>
                {temp.toFixed(0)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 10,
              }}>
              <Text
                style={{ color: textColor, fontSize: 20, paddingBottom: 5 }}>
                {tempMode === "Celsius" && " °C"}
                {tempMode === "Fahrenheit" && " °F"}
                {tempMode === "Kelvin" && " °K"}
              </Text>
              <Text style={{ color: textColor, fontSize: 20 }}>{state}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Text style={{ color: "white" }}></Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{
                  uri: `https:${current?.current.condition.icon}`,
                }}
              />
            </View>
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
                {speedMode == "kmh" && `${speed} km/h`}
                {speedMode == "ms" && `${convertKmToMs(speed)} m/s`}
                {speedMode == "mph" && `${convertKmToMph(speed)} mph`}
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
                {pressureMode == "mbar" && `${pressure} mbar`}
                {pressureMode == "atm" && `${convertMbarToAtm(pressure)} atm`}
                {pressureMode == "hPa" && `${pressure} hPa`}
              </Text>
            </View>
          </View>
          <View style={styles.info3}>
            <View style={styles.row}>
              <View
                style={{
                  ...styles.column,
                  flex: 2,
                  justifyContent: "flex-start",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{
                      uri: `https:${current?.forecast.forecastday[0].day.condition.icon}`,
                    }}
                  />
                  <Text style={styles.text}> {t("today")}</Text>
                </View>
              </View>
              <View style={{ ...styles.column, flex: 1 }}>
                <Text
                  style={
                    styles.text
                  }>{`${current?.forecast.forecastday[0].day.maxtemp_c.toFixed(
                  0
                )}° / ${current?.forecast.forecastday[0].day.mintemp_c.toFixed(
                  0
                )}°`}</Text>
              </View>
            </View>
            <View style={{ ...styles.row }}>
              <View
                style={{
                  ...styles.column,
                  flex: 2,
                  justifyContent: "flex-start",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    // alignItems: "left",
                  }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{
                      uri: `https:${current?.forecast.forecastday[1].day.condition.icon}`,
                    }}
                  />
                  <Text style={{ ...styles.text }}> {t("tomorrow")}</Text>
                </View>
              </View>
              <View style={{ ...styles.column, flex: 1 }}>
                <Text
                  style={
                    styles.text
                  }>{`${current?.forecast.forecastday[0].day.maxtemp_c.toFixed(
                  0
                )}° / ${current?.forecast.forecastday[0].day.mintemp_c.toFixed(
                  0
                )}°`}</Text>
              </View>
            </View>
            <View style={{ ...styles.row, marginBottom: 20 }}>
              <View
                style={{
                  ...styles.column,
                  flex: 2,
                  justifyContent: "flex-start",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{
                      uri: `https:${current?.forecast.forecastday[2].day.condition.icon}`,
                    }}
                  />
                  <Text style={styles.text}> {t("after_tomorrow")}</Text>
                </View>
              </View>
              <View style={{ ...styles.column, flex: 1 }}>
                <Text
                  style={
                    styles.text
                  }>{`${current?.forecast.forecastday[0].day.maxtemp_c.toFixed(
                  0
                )}° / ${current?.forecast.forecastday[0].day.mintemp_c.toFixed(
                  0
                )}°`}</Text>
              </View>
            </View>
          </View>

          <View style={styles.forecastContainer}>
            <Forecast forecast={forecast} current={current} />
          </View>
          <View style={{ marginBottom: 40 }}>
            <View style={styles.infoA}>
              <View style={{ alignItems: "center" }}>
                <SunCycle
                  sunrise={6}
                  sunset={18}
                  current={new Date().getHours()}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 40,
                  }}>
                  <Text
                    style={{
                      // paddingLeft: 10,
                      marginLeft: 60,
                      fontSize: 15,
                      color: "white",
                    }}>
                    {t("sunrise")}: 6:00
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "white",
                    }}>
                    {t("sunset")}: 18:00
                  </Text>
                </View>
              </View>

              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 30,
                      fontSize: 20,
                      color: "white",
                    }}>
                    {/* Cảm giác như: */}
                    {t("feels_like")}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 50,
                      fontSize: 30,
                      paddingBottom: 10,
                      color: "white",
                    }}>
                    {tempMode === "Celsius" && `${feels_like} °C`}
                    {tempMode === "Fahrenheit" &&
                      `${convertCelsiusToFahrenheit(feels_like)} °F`}
                    {tempMode === "Kelvin" &&
                      `${convertCelsiusToKelvin(feels_like)} °K`}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 30,
                      fontSize: 20,
                      color: "white",
                    }}>
                    {/* Độ ẩm: */}
                    {t("humidity")}
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
                    {/* Có thể mưa: */}
                    {t("clouds")}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 50,
                      fontSize: 30,
                      paddingBottom: 10,
                      color: "white",
                    }}>
                    {current?.current?.cloud} %
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
                    {t("pressure")}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 50,
                      fontSize: 30,
                      paddingBottom: 10,
                      color: "white",
                    }}>
                    {pressureMode == "mbar" && `${pressure} mbar`}
                    {pressureMode == "atm" &&
                      `${convertMbarToAtm(pressure)} atm`}
                    {pressureMode == "hPa" && `${pressure} hPa`}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 30,
                      fontSize: 20,
                      color: "white",
                    }}>
                    {/* Tốc độ gió: */}
                    {t("wind_speed")}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 50,
                      fontSize: 30,
                      paddingBottom: 10,
                      color: "white",
                    }}>
                    {speedMode == "kmh" && `${speed} km/h`}
                    {speedMode == "ms" && `${convertKmToMs(speed)} m/s`}
                    {speedMode == "mph" && `${convertKmToMph(speed)} mph`}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 30,
                      fontSize: 20,
                      color: "white",
                    }}>
                    {/* Chỉ số UV: */}
                    {t("uvi")}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 10,
                      lineHeight: 50,
                      fontSize: 30,
                      paddingBottom: 10,
                      color: "white",
                    }}>
                    {current?.current?.uv.toFixed(1)}
                  </Text>
                </View>
              </View>
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
  },
  temperature: {
    fontSize: 40,
    marginBottom: 10,
  },
  extraInfo: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
    padding: 10,
  },
  info3: {
    marginTop: 40,
    minHeight: 50,
    backgroundColor: "rgba(0,0,0, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 40,
    // paddingHorizontal: 10,
  },
  info: {
    minHeight: 50,
    backgroundColor: "rgba(0,0,0, 0.5)",
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "row",
    // paddingHorizontal: 10,
  },
  info1: {
    // width: Dimensions.get("screen").width / 2.5,
    minHeight: 50,
    backgroundColor: "rgba(0,0,0, 0.5)",
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "row",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  info2: {
    // width: Dimensions.get("screen").width / 2.5,
    minHeight: 50,
    backgroundColor: "rgba(0,0,0, 0.5)",
    // padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "row",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  infoText: {
    fontSize: 20,
    // marginTop: 10,
  },
  infoA: {
    // width: Dimensions.get("screen").width / 2.5,
    minHeight: 300,
    backgroundColor: "rgba(0,0,0, 0.5)",
    // padding: 10,
    paddingTop: 20,
    marginTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
  },
  column: {
    flex: 1,
    // alignItems: "left",

    marginLeft: 20,
  },
  text: {
    color: "white",
    // fontWeight: "bold",
    fontSize: 20,
    fontWeight: 600,
  },
});

export default Weather;
