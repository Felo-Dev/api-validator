import User from '../models/User.js';
import Role from '../models/Role.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const signup = async (req, res) => {

    const { username, email, password, roles } = req.body;
/*     const userFound = await User.find({email:email});  */


    const newUser = new User({ username, email, password: await User.encryptPassword(password) });

    if (req.body.roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }

    const savedUser = await newUser.save()
    console.log(savedUser);

    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({ token })

}


export const signin = async (req, res) => {

const userFound = await User.findOne({ email: req.body.email }).populate('roles');
    
    if (!userFound) {
        return res.status(404).json({ message: 'User not found' })
       
    }

    const mathPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!mathPassword) {
        return res.status(401).json({ token: null, message: 'Password does not match' })
    }

       const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400
        });

        res.json({token})     
}