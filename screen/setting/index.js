import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../home";
import Search from "../search";
import Favorite from "../favourite";

const Setting = () => {
    const navigator = useNavigation();

  return (
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
  );
};

export default Setting;
