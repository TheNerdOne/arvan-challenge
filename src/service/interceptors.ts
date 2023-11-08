import httpErrorHandlerProcess from "./httpErrorHandlerProcess";
import JWT from "./JWT";
import axiosApiWrapper from "./axiosApiWrapper";
import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const interceptorFunctions = {
  response: {
    onFullFilled: async function (response: AxiosResponse) {
      // range of 2xx
      if (response.data.code === 200) {
        // success
        await (response.data.status = "OK");
      } else if (response.data.code === 500) {
        // err message should be toasted
        // do something with error message
      }
      return response;
    },

    onRejected: async function (error: AxiosError): Promise<AxiosResponse<any, any> | AxiosError<unknown, any>> {
      // outside the range of 2xx
      if (await httpErrorHandlerProcess(error)) {
        return axiosApiWrapper.retryApiCall(error);
      } else {
        return Promise.reject(error);
      }
    },
  },
  request: {
    onFullFilled: async (config: InternalAxiosRequestConfig) => {
      if ((await JWT.getToken()) && config.headers) {
        axiosApiWrapper.addAuthorizationHeader();
        await (config.headers.Authorization = `Token ${JWT.getToken()}`);
      } else {
        axiosApiWrapper.removeAuthorizationHeader();
      }
      return config;
    },
    onRejected: (error:AxiosError) => {
      return Promise.reject(error);
    },
  },
};
