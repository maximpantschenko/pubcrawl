import { v4 } from "uuid";
import { pubMemStore } from "./pub-mem-store.js";

let publists = [];

export const publistMemStore = {
    async getAllPublists(){
        return publists;
    },

    async addPublist(publist){
        publist._id = v4();
        publists.push(publist);
        return publist;
    },

    async getPublist(id){
        return publist.find((publist) => publist._id === id);
    },

    async getPublistById(id){
        const list = publists.find((publist) => publist._id === id);
        list.pubs = await pubMemStore.getPubsByPublistId(list._id);
        return list;
    },

    async deletePublistById(id){
        const index = publists.findIndex((publist) => publist._id === id);
        publists.splice(index, 1);
    },

    async deleteAllPlaylists(){
        publists = [];
    },
};