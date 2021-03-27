const express =require('express');
const {signup,signin,signout}=require("../controllers/auth");
const {userById}=require("../controllers/user");
const {userSignupValidator}=require("../validator");


const router= express.Router(); 


router.post("/signup",userSignupValidator,signup);
//signin
router.post("/signin",signin);
//signout
router.get("/signout",signout);

//any route contain:userId,our app will first execute userByid
router.param("userId",userById);

module.exports= router;