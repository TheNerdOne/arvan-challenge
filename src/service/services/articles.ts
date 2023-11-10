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
  async getAllArticles({offset,limit}): Promise<AxiosResponse> {
    const params = new URLSearchParams({
    limit: (limit || '10').toString(),
    offset: (offset || '0').toString(),
  });
    return await axiosApiWrapper["get"](`${ARTICLES}?${params}`, {});
  },
  async deleteArticle(payload: string): Promise<AxiosResponse> {
    return await axiosApiWrapper["delete"](ARTICLES, payload, {});
  },
  async createArticle(newArticle: INewArticlePayload): Promise<AxiosResponse> {
    return axiosApiWrapper["post"](ARTICLES, newArticle);
  },
  async editArticle(article): Promise<AxiosResponse> {
    return axiosApiWrapper["put"](`${ARTICLES}/${article.slug}`, {article:{body:article.body}});
  },
  async getArticle(slug:string): Promise<AxiosResponse> {
    return axiosApiWrapper["get"](`${ARTICLES}/${slug}`, {});
  },
};
export default articlesDataProvider;
