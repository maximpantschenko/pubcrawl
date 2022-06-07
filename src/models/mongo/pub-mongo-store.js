import { Pub } from "./pub.js";

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
      const pub = await Pub.findOne({ _id: id }).lean();
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

  async updateTpub(pub, updatedPub) {
    pub.title = updatedPub.title;
    pub.artist = updatedPub.artist;
    pub.duration = updatedPub.duration;
    await pub.save();
  },
};