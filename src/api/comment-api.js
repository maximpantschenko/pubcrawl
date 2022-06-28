import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const commentApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const comments = await db.commentStore.getAllComments();
          const newComments = [];
          for(let i=0; i<comments.length; i++){
            const comment = comments[i];
            const userDetails = await db.userStore.getUserById(comment.userid);
            const newComment = {
                _id: comment._id,
                text: comment.text,
                likes: comment.likes,
                pubid: comment.pubid,
                date: comment.date,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
            };
            if(comment.userid.equals(request.auth.credentials._id)){
                newComment.canEdit = true;
            }else {
                newComment.canEdit = false;
            }
            newComments.push(newComment);
          }
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  findByPubId: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
        try {
          console.log("inside pub api find by pub id");
          const comments = await db.commentStore.getCommentsByPubId(request.params.id);
          const newComments = [];
          for(let i=0; i<comments.length; i++){
            const comment = comments[i];
            const userDetails = await db.userStore.getUserById(comment.userid);
            const newComment = {
                _id: comment._id,
                text: comment.text,
                likes: comment.likes,
                pubid: comment.pubid,
                date: comment.date,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
            };
            if(comment.userid.equals(request.auth.credentials._id)){
                newComment.canEdit = true;
            }else {
                newComment.canEdit = false;
            }
            newComments.push(newComment);
          }
          console.log("comment api");
          console.log(newComments);
          return newComments;
        } catch (err) {
          return Boom.serverUnavailable("No pub with this id");
        }
      },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
        try {
          console.log("inside pub api find one");
          const comment = await db.commentStore.getCommentById(request.params.id);
          console.log("comment api");
          if (!comment) {
            return Boom.notFound("No comment with this id");
          }
          const userDetails = await db.userStore.getUserById(comment.userid);
          const newComment = {
                _id: comment._id,
                text: comment.text,
                likes: comment.likes,
                pubid: comment.pubid,
                date: comment.date,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
          }
          if(comment.userid.equals(request.auth.credentials._id)){
            newComment.canEdit = true;
          }else {
            newComment.canEdit = false;
          }
          return newComment;
        } catch (err) {
          return Boom.serverUnavailable("No comment with this id");
        }
      },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        console.log("inside comment api");
        try {
          const newComment = {
            text: request.payload.text,
            //date: request.payload.date,
            //likes: request.payload.likes,
            pubid: request.payload.pubid,
            userid: request.auth.credentials._id,
          };
          console.log("newComment");
          console.log(newComment);
          const comment = await db.commentStore.addComment(newComment);
          if (comment) {
            return h.response(comment).code(201);
          }
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      payload: {
        multipart: true,
        output: "data",
        maxBytes: 209715200,
        parse: true
      },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const oldComment = await db.commentStore.getCommentById(request.params.id);
          if(!oldComment){
            return Boom.notFound("No comment with this id");
          }
          const newComment = {
            text: request.payload.text,
            date: request.payload.date,
            likes: request.payload.likes,
            pubid: request.payload.pubid,
          };
          const updatedComment = await db.pubStore.updateComment(oldComment, newComment);
          return updatedComment;
        } catch (err) {
          console.log(err);
          return Boom.serverUnavailable("Database Error");
        }
      },
      payload: {
        multipart: true,
        output: "data",
        maxBytes: 209715200,
        parse: true
      },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          await db.commentStore.deleteAllComments();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
        try {
          const comment = await db.commentStore.getCommentById(request.params.id);
          if (!comment) {
            return Boom.notFound("No comment with this id");
          }
          await db.commentStore.deleteComment(comment._id);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("No Comment with this id");
        }
      },
  },
};