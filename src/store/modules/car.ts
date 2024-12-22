import { defineStore } from "pinia";
import type { CarInfoOptions } from "@/api/main/main.d";

type useCarStoreState = {
  carInfo: null | CarInfoOptions; // 选择的汽车信息
  carBrandInfo: null | CarInfoOptions; // 选择的汽车品牌下的系列信息
};

export const useCarStore = defineStore("car", {
  state(): useCarStoreState {
    return {
      carInfo: null,
      carBrandInfo: null,
    };
  },
  actions: {
    setCarInfo(data: null | CarInfoOptions) {
      this.carInfo = data;
    },
    setCarBrandInfo(data: null | CarInfoOptions) {
      this.carBrandInfo = data;
    },
  },
  persist: {
    key: "car",
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
