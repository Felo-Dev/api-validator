import jwt, { decode } from "jsonwebtoken";
import config from "../config";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const verifyToken = async (req, res, next) => {
   try {
    const token = req.headers['x-access-token'];

    if (!token) return res.status(403).json({ message: "No token provided" })

    const decoded = jwt.verify(token, config.SECRET)
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 })

    if (!user) return res.status(404).json({ message: "no user found" })


    console.log(decoded)
    next()
   } catch (error) {
    res.status(401).json({message:"no autorizado"})
   }
};

 export const isModerator = async (req, res, next) => {
      const user = await User.findById(req.userId)
      const roles = await Role.find({_id: {$in: user.roles}})
     
      for (let i = 0; i < roles.length; i++) { 

         if(roles[i].name === "moderator"){
            next()
            return;
         }
      
      }

      return res.status(403).json({message:"require moderator rol"})
   }

   export const isAdmin = async (req, res, next) => {
      const user = await User.findById(req.userId)
      const roles = await Role.find({_id: {$in: user.roles}})
     
      for (let i = 0; i < roles.length; i++) { 

         if(roles[i].name === "admin"){
            next()
            return;
         }
      
      }

      return res.status(403).json({message:"require admin rol"})
   }