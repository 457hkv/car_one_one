<template>
  <view>
    <view class="px-20">
      <u-sticky>
        <u-search placeholder="请输入车型" v-model="searchValue" />
      </u-sticky>
    </view>
    <view class="context mt-20">
      <u-index-list :index-list="indexList" :sticky="false">
        <template v-for="(item, index) in indexList" :key="index">
          <!-- #ifdef APP-NVUE -->
          <u-index-anchor :text="indexList[index]" :sticky="false" />
          <!-- #endif -->
          <u-index-item :sticky="false">
            <!-- #ifndef APP-NVUE -->
            <u-index-anchor :text="indexList[index]" :sticky="false" />
            <!-- #endif -->
            <view
              class="list-cell"
              v-for="cell in dataList[index]"
              :key="index"
              @click="selectCarModel(cell)"
            >
              {{ cell.label }}
            </view>
          </u-index-item>
        </template>
      </u-index-list>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Main from "@/api/main";
import type { CarInfoOptions } from "@/api/main/main.d";
import { useCarStore } from "@/store/modules/car";

const indexList = ref<string[]>([]);
const dataList = ref<CarInfoOptions[][]>([]);

type CarObjType = {
  [prop: string]: CarInfoOptions[];
};

const carStore = useCarStore();
// 搜索文字
const searchValue = ref("");

// 是否正在加载中
const loading = ref(false);

// 原始数据
const originData = ref<CarInfoOptions[]>([]);
// 汽车品牌列表(过滤后的)
const carCategory = ref<CarObjType>({});

// 获取汽车品牌列表
const getCarList = () => {
  loading.value = true;
  Main.CarBrandOptionList()
    .then(({ data }) => {
      originData.value = data;
      filterData();
    })
    .finally(() => {
      loading.value = false;
    });
};

const getData = (data: CarObjType) => {
  const result: CarInfoOptions[][] = [];
  const index: string[] = [];
  Object.keys(data).forEach((item) => {
    index.push(item);
    result.push(data[item]);
  });
  dataList.value = result;
  indexList.value = index;
};

// 根据搜索进行过滤
const filterData = () => {
  let filterList: CarInfoOptions[] = [];
  if (!searchValue.value) {
    filterList = JSON.parse(JSON.stringify(originData.value));
  } else {
    filterList = originData.value.filter((item) => {
      return item.label.includes(searchValue.value);
    });
  }
  filterList.forEach((item) => {
    const pinyin = item.pinyin;
    if (Array.isArray(carCategory.value[pinyin])) {
      carCategory.value[pinyin].push({
        id: item.id,
        label: item.label,
        pinyin,
      });
    } else {
      carCategory.value[pinyin] = [
        {
          id: item.id,
          label: item.label,
          pinyin,
        },
      ];
    }
  });
  getData(carCategory.value);
};

// 选择品牌下的系列
const selectCarModel = (data: CarInfoOptions) => {
  console.log("data: ", data);
  carStore.setCarInfo(data);
  uni.navigateTo({
    url: `/pages/selectCarModel/index`,
  });
};

getCarList();
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
</style>
