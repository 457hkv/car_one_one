<template>
  <view class="bg-gray p-20 full-height">
    <view
      class="p-20 bg-white full-height d-flex align-items-center justify-content-center"
    >
      <up-button type="primary" shape="circle" class="login-btn" @click="login">
        微信授权登录
      </up-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import System from "@/api/system";
import { useUserStore } from "@/store/modules/user";

// 用户 store
const userStore = useUserStore();

// 登陆流程
const login = () => {
  uni
    .login()
    .then((res) => {
      return System.login({ code: res.code });
    })
    .then(({ data }) => {
      userStore.changeToken(data.token);
      return System.userProfileGet();
    })
    .then(({ data }) => {
      uni.showToast({
        title: "登录成功!",
      });
      userStore.changeUserInfo(data);
      uni.navigateBack();
    })
    .catch((err) => {});
};
</script>

<style lang="scss" scoped>
.login-btn {
  width: 650rpx;
}
</style>
