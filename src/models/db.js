import { userMemStore } from "./mem/user-mem-store.js";
import { publistMemStore } from "./mem/publist-mem-store.js";
import { pubMemStore } from "./mem/pub-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { publistJsonStore } from "./json/publist-json-store.js";
import { pubJsonStore } from "./json/pub-json-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { pubMongoStore } from "./mongo/pub-mongo-store.js";
import { categoryMusicMongoStore } from "./mongo/category-music-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { commentMongoStore } from "./mongo/comment-mongo-store.js";

export const db = {
  userStore: null,
  publistStore: null,
  pubStore: null,
  categoryMusicStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.publistStore = publistJsonStore;
        this.pubStore = pubJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.pubStore = pubMongoStore;
        this.categoryMusicStore = categoryMusicMongoStore;
        this.commentStore = commentMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.publistStore = publistMemStore;
        this.pubStore = pubMemStore;
    }
  },
};