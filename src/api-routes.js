import { userApi } from "./api/user-api.js";
import { publistApi } from "./api/publist-api.js";
import { pubApi } from "./api/pub-api.js";
import { categoriesApi } from "./api/categories-api.js";
import { commentApi } from "./api/comment-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "POST", path: "/api/publists", config: publistApi.create },
    { method: "DELETE", path: "/api/publists", config: publistApi.deleteAll },
    { method: "GET", path: "/api/publists", config: publistApi.find },
    { method: "GET", path: "/api/publists/{id}", config: publistApi.findOne },
    { method: "DELETE", path: "/api/publists/{id}", config: publistApi.deleteOne },

    { method: "GET", path: "/api/pubs", config: pubApi.find },
    { method: "GET", path: "/api/pubs/{id}", config: pubApi.findOne },
    { method: "POST", path: "/api/publists/{id}/createpub", config: pubApi.create },
    { method: "DELETE", path: "/api/pubs", config: pubApi.deleteAll },
    { method: "DELETE", path: "/api/pubs/{id}", config: pubApi.deleteOne },
    { method: "POST", path: "/api/updatepub/{pubid}", config: pubApi.update},

    { method: "GET", path: "/api/getCategoriesMusic/", config: categoriesApi.getCategoriesMusic },
    //{ method: "POST", path: "/api/getCategoriesMusicByIds", config: categoriesApi.getCategoriesMusicByIds },

    { method: "GET", path: "/api/comments/all", config: commentApi.find },
    { method: "GET", path: "/api/comments/bypubid/{id}", config: commentApi.findByPubId },
    { method: "POST", path: "/api/comments/add", config: commentApi.create },

];