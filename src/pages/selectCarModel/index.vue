<template>
  <view>
    <u-list>
      <u-list-item v-for="item in carList" :key="item.id">
        <u-cell :title="item.label" @click="selectCar(item)" />
      </u-list-item>
    </u-list>
  </view>
</template>

<script lang="ts" setup>
import Main from "@/api/main";
import type { CarInfoOptions } from "@/api/main/main.d";
import { onLoad } from "@dcloudio/uni-app";
import { ref, computed } from "vue";
import { useCarStore } from "@/store/modules/car";

const carStore = useCarStore();
const carId = computed(() => {
  return carStore.$state.carInfo?.id;
});

const carList = ref<CarInfoOptions[]>([]);

const getCarList = async (id?: number) => {
  if (!id) return;
  const data = await Main.CarBrandSeriesOptionList({
    brandId: id,
  });
  carList.value = data.data || [];
};

const selectCar = (data: CarInfoOptions) => {
  carStore.setCarBrandInfo(data);
  uni.navigateBack({
    delta: 2,
  });
};

onLoad((options) => {
  getCarList(carId.value);
});
</script>

<style lang="scss" scoped>
.car-item {
  padding: 20rpx;
  background-color: #fff;
  border-bottom: 1px solid #f1f1f1;
}
</style>
