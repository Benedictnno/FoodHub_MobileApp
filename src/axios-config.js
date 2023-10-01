// axios-config.js

import axios from "axios";

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: "http://www.themealdb.com/api/json/v1/1/", 
});

export default instance;
