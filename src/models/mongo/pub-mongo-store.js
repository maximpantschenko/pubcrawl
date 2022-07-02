import { Pub } from "./pub.js";
import { categoryMusicMongoStore } from "./category-music-mongo-store.js";
import { db } from "../db.js";

export const pubMongoStore = {
  async getAllPubs() {
    const pubs = await Pub.find().lean();
    return pubs;
  },

  async countPubs(){
    const numberPubs = await Pub.countDocuments({});
    return numberPubs;
  },

  async addPub(userId, pub) {
    pub.userid = userId;
    const newPub = new Pub(pub);
    const pubObj = await newPub.save();
    return this.getPubById(pubObj._id);
  },

  async getPubsByUserId(id){
    const pubs = await Pub.find( { userid: {$in: id } } );
    return pubs;
  },
  
  async getPubsByName(string){
    const pubs = await Pub.find({name : {$regex : string, $options : 'i'}});
    return pubs;
  },

  async getPubsByCity(string){
    const pubs = await Pub.find({city : {$regex : string, $options : 'i'}});
    return pubs;
  },

  async getPubsByCountry(string){
    const pubs = await Pub.find({country : {$regex : string, $options : 'i'}});
    return pubs;
  },

  async getPubsByNameCityCountry(name,city,country){
    const pubs = await Pub.find(
      {$and:[
        {name : {$regex : name, $options : 'i'}},
        {city : {$regex : city, $options : 'i'}},
        {country : {$regex : country, $options : 'i'}}
    ]}
    );
    return pubs;
  },

  async getPubById(id) {
    if (id) {
      const pub = await Pub.findOne({ _id: id }).lean();
      const categoriesMusic = await categoryMusicMongoStore.getCategoriesByIds(pub.categoriesMusic);
      pub.categoriesMusic = categoriesMusic;
      return pub;
    }
    return null;
  },

  async deletePub(id) {
    try {
      await Pub.deleteOne({ _id: id });
    } catch (error) {
    }
  },

  async deleteAllPubs() {
    await Pub.deleteMany({});
  },

  /*
  async deleteImage(pubid, image){
    try{
      await Pub.updateOne( { _id: pubid }, { $pull: { images: image } } );
      return true;
    } catch(error){
      return false;
    }
  },
  */

  async updatePub(pubid, updatedPub) {
    const pub = await Pub.findOne({ _id: pubid });
    pub.name = updatedPub.name;
    pub.city = updatedPub.city;
    pub.country = updatedPub.country;
    pub.lat = updatedPub.lat;
    pub.lng = updatedPub.lng;
    pub.img = updatedPub.img;
    pub.images = updatedPub.images;
    pub.categoriesMusic = updatedPub.categoriesMusic;
    await pub.save();
    return pub;
  },
};