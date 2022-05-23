import { userMemStore } from "./mem/user-mem-store.js";
import { publistMemStore } from "./mem/publist-mem-store.js";
import { pubMemStore } from "./mem/pub-mem-store.js";

export const db = {
  userStore: null,
  publistStore: null,
  pubStore: null,

  init() {
    this.userStore = userMemStore;
    this.publistStore = publistMemStore;
    this.pubStore = pubMemStore;
  },
};