<template>
  <view class="full-height overflow-hidden">
    <view class="my-20 px-20 box-sizing-border-box">
      <u-search :show-action="true" actionText="搜索" :animation="true" />
    </view>
    <scroll-view scroll-y="true" class="scroll-container pb-20">
      <view
        class="scroll-view-item"
        v-for="(item, index) in firstOrderData"
        :key="item.id"
        @click="selectFirst(item, index)"
      >
        {{ item.title }}
      </view>
    </scroll-view>
    <u-popup
      mode="bottom"
      :show="show"
      @close="close"
      :round="5"
      :customStyle="{ height: '500rpx' }"
    >
      <view class="popup-container">
        <view class="title-box">
          {{ firstOrderData[firstOrderIndex]?.title }}
        </view>
        <scroll-view scroll-y="true" class="product-container pb-20">
          <view
            class="product-item"
            v-for="item in secondOrderData"
            :key="item.id"
          >
            <view class="name"> {{ item.title }} </view>
            <view class="btn">
              <u-button type="primary" size="mini" @click="confirmData(item)">
                选择
              </u-button>
            </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script lang="ts" setup>
import { onUnload } from "@dcloudio/uni-app";
import { ref, computed } from "vue";
import Main from "@/api/main";
import type { CarReplacementListOut } from "@/api/main/main.d";
import { useCarStore } from "@/store/modules/car";

// 是否展示第二级列表数据
const show = ref(false);
const carStore = useCarStore();

// 第一级列表数据
const firstOrderData = ref<CarReplacementListOut[]>([]);
// 第二级列表数据
const secondOrderData = ref<CarReplacementListOut[]>([]);
// 第一列表选择的index
const firstOrderIndex = ref(0);

// 选择的汽车id
const carBrandInfoId = computed(() => {
  return carStore.$state.carBrandInfo?.id || 0;
});

// 点击第一列数据
const selectFirst = (item: CarReplacementListOut, index: number) => {
  getData(item.id);
  firstOrderIndex.value = index;
};

// 关闭第二列数据选择器
const close = () => {
  show.value = false;
};

// 获取数据
const getData = (carReplacementId: number) => {
  if (!carBrandInfoId.value) return;
  uni.showLoading({
    title: "加载中...",
  });
  Main.carReplacementList(carBrandInfoId.value, carReplacementId)
    .then((res) => {
      if (carReplacementId === 0) {
        // 获取第一级列表数据
        firstOrderData.value = res.data || [];
      } else {
        // 获取第二级列表数据
        secondOrderData.value = res.data || [];
        show.value = true;
      }
    })
    .finally(() => {
      uni.hideLoading();
    });
};

// 确定选择数据
const confirmData = (data: CarReplacementListOut) => {
  uni.$emit("select_product", data);
  uni.navigateBack();
};

// 获取数据
getData(0);
</script>

<style lang="scss" scoped>
.scroll-container {
  height: calc(100vh - (64rpx + 20rpx * 2));
  box-sizing: border-box;
  .scroll-view-item {
    margin: 20rpx 0;
    padding: 20rpx;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
  }
}

.popup-container {
  padding: 20rpx;
  .title-box {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20rpx;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 20px;
  }
  .product-container {
    height: 500rpx;
    .product-item {
      display: flex;
      align-items: center;
      margin: 20rpx 0;
      padding: 20rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #f1f1f1;
      .name {
        flex: 1;
        margin-right: 10rpx;
      }
      .btn {
        width: 120rpx;
      }
    }
  }
}
</style>
