import { db } from "../models/db.js";

export const discoverController = {
    index: {
        handler: async function(request, h){
            const publist = await db.pubStore.getAllPubs();
            console.log(publist);
            const viewData = {
                title: "Publist",
                publist: publist,
                admin: request.auth.credentials.admin,
            };
            return h.view("discover-view", viewData);
        },
    }
};