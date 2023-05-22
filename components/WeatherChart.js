import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

// Những số liệu này chỉ mang tính chất minh họa.
// const data = [40, 35, 34, 34];

const WeatherChart = ({ data }) => {
  // const dataSet = data?.list.slice(0, 4).map((item) => item.temp.max);
  const dataSet = [40, 35, 34, 34];
  const maxTemp = Math.max(...dataSet);
  const minTemp = Math.min(...dataSet);
  const range = maxTemp - minTemp;
  const padding = 10; // padding cho biểu đồ
  const circleRadius = 5; // bán kính của các điểm
  const chartHeight = 40; // chiều cao của biểu đồ
  const chartWidth = 300; // chiều rộng của biểu đồ
  const verticalScale = (chartHeight - padding * 2) / range; // tỉ lệ giữa độ cao của biểu đồ và khoảng nhiệt độ
  const horizontalScale = (chartWidth - padding * 2) / (dataSet.length - 1); // tỉ lệ giữa độ rộng của biểu đồ và số ngày

  return (
    <ScrollView horizontal={true}>
      <View>
        <Svg height={chartHeight} width={chartWidth}>
          {dataSet.map((temp, index) => {
            const x = padding + index * horizontalScale;
            const y = chartHeight - padding - (temp - minTemp) * verticalScale;
            return (
              <Circle key={index} cx={x} cy={y} r={circleRadius} fill="black" />
            );
          })}
          {dataSet.slice(0, -1).map((temp, index) => {
            const x1 = padding + index * horizontalScale;
            const y1 = chartHeight - padding - (temp - minTemp) * verticalScale;
            const x2 = padding + (index + 1) * horizontalScale;
            const y2 =
              chartHeight -
              padding -
              (dataSet[index + 1] - minTemp) * verticalScale;
            return (
              <Line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="black"
                strokeWidth="2"
              />
            );
          })}
        </Svg>
      </View>
    </ScrollView>
  );
};

export default WeatherChart;
