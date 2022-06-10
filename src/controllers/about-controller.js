export const aboutController = {
    index: {
        handler: function (request, h){
            const viewData = {
                title: "About PubCrawl",
            };
            return h.view("about-view", viewData);
        },
    },
};