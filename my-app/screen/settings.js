import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
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
  const [current, setCurrent] = useState(null);
  const [isEnabledMode, setEnabledMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTemperature, setSelectedTemperature] = useState("");
  const [selectedWindSpeed, setSelectedWindSpeed] = useState("");
  const [selectedPressure, setSelectedPressure] = useState("");
  const [tempMode, setTempMode] = useState(null);

  const handleBackButtonPress = () => {
    navigator.goBack();
  };

  const handleSelect = () => {
    console.log("Selected value:", selectedLanguage);
    if (selectedLanguage === "Tiếng Việt") {
      i18n.changeLanguage("vi");
    } else if (selectedLanguage === "Tiếng Anh") {
      i18n.changeLanguage("en");
    }
  };

  const handleSelectTemp = () => {
    console.log("Selected value:", selectedTemperature);
    if (selectedTemperature.trim() === "° C") {
      AsyncStorage.setItem("temp", "Celsius");
    } else if (selectedTemperature.trim() === "° F") {
      AsyncStorage.setItem("temp", "Fahrenheit");
    } else if (selectedTemperature.trim() === "° K") {
      AsyncStorage.setItem("temp", "Kelvin");
    }
  };

  const handleSelectSpeed = () => {
    console.log("Selected value:", selectedWindSpeed);
    if (selectedWindSpeed.trim() === "km/h") {
      AsyncStorage.setItem("speed", "kmh");
    } else if (selectedWindSpeed.trim() === "mph") {
      AsyncStorage.setItem("speed", "mph");
    } else if (selectedWindSpeed.trim() === "m/s") {
      AsyncStorage.setItem("speed", "ms");
    }
  };

  const handleSelectPressure = () => {
    console.log("Selected value:", selectedPressure);
    if (selectedPressure.trim() === "mbar") {
      AsyncStorage.setItem("pressure", "mbar");
    } else if (selectedPressure.trim() === "atm") {
      AsyncStorage.setItem("pressure", "atm");
    } else if (selectedPressure.trim() === "hPa") {
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
      if (data === "Celsius") {
        setSelectedTemperature("° C");
      } else if (data === "Fahrenheit") {
        setSelectedTemperature("° F");
      } else if (data === "Kelvin") {
        setSelectedTemperature("° K");
      }
    });
    loadCurrent();
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={handleBackButtonPress}
        style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{t("setting")}</Text>
    </View>
  );

  const renderOption = (iconName, optionText, selectList, onSelect) => (
    <TouchableOpacity style={styles.option} onPress={onSelect}>
      <Ionicons style={styles.optionIcon} name={iconName} />
      <Text style={styles.optionText}>{optionText}</Text>
      <View style={{ flex: 1 }} />
      <SelectList
        setSelected={selectList}
        searchPlaceholder=""
        searchicon={<View />}
        data={
          selectList === selectedLanguage
            ? Language
            : selectList === selectedTemperature
            ? Temperature
            : selectList === selectedWindSpeed
            ? WindSpeed
            : Pressure
        }
        save="value"
        placeholder={
          selectList === selectedLanguage
            ? t("vn")
            : selectList === selectedTemperature
            ? "° C"
            : selectList === selectedWindSpeed
            ? "km/h"
            : "mbar"
        }
        defaultOption={
          selectList === selectedLanguage
            ? t("vn")
            : selectList === selectedTemperature
            ? "° C"
            : selectList === selectedWindSpeed
            ? "km/h"
            : "mbar"
        }
        onSelect={onSelect}
      />
    </TouchableOpacity>
  );

  const renderDivider = (text) => (
    <View style={styles.divider}>
      <Text style={styles.dividerText}>{text}</Text>
    </View>
  );

  const renderTemperatureOption = () => (
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
        defaultOption={
          tempMode === "Celsius"
            ? "° C"
            : tempMode === "Fahrenheit"
            ? "° F"
            : "° K"
        }
        onSelect={handleSelectTemp}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {renderDivider(t("chung"))}
      {renderOption("notifications-outline", t("mode"), isEnabledMode, () => {
        setEnabledMode(!isEnabledMode);
        console.log(isEnabledMode);
        Notifications.addNotificationReceivedListener((notification) => {
          console.log(notification);
        });
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });
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
      })}
      {renderOption(
        "language-outline",
        t("language"),
        selectedLanguage,
        handleSelect
      )}
      {renderDivider(t("measure"))}
      {renderTemperatureOption()}
      {renderOption(
        "speedometer-outline",
        t("measureOfWindSpeed"),
        selectedWindSpeed,
        handleSelectSpeed
      )}
      {renderOption(
        "planet-outline",
        t("measureOfPressure"),
        selectedPressure,
        handleSelectPressure
      )}
      <View style={styles.option} />
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
    marginRight: 10,
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
  divider: {
    height: 40,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    marginTop: 40,
  },
  dividerText: {
    fontSize: 20,
    color: "black",
    paddingLeft: 20,
  },
});

export default Setting;
