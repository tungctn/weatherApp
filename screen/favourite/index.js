import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  TouchableHighlight,
} from "react-native";
import { Text } from "react-native-elements";
import { getCurrentData } from "../../api/weatherAPI";

const Favorite = () => {
  // const { location } = route.params;
  const [favoriteCities, setFavoriteCities] = useState([]);
  const navigator = useNavigation();
  const convert = async (data) => {
    const list = await Promise.all(
      data?.map(async (item) => {
        const response = await getCurrentData(item);
        return {
          name: item,
          temp: response.main.temp,
        };
      })
    );
    return list;
  };

  const loadFavouriteWeather = () => {
    AsyncStorage.getItem("location")
      .then((data) => {
        return JSON.parse(data);
      })
      .then((data) => {
        console.log(data);
        return convert(data);
      })
      .then((data) => {
        setFavoriteCities(data);
      });
  };

  useEffect(() => {
    console.log("Favorite");
    loadFavouriteWeather();
    AsyncStorage.getItem("location").then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, alignSelf: "center", marginTop: 50 }}>
        <Text
          style={{
            fontSize: 28,
            textAlign: "center",
            zindex: 1,
          }}>
          Thành phố yêu thích
        </Text>
      </View>
      <FlatList
        data={favoriteCities}
        renderItem={({ item }) => {
          return (
            <View style={{ flex: 1 }}>
              <ImageBackground
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS21sVo-Di4xudDkyw7SroBMAE6BOv3q-fCi7u68mK_UoMIH__f2dKilu8aWW993mebhnI&usqp=CAU",
                }}
                imageStyle={{ borderRadius: 15 }}
                style={{
                  marginVertical: 10,
                  width: "100%",
                  height: 100,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <TouchableHighlight
                  onPress={() => {
                    navigator.navigate("Forecast", { location: item.name });
                  }}>
                  <View
                    style={{
                      flex: 1,
                      height: 130,
                      width: "90%",
                      borderRadius: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "white",
                        fontWeight: 500,
                        flex: 1,
                        textAlign: "right",
                        fontWeight: "bold",
                      }}>
                      {item.temp}°C
                    </Text>
                  </View>
                </TouchableHighlight>
              </ImageBackground>
            </View>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default Favorite;
