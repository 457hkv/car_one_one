<template>
  <view class="mode-page">
    <u-popup
      :show="props.show"
      @close="close"
      mode="center"
      :closeOnClickOverlay="true"
    >
      <view class="table">
        <view class="header">
          <view class="header-item left">
            <view class="padding"> 合作门店 </view>
          </view>
          <view class="header-item right">
            <view class="padding"> 距离 </view>
          </view>
        </view>
        <view
          v-if="tableData.length"
          class="conten-item"
          v-for="item in tableData"
          :key="item.id"
        >
          <view class="left">
            <view class="padding"> {{ item.title }} </view>
          </view>
          <view class="right">
            <view class="padding">
              {{ (item.gap || 0).toFixed(2) + item.unit }}
            </view>
          </view>
        </view>
        <view class="null" v-else>附近暂无门店</view>
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { PartnerStoreListOut } from "@/api/main/main";
import Main from "@/api/main";

type PropsType = {
  show: boolean;
  carOwnerMultiLvAddr: string;
  carOwnerFullAddress: string;
};

const props = withDefaults(defineProps<PropsType>(), {
  show: false,
});

const emit = defineEmits<{
  (e: "update:show", flag: boolean): void;
}>();

const close = () => {
  console.log("123");
  emit("update:show", false);
};

const tableData = ref<PartnerStoreListOut[]>([]);

const getNearbyShop = async () => {
  uni.showLoading({
    title: "加载中...",
  });
  const data = await Main.partnerStoreList({
    address: props.carOwnerMultiLvAddr + "-" + props.carOwnerFullAddress,
    limitGap: 5,
  });
  tableData.value = data.data || [];
  setTimeout(() => {
    uni.hideLoading();
  }, 2000);
};

getNearbyShop();
</script>

<style lang="scss" scoped>
.table {
  width: 700rpx;
  border-radius: 10rpx;
  overflow: hidden;
  .left {
    width: 75%;
    text-align: center;
    border-right: 1px solid #f1f1f1;
  }
  .right {
    width: 25%;
    text-align: center;
  }
  .padding {
    padding: 20rpx 0;
  }
  .header {
    background-color: #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #333;
  }
  .conten-item {
    width: 100%;
    display: flex;
    background-color: #fff;
    border-top: 1px solid #f1f1f1;
    color: #666;
    font-size: 26rpx;
  }
  .null {
    height: 150rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    background-color: #fff;
    font-size: 28rpx;
  }
}
</style>
