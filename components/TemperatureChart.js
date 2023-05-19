import React from "react";
import { View } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const TemperatureChart = ({ forecast }) => {
  const data = forecast?.daily?.map((item) => item.temp.max);
  console.log({ data: data });
  const maxTemp = Math.max(...data);
  const minTemp = Math.min(...data);
  const range = maxTemp - minTemp;
  const paddingTop = 10; // padding cho biểu đồ
  const paddingBottom = 10;
  const circleRadius = 5; // bán kính của các điểm
  const chartHeight = 30; // chiều cao của biểu đồ
  const chartWidth = 350; // chiều rộng của biểu đồ
  const verticalScale = (chartHeight - paddingTop - paddingBottom) / range;
  const horizontalScale = chartWidth / (data.length - 1);

  return (
    <View>
      <Svg height={chartHeight} width={chartWidth}>
        {data.map((temp, index) => {
          const x = index * horizontalScale;
          const y =
            chartHeight - paddingBottom - (temp - minTemp) * verticalScale;
          return (
            <Circle key={index} cx={x} cy={y} r={circleRadius} fill="black" />
          );
        })}
        {data.slice(0, -1).map((temp, index) => {
          const x1 = index * horizontalScale;
          const y1 =
            chartHeight - paddingBottom - (temp - minTemp) * verticalScale;
          const x2 = (index + 1) * horizontalScale;
          const y2 =
            chartHeight -
            paddingBottom -
            (data[index + 1] - minTemp) * verticalScale;
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
  );
};

export default TemperatureChart;
