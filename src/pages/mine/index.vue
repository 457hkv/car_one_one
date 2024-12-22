<template>
  <view class="mine-wrap full-height bg-gray">
    <view class="user-container">
      <view class="user-info-wrap" @click="login">
        <view class="con-left">
          <up-avatar
            :size="42"
            mode="aspectFit"
            :src="userStore.$state.userInfo.avatarUrl"
          />
        </view>
        <view class="con-right">
          <view class="user-name">
            <text class="name">
              {{ userStore.$state.userInfo.username || "登陆/注册" }}
            </text>
            <text class="iconfont icon-jinrujiantou"></text>
          </view>
          <view class="phone-wrap" v-if="userStore.$state.loginData.token">
            <text class="iconfont icon-qiehuanchengshi"></text>
            <text class="phone-number">13282726250</text>
          </view>
        </view>
      </view>
      <!-- <view class="wallet">
        <view class="con-left">
          <text class="text">账户余额</text>
          <text class="util">¥</text>
          <text class="numer">0.00</text>
        </view>
        <view class="con-right">
          <up-button
            outlined
            size="normal"
            :customStyle="{
              fontSize: '24rpx',
              height: '60rpx',
            }"
            fontColor="#333"
            shape="circle"
          >
            查看明细
          </up-button>
        </view>
      </view> -->
    </view>

    <view class="p-20">
      <u-cell-group
        :border="false"
        :customStyle="{
          backgroundColor: '#fff',
          borderRadius: '10rpx',
          overflow: 'hidden',
        }"
      >
        <u-cell
          :border="false"
          isLink
          title="我的评价"
          @click="goPage('/pages/reviewHistory/index')"
        />
        <u-cell
          :border="false"
          isLink
          title="联系客服"
          @click="contactService"
        />
        <u-cell
          :border="false"
          isLink
          :title="'关于' + APP_NAME"
          @click="goPage('/pages/aboutUs/index')"
        />
        <u-cell
          :border="false"
          isLink
          title="服务协议"
          @click="goPage('/pages/serviceAgreement/index')"
        />
      </u-cell-group>
    </view>

    <view v-if="userStore.$state.loginData.token" class="p-20">
      <u-cell-group
        :border="false"
        :customStyle="{
          backgroundColor: '#fff',
          borderRadius: '10rpx',
          overflow: 'hidden',
        }"
      >
        <u-cell :border="false" isLink title="退出登录" @click="loginOut" />
      </u-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";

const APP_NAME = import.meta.env.VITE_APP_NAME;

// 用户 store
const userStore = useUserStore();

const goPage = (url: string) => {
  uni.navigateTo({
    url,
  });
};

// 登陆流程
const login = () => {
  if (!userStore.$state.loginData.token) {
    // 未登录，去到登陆页面
    goPage("/pages/login/index");
  } else {
    // 已登陆，去到修改用户信息页面
    goPage("/pages/updateUserInfo/index");
  }
};

// 联系客服
const contactService = () => {
  uni.makePhoneCall({
    phoneNumber: "13267672310",
  });
};

// 退出登录
const loginOut = () => {
  uni
    .showModal({
      title: "退出",
      content: "确定退出登录吗？",
    })
    .then((data) => {
      if (data.confirm) {
        // 确定退出登录
        userStore.logout();
      }
    })
    .catch((err) => {
      console.log("取消: ", err);
    });
};
</script>

<style lang="scss" scoped>
.mine-wrap {
  min-height: 100vh;
  background-color: #f4f4f4;
  .user-container {
    position: relative;
    // height: 270rpx;
    height: 200rpx;
    background-color: #d4e9ff;
    // margin-bottom: 100rpx;
    .user-info-wrap {
      display: flex;
      align-items: center;
      padding: 40rpx 20rpx 30rpx 20rpx;
      .con-left {
        margin-right: 40rpx;
      }
      .con-right {
        .user-name {
          margin-bottom: 10rpx;
          .name {
            font-weight: 500;
          }
          .iconfont {
            font-weight: bold;
          }
        }
        .phone-wrap {
          display: flex;
          align-items: center;
          .iconfont {
            font-weight: bold;
          }
          .phone-number {
            margin-left: 10rpx;
            font-size: 24rpx;
          }
        }
      }
    }
    .wallet {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      bottom: -70rpx;
      height: 150rpx;
      width: 710rpx;
      left: 20rpx;
      background-color: #fff;
      border-radius: 10rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20rpx;
      .con-left {
        font-size: 24rpx;
        color: #999;
        .util {
          font-weight: 500;
          margin-left: 10rpx;
          margin-right: 5rpx;
          color: #f40;
        }
        .numer {
          font-size: 38rpx;
          color: #f40;
          font-weight: 600;
        }
      }
      .con-right {
      }
    }
  }
}
</style>
