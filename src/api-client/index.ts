import axios from "axios";
import { RawSyoboiResponse } from "./consts";

export const fetch = async (): Promise<RawSyoboiResponse> => {
  return axios
    .get<RawSyoboiResponse>("http://cal.syoboi.jp/rss2.php", {
      params: {
        alt: "json",
      },
    })
    .then((r) => r.data);
};
