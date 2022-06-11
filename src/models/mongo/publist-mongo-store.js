import { Publist } from "./publist.js";
import { pubMongoStore } from "./pub-mongo-store.js";

export const publistMongoStore = {
  async getAllPublists() {
    const publists = await Publist.find().lean();
    return publists;
  },

  async getPublistById(id) {
    if (id) {
      const publist = await Publist.findOne({ _id: id }).lean();
      if (publist) {
        publist.pubs = await pubMongoStore.getPubsByPublistId(publist._id);
      }
      return publist;
    }
    return null;
  },

  async addPublist(publist) {
    const newPublist = new Publist(publist);
    const publistObj = await newPublist.save();
    return this.getPublistById(publistObj._id);
  },

  async getUserPublists(id) {
    const publist = await Publist.find({ userid: id }).lean();
    return publist;
  },

  async deletePublistById(id) {
    try {
      await Publist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPublists() {
    await Publist.deleteMany({});
  },

  async updatePublist(updatedPublist) {
    const publist = await Publist.findOne({ _id: updatedPublist._id });
    publist.title = updatedPublist.title;
    publist.img = updatedPublist.img;
    await publist.save();
  },
};