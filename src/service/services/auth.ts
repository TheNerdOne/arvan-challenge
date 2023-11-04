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
  async register(payload:IRegister) {
    return await axiosApiWrapper["post"](
      AUTH.register,
      {user:payload}
    );
  },
  async login(payload: ILogin): Promise<AxiosResponse> {
    return await axiosApiWrapper["post"](AUTH.login, {user:payload})
  },
};
export default authDataProvider;
