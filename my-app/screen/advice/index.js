import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const data = [
  {
    id: "1",
    title: "Lời khuyên 1",
    description: "Đeo nón và mũ che nắng khi ra ngoài",
  },
  {
    id: "2",
    title: "Lời khuyên 2",
    description: "Uống đủ nước trong ngày để tránh mất nước cơ thể",
  },
  {
    id: "3",
    title: "Lời khuyên 3",
    description: "Sử dụng kem chống nắng khi tiếp xúc với ánh nắng mặt trời",
  },
  {
    id: "4",
    title: "Lời khuyên 4",
    description: "Mang theo áo mỏng, thoáng khi đi ra ngoài",
  },
  {
    id: "5",
    title: "Lời khuyên 5",
    description: "Tránh ra ngoài vào giờ nắng gắt từ 10h sáng đến 4h chiều",
  },
];

const Item = ({ title, description, image }) => (
  <View style={styles.item}>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const Advice = ({ route }) => {
  const { weather } = route.params;
  const navigation = useNavigation();
  const [advices, setAdvices] = useState({});

  const renderItem = ({ item }) => (
    <Item title={item.title} description={item.description} />
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={30} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Lời khuyên</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
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
});

export default Advice;
