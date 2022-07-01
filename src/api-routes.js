import { userApi } from "./api/user-api.js";
//import { publistApi } from "./api/publist-api.js";
import { pubApi } from "./api/pub-api.js";
import { categoriesApi } from "./api/categories-api.js";
import { commentApi } from "./api/comment-api.js";

export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "GET", path: "/api/users/current", config: userApi.current },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

    { method: "GET", path: "/api/pubs", config: pubApi.find },
    { method: "GET", path: "/api/pubs/{id}", config: pubApi.findOne },
    { method: "POST", path: "/api/pubs/create", config: pubApi.create },
    { method: "DELETE", path: "/api/pubs", config: pubApi.deleteAll },
    { method: "DELETE", path: "/api/pubs/{id}", config: pubApi.deleteOne },
    { method: "POST", path: "/api/updatepub/{pubid}", config: pubApi.update},
    { method: "GET", path: "/api/pubs/user/{id}", config: pubApi.findByUserId },
    { method: "GET", path: "/api/pubs/currentuser", config: pubApi.findByCurrentUserId },
    { method: "GET", path: "/api/pubs/searchname/{string}", config: pubApi.searchName },
    { method: "GET", path: "/api/pubs/search/{string}", config: pubApi.search },

    { method: "GET", path: "/api/getCategoriesMusic/", config: categoriesApi.getCategoriesMusic },
    //{ method: "POST", path: "/api/getCategoriesMusicByIds", config: categoriesApi.getCategoriesMusicByIds },

    { method: "GET", path: "/api/comments/all", config: commentApi.find },
    { method: "GET", path: "/api/comments/bypubid/{id}", config: commentApi.findByPubId },
    { method: "POST", path: "/api/comments/add", config: commentApi.create },
    { method: "DELETE", path: "/api/comments/delete/{id}", config: commentApi.deleteOne },

];