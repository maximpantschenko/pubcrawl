import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pubSchema = new Schema({
  name: String,
  description: String,
  city: String,
  country: String,
  lat: String,
  lng: String,
  img: String,
  images: [String],
  categoriesMusic: [{
    type: Schema.Types.ObjectId,
    ref: "CategoryMusic",
  }],
  publistid: {
    type: Schema.Types.ObjectId,
    ref: "Publist",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Pub = Mongoose.model("Pub", pubSchema);