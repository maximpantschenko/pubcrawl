import {db} from "../models/db.js";

export const categoryController = {
    music: {
        index: {
            handler: async function(request, h){
                const categoriesMusic = await db.categoryMusicStore.getAllCategories();
                const viewData = {
                    title: "Categories Music",
                    categoriesMusic: categoriesMusic,
                    admin: request.auth.credentials.admin,
                };
                return h.view("category-music-view", viewData);
            },
        },

        addCategory: {
            handler: async function (request, h){
                const newCategory = {
                    name: request.payload.name,
                };
                await db.categoryMusicStore.addCategory(newCategory);
                return h.redirect(`/category/music`);
            },
        },

        deleteCategory: {
            handler: async function(request, h){
                await db.categoryMusicStore.deleteCategory(request.params.id);
                return h.redirect(`/category/music`);
            }, 
        },

        deleteCategories: {
            handler: async function(request, h){
                await db.categoryMusicStore.deleteAllCategories();
                return h.redirect(`/category/music`);
            },
        },

        editCategory: {
            handler: async function(request, h){
                console.log("inside edit category in controller");
                const categoryMusic = await db.categoryMusicStore.getCategoryById(request.params.id);
                const viewData = {
                    title: "Edit Category Music",
                    categoryMusic: categoryMusic,
                    admin: request.auth.credentials.admin,
                }
                return h.view("category-music-edit", viewData);
            },
        },

        updateCategory: {
            handler: async function (request, h){
                console.log("inside update category in controller");
                const newCategory = {
                    name: request.payload.name,
                };
                await db.categoryMusicStore.updateCategory(request.params.id, newCategory);
                return h.redirect(`/category/music`);
            },
        },

    },

};