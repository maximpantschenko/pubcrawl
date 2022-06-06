import { userMemStore } from "./mem/user-mem-store.js";
import { publistMemStore } from "./mem/publist-mem-store.js";
import { pubMemStore } from "./mem/pub-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { publistJsonStore } from "./json/publist-json-store.js";
import { pubJsonStore } from "./json/pub-json-store.js";

export const db = {
  userStore: null,
  publistStore: null,
  pubStore: null,

  init() {
    this.userStore = userJsonStore;
    this.publistStore = publistJsonStore;
    this.pubStore = pubJsonStore;
  },
};