<template>
  <view class="review-page">
    <view class="review-list p-20" v-if="true">
      <view class="review-item p-20 border-radius-20">
        <view class="order d-flex justify-content-space-between">
          <view class="d-flex align-items-center">
            <text> 安装项目 </text>
            <text class="ml-10"> 车载360全景影像 </text>
          </view>
          <view class="time">2024-03-01</view>
        </view>
        <view class="rate my-20">
          <u-rate :modelValue="4" :count="5" activeColor="#f40" readonly />
        </view>
        <view class="content">
          距离很近，老板联系的很快，比自己找实体店方便多了，而且还便宜，真的是太好用了，我好喜欢，还会继续下单的
        </view>
      </view>
    </view>
    <view class="null" v-else>
      <u-empty mode="search" text="暂无评价" />
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.review-page {
  min-height: 100%;
  background-color: #f1f1f1;
  .null {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .review-list {
    .review-item {
      background-color: #fff;
      .order {
        font-size: 24rpx;
        color: #999;
      }
      .content {
        color: #666;
        font-size: 26rpx;
      }
    }
  }
}
</style>
