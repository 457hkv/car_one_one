<template>
  <view class="app-container">
    <view class="app-title-container" :customNavHeight="0">
      <u-navbar
        :placeholder="true"
        :border="false"
        :fixed="false"
        bgColor="transparent"
      >
        <template v-slot:left>
          <view class="header">
            <text class="name">
              {{ appName }}
            </text>
            <text class="intro">一站式汽车升级安装平台</text>
          </view>
        </template>
      </u-navbar>
      <view class="banner-container">
        <up-input
          v-model="searchValue"
          showClear
          placeholder="搜索您需要的服务"
          :customStyle="{ backgroundColor: '#fff' }"
        />
        <view class="intro-box">
          <view class="content-left">
            <view class="title">安装无忧</view>
            <view class="subtitle">
              <view> 具备专业安装团队 </view>
              <view> 提供优质的安装服务 </view>
            </view>
          </view>
          <view class="img">
            <up-image
              class="img"
              :width="150"
              :height="150"
              :src="steering_wheel"
              :showMenuByLongpress="false"
            />
          </view>
        </view>
      </view>
    </view>
    <view class="content">
      <u-notice-bar :text="noticeList" direction="column" />
      <view class="statistics-wrap" v-if="false">
        <view class="item">
          <view class="tit">
            <text class="num">3.77</text>
            <text class="util">万</text>
          </view>
          <view class="subtit">专业入驻师傅</view>
        </view>

        <view class="item">
          <view class="tit">
            <text class="num">15.13</text>
            <text class="util">万</text>
          </view>
          <view class="subtit">累计服务订单</view>
        </view>

        <view class="item">
          <view class="tit">
            <text class="num">97.9</text>
            <text class="util">%</text>
          </view>
          <view class="subtit">服务好评率</view>
        </view>
      </view>
      <view class="order-img-wrap mt-20" @click="createOrder">
        <view class="context-left">
          <view class="title">我要安装</view>
          <up-button
            type="primary"
            :plain="true"
            text="点击下单"
            :customStyle="{
              width: '150rpx',
              height: '60rpx',
              margin: '10rpx 0 0',
              boxShadow: '2rpx 2rpx 4rpx #b8c1ca',
            }"
          />
        </view>
        <!-- <up-image
          class="border-radius-20 img"
          width="670rpx"
          height="227rpx"
          :src="dispatch_order"
          @click="createOrder"
        /> -->
      </view>

      <view class="order-process-wrap">
        <view class="tit">安装流程</view>
        <view class="step-wrap">
          <view class="step-item">
            <view class="icon">
              <text class="iconfont icon-icon_fabu"></text>
            </view>
            <view class="text">发布需求</view>
          </view>
          <text class="next iconfont icon-xiayibu"></text>
          <view class="step-item">
            <view class="icon">
              <text class="iconfont icon-gerentouxiang_o"></text>
            </view>
            <view class="text">匹配安装店</view>
          </view>
          <text class="next iconfont icon-xiayibu"></text>
          <view class="step-item">
            <view class="icon">
              <text class="iconfont icon-weixiu"></text>
            </view>
            <view class="text">预约到店安装</view>
          </view>
          <text class="next iconfont icon-xiayibu"></text>
          <view class="step-item">
            <view class="icon">
              <text class="iconfont icon-fuwutiyandingyi"></text>
            </view>
            <view class="text">验收评价</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import steering_wheel from "@/static/steering_wheel.png";
// import dispatch_order from "@/static/banner1.png";
import { useUserStore } from "@/store/modules/user";

// 用户 store
const userStore = useUserStore();

const appName = import.meta.env.VITE_APP_NAME;

const searchValue = ref("");

const noticeList = ref(["恭喜xxxx用户下单成功", "热烈庆祝xxxx中奖免单"]);

// 去到某个页面
const navTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};

const createOrder = () => {
  if (!userStore.$state.loginData.token) {
    // 未登录，去到登陆页面
    navTo("/pages/login/index");
  } else {
    // 已登陆，创建订单页面
    navTo("/pages/createOrder/index");
  }
};
</script>

<style lang="scss" scoped>
.app-title-container {
  background: linear-gradient(180deg, #c4e1ff 0%, #ffffff 97%);
  .header {
    display: flex;
    align-items: center;
    .name {
      font-size: 32rpx;
      margin-right: 20rpx;
      font-style: italic;
      font-weight: 600;
    }
    .intro {
      font-size: 24rpx;
    }
  }
  .banner-container {
    height: 400rpx;
    padding: 40rpx;
    overflow: hidden;
    position: relative;
    .intro-box {
      display: flex;
      .content-left {
        display: flex;
        flex-direction: column;
        .title {
          margin-top: 40rpx;
          margin-bottom: 10rpx;
          font-size: 40rpx;
          font-weight: bold;
        }
        .subtitle {
          color: #282828;
          font-size: 24rpx;
        }
      }
      .img {
        position: absolute;
        z-index: 0;
        right: -20rpx;
        bottom: -60rpx;
      }
    }
  }
}
.content {
  position: relative;
  margin-top: 20rpx;
  z-index: 9;
  border-top-left-radius: 40rpx;
  border-top-right-radius: 40rpx;
  background-color: #fff;
  padding: 40rpx;
  .order-img-wrap {
    position: relative;
    width: 670rpx;
    height: 227rpx;
    background-image: url("/static/banner1.png");
    background-size: cover;
    background-position: center center;
    color: #fff;
    border-radius: 20rpx;
    overflow: hidden;
    .context-left {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 50rpx;
      .title {
        font-size: 52rpx;
        font-style: oblique;
        text-shadow: 0 0 10px #b8c1ca;
      }
    }
  }
  .statistics-wrap {
    margin: 50rpx 0;
    display: flex;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .tit {
        margin-bottom: 10rpx;
        font-weight: 600;
        .num {
          font-size: 40rpx;
        }
        .util {
          margin-left: 10rpx;
        }
      }
      .subtit {
        font-size: 24rpx;
        color: #999;
      }
    }
  }
  .order-process-wrap {
    position: relative;
    height: 250rpx;
    margin-top: 40rpx;
    background-image: url("/static/banner2.png");
    background-size: cover;
    background-position: center center;
    border-radius: 20rpx;
    .tit {
      position: absolute;
      left: 0;
      top: 0;
      padding: 10rpx 40rpx;
      background-color: rgb(8, 123, 241);
      color: #d4e9ff;
      font-size: 24rpx;
      border-top-left-radius: 20rpx;
      border-bottom-right-radius: 20rpx;
    }
    .step-wrap {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 24rpx;
      .step-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 60rpx;
          height: 60rpx;
          background-color: #d4e9ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }
        .text {
          margin-top: 15rpx;
          font-size: 24rpx;
          transform: scale(0.8);
          color: #fff;
        }
      }
      .next {
        color: #fff;
        font-size: 44rpx;
      }
    }
  }
}
</style>
