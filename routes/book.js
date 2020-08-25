const express=require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');


const {getBookById,createBook,getAllBook,getBook,updateBook,deleteBook}=require("../controllers/book")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")


router.param("userId",getUserById)
router.param("bookId",getBookById)
router.post("/book/create/:userId",[body('name',"name should be at least 3 characters").isLength({ min: 3 }),
body('publication',"publication should be at least 5 characters").isLength({ min: 5 }),
body('author',"author should be at least 3 characters").isLength({ min: 3 }),
body('genre',"genre should be at least 3 characters").isLength({ min: 3 }),
body('isbn',"isbn is required").isLength({ min: 1 }),
body('isbn',"isbn should be number").isNumeric(),

],isSignedIn,isAuthenticated,isAdmin,createBook)

router.get("/book/:bookId",getBook)
router.get("/books",getAllBook)

router.put("/book/:bookId/:userId",[body('name',"name should be at least 3 characters").isLength({ min: 3 }),
body('publication',"publication should be at least 5 characters").isLength({ min: 5 }),
body('author',"author should be at least 3 characters").isLength({ min: 3 }),
body('genre',"genre should be at least 3 characters").isLength({ min: 3 }),
body('isbn',"isbn is required").isLength({ min: 1 }),
body('isbn',"isbn should be number").isNumeric(),

],isSignedIn,isAuthenticated,isAdmin,updateBook)

router.delete("/book/:bookId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteBook)






module.exports=router