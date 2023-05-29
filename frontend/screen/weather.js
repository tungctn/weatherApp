import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import Location from "./location";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { API_KEY } from "../constants";
import { getCurrentData } from "../api/weatherAPI";

const MyPager = ({}) => {
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const navigator = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("location").then((data) => {
      // console.log(data);
      const list = JSON.parse(data);
      console.log(list);
      const newList = ["Hanoi"].concat(list);
      setData(newList);
    });
    AsyncStorage.getItem("temp").then((data) => {
      console.log(data);
    });
  }, [isFocused]);

  const handleAddButtonPress = () => {
    navigator.navigate("Search");
  };
  const handleSetButtonPress = () => {
    navigator.navigate("Setting");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", top: 20, left: 10, zIndex: 1 }}>
        <TouchableOpacity onPress={handleAddButtonPress}>
          <View style={styles.circleButton}>
            <FontAwesome name="plus" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", top: 20, right: 10, zIndex: 1 }}>
        <TouchableOpacity onPress={handleSetButtonPress}>
          <View style={styles.circleButton}>
            <FontAwesome name="cog" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      <PagerView style={styles.viewPager} initialPage={0}>
        {data?.map((item, index) => {
          console.log(item);
          return <Location location={item} key={`${item}_${index}`} />;
        })}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyPager;
