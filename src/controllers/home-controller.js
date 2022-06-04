import { db } from "../models/db.js";

export const homeController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const publists = await db.publistStore.getUserPublists(loggedInUser._id);
      const viewData = {
        title: "PubCrawl Home",
        user: loggedInUser,
        publists: publists,
      };
      return h.view("home-view", viewData);
    },
  },

  addPublist: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPublist = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.publistStore.addPublist(newPublist);
      return h.redirect("/home");
    },
  },
};