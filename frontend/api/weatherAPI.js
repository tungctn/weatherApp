import axios from "axios";
import { API_KEY } from "../constants";

export const getCurrentData = async (cityName) => {
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=c598de62108b5c93a8212f54dc4b2fe0&lang=vi`;
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
