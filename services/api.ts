import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "http://192.168.68.153:3000",
  timeout: 1000,
});
