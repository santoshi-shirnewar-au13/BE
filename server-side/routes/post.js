const express =require('express');
const {getPosts,createPost,postsByUser,postById,isPoster,updatePost,deletePost}=require("../controllers/post");
const {requireSignin} = require("../controllers/auth");
const {userById}=require("../controllers/user");
const {createPostValidator}=require("../validator");
const router= express.Router(); 



router.get("/posts",getPosts);
router.post("/post/new/:userId",requireSignin,createPost,createPostValidator);

router.get("/posts/by/:userId",postsByUser);
router.put("/post/:postId",updatePost);
router.delete('/post/:postId',deletePost);

//any route contain:userId,our app will first execute userByid
router.param("userId",userById);
//any route contain:userId,our app will first execute postByid
router.param("postId",postById);

module.exports=router;