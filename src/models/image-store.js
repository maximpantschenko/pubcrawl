import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

export const imageStore = {

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function(imagefile) {
    console.log("imagefile in uploadImage");
    console.log(imagefile);
    await writeFileSync("./public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./public/temp.img");
    return response.url;
  },

  deleteImage: async function(img) {
    var pathname = new URL(img).pathname;
    const array = pathname.split("/");
    const imgId = array[(array.length)-1].split(".")[0];
    console.log("###############image id:"+ imgId);
    await cloudinary.v2.uploader.destroy(imgId, function(error,result) {
      console.log(result, error) 
    });
  },
};