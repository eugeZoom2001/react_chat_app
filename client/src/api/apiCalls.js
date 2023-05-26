import axios from "axios";

const loginUser = (data, token = "1234") => {
  //  console.log("data send", data);
  //console.log("url", `${process.env.REACT_APP_SERVER}`);
  return axios.post(`${process.env.REACT_APP_SERVER}/login`, data, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

/* const getUsersAvailable = (token = "1234") => {
  return axios.get(`${process.env.REACT_APP_SERVER}/usersAvailable`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}; */

const getUsersAvailable = (url, token = "1234") => {
  return axios.get(url, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
};

const ApiService = {
  loginUser,
  getUsersAvailable,
};

export default ApiService;
