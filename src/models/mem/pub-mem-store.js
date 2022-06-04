import { v4 } from "uuid";

let pubs = [];

export const pubMemStore = {
    async getAllPubs(){
        return pubs;
    },

    async addPub(publistId, pub){
        pub._id = v4();
        pub.publistid = publistId;
        pubs.push(pub);
        return pub;
    },

    async getPubsByPublistId(id){
        return pubs.filter((pub) => pub.publistid === id);
    },

    async getPubById(id){
        return pubs.find((pub) => pub._id === id);
    },

    async getPublistPubs(publistId){
        return pubs.filter((pub) => pub.publistid === publistId);
    },

    async deletePub(id){
        const index = pubs.findIndex((pub) => pub._id === id);
        pubs.splice(index, 1);
    },

    async deleteAllPubs(){
        pubs = [];
    },

    async updatePub(pub, updatedPub){
        pub.name = updatedPub.name;
        pub.city = updatedPub.city;
        pub.country = updatedPub.country;
    },
};