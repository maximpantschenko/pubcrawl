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
          };
          return h.view("pubs-view", viewData);
      },
    },

    update: {
        handler: async function (request, h){
            const newPub = {
                name: request.payload.name,
                city: request.payload.city,
                country: request.payload.country,
                lat: request.payload.lat,
                lng: request.payload.lng,
                img: request.payload.img,
            };
            await db.pubStore.updatePub(request.params.pubid, newPub);
            return h.redirect(`/publist/${request.params.id}`);
        },
    },

    uploadImage: {
        handler: async function(request, h) {
          try {
            const publist = await db.publistStore.getPublistById(request.params.id);
            const pub = await db.pubStore.getPubById(request.params.pubid);
            const file = request.payload.imagefile;
            console.log("upload image pub controller");
            console.log(request.payload.imagefile);
            if (Object.keys(file).length > 0) {
              const url = await imageStore.uploadImage(request.payload.imagefile);
              pub.img = url;
              db.pubStore.updatePub(request.params.pubid, pub);
            }
            return h.redirect(`/publist/${publist._id}`);
          } catch (err) {
            console.log(err);
            return h.redirect(`/publist/${publist._id}`);
          }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true
        },
    },
};