import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const publistApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const publists = await db.publistStore.getAllPublists();
          return publists;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
        try {
          const publist = await db.publistStore.getPublistById(request.params.id);
          if (!publist) {
            return Boom.notFound("No Publist with this id");
          }
          return publist;
        } catch (err) {
          return Boom.serverUnavailable("No Publist with this id");
        }
      },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const publist = request.payload;
          const newPublist = await db.publistStore.addPublist(publist);
          if (newPublist) {
            return h.response(newPublist).code(201);
          }
          return Boom.badImplementation("error creating publist");
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const publist = await db.publistStore.getPublistById(request.params.id);
          if (!publist) {
            return Boom.notFound("No Publist with this id");
          }
          await db.publistStore.deletePublistById(publist._id);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("No Publist with this id");
        }
      },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          await db.publistStore.deleteAllPublists();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },
};