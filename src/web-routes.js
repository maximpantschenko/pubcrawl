import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { discoverController } from "./controllers/discover-controller.js";
import { homeController } from "./controllers/home-controller.js";
import { publistController } from "./controllers/publist-controller.js";
import { pubController } from "./controllers/pub-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/dashboard", config: adminController.index },
  
  { method: "GET", path: "/users", config: adminController.getUsers },
  { method: "GET", path: "/users/delete/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/users/edit/{id}", config: adminController.editUser },
  { method: "POST", path: "/users/update/{id}", config: adminController.updateUser },

  { method: "GET", path: "/home", config: homeController.index },
  { method: "POST", path: "/home/addpublist", config: homeController.addPublist },
  { method: "GET", path: "/home/deletepublist/{id}", config: homeController.deletePublist },

  { method: "GET", path: "/discover", config: discoverController.index },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/publist/{id}", config: publistController.index },
  { method: "POST", path: "/publist/{id}/addpub", config: publistController.addPub},
  { method: "GET", path: "/publist/{id}/deletepub/{pubid}", config: publistController.deletePub },
  { method: "POST", path: "/publist/{id}/uploadimage", config: publistController.uploadImage },

  //{ method: "GET", path: "/pub/{id}/editpub/{pubid}", config: pubController.index },
  { method: "POST", path: "/pub/{id}/updatepub/{pubid}", config: pubController.update },
  { method: "POST", path: "/pub/{id}/uploadimage/{pubid}", config: pubController.uploadImage },
  { method: "GET", path: "/pubs", config: pubController.getPubs },

  { method: "GET", path: "/category/music", config: categoryController.music.index },
  { method: "POST", path: "/category/music/add", config: categoryController.music.addCategory },
  { method: "GET", path: "/category/music/delete/{id}", config: categoryController.music.deleteCategory },
  { method: "GET", path: "/category/music/deleteAll", config: categoryController.music.deleteCategories },
  { method: "GET", path: "/category/music/edit/{id}", config: categoryController.music.editCategory },
  { method: "POST", path: "/category/music/update/{id}", config: categoryController.music.updateCategory },

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