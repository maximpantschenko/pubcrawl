import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const pubApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const pubs = await db.pubStore.getAllPubs();
          return pubs;
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
          const pub = await db.pubStore.getPubById(request.params.id);
          if (!pub) {
            return Boom.notFound("No pub with this id");
          }
          return pub;
        } catch (err) {
          return Boom.serverUnavailable("No pub with this id");
        }
      },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const pub = await db.pubStore.addPub(request.params.id, request.payload);
          if (pub) {
            return h.response(pub).code(201);
          }
          return Boom.badImplementation("error creating pub");
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          await db.pubStore.deleteAllPubs();
          return h.response().code(204);
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
          const pub = await db.pubStore.getPubById(request.params.id);
          if (!pub) {
            return Boom.notFound("No Pub with this id");
          }
          await db.pubStore.deletePub(pub._id);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("No Pub with this id");
        }
      },
  },
};