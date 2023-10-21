import axios from "axios";

export default axios.create({
  baseURL: "https://frontendrrhh.vercel.app/api/v1/",
  headers: {
    "Content-type": "application/json",
    enctype: "multipart/form-data",
  },
});
