import { v4 } from "uuid";

import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/pubs.json"));
db.data = { pubs: [] };

export const pubJsonStore = {
    async getAllPubs(){
        await db.read();
        return db.data.pubs;
    },

    async addPub(publistId, pub){
        await db.read();
        pub._id = v4();
        pub.publistid = publistId;
        db.data.pubs.push(pub);
        await db.write();
        return pub;
    },

    async getPubsByPublistId(id){
        await db.read();
        return db.data.pubs.filter((pub) => pub.publistid === id);
    },

    async getPubById(id){
        await db.read();
        return db.data.pubs.find((pub) => pub._id === id);
    },

    async deletePub(id){
        await db.read();
        const index = db.data.pubs.findIndex((pub) => pub._id === id);
        db.data.pubs.splice(index, 1);
        await db.write();
    },

    async deleteAllPubs(){
        db.data.pubs = [];
        await db.write();
    },

    async updatePub(pub, updatePub){
        pub.name = updatePub.name,
        pub.city = updatePub.city,
        pub.country = updatePub.country,
        pub.lat = updatePub.lat,
        pub.lng = updatePub.lng,
        await db.write();
    },
};