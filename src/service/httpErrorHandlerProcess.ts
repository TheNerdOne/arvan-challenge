import JWT from "./JWT";
import { AxiosError } from "axios";
const httpErrorHandlerProcess = async (err: AxiosError) => {
  const status = err.response?.status;
  const accessToken = JWT.getToken();
  // const refreshToken = JWT.getRefreshToken();
  JWT.deleteToken(accessToken);
  setTimeout(() => {}, 0);
  switch (status) {
    case 401:
      // for refresh token logic
      // const res = await authDataProvider.refreshToken({
      //   accessToken,
      //   refreshToken,
      // });
      // if (res.data && res.data.status === "OK") {
      //   const { accessToken, refreshToken } = res.data.data;
      //   //dispatch tokens to stores
      //   JWT.setToken(accessToken);
      //   JWT.setRefreshToken(refreshToken);
      //   return true;
      // } else {
      //   return false;
      // }
      break;
    case 403:
      return false;
      //clear all configs from store & storages
      //push to login page
      break;
  }
};

export default httpErrorHandlerProcess;
