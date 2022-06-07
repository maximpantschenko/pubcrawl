import { userMemStore } from "./mem/user-mem-store.js";
import { publistMemStore } from "./mem/publist-mem-store.js";
import { pubMemStore } from "./mem/pub-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { publistJsonStore } from "./json/publist-json-store.js";
import { pubJsonStore } from "./json/pub-json-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { publistMongoStore } from "./mongo/publist-mongo-store.js";
import { pubMongoStore } from "./mongo/pub-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  publistStore: null,
  pubStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.publistStore = publistJsonStore;
        this.pubStore = pubJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.publistStore = publistMongoStore;
        this.pubStore = pubMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.publistStore = publistMemStore;
        this.pubStore = pubMemStore;
    }
  },
};