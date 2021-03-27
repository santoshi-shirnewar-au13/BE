const jwt = require('jsonwebtoken')
require("dotenv").config()
const expressJwt = require('express-jwt');
const User = require("../models/user");


exports.signup = async(req,res)=>{
    const userExists =await User.findOne({email: req.body.email})
    if (userExists)
       return res.status(403).json({
           error:"email is taken!"

       });
    const user=await new User(req.body);
    await user.save();
    res.status(200).json({message:"signup has been successful please login"});
};


exports.signin=(req,res)=>{
    //find the user based on email
    const {email,password}=req.body
    User.findOne({email},(err,user)=>{
        // if err or no user
        if(err||!user){
            return res.status(401).json({
                error:"User with email doesnot exist.Please signin."
            })

        }
        //if user is found make sure the email and password match
        //create authenticate method in model use here
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error:"email and password do not match."
            })
        }
        //generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn:'7d'
            })



       //persist the token as 't' in cookie with expiry date
       res.cookie("t",token,{expired:new Date()+9999});

       //return responses with user and token to frontend client
       const{_id,name,email}=user;
       return res.json({token,user:{_id,email,name}});

    });

};

exports.signout=(req,res)=>{
    res.clearCookie('t')
    return res.json({message:"signout success!"});
};

exports.requireSignin=expressJwt({
    // if the token is valid express jwt appends the verfified users id
    // in auth jey to the request object
    secret:process.env.JWT_SECRET,
    userProperty:"auth"
});
