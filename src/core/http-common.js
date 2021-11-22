import axios from "axios";

const ax = axios.create({
  baseURL: "https://localhost:44303/api/v1",
});

ax.interceptors.request.use(
  function (config) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      console.log(`Bearer ${user.token}`);
      config.headers["Authorization"] = "Bearer " + user.token;
      return config;
    } else {
      console.log("No token available");
      return {};
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default ax;
