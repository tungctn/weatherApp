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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import WeatherChart from "../../components/WeatherChart";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  locationText: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "300",
    color: "#333",
    marginBottom: 30,
  },
  forecastItem: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dayText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    color: "#666",
    fontSize: 14,
  },
  temperatureText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 5,
  },
  windText: {
    color: "#666",
    fontSize: 14,
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 10,
  },
  chartContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#333",
    position: "absolute",
  },
});

const ForecastDay = ({ route }) => {
  const { location } = route.params;
  const [forecast, setForecast] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigator = useNavigation();

  useEffect(() => {
    const loadForecast = async () => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=c598de62108b5c93a8212f54dc4b2fe0&units=metric&lang=vi`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        Alert.alert("Error", data.message);
      } else {
        // group data by day
        const groupedByDay = data.list.reduce((grouped, item, index) => {
          const date = new Date(item.dt * 1000);
          const day = date.getDate();
          if (!grouped[day]) {
            grouped[day] = [];
          }
          grouped[day].push(item);
          return grouped;
        }, {});

        // calculate max and min temp for each day
        const forecastData = Object.values(groupedByDay).map((dayData) => {
          const maxTemp = Math.max(
            ...dayData.map((item) => item.main.temp_max)
          );
          const minTemp = Math.min(
            ...dayData.map((item) => item.main.temp_min)
          );
          const avgWindSpeed = (
            dayData.reduce((total, item) => total + item.wind.speed, 0) /
            dayData.length
          ).toFixed(2);
          const firstItem = dayData[0];
          return {
            dt: firstItem.dt,
            weather: firstItem.weather,
            temp: {
              max: maxTemp,
              min: minTemp,
            },
            wind: {
              speed: avgWindSpeed,
            },
          };
        });

        setForecast({ ...data, list: forecastData });
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
    <SafeAreaView style={styles.container}>
      {!forecast && <ActivityIndicator size="large" color="#333" />}
      <ScrollView>
        <View style={styles.header}>
          <Ionicons
            style={{ fontSize: 40, color: "#333" }}
            name="arrow-back-circle-outline"
            onPress={() => {
              navigator.goBack();
            }}
          />
        </View>
        <View>
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <FlatList
          horizontal
          data={forecast?.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const weather = item.weather[0];
            const dt = new Date(item.dt * 1000);
            const circleRadius = 5;
            const chartHeight = 20;
            const maxTemp = Math.max(
              ...forecast?.list.map((item) => item.temp.max)
            );
            const minTemp = Math.min(
              ...forecast?.list.map((item) => item.temp.min)
            );
            const range = maxTemp - minTemp;
            const verticalScale = chartHeight / range;
            const circleY = (item.temp.max - minTemp) * verticalScale;
            const circleY1 = (item.temp.min - minTemp) * verticalScale;
            return (
              <View style={styles.forecastItem}>
                <Text style={styles.dayText}>
                  {index === 0 && "Hôm nay"}
                  {index === 1 && "Ngày mai"}
                  {index > 1 && daysOfWeek[dt.getDay()]}
                </Text>
                <Text style={styles.dateText}>
                  {dt.getDate()}/{dt.getMonth() + 1}
                </Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                  }}
                />
                <Text style={styles.temperatureText}>
                  {Math.round(item.temp.max)}°
                </Text>
                <View style={styles.chartContainer}>
                  <View
                    style={{
                      ...styles.circle,
                      bottom: circleY - circleRadius,
                    }}
                  />
                </View>
                <View style={styles.chartContainer}>
                  <View
                    style={{
                      ...styles.circle,
                      bottom: circleY1 - circleRadius,
                    }}
                  />
                </View>
                <Text style={styles.temperatureText}>
                  {Math.round(item.temp.min)}°
                </Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: `http://openweathermap.org/img/w/${weather.icon}.png`,
                  }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={{ width: 15, height: 15, marginRight: 5 }}
                    source={{
                      uri: "https://i.pinimg.com/736x/04/58/97/045897378f83762064bf5618e519cf90.jpg",
                    }}
                  />
                  <Text style={styles.windText}>{item.wind.speed} m/s</Text>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForecastDay;
