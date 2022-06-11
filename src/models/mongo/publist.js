import Mongoose from "mongoose";

const { Schema } = Mongoose;

const publistSchema = new Schema({
  title: String,
  img: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Publist = Mongoose.model("Publist", publistSchema);