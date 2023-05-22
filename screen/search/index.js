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
  ScrollView,
  Alert,
} from "react-native";
import { Button, SearchBar, Text, ListItem, Icon } from "react-native-elements";
import axios from "axios";
import { getCurrentData } from "../../api/weatherAPI";
// import {
//   ConfirmModalProvider,
//   useConfirmModal,
// } from "@sj-distributor/react-native-confirm-modal";

const Search = () => {
  const [value, setValue] = useState("");
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [suggestedCities, setSuggestedCities] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState([]);
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
        setData(JSON.parse(data));
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
        name: item.fields.name,
      };
    });

    setSuggestedCities(matchedCities.slice(0, 50));
  };

  const handleSelectCity = (cityName) => {
    setValue(cityName);
    setSuggestedCities([]);
  };

  useEffect(() => {
    console.log("Search");
    loadFavouriteWeather();
    AsyncStorage.getItem("location").then((data) => {
      console.log(data);
    });
  }, []);

  const renderSuggestedCities = () => {
    console.log(suggestedCities);
    if (suggestedCities.length > 0) {
      return (
        <ScrollView
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 10,
            marginTop: 30,
          }}>
          {suggestedCities.map((item) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                handleSelectCity(item.name);
                navigator.navigate("Info", { location: item.name });
                setValue("");
              }}
              style={{
                backgroundColor: "rgba(0,0,0,0.06)",
                marginVertical: 5,
                borderRadius: 20,
                padding: 10,
                marginLeft: 15,
              }}>
              {data?.includes(item.name) ? (
                <Text style={{ color: "#2F58CD" }}>{item.name}</Text>
              ) : (
                <Text>{item.name}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return null;
    }
  };

  const showConfirmDialog = (cityName) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this city from your favorites?",
      [
        {
          text: "Yes",
          onPress: () => {
            setFavoriteCities((prev) => {
              let newLocations = prev.filter((city) => {
                return city.name !== cityName;
              });

              let news = newLocations.map((city) => {
                return city.name;
              });

              AsyncStorage.setItem("location", JSON.stringify(news));
              return newLocations;
            });
          },
        },
        {
          text: "No",
        },
      ]
    );
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
                fontSize: 35,
                textAlign: "center",
                fontWeight: "300",
              }}>
              Quản lý thành phố
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
                      showConfirmDialog(item.name);
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
