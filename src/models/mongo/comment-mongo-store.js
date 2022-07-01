import { Comment } from "./comment.js";

export const commentMongoStore = {
  async getAllComments() {
    const comments = await Comment.find().lean();
    return comments;
  },

  async addComment(comment) {
    console.log("inside comment store addComment");
    const newComment = new Comment(comment);
    const commentObj = await newComment.save();
    console.log(commentObj);
    return this.getCommentById(commentObj._id);
  },

  async getCommentById(id) {
    console.log("inside getCommentById");
    if (id) {
        console.log("id true");
      const comment = await Comment.findOne({ _id: id }).lean();
      return comment;
    }
    return null;
  },

  async getCommentByIds(ids){
    console.log("comment music store");
    console.log(ids);
    if(ids){
      const comments = await Comment.find( { _id: { $in: ids } } );
      return comments;
    }
    return null;
  },

  async getCommentsByUserId(id){
    if(id){
        const comments = await Comment.find( { userid: { $in: id } } );
        return comments;
    }
    return null;
  },

  async getCommentsByPubId(id){
    if(id){
        const comments = await Comment.find( { pubid: { $in: id } } );
        return comments;
    }
    return null;
  },

  async deleteComment(id) {
    try {
      await Comment.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllComments() {
    await Comment.deleteMany({});
  },

  async updateComment(commentId, updatedComment) {
    const comment = await Comment.findOne({ _id: commentId });
    comment.text = updatedComment.text;
    comment.date = updatedComment.date;
    comment.likes = updatedComment.likes;
    comment.pub = updatedComment.pub;
    comment.user = updatedComment.user;
    await comment.save();
    return comment;
  },
};