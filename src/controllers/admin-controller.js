import {db} from "../models/db.js";

export const adminController = {
        index: {
            handler: async function(request, h){
                //const categoriesMusic = await db.categoryMusicStore.getAllCategories();
                const viewData = {
                    title: "Dashboard"
                };
                return h.view("dashboard-view", viewData);
            },
        },

        getUsers: {
            handler: async function(request, h){
                const users = await db.userStore.getAllUsers();
                console.log("users");
                console.log(users);
                const viewData = {
                    title: "Users",
                    users: users,
                };
                return h.view("users-view", viewData);
            },
        },

        deleteUser: {
            handler: async function(request, h){
                await db.userStore.deleteUserById(request.params.id);
                return h.redirect(`/users`);
            },
        },

        editUser: {
            handler: async function(request, h){
                const user = await db.userStore.getUserById(request.params.id);
                const viewData = {
                    title: "Edit User",
                    user: user,
                }
                return h.view("user-edit", viewData);
            },
        },

        updateUser: {
            handler : async function(request, h){
                const user = request.payload;
                await db.userStore.updateUser(request.params.id, user);
                return h.redirect(`/users`);
            },
        },

};