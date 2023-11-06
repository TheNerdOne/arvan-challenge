import ARTICLES from "../config/path/ARTICLES";
import axiosApiWrapper from "../axiosApiWrapper";
import { AxiosResponse } from "axios";

const articlesDataProvider = {
  async getAllArticles():Promise<AxiosResponse> {
    return await axiosApiWrapper["get"](ARTICLES.list,{});
  },
};
export default articlesDataProvider;
