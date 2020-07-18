import axios from "axios";
import { store } from "../redux/Store";

const instance = axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "http://mywallet.atkev.site",
  //  baseURL: "https://finreact.herokuapp.com"
});

instance.interceptors.request.use(
  async function (config) {
    try {
      let token = store.getState().token;
      config.headers.Authorization = "Bearer " + token;
    } finally {
      //config.headers.ContentType = "application/json";
      return config;
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Error: unauthorized error, JWT token discarded");
      store.dispatch({
        type: "tokenClear",
      });
    } else {
      return Promise.reject(error);
    }
  }
);

/*
axios.interceptors.request.use(function(config) {
  const token = state.token;
  console.log("Bearer " + token);
  config.headers.Authorization = "Bearer " + token;
  //config.headers.ContentType = "application/json";
  return config;
});
*/

export default instance;
