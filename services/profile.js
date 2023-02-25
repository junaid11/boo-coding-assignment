const User = require("../models/user/User");

const createUser = async (userData) => {
    const user = new User(userData);
    return user.save();
};

const getUserById = async (userId) => {
    return User.findById(userId);
};

module.exports = {
  createUser,
  getUserById
}