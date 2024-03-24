import express from 'express';
import {verifyToken} from'../utils/verifyUser.js';
import { create, getposts, deletePost, updatePost, getPostsByUser } from '../controllers/postControllers.js';


const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId',verifyToken, deletePost)
router.put('/updatepost/:postId/:userId',verifyToken, updatePost)
router.get('/getposts/:userId', getPostsByUser);


export default router;