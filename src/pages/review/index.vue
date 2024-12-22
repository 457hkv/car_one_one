<template>
  <view class="bg-gray p-20">
    <view class="p-20 bg-white border-radius-20">
      <u-form
        labelPosition="top"
        :model="formData"
        ref="form"
        labelWidth="150rpx"
      >
        <u-form-item label="项目名称" borderBottom ref="item1">
          <u-input v-model="formData.name" border="none" />
        </u-form-item>
        <u-form-item label="订单号" borderBottom ref="item1">
          <u-input v-model="formData.orderId" border="none" />
        </u-form-item>
        <u-form-item label="评分" borderBottom ref="item1">
          <u-rate v-model="formData.rate" :count="5" />
        </u-form-item>
        <u-form-item label="评价内容" ref="item1">
          <u-textarea
            v-model="formData.content"
            placeholder="请输入内容"
            :height="120"
          ></u-textarea>
        </u-form-item>
        <u-form-item>
          <u-button type="primary">提交评价</u-button>
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const formData = ref({
  name: "车载360倒车影像",
  orderId: "129748912731793",
  rate: 5,
  content: "",
});
</script>

<style lang="scss" scoped></style>
