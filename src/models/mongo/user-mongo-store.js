import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().sort({"admin":-1}).lean();
    return users;
  },

  async countUsers(){
    const numberUsers = await User.countDocuments({});
    return numberUsers;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(userid, updatedUser) {
    const user = await User.findOne({ _id: userid });
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    user.admin = (updatedUser.admin === 'true');
    console.log(user);
    await user.save();
    return user;
  },
};