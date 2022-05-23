export const homeController = {
    index: {
      handler: async function (request, h) {
        return h.view("main");
      },
    },
  };