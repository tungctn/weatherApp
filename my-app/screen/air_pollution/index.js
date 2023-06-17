import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const Air = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.openweathermap.org/data/2.5/air_pollution?lat=21&lon=105&appid=c598de62108b5c93a8212f54dc4b2fe0"
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          There was an error while requesting sensor station data. A new request
          will be sent again in a few minutes.
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  let comment;
  if (data?.list[0].main.aqi <= 50) {
    comment = "Chất lượng không khí tốt.";
  } else if (data?.list[0].main.aqi <= 100) {
    comment = "Chất lượng không khí trung bình.";
  } else {
    comment = "Chất lượng không khí kém.";
  }

  // 4 to [0, 1, 2, 3]
 
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Chỉ số chất lượng không khí</Text>
      <View style={styles.dataContainer}>
        <View style={styles.dataRow}>
          <Text style={[styles.text, styles.commentText]}>{comment}</Text>
        </View>
        <ScrollView horizontal>
          <View style={styles.grid}>
            <View>
              <DataValue value={data?.list[0].components.co} />
              <DataItem label="CO" />
            </View>
            <View>
              <DataValue value={data?.list[0].components.so2} />
              <DataItem label="SO2" />
            </View>
            <View>
              <DataValue value={data?.list[0].components.no2} />
              <DataItem label="NO2" />
            </View>
            <View>
              <DataValue value={data?.list[0].components.o3} />
              <DataItem label="O3" />
            </View>
            <View>
              <DataValue value={data?.list[0].components.pm2_5} />
              <DataItem label="PM2.5" />
            </View>
            <View>
              <DataValue value={data?.list[0].components.pm10} />
              <DataItem label="PM10" />
            </View>
            <View>
              <DataValue value={data?.list[0].components.nh3} />
              <DataItem label="NH3" />
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const DataItem = ({ label }) => {
  return (
    <View style={styles.gridItem}>
      <Text style={[styles.text, styles.labelText]}>{label}</Text>
    </View>
  );
};

const DataValue = ({ value }) => {
  return (
    <View style={styles.gridItem}>
      <Text style={[styles.text, styles.valueText]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    // backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  dataContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  gridItem: {
    // width: "48%",
    // backgroundColor: "#ddd",
    padding: 10,
    // borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  commentText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#008000", // Màu xanh nhạt
  },
  valueText: {
    // color: "#000",
    // color xanh nhạt
    color: "#008000",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default Air;
