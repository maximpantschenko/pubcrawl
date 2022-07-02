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
          console.log(err);
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  findWithUserDetail: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const pubs = await db.pubStore.getAllPubs();
          const newPubs = [];
          //pubs.forEach(function(pub){ delete pub.userid});
          for(let i=0; i<pubs.length; i++){
            const user = await db.userStore.getUserById(pubs[i].userid);
            console.log("inside foreach pubs user details");
            console.log(user);
            if(user != null){
              newPubs.push({
                _id: pubs[i]._id,
                name: pubs[i].name,
                city: pubs[i].city,
                country: pubs[i].country,
                description: pubs[i].description,
                lat: pubs[i].lat,
                lng: pubs[i].lng,
                img: pubs[i].img,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              });
            }else{
              newPubs.push({
                _id: pubs[i]._id,
                name: pubs[i].name,
                city: pubs[i].city,
                country: pubs[i].country,
                description: pubs[i].description,
                lat: pubs[i].lat,
                lng: pubs[i].lng,
                img: pubs[i].img,
                firstName: "Anonymous",
                lastName: "",
                email: "Anonymous",
              });
            }
          }
          return newPubs;
        } catch (err) {
          console.log(err);
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
          console.log(err);
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
          console.log(err);
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
          console.log(err);
          return Boom.serverUnavailable("No pub with this id");
        }
      },
  },

  searchName: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const pubs = await db.pubStore.getPubsByString(request.params.string);
          pubs.forEach(function(pub){ delete pub.userid});
          return pubs;
        } catch (err) {
          console.log(err);
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  search: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const array = request.params.string.split("&");
          console.log(array);
          const sendArray = ["","",""];
          for(var i=0; i<array.length; i++){
            sendArray[i] = array[i];
          }
          //sendArray[0] is Name
          //sendArray[1] is City
          //sendArray[2] is Country
          const pubs = await db.pubStore.getPubsByNameCityCountry(sendArray[0], sendArray[1], sendArray[2]);
          console.log("pubs:");
          console.log(pubs);
          return pubs;
        } catch (err) {
          console.log(err);
          return Boom.serverUnavailable("Database Error");
        }
      },
  },


  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          console.log("inside create ##########################################")
          console.log(request.auth.credentials._id);
          const userId = request.auth.credentials._id;
          const newPub = {
            name: request.payload.name,
            description: request.payload.description,
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
            description: request.payload.description,
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