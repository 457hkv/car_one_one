import request from "@/utils/request";
import type {
  LoginIn,
  LoginOut,
  userProfileInfo,
  userProfileInfoGetOut,
} from "./system";

class System {
  static login(data: LoginIn) {
    return request<LoginOut>({
      url: "/user/login/wechatAuthorization",
      method: "GET",
      data,
    });
  }

  // 获取用户信息
  static userProfileGet() {
    return request<userProfileInfoGetOut>({
      url: "/user/profile",
      method: "GET",
    });
  }

  // 修改用户信息
  static userProfilePut(data: userProfileInfo) {
    return request<number>({
      url: "/user/profile",
      method: "PUT",
      data,
    });
  }
}

export default System;
