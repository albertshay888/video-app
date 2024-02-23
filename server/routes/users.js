import express from "express";
import {update, deleteUser, getUser, subscribe, unsubscribe, like, dislike } from "../controllers/user.js"
import {verifyToken} from "../utils/verifyToken.js"

const router = express.Router();

//update a user
router.put('/:id', verifyToken, update)

//delete user
router.delete("/:id",verifyToken, deleteUser)

//get a user
router.get("/find/:id", getUser)

//subscribe to a user 
router.put("/sub/:id", verifyToken, subscribe)

//unsubscribe from a user
router.put("/unsub/:id", verifyToken, unsubscribe)

//like a video 
router.put("/like/:videoId",verifyToken, like)
//dislike a video
router.put("/dislike/:videoId",verifyToken, dislike)

export default router;