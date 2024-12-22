import { useUserStore } from "@/store/modules/user";

type OptionsType = Pick<
  UniApp.RequestOptions,
  "url" | "method" | "timeout" | "responseType" | "header" | "data"
>;

export type ResultType<T> = {
  errCode: string;
  httpCode: number;
  data: T;
  msg: string;
};

class requestData<T> {
  private token = "";
  static BASE_URL = import.meta.env.VITE_BASE_URL;
  static PREFIX = import.meta.env.VITE_BASE_API_PREFIX;
  private readonly options: OptionsType = {
    url: "",
    method: "GET",
    timeout: 5000,
  };
  constructor(options: OptionsType) {
    this.options = {
      ...options,
      url: requestData.BASE_URL + requestData.PREFIX + options.url,
    };
  }
  // 发送请求
  async send() {
    this.beforeSend();
    const data = await uni.request(this.options).catch((err) => {
      console.log("请求错误...: ", err);
    });
    return this.handleResult(data);
  }
  // 发送前执行的函数
  beforeSend() {
    const userStore = useUserStore();
    // 设置token
    this.token = userStore.$state.loginData.token;
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
    // 设置header
    this.options.header = {
      // "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${this.token}`,
    };
  }
  // 返回数据的统一处理
  handleResult(
    data: void | UniApp.RequestSuccessCallbackResult
  ): Promise<ResultType<T>> {
    console.log("后端返回的data: ", data);
    uni.hideLoading();
    if (!data) {
      // 请求失败
      console.log("未知错误");
      return Promise.reject(data);
    }
    const result = data.data as ResultType<T>;
    if (result.httpCode === 401) {
      uni.navigateTo({
        url: "/pages/login/index",
      });
      return Promise.reject(result);
    }
    if (result.httpCode !== 200) {
      console.log("非200, 请求失败");
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  }
}

export default function request<T>(options: OptionsType) {
  return new requestData<T>(options).send();
}
