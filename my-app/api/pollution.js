import axios from "axios";

export const pollution = async (data) => {
  const API = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.lat}&lon=${data.lon}&appid=c598de62108b5c93a8212f54dc4b2fe0`;
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
