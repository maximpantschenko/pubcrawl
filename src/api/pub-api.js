import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const pubApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const pubs = await db.pubStore.getAllPubs();
          pubs.forEach(function(pub){ delete pub.userid});
          return pubs;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  findByUserId : {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const pubs = await db.pubStore.getPubsByUserId(request.params.id);
          return pubs;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  findByCurrentUserId : {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const userId = request.auth.credentials._id;
          const pubs = await db.pubStore.getPubsByUserId(userId);
          pubs.forEach(function(pub){ delete pub.userid});
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
          if(pub.userid.equals(request.auth.credentials._id)){
            pub.canEdit = true;
          }else {
            pub.canEdit = false;
          }
          delete pub.userid;
          if (!pub) {
            return Boom.notFound("No pub with this id");
          }
          console.log("*****************");
          console.log(pub);
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
          //const publist = await db.publistStore.getPublistById(request.params.id);
          //if(!publist){
          //  return Boom.notFound("No publist with this id");
          //}
          console.log("inside create ##########################################")
          console.log(request.auth.credentials._id);
          const userId = request.auth.credentials._id;
          const newPub = {
            name: request.payload.name,
            city: request.payload.city,
            country: request.payload.country,
            lat: request.payload.lat,
            lng: request.payload.lng,
            img: request.payload.img,
            categoriesMusic: request.payload.categoriesMusic,
          };
          if(request.payload.file!=null){
            const file = request.payload.file;
            if(Object.keys(file).length > 0){
              const url = await imageStore.uploadImage(request.payload.file);
              newPub.img = url;
            }
          }
          const pub = await db.pubStore.addPub(userId, newPub);
          if (pub) {
            return h.response(pub).code(201);
          }
        } catch (err) {
          console.log(err);
          return Boom.serverUnavailable("Database Error");
        }
      },
      payload: {
        multipart: true,
        output: "data",
        maxBytes: 209715200,
        parse: true
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
          const newPub = {
            name: request.payload.name,
            city: request.payload.city,
            country: request.payload.country,
            lat: request.payload.lat,
            lng: request.payload.lng,
            img: request.payload.img,
            categoriesMusic: request.payload.categoriesMusic,
          };
          if(request.payload.file!=null){
            const file = request.payload.file;
            if(Object.keys(file).length > 0){
              const url = await imageStore.uploadImage(request.payload.file);
              newPub.img = url;
            }
          }
          const updatedPub = await db.pubStore.updatePub(oldPub, newPub);
          return updatedPub;
        } catch (err) {
          console.log(err);
          return Boom.serverUnavailable("Database Error");
        }
      },
      payload: {
        multipart: true,
        output: "data",
        maxBytes: 209715200,
        parse: true
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


  /*
  userCanEdit: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
        try {
          const pub = await db.pubStore.getPubById(request.params.id);
          const userId = request.auth.credentials._id;
          if (!pub) {
            return Boom.notFound("No pub with this id");
          }
          if(pub._id == userId){
            return true;
          }else{
            return false;
          }
        } catch (err) {
          return Boom.serverUnavailable("No pub with this id");
        }
      },
  },
  */
};