import AUTH from "../config/path/AUTH";
import axiosApiWrapper from "../axiosApiWrapper";
import {AxiosResponse} from 'axios'
interface ILogin {
  email: string;
  password: string;
}
interface IRegister {
  username: string;
  email: string;
  password: string;
}
const authDataProvider = {
  async register(payload:IRegister): Promise<AxiosResponse> {
    return await axiosApiWrapper["post"](
      AUTH.register,
      {user:payload}
    );
  },
  async login(payload: ILogin): Promise<AxiosResponse> {
    return await axiosApiWrapper["post"](AUTH.login, {user:payload})
  },
  async currentUser(): Promise<AxiosResponse> {
    return await axiosApiWrapper['get'](AUTH.currentUser,{})
  }
};
export default authDataProvider;
