const express=require("express");
const router=express.Router()
 
const { body, validationResult } = require('express-validator');

const {getUserById,getUser,updateUser,addBook}=require("../controllers/user")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")

router.param("userId",getUserById)
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)



router.post("/user/add/book/:userId",isSignedIn,isAuthenticated,addBook)


module.exports=router
