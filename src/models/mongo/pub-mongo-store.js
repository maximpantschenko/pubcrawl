import { Pub } from "./pub.js";
import { Publist } from "./publist.js";
import { categoryMusicMongoStore } from "./category-music-mongo-store.js";

export const pubMongoStore = {
  async getAllPubs() {
    const pubs = await Pub.find().lean();
    return pubs;
  },

  async addPub(publistId, pub) {
    pub.publistid = publistId;
    const newPub = new Pub(pub);
    const pubObj = await newPub.save();
    return this.getPubById(pubObj._id);
  },

  async getPubsByPublistId(id) {
    const pubs = await Pub.find({ publistid: id }).lean();
    return pubs;
  },

  async getPubById(id) {
    if (id) {
      console.log("inside pub store getPubById");
      const pub = await Pub.findOne({ _id: id }).lean();
      console.log("getPubById");
      //console.log(pub.categoriesMusic[0]._id);
      const categoriesMusic = await categoryMusicMongoStore.getCategoriesByIds(pub.categoriesMusic);
      console.log("getPubById in pub mongo store");
      //console.log(categoriesMusic);
      pub.categoriesMusic = categoriesMusic;
      return pub;
    }
    return null;
  },

  async deletePub(id) {
    try {
      await Pub.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPubs() {
    await Pub.deleteMany({});
  },

  async updatePub(pubid, updatedPub) {
    const pub = await Pub.findOne({ _id: pubid });
    pub.name = updatedPub.name;
    pub.city = updatedPub.city;
    pub.country = updatedPub.country;
    pub.lat = updatedPub.lat;
    pub.lng = updatedPub.lng;
    pub.img = updatedPub.img;
    pub.categoriesMusic = updatedPub.categoriesMusic;
    await pub.save();
    return pub;
  },
};