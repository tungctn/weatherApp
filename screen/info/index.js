import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { getCurrentData } from "../../api/weatherAPI";
import { API_KEY } from "../../constants";
import { LineChart } from "react-native-chart-kit";
import * as shape from "d3-shape";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import WeatherChart from "../../components/WeatherChart";
import Svg, { Circle, Line } from "react-native-svg";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForecastDay = ({ route }) => {
  const { location } = route.params;
  const [forecast, setForecast] = useState(null);
  const navigator = useNavigation();
  useEffect(() => {
    const loadForecast = async () => {
      const response1 = await getCurrentData(location);
      const url = `http://api.openweathermap.org/data/2.5/onecall?units=metric&eclude=minutely&appid=${API_KEY}`;
      const response = await fetch(
        `${url}&lat=${response1.coord.lat}&lon=${response1.coord.lon}`
      );
      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Error", data.message);
      } else {
        setForecast(data);
      }
    };

    loadForecast();
  }, [location]);

  const daysOfWeek = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  return (
    <SafeAreaView>
      {!forecast && <ActivityIndicator size="large" color="black" />}

      <ScrollView>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            marginTop: 50,
            marginLeft: 10,
            marginBottom: 30,
          }}>
          <Ionicons
            style={{ fontSize: 40 }}
            name="arrow-back-circle-outline"
            onPress={() => {
              navigator.goBack();
            }}
          />
          <View style={{ flex: 1, alignSelf: "center" }}>
            <Text
              style={{
                fontSize: 28,
                textAlign: "center",
              }}>
              {location}
            </Text>
          </View>
        </View>
        <FlatList
          horizontal
          data={forecast?.daily?.slice(0, 7)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const weather = item.weather[0];
            let dt = new Date(item.dt * 1000);
            const maxTemp = Math.max(
              ...forecast?.daily?.map((item) => item.temp.max)
            );
            const minTemp = Math.min(
              ...forecast?.daily?.map((item) => item.temp.min)
            );
            const circleRadius = 5;
            const chartHeight = 20;
            const range = maxTemp - minTemp;
            const verticalScale = chartHeight / range;
            const circleY = (item.temp.max - minTemp) * verticalScale;
            const circleY1 = (item.temp.min - minTemp) * verticalScale;
            return (
              <View
                style={
                  index === 0
                    ? [
                        {
                          alignItems: "center",
                          textAlign: "center",
                          padding: 10,
                          borderRadius: 10,
                          backgroundColor: "rgba(0,0,0,0.05)",
                        },
                      ]
                    : [
                        {
                          alignItems: "center",
                          textAlign: "center",
                          padding: 10,
                        },
                      ]
                }>
                <Text style={{ color: "black" }}>
                  <Text style={{ color: "black" }}>
                    {index === 0 ? "Hôm nay" : daysOfWeek[dt.getDay()]}
                  </Text>
                </Text>
                <Text style={{ color: "black" }}>
                  {dt.getDate()}/{dt.getMonth() + 1}
                </Text>
                <Image
                  style={{ width: 40, height: 80 }}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                  }}
                />
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
                  {Math.round(item.temp.max)}°
                </Text>
                <View
                  style={{
                    marginTop: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    height: chartHeight,
                  }}>
                  <View
                    style={{
                      height: circleRadius * 2,
                      width: circleRadius * 2,
                      borderRadius: circleRadius,
                      backgroundColor: "black",
                      position: "absolute",
                      bottom: circleY - circleRadius,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginBottom: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    height: chartHeight,
                  }}>
                  <View
                    style={{
                      height: circleRadius * 2,
                      width: circleRadius * 2,
                      borderRadius: circleRadius,
                      backgroundColor: "black",
                      position: "absolute",
                      bottom: circleY1 - circleRadius,
                    }}
                  />
                </View>
                <Text
                  style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
                  {Math.round(item.temp.min)}°
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
                    source={require("../../assets/wind.png")}
                  />
                  <Text style={{ color: "black" }}>{item.wind_speed} m/s</Text>
                </View>
              </View>
            );
          }}
        />
        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          onPress={() => {
            AsyncStorage.getItem("location").then((locations) => {
              const newLocations = JSON.parse(locations) || [];
              if (newLocations.includes(location)) {
                return;
              }
              newLocations.push(location);
              AsyncStorage.setItem(
                "location",
                JSON.stringify(newLocations)
              ).then(() => {
                navigator.navigate("Main");
              });
            });
          }}>
          <Image
            style={{ width: 60, height: 60, alignSelf: "center" }}
            source={{
              uri: "https://cdn.pixabay.com/photo/2017/03/19/03/51/material-icon-2155448_1280.png",
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForecastDay;
