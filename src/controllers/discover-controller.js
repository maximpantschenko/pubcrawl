export const discoverController = {
    index: {
        handler: function (request, h){
            const viewData = {
                title: "Discover",
            };
            return h.view("discover-view", viewData);
        },
    },
};