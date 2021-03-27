exports.createPostValidator=(req,res,next)=>{
    req.check("title","write a title").notEmpty();
    req.check("title","Title must be between 4 to 150 charachter").isLength({
        min:4,
        max:150
    });
    req.check("body","write a body").notEmpty();
    req.check("body","Body must be between 4 to 2000 character").isLength({
         min:4,
         max:2000
    });
    const errors = req.validationErrors()
    //if error show the fisrt one as they happen
    if (errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({error:firstError});

    }
    //proceed to middleware
    next();
};

exports.userSignupValidator=(req,res,next)=>{
    //name is not null and between 4-10 character
     req.check("name","Name is required").notEmpty();

    //check for email is not null , valid and normalized
     req.check("email","Email must be between 3 to 32 characters")
     .matches(/.+\@.+\..+/)
     .withMessage("Email must contain @")
     .isLength({
         min:4,
         max:2000
     })

    // check for password
    req.check("password","Password is required").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain number")

    //check for errors
    const errors = req.validationErrors()
    //if error show the fisrt one as they happen
    if (errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({error:firstError});

    }
    //proceed to middleware
    next();
   
};