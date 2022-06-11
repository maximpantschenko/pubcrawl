//import { PubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const pubController = {
  index: {
    handler: async function (request, h) {
      const publist = await db.publistStore.getPublistById(request.params.id);
      const pub = await db.pubStore.getPubById(request.params.pubid);
      const viewData = {
        title: "Edit Pub",
        publist: publist,
        pub: pub,
      };
      return h.view("pub-view", viewData);
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
};