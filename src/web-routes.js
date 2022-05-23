import { homeController } from "./controllers/home-controller.js";

export const webRoutes = [{ method: "GET", path: "/", config: homeController.index }];