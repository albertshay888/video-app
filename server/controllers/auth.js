import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {createError} from "../utils/error.js"

export const signup = async (req, res, next) => {
  console.log(req.body)
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash});
    await newUser.save();
    res.status(201).send({ message: "User has been created" });

  } catch (err) {
     next(err)
  }
}

export const signin = async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findOne({ name: req.body.name });
    if(!user) return next(createError(404, "user not found"));

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(!isMatch) return next(createError(400, "incorrect credentials!"));

    const token = jwt.sign({id:user._id}, process.env.JWT)
    console.log("token", token);
   
    //seperates password and other details from user object

    const {password, ...others}  = user._doc;

    res.cookie("access_token", token, {
      httpOnly:true
    })
    .status(200)
    .json(others)
    
  } catch (err) {
    next(err)
  }
}


