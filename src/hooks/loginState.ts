import { useUserStore } from "@/store/modules/user";
import { computed } from "vue";
const useLoginState = () => {
  const userStore = useUserStore();
  const token = computed(() => {
    return userStore.$state.loginData.token;
  });
  const autoLogin = () => {
    if (!token.value) {
      uni.navigateTo({
        url: "/pages/login/index",
      });
    }
  };
  return {
    token,
    autoLogin,
  };
};

export { useLoginState };
