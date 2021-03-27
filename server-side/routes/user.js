const express =require('express');

const {userById,allUsers, getUser,updateUser,deleteUser}=require("../controllers/user");
const {requireSignin}=require("../controllers/auth");


const router= express.Router(); 



//signout
router.get("/users",allUsers);
router.get("/user/:userId",getUser);
router.put("/user/:userId",updateUser);
router.delete("/user/:userId",deleteUser);

//any route contain:userId,our app will first execute userByid
router.param("userId",userById);

module.exports= router;
