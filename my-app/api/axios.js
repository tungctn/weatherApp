import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

console.log(uri);

export default axios.create({
  baseURL: uri,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
