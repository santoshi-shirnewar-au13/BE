const express=require("express");
const app=express();
const morgan=require("morgan");
const bodyparser =require("body-parser");
var cookieParser = require('cookie-parser')
const expressValidator=require('express-validator')
const fs =require('fs');
const cors =require("cors");
const dotenv=require("dotenv");
const mongoose=require("mongoose");

dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(()=> console.log("DB CONNECTED"))

mongoose.connection.on('error',err=>{
    console.log(`DB CONNECTION ERROR:$(err.message)`);
});


//bring in routes
const postRoutes=require("./routes/post.js");
const authRoutes=require("./routes/auth.js");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user.js");
app.get('/',(req,res)=>{
     fs.readFile("docs/apiDocs.json",(err,data)=>{
       if(err){
         res.status(400).json({
             error:err
         })
       }
       const docs =JSON.parse(data);
       res.json(docs);
     });
});
/*
const myownMiddelware=(req,res,next)=>{
    console.log("middleware applied");
    next();
};*/
//middleware
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/",postRoutes);
app.use("/",authRoutes);
app.use("/",userRoutes);
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error:"Unauthorized"});
  }
});


const port=process.env.PORT||8080;
app.listen(port,() =>{
    console.log(`a node ja api is listeining on port no.&{port}`);
});