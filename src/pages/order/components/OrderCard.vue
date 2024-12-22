<template>
  <view class="list">
    <template v-if="orderList.length !== 0">
      <view class="p-20" v-for="item in orderList" :key="item.id">
        <view class="bg-white p-20 border-radius-20">
          <view class="title-wrap">
            <text class="title-text">等待付款</text>
            <view class="detail" @click="toDetail(item.id)">
              <text class="text">详情</text>
              <u-icon name="arrow-right" color="#999" size="24rpx"></u-icon>
            </view>
          </view>
          <view class="info-container">
            <view class="item">
              <view class="label"> 订单编号: </view>
              <view class="con-right"> {{ item.orderNumber }} </view>
            </view>
            <view class="item">
              <view class="label"> 服务类目: </view>
              <view class="con-right"> 360倒车影像按照/车衣贴膜 </view>
            </view>
            <view class="item">
              <view class="label"> 合作门店: </view>
              <view class="con-right"> {{ item.partnerStore }} </view>
            </view>
            <view class="item">
              <view class="label"> 下单时间: </view>
              <view class="con-right"> {{ item.createdAt }} </view>
            </view>
            <view class="item">
              <view class="label"> 订单金额: </view>
              <view class="con-right price-box">
                <text>¥</text>
                <text class="price">525.00</text>
              </view>
            </view>
          </view>
          <u-divider />
          <view class="btn-list d-flex justify-content-flex-end">
            <up-button
              type="error"
              size="normal"
              :plain="true"
              shape="circle"
              text="删除"
              :customStyle="btnCss"
              @click="modalProps.open(item.id)"
              @confirm=""
            />
            <up-button
              type="info"
              size="normal"
              :plain="true"
              shape="circle"
              text="修改订单"
              :customStyle="btnCss"
            />
            <up-button
              type="primary"
              size="normal"
              :plain="true"
              shape="circle"
              text="立即支付"
              :customStyle="btnCss"
            />
          </view>
        </view>
      </view>
    </template>

    <view v-else class="empty">
      <u-empty mode="data" />
    </view>

    <u-modal
      :show="modalProps.show"
      :title="modalProps.title"
      :content="modalProps.content"
      :showCancelButton="true"
      @cancel="modalProps.cancel"
      @confirm="modalProps.confirm"
    />
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { OrderListOut } from "@/api/main/main";
import Main from "@/api/main";
import { watch } from "vue";
import { onShow } from "@dcloudio/uni-app";

type PropsType = {
  type: string;
};

const props = withDefaults(defineProps<PropsType>(), {
  type: "",
});

const btnCss = reactive({
  width: "250rpx",
  height: "60rpx",
  margin: "0 20rpx",
  fontSize: "28rpx",
});

const orderList = ref<OrderListOut[]>([]);

const getOrderList = async () => {
  uni.showLoading({
    title: "加载中...",
  });
  const data = await Main.userOrderList().catch((err) => {
    console.log("错误: ", err);
  });
  orderList.value = data?.data || [];
  uni.hideLoading();
};

watch(
  () => props.type,
  (nval) => {
    getOrderList();
  }
);

const modalProps = reactive({
  id: 0,
  show: false,
  title: "删除订单",
  content: "确认删除此订单吗？删除后的订单将无法恢复，且未支付的订单将自动取消",
  open(orderId: number) {
    modalProps.id = orderId;
    modalProps.show = true;
  },
  cancel() {
    modalProps.show = false;
  },
  async confirm() {
    const data = await Main.userOrderDelete(modalProps.id);
    // console.log("删除: ", data);
  },
});

const toDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/orderDetail/index?id=${id}`,
  });
};

onShow(() => {
  getOrderList();
});
</script>

<style lang="scss" scoped>
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40rpx;
  .title-text {
    font-size: 30rpx;
    color: #333;
    font-weight: bold;
  }
  .detail {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 26rpx;
    .text {
      margin-right: 10rpx;
    }
  }
}
.info-container {
  .item {
    display: flex;
    align-items: center;
    font-size: 26rpx;
    margin-bottom: 10rpx;
    .label {
      color: #999;
      width: 150rpx;
    }
    .con-right {
      color: #333;
      &.price-box {
        color: #f40;
        .price {
          margin-left: 5rpx;
          font-size: 34rpx;
          font-weight: bold;
        }
      }
    }
  }
}
.btn-list {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .btn {
    width: 100rpx;
    margin-right: 30rpx;
    padding: 8rpx 20rpx;
    border: 1px solid #bbbbbb;
    text-align: center;
    border-radius: 40rpx;
    font-size: 24rpx;
  }
}

.empty {
  margin-top: 100rpx;
}
</style>
