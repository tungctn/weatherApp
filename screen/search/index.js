import React, { useState } from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";

const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => console.log("Button Pressed")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        underlayColor="#d9d9d9"
        style={[styles.button, isHovered && styles.buttonHovered]}>
        <Text style={styles.buttonText}>Nút</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonHovered: {
    backgroundColor: "#d9d9d9",
  },
  buttonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default App;
