import axios from "axios";

export default axios.create({
  baseURL: "http://54.161.103.27:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});