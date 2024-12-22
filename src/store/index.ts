import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

export function setupStore(app: App<Element>) {
  app.use(pinia);
  pinia.use(piniaPluginPersistedstate);
}

export { pinia };
