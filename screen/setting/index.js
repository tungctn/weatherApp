import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from 'react-native-dropdown-select-list'

const Setting = () => {
  const navigator = useNavigation();

  const handleBackButtonPress = () => {
    navigator.goBack();
  };
  
  const [isEnabledMode, setEnabledMode] = useState(true)

  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedTemperature, setSelectedTemperature] = React.useState("");
  const [selectedWindSpeed, setSelectedWindSpeed] = React.useState("");
  const [selectedPressure, setSelectedPressure] = React.useState("");

  const handleSelect = (value) => {
    console.log("Selected value:", value);
    // Thực hiện hành động mong muốn khi giá trị được chọn
  };
  
  const Language = [
      {key:'1', value:'Tiếng Việt'},
      {key:'2', value:'Tiếng Anh'},
      {key:'3', value:'Tiếng Trung'},
      
  ]

  const Temperature = [
    {key:'1', value:'  ° C'},
    {key:'2', value:'  ° F'},
    {key:'3', value:'  ° K'},
    
]

const WindSpeed = [
  {key:'1', value:'km/h'},
  {key:'2', value:'mph'},
  {key:'3', value:'m/s'},
  
]

const Pressure = [
  {key:'1', value:'mbar'},
  {key:'2', value:'atm'},
  {key:'3', value:'hPa'},
  
]

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
        <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabledMode ? 'white' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>{
          setEnabledMode(!isEnabledMode)
        }}
        value={isEnabledMode}
      />
        
      </View>

      <View style={styles.option}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="language-outline" />
        <Text style={styles.optionText}>Ngôn ngữ</Text>
        <View style={{flex: 1}} />
        
        <SelectList 
        setSelected={(val) => setSelectedLanguage(val)} 
        data={Language} 
        searchicon={<View />}
        searchPlaceholder=""
        save="value"
        defaultOption= "Tiếng Việt"
        placeholder= "Tiếng Việt"
        onSelect={handleSelect}
    />
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
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="thermometer-outline" />
        <Text style={styles.optionText}>Đơn vị đo nhiệt độ</Text>
        <View style={{flex: 1}} />
        <SelectList 
        setSelected={(val) => setSelectedTemperature(val)} 
        searchPlaceholder=""
        searchicon={<View />}
        data={Temperature} 
        save="value"
        placeholder= "° C"
        defaultOption= "° C"
        onSelect={handleSelect}
    />
      </View>
      <View style={styles.option}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="speedometer-outline" />
        <Text style={styles.optionText}>Đơn vị đo tốc độ gió</Text>
        <View style={{flex: 1}} />
        
        <SelectList 
        setSelected={(val) => setSelectedWindSpeed(val)} 
        searchPlaceholder=""
        searchicon={<View />}
        data={WindSpeed} 
        save="value"
        placeholder= "km/h"
        defaultOption= "km/h"
        onSelect={handleSelect}
    />
      </View>
      <View style={styles.option}>
        <Ionicons style={[styles.optionIcon, styles.mutedIcon]} name="planet-outline" />
        <Text style={styles.optionText}>Đơn vị áp suất</Text>
        <View style={{flex: 1}} />
        
        <SelectList 
        setSelected={(val) => setSelectedPressure(val)} 
        searchPlaceholder=""
        searchicon={<View />}
        data={Pressure} 
        save="value"
        placeholder= "mbar"
        defaultOption= "mbar"
        onSelect={handleSelect}
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
