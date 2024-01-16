import axios from "axios";

export const api = axios.create({
  // baseURL: "http://192.168.68.119:3001",
  baseURL: "http://localhost:3001",
  timeout: 1000,
});
