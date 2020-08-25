const mongoose=require("mongoose");
const { stringify } = require("uuid");
const { ObjectId } = mongoose.Schema;

const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    author:{
        type:String,
        required:true

    },
    isbn:{
        type:Number,
        required:true,
        trim:true,
        unique:true,
        maxlength:13
    },
    genre:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    publication:{
        type:String,
        required:true,
        

    },
    stock:{
        type:Number,
        required:true
    },
    creator: {
        type: ObjectId,
        ref: "User",
      },
},{
    timestamps:true
});

module.exports=mongoose.model("Book",bookSchema)