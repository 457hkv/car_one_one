<template>
  <view class="order-page-wrap bg-gray">
    <u-sticky :customNavHeight="0">
      <view class="header">
        <u-navbar
          title="订单"
          :autoBack="true"
          :fixed="false"
          bgColor="transparent"
          leftIcon=""
        />
        <view class="p-20">
          <u-search
            v-model="searchValue"
            :show-action="true"
            actionText="搜索"
            shape="square"
            :animation="true"
            bgColor="#fff"
            placeholder="请输入搜索订单名称"
          />
        </view>
        <u-tabs
          :list="menuList"
          keyName="name"
          :scrollable="false"
          @change="tabsChange"
        />
      </view>
    </u-sticky>
    <OrderCard :type="activeTabName" />
  </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import OrderCard from "./components/OrderCard.vue";
import { useLoginState } from "@/hooks/loginState";

type MenuListType = {
  key: string;
  name: string;
};

const loginState = useLoginState();
loginState.autoLogin();

const searchValue = ref("");

const activeTabName = ref("pedding");

const menuList = reactive<MenuListType[]>([
  {
    key: "pedding",
    name: "待处理",
  },
  {
    key: "doing",
    name: "进行中",
  },
  {
    key: "finish",
    name: "已完成",
  },
]);

const tabsChange = (data: MenuListType & { index: number }) => {
  activeTabName.value = data.key;
};
</script>

<style lang="scss" scoped>
.order-page-wrap {
  min-height: 100%;
  .header {
    background: linear-gradient(180deg, #d4e9ff 0%, #f3f9ff 100%);
    backdrop-filter: blur(27.18px);
    box-shadow: 0px 1px 1px 0px rgba(0, 72, 145, 0.1),
      0px 0.5px 0px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>
