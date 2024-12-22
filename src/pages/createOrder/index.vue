<template>
  <view class="bg-gray p-20 page-wrap">
    <view class="form">
      <u-form labelPosition="left" :model="formData" ref="formRef">
        <view class="bg-white p-20 border-radius-10">
          <view class="title-box">
            <text class="title-text">车主信息</text>
          </view>
          <up-form-item label="姓名" borderBottom>
            <up-input
              v-model="formData.carOwnerName"
              border="none"
              placeholder="请输入姓名"
            />
          </up-form-item>
          <up-form-item label="电话" borderBottom>
            <up-input
              v-model="formData.carOwnerPhoneNumber"
              border="none"
              placeholder="请输入电话"
              type="number"
            />
          </up-form-item>
          <up-form-item label="地址" borderBottom>
            <view @click="selectLocation">
              <up-input
                v-model="formData.carOwnerMultiLvAddr"
                border="none"
                placeholder="请选择地址"
                suffixIcon="map"
                :readonly="true"
              />
            </view>
          </up-form-item>
          <up-form-item borderBottom>
            <u-textarea
              v-model="formData.carOwnerFullAddress"
              border="none"
              placeholder="请输入详情地址信息"
            />
          </up-form-item>
          <view class="mt-20">
            <up-button
              type="primary"
              text="查看附近门店"
              :plain="true"
              @click="getNearbyShop"
            />
          </view>
        </view>
        <view class="p-20 bg-white mt-20 border-radius-10">
          <view class="title-box">
            <text class="title-text">车辆信息</text>
            <up-button
              type="primary"
              size="mini"
              :customStyle="{
                width: '150rpx',
                margin: 0,
                fontSize: '28rpx',
                height: '65rpx',
              }"
              @click="navTo('/pages/selectCar/index')"
            >
              选择车辆
            </up-button>
          </view>
          <text class="car-info-text">
            {{ carStore.$state.carBrandInfo?.label || "请添加车辆" }}
          </text>
        </view>

        <view class="p-20 bg-white mt-20 border-radius-10">
          <view class="title-box">
            <text class="title-text">安装产品</text>
            <up-button
              type="primary"
              size="mini"
              :customStyle="{
                width: '150rpx',
                margin: 0,
                fontSize: '28rpx',
                height: '65rpx',
              }"
              @click="selectProduct"
            >
              选择产品
            </up-button>
          </view>
          <view class="pro-list">
            <view class="null" v-if="formData.carReplacements.length === 0">
              请选择产品
            </view>
            <template v-else>
              <view
                class="pro-item"
                v-for="(item, index) in formData.carReplacements"
                :key="item.id"
              >
                <text class="pro-name">{{ item.title }}</text>
                <view class="pro-btn">
                  <up-button
                    type="error"
                    size="mini"
                    style="width: 100rpx"
                    @click="delProduct(index)"
                  >
                    删除
                  </up-button>
                </view>
              </view>
            </template>
          </view>
        </view>

        <view class="p-20 bg-white mt-20 border-radius-10">
          <view class="title-box">
            <text class="title-text">其它信息</text>
          </view>
          <up-form-item borderBottom>
            <u-textarea
              v-model="formData.requirements"
              border="none"
              placeholder="请输入备注信息"
            />
          </up-form-item>

          <up-form-item>
            <view class="d-flex align-items-center">
              <u-checkbox-group v-model="formData.agreeToTerms">
                <u-checkbox :name="1" />
              </u-checkbox-group>

              <up-text class="flex-none" :block="true" text="我已阅读并同意" />
              <up-text
                class="flex-none"
                :block="true"
                text="《合作协议》"
                type="primary"
                @click="navTo('/pages/serviceAgreement/index')"
              />
            </view>
          </up-form-item>
        </view>
      </u-form>
    </view>

    <view class="price-container">
      <view class="con-left"> 预估服务费: ¥ {{ price }} </view>
      <view class="submit" @click="confirm">发布订单</view>
    </view>
    <StoreTable
      v-if="showStore"
      v-model:show="showStore"
      :carOwnerMultiLvAddr="formData.carOwnerMultiLvAddr"
      :carOwnerFullAddress="formData.carOwnerFullAddress"
    />
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Main from "@/api/main";
import type { PartnerStoreListOut, UserOrderIn } from "@/api/main/main";
import { useCarStore } from "@/store/modules/car";
import StoreTable from "./components/StoreTable.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import type { CarReplacementListOut } from "@/api/main/main.d";

const carStore = useCarStore();
const citydate = ref([]);
const showStore = ref(false);

// 订单id
const orderId = ref(0);

const price = ref(0);

onLoad((data) => {
  orderId.value = Number(data?.id) || 0;
  getOrderDetail();
});

const formData = ref<UserOrderIn>({
  carOwnerName: "",
  carOwnerPhoneNumber: "",
  carOwnerMultiLvAddr: "",
  carOwnerFullAddress: "",
  agreeToTerms: [0],
  requirements: "",
  carBrandId: 0,
  carSeriesId: 0,
  carOwnerLongitude: 0,
  carOwnerLatitude: 0,
  carReplacements: [],
});

watch(citydate, (nVal) => {
  formData.value.carOwnerMultiLvAddr = nVal.join("-");
  formData.value.carOwnerFullAddress = "";
});

onShow(() => {
  uni.$once("select_product", (data: CarReplacementListOut) => {
    if (!data) return;
    if (!Array.isArray(formData.value.carReplacements)) {
      formData.value.carReplacements = [];
    }
    if (
      formData.value.carReplacements.map((item) => item.id)?.includes(data.id)
    ) {
      uni.showToast({
        title: `请勿重复选择`,
      });
      return;
    }
    formData.value.carReplacements.push(data);
    uni.$off("select_product");
    getPrice();
  });
});

const carInfoId = computed(() => {
  return carStore.$state.carInfo?.id || 0;
});

const carBrandInfoId = computed(() => {
  return carStore.$state.carBrandInfo?.id || 0;
});

const navTo = (url: string) => {
  uni.navigateTo({
    url,
  });
};

// 把位置拆分成数组
/*自动拆分省市区*/
function splitAddress(address: string) {
  var reg = /.+?(省|市|自治区|自治州|县|区)/g;
  return address.match(reg) || [];
}

const selectLocation = () => {
  uni.chooseLocation().then((res) => {
    const addressArr = splitAddress(res.address);
    formData.value.carOwnerMultiLvAddr = addressArr.join("-");
    formData.value.carOwnerFullAddress = res.address.replace(
      addressArr.join(""),
      ""
    );
  });
};

// 查看附近门店
const getNearbyShop = async () => {
  if (!formData.value.carOwnerMultiLvAddr) {
    uni.showToast({
      title: "请先选择地址",
      icon: "none",
    });
    return;
  }
  showStore.value = true;
};

const showErrorText = (text: string) => {
  uni.showToast({
    title: text,
    icon: "error",
  });
};

const confirm = async () => {
  let agreeToTerms = 0;
  if (Array.isArray(formData.value.agreeToTerms)) {
    agreeToTerms = formData.value.agreeToTerms[0] || 0;
  }

  console.log("agreeToTerms: ", formData.value.agreeToTerms);

  if (!formData.value.carOwnerName) {
    showErrorText("请输入姓名");
    return;
  }
  if (!formData.value.carOwnerPhoneNumber) {
    showErrorText("请输入手机号");
    return;
  }

  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (!reg.test(formData.value.carOwnerPhoneNumber)) {
    showErrorText("手机号不正确");
    return;
  }

  if (!formData.value.carOwnerMultiLvAddr) {
    showErrorText("请选择地址");
    return;
  }
  if (!formData.value.carOwnerFullAddress) {
    showErrorText("请输入纤细地址");
    return;
  }
  if (!formData.value.agreeToTerms) {
    showErrorText("需同意合作协议");
    return;
  }

  if (!carInfoId.value || !carBrandInfoId.value) {
    showErrorText("请先选择汽车");
    return;
  }

  if (!formData.value.carReplacements.length) {
    showErrorText("请选择产品");
    return;
  }

  formData.value.carBrandId = carInfoId.value;
  formData.value.carSeriesId = carBrandInfoId.value;
  if (orderId.value) {
    // 调用修改订单接口
    const data = await Main.userOrderPut({
      ...formData.value,
      agreeToTerms: agreeToTerms ? 1 : 0,
    });
  } else {
    // 调用新增订单接口
    const data = await Main.userOrder({
      ...formData.value,
      agreeToTerms: agreeToTerms ? 1 : 0,
    });
  }

  uni.showToast({
    title: `${orderId.value ? "修改" : "发起"}订单成功!`,
  });
  uni.switchTab({
    url: "/pages/order/index",
  });
};

const getOrderDetail = async () => {
  if (!orderId.value) return;
  const { data } = await Main.userOrderGet(orderId.value);
  formData.value = {
    ...data,
    agreeToTerms: [1],
    carOwnerLongitude: 0,
    carOwnerLatitude: 0,
  };
  // 获取价格
  getPrice();
};

const selectProduct = () => {
  if (!carInfoId.value || !carBrandInfoId.value) {
    showErrorText("请先选择汽车");
    return;
  }
  navTo("/pages/selectProduct/index");
};

// 删除产品
const delProduct = (index: number) => {
  formData.value.carReplacements.splice(index, 1);
};

// 获取价格
const getPrice = () => {
  if (!carBrandInfoId.value || !formData.value.carReplacements.length) return;
  Main.carReplacementComputePrice({
    carSeriesId: carBrandInfoId.value,
    carReplacementIds: formData.value.carReplacements.map((item) => item.id),
  }).then((res) => {
    price.value = res.data.floatPrice;
  });
};

// 初始化
const init = () => {
  // 把之前选的车辆信息清空
  carStore.setCarInfo(null);
  carStore.setCarBrandInfo(null);
};
init();
</script>

<style lang="scss" scoped>
.page-wrap {
  position: relative;
  .form {
    margin-bottom: 120rpx;
  }
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 10px;
    .title-text {
      color: #333;
      font-weight: bold;
      font-size: 28rpx;
    }
  }
  .car-info-text {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    padding: 20rpx 0;
  }
  .pro-list {
    .null {
      @extend .car-info-text;
    }
    .pro-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;
      margin-top: 20rpx;
      .pro-name {
        color: #333;
      }
      .pro-btn {
        width: 100rpx;
      }
    }
  }
  .price-container {
    z-index: 999;
    height: 120rpx;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
    color: #fff;
    .con-left {
      flex: 1;
      margin-left: 20rpx;
    }
    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 20rpx;
      background-color: $uni-color-primary;
      color: #333;
    }
  }
}
</style>
