import { createSSRApp } from "vue";
import * as Pinia from "pinia";
import App from "./App.vue";
import { setupStore } from "@/store";
import uviewPlus from "uview-plus";

export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);
  // 挂载 pinia
  setupStore(app);
  return {
    app,
    Pinia,
  };
}
