import { v4 } from "uuid";

import { JSONFile, Low } from "lowdb";
import { pubJsonStore } from "./pub-json-store.js";

const db = new Low(new JSONFile("./src/models/json/publists.json"));
db.data = { publists: [] };

export const publistJsonStore = {
    async getAllPublists(){
        await db.read();
        await db.data.publists;
    },

    async addPublist(publist){
        await db.read();
        publist._id = v4();
        db.data.publists.push(publist);
        await db.write();
        return publist;
    },

    async getPublistById(id){
        await db.read();
        const list = db.data.publists.find((publist) => publist._id === id);
        list.pubs = await pubJsonStore.getPubsByPublistId(list._id);
        return list;
    },

    async getUserPublists(userid){
        await db.read();
        return db.data.publists.filter((publist) => publist.userid === userid);
    },

    async deletePublistById(id){
        await db.read();
        const index = db.data.publists.findIndex((publist) => publist._id === id);
        db.data.publists.splice(index, 1);
        await db.write();
    },

    async deleteAllPublists(){
        db.data.publists = [];
        await db.write();
    },
};