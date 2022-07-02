//import { PubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const pubController = {
    index: {
        handler: async function (request, h) {
        //const publist = await db.publistStore.getPublistById(request.params.id);
        //const pub = await db.pubStore.getPubById(request.params.pubid);
        /*const viewData = {
            title: "Edit Pub",
            publist: publist,
            pub: pub,
        };*/
        const pubs = await db.pubStore.getAllPubs();
        console.log("pubs: ");
        console.log(pubs);
        return h.view("pubs-view", pubs);
        },
    },

    getPubs: {
      handler: async function(request, h){
          const pubs = await db.pubStore.getAllPubs();
          console.log("pubs");
          console.log(pubs);
          const viewData = {
              title: "Pubs",
              pubs: pubs,
              admin: request.auth.credentials.admin,
          };
          return h.view("pubs-view", viewData);
      },
    },

    addPub: {
      handler: async function (request, h){
          const userId = request.auth.credentials._id;
          const newPub = {
              name: request.payload.name,
              description: request.payload.description,
              city: request.payload.city,
              country: request.payload.country,
              lat: request.payload.lat,
              lng: request.payload.lng,
              img: request.payload.img,
          };
          await db.pubStore.addPub(userId, newPub);
          return h.redirect(`/pubs`);
      },
    },

    delete: {
      handler: async function(request, h){
          await db.pubStore.deletePub(request.params.pubid);
          return h.redirect(`/pubs`);
      },
    },

    edit: {
      handler: async function(request, h){
        console.log("inside edit pubcontroller");
        console.log(request.params.pubid);
        const pub = await db.pubStore.getPubById(request.params.pubid);
        const viewData = {
          title: "Edit Pub",
          pub: pub,
          admin: request.auth.credentials.admin,
        };
        return h.view("pub-edit", viewData);
      },
    },

    editImage: {
      handler: async function(request, h){
        const pub = await db.pubStore.getPubById(request.params.pubid);
        const viewData = {
          title: "Edit Image",
          pub: pub,
          admin: request.auth.credentials.admin,
        };
        return h.view("image-edit", viewData);
      },
    },

    update: {
        handler: async function (request, h){
            const newPub = {
                name: request.payload.name,
                description: request.payload.description,
                city: request.payload.city,
                country: request.payload.country,
                lat: request.payload.lat,
                lng: request.payload.lng,
                img: request.payload.img,
            };
            await db.pubStore.updatePub(request.params.pubid, newPub);
            return h.redirect(`/pubs`);
        },
    },

    uploadImage: {
        handler: async function(request, h) {
          try {
            //const publist = await db.publistStore.getPublistById(request.params.id);
            const pub = await db.pubStore.getPubById(request.params.pubid);
            const file = request.payload.imagefile;
            if (Object.keys(file).length > 0) {
              const url = await imageStore.uploadImage(request.payload.imagefile);
              pub.img = url;
              const newPub = await db.pubStore.updatePub(request.params.pubid, pub);
            }
            return h.redirect(`/pub/edit/${pub._id}`);
          } catch (err) {
            return h.redirect(`/pub/${pub._id}/image/edit`);
          }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true
        },
    },

    deleteImage: {
      handler: async function(request, h){
        const pub = await db.pubStore.getPubById(request.params.pubid);
        await imageStore.deleteImage(pub.img);
        pub.img = "";
        await db.pubStore.updatePub(request.params.pubid, pub);
        return h.redirect(`/pub/edit/${pub._id}`);
      }
    }
};