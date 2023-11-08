import { AxiosResponse } from 'axios';
import axiosApiWrapper from "../axiosApiWrapper";
import tags from '../config/path/TAGS';

const tagsDataProvider = {
  async getAllTag(): Promise<AxiosResponse> {
    return axiosApiWrapper["get"](tags.ALLTAGS, {});
  },
};

export default tagsDataProvider