import React from "react";
import { View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const SunCycle = ({ sunrise, sunset, current }) => {
  const totalDayMinutes = (sunset - sunrise) * 60;
  const currentDayMinutes = (current - sunrise) * 60;
  const sunPosition = currentDayMinutes / totalDayMinutes;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg height="120" width="400">
        <Line
          x1="50"
          y1="100"
          x2="350"
          y2="100"
          stroke="white"
          strokeWidth="2"
        />
        <Circle
          cx={50 + 300 * sunPosition}
          cy={100 - 50 * sunPosition}
          r="20"
          stroke="orange"
          strokeWidth="2.5"
          fill="yellow"
        />
      </Svg>
    </View>
  );
};

export default SunCycle;
