import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Setting = () => {
  const navigator = useNavigation();

  const handleBackButtonPress = () => {
    navigator.goBack();
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          style={styles.backButton}
          name="arrow-back-circle-outline"
          onPress={handleBackButtonPress}
        />
        <Text style={styles.title}>Cài đặt ứng dụng</Text>
      </View>
      <View style={{
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: "center",
        marginTop: 40
      }}>
        <Text style={styles.optionText}> Chung </Text>

      </View>

      <View style={styles.optionF}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="contrast-outline" />
        <Text style={styles.optionText}>Chế độ</Text>
        <View style={{flex: 1}} />
        <Text style={styles.optionTextSelect}>Light</Text>
      </View>

      <View style={styles.option}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="language-outline" />
        <Text style={styles.optionText}>Ngôn ngữ</Text>
        <View style={{flex: 1}} />
        <Text style={styles.optionTextSelect}>English</Text>
      </View>

      <View style={{
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: "center",
        marginTop: 40
      }}>
        <Text style={styles.optionText}> Đơn vị </Text>

      </View>

      <View style={styles.optionF}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="swap-horizontal-outline" />
        <Text style={styles.optionText}>Đơn vị đo nhiệt độ</Text>
        <View style={{flex: 1}} />
        <Text style={styles.optionTextSelect}>Độ C</Text>
      </View>
      <View style={styles.option}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="swap-horizontal-outline" />
        <Text style={styles.optionText}>Đơn vị đo tốc độ gió</Text>
        <View style={{flex: 1}} />
        <Text style={styles.optionTextSelect}>km/h</Text>
      </View>
      <View style={styles.option}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="swap-horizontal-outline" />
        <Text style={styles.optionText}>Đơn vị áp suất</Text>
        <View style={{flex: 1}} />
        <Text style={styles.optionTextSelect}>mbar</Text>
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
    fontSize: 35
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
