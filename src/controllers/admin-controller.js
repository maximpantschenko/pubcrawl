import {db} from "../models/db.js";

export const adminController = {
        index: {
            handler: async function(request, h){
                //const categoriesMusic = await db.categoryMusicStore.getAllCategories();
                const viewData = {
                    title: "Dashboard",
                    admin: request.auth.credentials.admin,
                };
                return h.view("dashboard-view", viewData);
            },
        },

        dashboardAdmin: {
            handler: async function(request, h){
                const numberUsers = await db.userStore.countUsers({});
                const numberCategories = await db.categoryMusicStore.countCategories();
                const numberPubs = await db.pubStore.countPubs({});
                const viewData = {
                    title: "Administration",
                    numberUsers: numberUsers,
                    numberCategories: numberCategories,
                    numberPubs: numberPubs,
                    admin: request.auth.credentials.admin,
                };
                return h.view("dashboard-admin-view", viewData);
            },
        },

        getUsers: {
            handler: async function(request, h){
                const users = await db.userStore.getAllUsers();
                const viewData = {
                    title: "Users",
                    users: users,
                    admin: request.auth.credentials.admin,
                };
                return h.view("users-view", viewData);
            },
        },

        deleteUser: {
            handler: async function(request, h){
                if(request.auth.credentials.admin) await db.userStore.deleteUserById(request.params.id);
                return h.redirect(`/users`);
            },
        },

        editUser: {
            handler: async function(request, h){
                const user = await db.userStore.getUserById(request.params.id);
                const viewData = {
                    title: "Edit User",
                    user: user,
                    admin: request.auth.credentials.admin,
                }
                return h.view("user-edit-admin", viewData);
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