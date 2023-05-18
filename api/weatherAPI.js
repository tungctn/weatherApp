import axios from "axios";
import { API_KEY } from "../constants";

export const getCurrentData = async (cityName) => {
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=279a84b0ac88d113243e12bf884b740a`;
  try {
    const response = await axios.get(API);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
