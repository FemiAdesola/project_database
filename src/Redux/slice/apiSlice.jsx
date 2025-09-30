import axios from "axios";

const api = axios.create({
  baseURL: "https://project-database-api.onrender.com",
});


export default api;


