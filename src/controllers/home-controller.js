import { db } from "../models/db.js";

export const homeController = {
  index: {
    handler: async function (request, h) {
      const publists = await db.publistStore.getAllPublists();
      const viewData = {
        title: "Publist Home",
        publists: publists,
      };
      return h.view("home-view", viewData);
    },
  },

  addPublist: {
    handler: async function (request, h) {
      const newPublist = {
        title: request.payload.title,
      };
      await db.publistStore.addPublist(newPublist);
      return h.redirect("/home");
    },
  },
};