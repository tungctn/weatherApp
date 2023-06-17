import axios from "./axios";

export const advice = async (data) => {
  const response = await axios.post("/advice", data);
  console.log(response.data);
  return response.data;
};
