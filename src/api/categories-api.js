import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const categoriesApi = {
  getCategoriesMusic: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const categoriesMusic = await db.categoryMusicStore.getAllCategories();
          return categoriesMusic;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  /*
  getCategoriesMusicByIds: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h){
      try{
        const categoriesMusic = await db.categoryMusicStore.getCategoriesByIds(request.payload.ids);
        return categoriesMusic;
      }catch (err){
        return Boom.serverUnavailable("Database Error");
      }
    }
  }*/
  
};