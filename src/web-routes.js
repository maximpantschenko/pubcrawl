import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { publistController } from "./controllers/publist-controller.js";

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
  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/publist/{id}", config: publistController.index },
  { method: "POST", path: "/publist/{id}/addpub", config: publistController.addPub},
  { method: "GET", path: "/publist/{id}/deletepub/{pubid}", config: publistController.deletePub },
];