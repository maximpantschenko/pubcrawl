import {db} from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const publistController = {
    index: {
        handler: async function(request, h){
            const publist = await db.publistStore.getPublistById(request.params.id);
            const viewData = {
                title: "Publist",
                publist: publist,
            };
            return h.view("publist-view", viewData);
        },
    },

    addPub: {
        handler: async function (request, h){
            const publist = await db.publistStore.getPublistById(request.params.id);
            const newPub = {
                name: request.payload.name,
                city: request.payload.city,
                country: request.payload.country,
                lat: request.payload.lat,
                lng: request.payload.lng,
                img: request.payload.img,
            };
            await db.pubStore.addPub(publist._id, newPub);
            return h.redirect(`/publist/${publist._id}`);
        },
    },

    deletePub: {
        handler: async function(request, h){
            const publist = await db.publistStore.getPublistById(request.params.id);
            await db.pubStore.deletePub(request.params.pubid);
            return h.redirect(`/publist/${publist._id}`);
        },
    },

    uploadImage: {
        handler: async function(request, h) {
          try {
            const publist = await db.publistStore.getPublistById(request.params.id);
            const file = request.payload.imagefile;
            if (Object.keys(file).length > 0) {
              const url = await imageStore.uploadImage(request.payload.imagefile);
              publist.img = url;
              db.publistStore.updatePublist(publist);
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