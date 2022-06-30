import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Pubcrawl" });
    },
  },

  dashboard: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.auth.credentials._id);
      const viewData = {
            title: "Dashboard",
            user: user,
            admin: request.auth.credentials.admin,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  account: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.auth.credentials._id);
      const viewData = {
            title: "My Account",
            user: user,
            admin: request.auth.credentials.admin,
      };
      return h.view("account-view", viewData);
    },
  },

  edit: {
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.auth.credentials._id);
      const viewData = {
            title: "Edit Account",
            user: user,
            admin: request.auth.credentials.admin,
      };
      return h.view("user-edit", viewData);
    },
  },

  updateUser: {
    handler : async function(request, h){
        const user = request.payload;
        const id = request.auth.credentials._id;
        await db.userStore.updateUser(id, user);
        return h.redirect(`/account`);
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Pubcrawl" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/login");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Pubcrawl" });
    },
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      /*
      if(user._id == "62ba11e0fdb9ab9aa144f4f1") {
        user.permission = 'ADMIN';
      }else {
        user.permission = 'USER';
      }
      console.log("user permission on backedn ****************");
      console.log(user);*/
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/discover");
    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session){
    const user = await db.userStore.getUserById(session.id);
    if(!user){
      return {
        valid: false
      };
    }
    return {
      valid: true,
      credentials: user
    };
  },
};