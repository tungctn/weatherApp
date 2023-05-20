import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";

const Setting = () => {
  const navigator = useNavigation();

  const handleBackButtonPress = () => {
    navigator.goBack();
  };

  const [isEnabledMode, setEnabledMode] = useState(true);

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedTemperature, setSelectedTemperature] = React.useState("");
  const [selectedWindSpeed, setSelectedWindSpeed] = React.useState("");
  const [selectedPressure, setSelectedPressure] = React.useState("");

  const handleSelect = (value) => {
    console.log("Selected value:", value);
    // Thực hiện hành động mong muốn khi giá trị được chọn
  };

  const Language = [
    { key: "1", value: "Tiếng Việt" },
    { key: "2", value: "Tiếng Anh" },
    { key: "3", value: "Tiếng Trung" },
  ];

  const Temperature = [
    { key: "1", value: "  ° C" },
    { key: "2", value: "  ° F" },
    { key: "3", value: "  ° K" },
  ];

  const WindSpeed = [
    { key: "1", value: "km/h" },
    { key: "2", value: "mph" },
    { key: "3", value: "m/s" },
  ];

  const Pressure = [
    { key: "1", value: "mbar" },
    { key: "2", value: "atm" },
    { key: "3", value: "hPa" },
  ];

  return (
    <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            marginTop: 50,
            marginLeft: 10,
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
              Cài đặt ứng dụng
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 40, flex: 0.1, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Chế độ
          </Text>
          <Ionicons
            style={{ fontSize: 40, flex: 1 }}
            name="contrast-outline"
            onPress={() => {
              "";
            }}
          />
        </View>
        <View style={{ marginTop: 40, flex: 0.1, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Ngôn ngữ
          </Text>
          <Ionicons
            style={{ fontSize: 40, flex: 1 }}
            name="language-outline"
            onPress={() => {
              "";
            }}
          />
        </View>
        <View style={{ marginTop: 40, flex: 0.1, flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            Đơn vị
          </Text>
          <Ionicons
            style={{ fontSize: 40, flex: 1 }}
            name="swap-horizontal-outline"
            onPress={() => {
              "";
            }}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}></Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    fontSize: 40,
    marginRight: 10,
    color: "black",
  },
  title: {
    flex: 1,
    fontSize: 28,
    textAlign: "center",
    color: "black",
  },
  option: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  optionF: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  optionIcon: {
    fontSize: 40,
    marginRight: 10,
    color: "black",
  },
  mutedIcon: {
    opacity: 1,
    fontSize: 35,
  },
  optionText: {
    fontSize: 20,
    color: "black",
  },
  optionTextSelect: {
    fontSize: 20,
    color: "black",
    opacity: 0.6,
  },
});

export default Setting;
