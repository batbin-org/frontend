import axios from "axios";
import { PASTE_HOST } from "../constants";

export const save = (text, config, onSuccess, onError) =>
  axios
    .post(`${PASTE_HOST}/api/v2/paste`, text, config)
    .then((result) => {
      if (result.data.success === true) {
        onSuccess(result.data);
      } else if (result.data.success === false) {
        onError(result.data.message);
      } else {
        console.log(
          `Received invalid response -- ${
            typeof data === "object" ? JSON.stringify(result.data) : result.data
          }`
        );
        onError("Something went wrong!");
      }
    })
    .catch((e) => {
      console.log("ERR>" + e);
    });

export const fetch = async (id, config) => {
  const response = await axios.get(`${PASTE_HOST}/api/v2/paste/${id}`, config);

  return response.data;
};
