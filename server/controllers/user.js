import {createError} from "../utils/error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update = async (req, res, next) => {
  if(req.params.id === req.user.id) {
    try {
    
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: res.body
      },
      {new: true}
      )
      res.status(200).json(updatedUser)
    } catch (err) {
      next(err)
    }
  } else {
    return next(createError(403, "You can only update your own account"))
  }
};

export const deleteUser = async (req, res) => {
  if(req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({message: "User has been deleted"})
    } catch (err) {
      next(err)
    }
  } else {
    return next(createError(403, "You can only delete your own account"))
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch(err) {
    next(err)
  }
};

export const subscribe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: {subscribedUser: req.params.id}
    })
    await findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: 1}
    })
    res.status(200).json("Subscribtion successful")
    } catch(err) {
      next(err)
    }
};
  
export const unsubscribe = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {subscribedUser: req.params.id}
    })
    await findByIdAndUpdate(req.params.id, {
      $inc: {subscribers: -1}
    })
    res.status(200).json("Unsubscribtion successful")
    } catch(err) {
      next(err)
    }
};

export const like = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {likes:id},
      $pull: {dislikes: id}
    })
    res.status(200).json("the video has been liked")
  } catch(err) {
    next(err)
  }
};

export const dislike = async (req, res) => {
  const id = req.user.id;
  const videoId = req.params.videoId
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: {dislikes:id},
      $pull: {likes: id}
    })
    res.status(200).json("the video has been disliked")
  } catch(err) {
    next(err)
  }
};