import { v4 } from "uuid";

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

    async deletePublistById(id){
        const index = publists.findIndex((publist) => publist._id === id);
        publists.splice(index, 1);
    },

    async deleteAllPlaylists(){
        publists = [];
    },
};