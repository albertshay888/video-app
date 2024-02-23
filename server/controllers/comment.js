import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import {createError} from "../utils/error.js";

export const addComment = async(req, res, next) => {
  const newComment = new Comment({...req.body, userId:req.user.id})
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch(err) {
    next(err);
  }
}
export const deleteComment = async(req, res, next) => {
  try {
    const commment = await Comment.findById(res.params.id)
    const video = await Video.findById(res.params.id)
    if(req.user.id === Comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(res.params.id)
      res.status(200).json("Comment deleted")
    } else {
      return next(createError(403, "You can only delete your own comments!"))
    }
  } catch(err) {
    next(err)
  }
}

export const getComment = async(req, res, next) => {
  try {
    const comments = await Comment.find({videoId: req.params.videoId});
    res.status(200).json(comments);
  } catch(err) {
    next(err)
  }
}