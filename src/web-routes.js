import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { discoverController } from "./controllers/discover-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { publistController } from "./controllers/publist-controller.js";
import { pubController } from "./controllers/pub-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/home", config: homeController.index },
  { method: "POST", path: "/home/addpublist", config: homeController.addPublist },
  { method: "GET", path: "/home/deletepublist/{id}", config: homeController.deletePublist },

  { method: "GET", path: "/discover", config: discoverController.index },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/publist/{id}", config: publistController.index },
  { method: "POST", path: "/publist/{id}/addpub", config: publistController.addPub},
  { method: "GET", path: "/publist/{id}/deletepub/{pubid}", config: publistController.deletePub },
  { method: "POST", path: "/publist/{id}/uploadimage", config: publistController.uploadImage },

  { method: "GET", path: "/pub/{id}/editpub/{pubid}", config: pubController.index },
  { method: "POST", path: "/pub/{id}/updatepub/{pubid}", config: pubController.update },
  { method: "POST", path: "/pub/{id}/uploadimage/{pubid}", config: pubController.uploadImage },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];