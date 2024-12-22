import { defineStore } from "pinia";
import type { userProfileInfoGetOut } from "@/api/system/system";

type useUserStoreState = {
  loginData: {
    token: string;
  }; // 登录接口的信息
  userInfo: userProfileInfoGetOut;
  // userInfo: {
  //   avatarUrl: string;
  //   id?: number;
  //   phoneNumber: string | number;
  //   username: string;
  // };
};

export const useUserStore = defineStore("user", {
  state(): useUserStoreState {
    return {
      loginData: {
        token: "",
      },
      userInfo: {
        username: "",
        avatarUrl: "",
        phoneNumber: "",
        id: 0,
      },
    };
  },
  actions: {
    changeUserInfo(data: useUserStoreState["userInfo"]) {
      this.userInfo = data;
    },
    changeToken(token: string) {
      this.loginData.token = token;
    },
    logout() {
      this.changeUserInfo({
        username: "",
        avatarUrl: "",
        phoneNumber: "",
        id: 0,
      });
      this.changeToken("");
    },
  },
  persist: {
    key: "user",
    storage: {
      getItem(key) {
        return uni.getStorageSync(key);
      },
      setItem(key, val) {
        uni.setStorageSync(key, val);
      },
    },
  },
});
