const User=require("../models/user")
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    if(req.body.password!=req.body.password2){
        return res.status(422).json({
            error:"Password Mismatch"
        })
    }
    
     const user=new User(req.body);
     const email=req.body.email
     if(await User.findOne({email})){
         return res.status(422).json({
             error:"Account already exists"
         })
     }
     user.save((err,user)=>{
         if(err){
             return res.status(400).json({
                 err:"Error Saving User in DB"
             })
         }
         res.json({id:user._id,name:user.name,email:user.email,role:user.role})
     })
}

exports.signin=(req,res)=>{
    const {email,password}=req.body;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })

    }
    User.findOne({email},(err,user)=>{
        if(err || !user){
           return res.status(400).json({
                error:"Email doesnot exists"
            })
        }


        if (!user.authenticate(password)){
            return res.status(400).json({
                error:"Email and Password doesnot Match"
            })
        }
        //create token
        const token=jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie
        res.cookie("token",token,{expire:new Date()+9999})
        //send response to frontend
        const {_id,name,email,role}=user;
        return res.json({
            token,user:{_id,name,email,role}
        })
    })
  
}

exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message:"Signout Successfull"
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty:"auth",
    algorithms: ['HS256']
  });

 exports.isAuthenticated=(req,res,next)=>{
     let checker=req.profile && req.auth && req.profile._id==req.auth._id
     if(!checker){
         return res.status(403).json({
             error:"ACCESS DENIED"
         })
     }

     next()
 } 

 exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }
    next();
  }