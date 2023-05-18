import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { getCurrentData } from "../../api/weatherAPI";
import { API_KEY } from "../../constants";
import { LineChart } from "react-native-chart-kit";
import * as shape from "d3-shape";
import { Header } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const ForecastDay = ({ route }) => {
  const { location } = route.params;
  const [forecast, setForecast] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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

  const data = {
    labels: forecast?.daily?.slice(0, 7).map((item, index) => {
      let dt = new Date(item.dt * 1000);
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dt.getDay()];
    }),
    datasets: [
      {
        data: forecast?.daily?.slice(0, 7).map((item, index) => {
          return Math.round(item.temp.day);
        }),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  const onClose = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Weather Forecast</Text>
            <Text style={styles.closeBtn} onPress={onClose}>
              X
            </Text>
          </View>
          <View style={styles.content}>
            <Image
              style={styles.icon}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21sVo-Di4xudDkyw7SroBMAE6BOv3q-fCi7u68mK_UoMIH__f2dKilu8aWW993mebhnI&usqp=CAU",
              }}
            />
            <Text style={styles.tempText}>26°C</Text>
            <Text style={styles.infoText}>Humidity: 25%</Text>
            <Text style={styles.infoText}>Wind: 25 km/h</Text>
          </View>
        </View>
      </Modal>
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          onPress: () => navigator.goBack(),
          size: 40,
        }}
        centerComponent={{
          text: location,
          style: {
            color: "#fff",
            fontSize: 25,
            textAlign: "center",
            width: "100%",
          },
        }}
        containerStyle={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}>
        {forecast && (
          <LineChart
            onDataPointClick={({ index }) => {
              setModalVisible(!modalVisible);
            }}
            yLabelsOffset={-10}
            fromZero={true}
            formatYLabel={(value) => ""}
            data={data}
            width={350}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{ marginVertical: 8, borderRadius: 16 }}
            curve={shape.curveNatural}
            hidePointsAtIndex={[]}
            renderDotContent={({ x, y, index }) => {
              console.log(x, y, index);
              return (
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: "rgba(134, 65, 244, 0.1)",
                    position: "absolute",
                    top: y - 25,
                    left: x - 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      color: "rgba(134, 65, 244, 1)",
                      fontSize: 12,
                    }}>
                    {data.datasets[0].data[index]} °C
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeBtn: {
    fontSize: 20,
    color: "#000",
  },
  content: {
    alignItems: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  tempText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ForecastDay;
