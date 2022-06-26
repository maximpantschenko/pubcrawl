import { CategoryMusic } from "./category-music.js";

export const categoryMusicMongoStore = {
  async getAllCategories() {
    const categories = await CategoryMusic.find().lean();
    return categories;
  },

  async addCategory(category) {
    const newCategory = new CategoryMusic(category);
    const categoryObj = await newCategory.save();
    return this.getCategoryById(categoryObj._id);
  },

  async getCategoryById(id) {
    if (id) {
      const category = await CategoryMusic.findOne({ _id: id }).lean();
      return category;
    }
    return null;
  },

  async getCategoriesByIds(ids){
    console.log("category music store");
    console.log(ids);
    if(ids){
      const categories = await CategoryMusic.find( { _id: { $in: ids } } );
      return categories;
    }
    return null;
  },

  async deleteCategory(id) {
    try {
      await CategoryMusic.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCategories() {
    await CategoryMusic.deleteMany({});
  },

  async updateCategory(categoryid, updatedCategory) {
    const category = await CategoryMusic.findOne({ _id: categoryid });
    category.name = updatedCategory.name;
    await category.save();
    return category;
  },
};