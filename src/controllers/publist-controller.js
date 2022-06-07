import {db} from "../models/db.js";

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
};