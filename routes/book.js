const express=require("express")
const router=express.Router()
const { body, validationResult } = require('express-validator');


const {getBookById,createBook,getAllBook,getBook,updateBook,deleteBook}=require("../controllers/book")
const {isSignedIn,isAuthenticated,isAdmin}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")


router.param("userId",getUserById)
router.param("bookId",getBookById)
router.post("/book/create/:userId",[body('name',"name should be at least 3 characters").isLength({ min: 3 }),
body('author',"author should be at least 3 characters").isLength({ min: 3 }),
 body('genre',"genre should be at least 3 characters").isLength({ min: 3 }),                                   
body('publication',"publication should be at least 5 characters").isLength({ min: 5 }),
body('isbn',"isbn is required").isLength({ min: 1 }),                                    

body('isbn',"isbn should be number").isNumeric(),

<<<<<<< HEAD
body('stock',"stock is required").isLength({ min: 1 }),
=======
body('description',"desciption is required").isLength({ min: 1 }),
>>>>>>> 40d7d69a2ea7f3cd86b9f79355d48f783ad7ce2b


],isSignedIn,isAuthenticated,isAdmin,createBook)

router.get("/book/:bookId",getBook)
router.get("/books",getAllBook)

router.put("/book/:bookId/:userId",[body('name',"name should be at least 3 characters").isLength({ min: 3 }),
body('author',"author should be at least 3 characters").isLength({ min: 3 }),
 body('genre',"genre should be at least 3 characters").isLength({ min: 3 }),                                   
body('publication',"publication should be at least 5 characters").isLength({ min: 5 }),
body('isbn',"isbn is required").isLength({ min: 1 }),                                    

body('isbn',"isbn should be number").isNumeric(),

<<<<<<< HEAD
body('stock',"stock is required").isLength({ min: 1 }),
=======
body('description',"desciption is required").isLength({ min: 1 }),
>>>>>>> 40d7d69a2ea7f3cd86b9f79355d48f783ad7ce2b


],isSignedIn,isAuthenticated,isAdmin,updateBook)

router.delete("/book/:bookId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteBook)






module.exports=router
