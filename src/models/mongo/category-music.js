import Mongoose from "mongoose";

const { Schema } = Mongoose;

const categoryMusicSchema = new Schema({
  name: String
});

export const CategoryMusic = Mongoose.model("CategoryMusic", categoryMusicSchema);