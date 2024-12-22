<template>
  <view class="p-20">
    <u-form>
      <u-form-item>
        <button
          class="avatar-btn"
          open-type="chooseAvatar"
          @chooseavatar="chooseavatar"
        >
          <up-avatar :src="formData.avatarUrl" shape="square" size="50" />
        </button>
      </u-form-item>
      <u-form-item
        label="昵称"
        prop="formData.username"
        borderBottom
        ref="item1"
      >
        <u-input v-model="formData.username" border="none" type="nickname" />
      </u-form-item>
      <u-form-item>
        <up-button type="primary" text="确定" @click="confirm" />
      </u-form-item>
    </u-form>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import System from "@/api/system";
import type { userProfileInfo } from "@/api/system/system";
import { useUserStore } from "@/store/modules/user";

// 用户 store
const userStore = useUserStore();

const formData = ref<userProfileInfo>({
  username: userStore.$state.userInfo.username,
  avatarUrl: userStore.$state.userInfo.avatarUrl,
});

const chooseavatar = (res: { detail: { avatarUrl: string } }) => {
  console.log("获取名字: ", res);
  formData.value.avatarUrl = res.detail.avatarUrl;
};

const confirm = () => {
  console.log("获取: ", formData.value);
  System.userProfilePut(formData.value).then((res) => {
    if (res.httpCode === 200) {
      userStore.$patch((state) => {
        state.userInfo.username = formData.value.username;
        state.userInfo.avatarUrl = formData.value.avatarUrl;
      });
      uni.showToast({
        title: "修改成功",
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 300);
    }
  });
};
</script>

<style lang="scss" scoped>
.avatar-btn {
  background-color: transparent;
  border: none;
  padding: 0;
}
</style>
