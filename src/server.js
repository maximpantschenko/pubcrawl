import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Handlebars from "handlebars";
import path from "path";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { accountsController } from "./controllers/accounts-controller.js";
import { fileURLToPath } from "url";
import { validate } from "./api/jwt-utils.js";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if(result.error){
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(jwt);

  server.validator(Joi);
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  server.auth.strategy("session","cookie",{
    cookie:{
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  server.auth.strategy("jwt","jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verfiyOptions: { algorithms: ["HS256"]}
  });
  server.auth.default("session");

  db.init("mongo");

  server.route(webRoutes);
  server.route(apiRoutes);
  
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();