import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  FlatList,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button, SearchBar, Text, ListItem, Icon } from "react-native-elements";
import axios from "axios";
import { getCurrentData } from "../../api/weatherAPI";

const Search = () => {
  const [value, setValue] = useState("");
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigator = useNavigation();
  const convert = async (data) => {
    if (data) {
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
    }
  };

  const loadFavouriteWeather = () => {
    AsyncStorage.getItem("location")
      .then((data) => {
        if (!data) {
          return;
        }
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
  const handleSearch = async (text) => {
    setValue(text);
    const response = await axios.get(
      `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=100&q=${text}&refine.cou_name_en=Viet+Nam`
    );
    console.log(response.data.records);
    const matchedCities = response.data.records?.map((item) => {
      return {
        name: item.fields.name + ", " + item.fields.cou_name_en,
      };
    });

    setSuggestedCities(matchedCities.slice(0, 7));
  };

  const handleSelectCity = (cityName) => {
    setValue(cityName);
    setSuggestedCities([]);
  };

  useEffect(() => {
    console.log("Search");
    loadFavouriteWeather();
    // AsyncStorage.setItem("location", "Ha Noi");
    AsyncStorage.getItem("location").then((data) => {
      console.log(data);
    });
  }, []);

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <Button
        title={item.name}
        type="outline"
        containerStyle={{ marginVertical: 5 }}
        onPress={() => {
          handleSelectCity(item.name);
          navigator.navigate("Info", { location: item.name });
          setValue("");
        }}
        style={{ padding: 10 }}
      />
    );
  };

  const renderSuggestedCities = () => {
    console.log(suggestedCities);
    if (suggestedCities.length > 0) {
      return (
        <FlatList
          data={suggestedCities}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("location").then((data) => {
      if (data) {
        setFavoriteCities(JSON.parse(data));
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {!showResults && (
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            marginTop: 50,
            marginLeft: 10,
          }}>
          {/* <Icon
            style={{ fontSize: 28 }}
            name="arrow-left"
            type="font-awesome"
            onPress={() => {
              navigator.goBack();
            }}
          /> */}
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
              Tìm thành phố yêu thích
            </Text>
          </View>
        </View>
      )}
      {!showResults && <View style={{ flex: 0.1 }}></View>}

      <View style={{ flex: showResults ? 1.4 : 0.2, marginTop: 20 }}>
        <SearchBar
          placeholder="Nhập thành phố yêu thích"
          onChangeText={handleSearch}
          value={value}
          platform="ios"
          containerStyle={{
            backgroundColor: "#fff",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
          }}
          inputContainerStyle={{
            backgroundColor: "#f2f2f2",
            borderRadius: 10,
            height: 40,
          }}
          inputStyle={{ fontSize: 16 }}
          onClear={() => {
            setSuggestedCities([]);
            setShowResults(false);
          }}
          onFocus={() => {
            setShowResults(true);
            console.log("focus");
          }}
          onCancel={() => {
            setShowResults(false);
          }}
        />
        {showResults && renderSuggestedCities()}
      </View>
      {!showResults && (
        <FlatList
          style={{ flex: 1 }}
          data={favoriteCities}
          renderItem={({ item }) => {
            return (
              <ListItem.Swipeable
                key={item.name}
                bottomDivider
                rightContent={
                  <TouchableOpacity
                    onPress={() => {
                      setFavoriteCities((prev) => {
                        let newLocations = prev.filter((city) => {
                          return city.name !== item.name;
                        });

                        let news = newLocations.map((city) => {
                          return city.name;
                        });

                        AsyncStorage.setItem("location", JSON.stringify(news));
                        return newLocations;
                      });
                    }}
                    style={{
                      backgroundColor: "red",
                      justifyContent: "center",
                      flex: 1,
                    }}>
                    <Icon name="delete" color="white" />
                  </TouchableOpacity>
                }>
                <ListItem.Content>
                  <ListItem.Title style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle>{item.temp}°C</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron
                  onPress={() => {
                    navigator.navigate("Forecast", { location: item.name });
                  }}
                />
              </ListItem.Swipeable>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  );
};

export default Search;
