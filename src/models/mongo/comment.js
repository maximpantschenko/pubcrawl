import Mongoose from "mongoose";

const { Schema } = Mongoose;

const commentSchema = new Schema({
  text: String,
  likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
  }],
  date: { type: Date, default: Date.now },
  pubid: {
    type: Schema.Types.ObjectId,
    ref: "Pub",
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Comment = Mongoose.model("Comment", commentSchema);