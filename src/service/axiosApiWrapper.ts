import axios, { AxiosError, AxiosResponse } from "axios";
import { API_PATH } from "./config/HTTP";
import JWT from "./JWT";
import { interceptorFunctions } from "./interceptors";

const axiosApiWrapper = {
  init() {
    axios.defaults.baseURL = API_PATH;
    axios.defaults.headers.common["Cache-Control"] =
      "no-cache, no-store, must-revalidate";
    axios.defaults.headers.common["Pragma"] = "no-cache";
    axios.defaults.headers.common["Expires"] = "0";
    axios.defaults.headers.common["Accept"] = "text/plain";
    axios.defaults.headers.common["Authorization"] = `Token ${JWT.getToken()}`;
    axios.interceptors.response.use(
      interceptorFunctions.response.onFullFilled,
      interceptorFunctions.response.onRejected
    );
    axios.interceptors.request.use(
      interceptorFunctions.request.onFullFilled,
      interceptorFunctions.request.onRejected
    );
  },

  removeAuthorizationHeader() {
    delete axios.defaults.headers.common["Authorization"];
  },

  addAuthorizationHeader() {
    axios.defaults.headers.common["Authorization"] = `Token ${JWT.getToken()}`;
  },

  updateHeader(hName: string, hValue: string) {
    axios.defaults.headers[hName] = hValue;
  },

  retryApiCall(apiError: AxiosError): Promise<AxiosResponse> {
    const { config: oldRequest } = apiError;
    return axios.request({ ...oldRequest }).then((r) => r);
  },

  // Methods

  get(resource: string, paramsAndConfig: object): Promise<AxiosResponse> {
    return axios.get(resource, paramsAndConfig);
  },

  post(
    resource: string,
    params: object,
    config?: object
  ): Promise<AxiosResponse> {
    return axios.post(`${resource}`, params, config);
  },

  update(
    resource: string,
    slug: string,
    params: object,
    config: object
  ): Promise<AxiosResponse> {
    return axios.put(`${resource}/${slug}`, params, config);
  },

  put(
    resource: string,
    params: object,
    config?: object
  ): Promise<AxiosResponse> {
    return axios.put(`${resource}`, params, config);
  },

  delete(resource: string, params: object): Promise<AxiosResponse> {
    return axios.delete(resource, params);
  },
};

export default axiosApiWrapper;
