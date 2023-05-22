import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import * as Notifications from "expo-notifications";
import { getCurrentData } from "../../api/weatherAPI";

const Setting = () => {
  const navigator = useNavigation();
  const { t } = useTranslation();
  const handleBackButtonPress = () => {
    navigator.goBack();
  };
  const [current, setCurrent] = useState(null);

  const [isEnabledMode, setEnabledMode] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedTemperature, setSelectedTemperature] = React.useState("");
  const [selectedWindSpeed, setSelectedWindSpeed] = React.useState("");
  const [selectedPressure, setSelectedPressure] = React.useState("");
  const [tempMode, setTempMode] = useState(null);
  const handleSelect = () => {
    console.log("Selected value:", selectedLanguage);
    if (selectedLanguage == "Tiếng Việt") {
      i18n.changeLanguage("vi");
    } else if (selectedLanguage == "Tiếng Anh") {
      i18n.changeLanguage("en");
    }
  };

  const handleSelectTemp = () => {
    console.log("Selected value:", selectedTemperature);
    if (selectedTemperature.trim() == "° C") {
      AsyncStorage.setItem("temp", "Celsius");
    } else if (selectedTemperature.trim() == "° F") {
      AsyncStorage.setItem("temp", "Fahrenheit");
    } else if (selectedTemperature.trim() == "° K") {
      AsyncStorage.setItem("temp", "Kelvin");
    }
  };

  const handleSelectSpeed = () => {
    console.log("Selected value:", selectedWindSpeed);
    if (selectedWindSpeed.trim() == "km/h") {
      AsyncStorage.setItem("speed", "kmh");
    } else if (selectedWindSpeed.trim() == "mph") {
      AsyncStorage.setItem("speed", "mph");
    } else if (selectedWindSpeed.trim() == "m/s") {
      AsyncStorage.setItem("speed", "ms");
    }
  };

  const handleSelectPressure = () => {
    console.log("Selected value:", selectedPressure);
    if (selectedPressure.trim() == "mbar") {
      AsyncStorage.setItem("pressure", "mbar");
    } else if (selectedPressure.trim() == "atm") {
      AsyncStorage.setItem("pressure", "atm");
    } else if (selectedPressure.trim() == "hPa") {
      AsyncStorage.setItem("pressure", "hPa");
    }
  };

  const Language = [
    { key: "1", value: t("vn") },
    { key: "2", value: t("en") },
    { key: "3", value: t("tq") },
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

  const loadCurrent = async () => {
    const response = await getCurrentData("Ha Noi");
    if (response != null) {
      setCurrent(response);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("temp").then((data) => {
      console.log(data);
      if (data == "Celcius") {
        setSelectedTemperature("° C");
      } else if (data == "Fahrenheit") {
        selectedTemperature("° F");
      } else if (data == "Kelvin") {
        selectedTemperature("° K");
      }
    });
    loadCurrent();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            style={styles.backButton}
            name="arrow-back-circle-outline"
            onPress={handleBackButtonPress}
          />
          <Text style={styles.title}>{t("setting")}</Text>
        </View>
        <View
          style={{
            height: 40,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "center",
            marginTop: 40,
          }}>
          <Text style={styles.optionText}> {t("chung")} </Text>
        </View>

        <View style={styles.optionF}>
          <Ionicons
            style={[styles.optionIcon, styles.mutedIcon]}
            name="notifications-outline"
          />
          <Text style={styles.optionText}>{t("mode")}</Text>
          <View style={{ flex: 1 }} />
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledMode ? "white" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setEnabledMode(!isEnabledMode);
              console.log(isEnabledMode);
              Notifications.addNotificationReceivedListener((notification) => {
                console.log(notification);
              });
              Notifications.addNotificationResponseReceivedListener(
                (response) => {
                  console.log(response);
                }
              );
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `Dự báo thời tiết Hà Nội`,
                  body: `Nhiệt độ: ${current?.main.temp}°C, ${current?.weather[0].description}`,
                  icon: "https://cdn.weatherapi.com/weather/64x64/day/113.png",
                },
                trigger: {
                  seconds: 5, // Delay in seconds
                },
              });
            }}
            value={isEnabledMode}
          />
        </View>

        <View style={styles.option}>
          <Ionicons
            style={[styles.optionIcon, styles.mutedIcon]}
            name="language-outline"
          />
          <Text style={styles.optionText}>{t("language")}</Text>
          <View style={{ flex: 1 }} />

          <SelectList
            setSelected={setSelectedLanguage}
            data={Language}
            searchicon={<View />}
            searchPlaceholder=""
            save="value"
            defaultOption="Tiếng Việt"
            placeholder="Tiếng Việt"
            onSelect={handleSelect}
          />
        </View>

        <View
          style={{
            height: 40,
            backgroundColor: "rgba(0,0,0,0.2)",
            justifyContent: "center",
            marginTop: 40,
          }}>
          <Text style={styles.optionText}> {t("measure")} </Text>
        </View>

        <View style={styles.optionF}>
          <Ionicons
            style={[styles.optionIcon, styles.mutedIcon]}
            name="thermometer-outline"
          />
          <Text style={styles.optionText}>{t("measureOfTemperature")}</Text>
          <View style={{ flex: 1 }} />
          <SelectList
            setSelected={setSelectedTemperature}
            searchPlaceholder=""
            searchicon={<View />}
            data={Temperature}
            save="value"
            placeholder="° C"
            defaultOption={() => {
              if (tempMode == "Celsius") {
                return "° C";
              } else if (tempMode == "Fahrenheit") {
                return "° F";
              } else {
                return "° K";
              }
            }}
            onSelect={handleSelectTemp}
          />
        </View>
        <View style={styles.option}>
          <Ionicons
            style={[styles.optionIcon, styles.mutedIcon]}
            name="speedometer-outline"
          />
          <Text style={styles.optionText}>{t("measureOfWindSpeed")}</Text>
          <View style={{ flex: 1 }} />

          <SelectList
            setSelected={setSelectedWindSpeed}
            searchPlaceholder=""
            searchicon={<View />}
            data={WindSpeed}
            save="value"
            placeholder="km/h"
            defaultOption="km/h"
            onSelect={handleSelectSpeed}
          />
        </View>
        <View style={styles.option}>
          <Ionicons
            style={[styles.optionIcon, styles.mutedIcon]}
            name="planet-outline"
          />
          <Text style={styles.optionText}>{t("measureOfPressure")}</Text>
          <View style={{ flex: 1 }} />

          <SelectList
            setSelected={setSelectedPressure}
            searchPlaceholder=""
            searchicon={<View />}
            data={Pressure}
            save="value"
            placeholder="mbar"
            defaultOption="mbar"
            onSelect={handleSelectPressure}
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
