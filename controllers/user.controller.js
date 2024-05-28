import User from '../models/User.js'
import Role from '../models/Role.js'

export const createUser  = async (req, res) => {
    try {
      const { username, email, password, roles } = req.body;
  
      const rolesFound = await Role.find({ name: { $in: roles } });
  
      // creating a new User
      const user = new User({
        username,
        email,
        password,
        roles: rolesFound.map((role) => role._id),
      });
  
      // encrypting password
      user.password = await User.encryptPassword(user.password);
  
      // saving the new user
      const savedUser = await user.save();
  
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
  };
  
  export const getUser = async (req, res) => {
    const users = await User.findById(req.params.userId);
    res.json(users);
  };

  export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
    res.json(user);
  }

  export const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.json(user);
  }