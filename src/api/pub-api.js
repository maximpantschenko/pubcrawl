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
        console.log("in handler create")
        try {
          const publist = await db.publistStore.getPublistById(request.params.id);
          if(!publist){
            return Boom.notFound("No publist with this id");
          }
          const newPub = {
            name: request.payload.name,
            city: request.payload.city,
            country: request.payload.country,
            lat: request.payload.lat,
            lng: request.payload.lng,
            img: request.payload.img,
          };
          const pub = await db.pubStore.addPub(publist._id, newPub);
          if (pub) {
            return h.response(pub).code(201);
          }
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const oldPub = await db.pubStore.getPubById(request.params.pubid);
          if(!oldPub){
            return Boom.notFound("No pub with this id");
          }
          const newPub = await db.pubStore.updatePub(oldPub, request.payload);
          return newPub;
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