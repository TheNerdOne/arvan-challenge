import ARTICLES from "../config/path/ARTICLES";
import axiosApiWrapper from "../axiosApiWrapper";
import { AxiosResponse } from "axios";
interface INewArticlePayload {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
const articlesDataProvider = {
  async getAllArticles(): Promise<AxiosResponse> {
    return await axiosApiWrapper["get"](ARTICLES, {});
  },
  async deleteArticle(payload: string): Promise<AxiosResponse> {
    return await axiosApiWrapper["delete"](ARTICLES, payload, {});
  },
  async createArticle(newArticle: INewArticlePayload): Promise<AxiosResponse> {
    return axiosApiWrapper["post"](ARTICLES, newArticle);
  },
};
export default articlesDataProvider;
