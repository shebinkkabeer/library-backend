const Book=require("../models/book")
const { body, validationResult } = require('express-validator');


exports.getBookById=(req,res,next,id)=>{
   Book.findById(id).exec((err,book)=>{
       if(err || !book){
          return res.status(400).json({
               error:"Book not found in DB"
           })
       }
       req.book=book;
    next()

   })


}

exports.createBook=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    const book=new Book(req.body);
    book.save((err,book)=>{
        if(err || !book){
            return res.status(400).json({
                error:"Unable to Save Book in DB"
            })
        }
        res.json({book})
    })
}

exports.getBook=(req,res)=>{
    return res.json(req.book)
}

exports.getAllBook=(req,res)=>{
    Book.find().exec((err,books)=>{
        if(err || !books){
            res.status(400).json({
                error:"No Books Found"
            })
        }
        res.json(books)

    })
}

exports.updateBook=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    const book=req.book;
    book.name=req.body.name;
    book.author=req.body.author;
    book.genre=req.body.genre;
    book.isbn=req.body.isbn;
    book.publication=req.body.publication
    book.stock=req.body.stock

    book.save((err,updatedBook)=>{
        if(err){
            res.status(400).json({
                error:"Unable to Update Book"
            })
        }
        res.json(updatedBook)
    })
   
}

exports.deleteBook=(req,res)=>{
    const book=req.book;
    book.remove((err,book)=>{
        if(err){
            res.status(400).json({
                error:"Delete Operation Failed"
            })
        }
        res.json({
            message:`${book} was successfully deleted`
        })
    })
}