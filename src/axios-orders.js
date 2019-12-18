import axios from "axios";

export default axios.create({
  baseURL: "https://burger-run-1.firebaseio.com/"
});
