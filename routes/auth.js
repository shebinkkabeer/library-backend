const express=require("express");
const { body, validationResult } = require('express-validator');
const { model } = require("mongoose");
const { signup ,signin,signout,isSignedIn} = require("../controllers/auth");
const router=express.Router();

router.post("/signup",[
    body('name',"name should be at least 3 characters").isLength({ min: 3 }),
    body('email',"email is required").isEmail(),
    body('password',"password should be at least 5 characters").isLength({ min: 5 }),
    body('password2',"password mismatch").isLength({ min: 5 }),
    
],signup)

router.post("/signin",[
    body('email',"check your email").isEmail(),
    body('password',"password field is required").isLength({ min: 1 }),
],signin)

router.get("/signout",signout)

module.exports=router;
