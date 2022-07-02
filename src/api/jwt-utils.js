import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";

const result = dotenv.config();

export function createToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
    };
    const options = {
      algorithm: "HS256",
      expiresIn: "1h",
    };
    return jwt.sign(payload, process.env.cookie_password, options);
  }
  
  export function decodeToken(token) {
    const userInfo = {};
    try {
      const decoded = jwt.verify(token, process.env.cookie_password);
      userInfo.userId = decoded.id;
      userInfo.email = decoded.email;
    } catch (e) {
    }
    return userInfo;
  }
  
  export async function validate(decoded, request) {
    const user = await db.userStore.getUserById(decoded.id);
    if(user._id == "62ba11e0fdb9ab9aa144f4f1") {
      user.permission = 'ADMIN';
    }else {
      user.permission = 'USER';
    }
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  }

  export function getUserIdFromRequest(request) {
    let userId = null;
    try {
      const { authorization } = request.headers;
      const token = authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "verysecretpasswordbutyoushoulduseanotheronenexttime");
      userId = decodedToken.id;
    } catch (e) {
      userId = null;
    }
    return userId;
  }

