import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../home";
import Search from "../search";
import Favorite from "../favourite";
import { Button } from "react-native-elements";

const Setting = () => {
  const navigator = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <View
      style={{
        flex: 0.1,
        flexDirection: "row",
        marginTop: 50,
        marginLeft: 10,
      }}
    >
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
          }}
        >
          Cài đặt ứng dụng
        </Text>
      </View>
      
    </View>
    <View style={{marginTop: 40, flex: 0.1, flexDirection: "row"}}>
        <Text style={{
            fontSize: 20}}>Chế độ</Text>
        <Ionicons 
        style={{fontSize: 40, flex: 1}}
        name="contrast-outline"
        onPress={() => {
            ""
        }}
        />
      </View>
      <View style={{marginTop: 40, flex: 0.1, flexDirection: "row"}}>
        <Text style={{
            fontSize: 20}}>Ngôn ngữ</Text>
        <Ionicons 
        style={{fontSize: 40, flex: 1}}
        name="language-outline"
        onPress={() => {
            ""
        }}
        />
      </View>
      <View style={{marginTop: 40, flex: 0.1, flexDirection: "row"}}>
        <Text style={{
            fontSize: 20}}>Đơn vị</Text>
        <Ionicons 
        style={{fontSize: 40, flex: 1}}
        name="swap-horizontal-outline"
        onPress={() => {
            ""
        }}
        />
      </View>
    </View>
  );
};

export default Setting;
