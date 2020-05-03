import axios from "axios";
import { RawSyoboiResponse, SyoboiResponse } from "./const";
import { convertor } from "./convertors";

export const fetch = async (): Promise<SyoboiResponse> => {
  return axios
    .get<RawSyoboiResponse>("http://cal.syoboi.jp/rss2.php", {
      params: {
        alt: "json",
      },
    })
    .then((r) => convertor(r.data));
};
