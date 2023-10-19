import axios from "axios";

export default axios.create({
  baseURL: "https://vargsangapi-bb18fb62d555.herokuapp.com/api/v1/",
  headers: {
    "Content-type": "application/json",
    enctype: "multipart/form-data",
  },
});
