import Mongoose from "mongoose";

const { Schema } = Mongoose;

const pubSchema = new Schema({
  name: String,
  city: String,
  country: String,
  lat: String,
  lng: String,
  img: String,
  publistid: {
    type: Schema.Types.ObjectId,
    ref: "Publist",
  },
});

export const Pub = Mongoose.model("Pub", pubSchema);