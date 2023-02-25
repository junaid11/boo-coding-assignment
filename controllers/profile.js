const userService = require('../services/profile');

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
      res.render('profile_template', { profile: user });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
  createUser,
  getUserById
}