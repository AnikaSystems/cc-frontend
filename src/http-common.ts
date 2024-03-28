import axios from "axios";

export default axios.create({
  baseURL: "https://cc-backend.15chdg4h24tne.us-east-1.cs.amazonlightsail.com/api",
  headers: {
    "Content-type": "application/json"
  }
});