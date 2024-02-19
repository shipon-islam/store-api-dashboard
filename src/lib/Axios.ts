import axios from "axios";
// export const baseURL = "http://localhost:5000";
export const baseURL = "https://store-api.cyclic.app";
const localSession = localStorage.getItem("auth");
const auth = localSession ? JSON.parse(localSession) : {};

export const Axios = axios.create({
  baseURL: baseURL,
  headers: { Authorization: "Bearer " + auth.token },
});
