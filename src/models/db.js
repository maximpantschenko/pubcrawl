import { userMemStore } from "./mem/user-mem-store.js";
import { publistMemStore } from "./mem/publist-mem-store.js";

export const db = {
  userStore: null,
  publistStore: null,

  init() {
    this.userStore = userMemStore;
    this.publistStore = publistMemStore;
  },
};