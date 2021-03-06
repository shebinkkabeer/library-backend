const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err||!user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
  
};

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true,useFindAndModify:false},
        (err,user)=>{
            if(err ||!user){
                return res.status(400).json({
                    error:"You are not authorised to update this user"
                })
            }
            user.salt=undefined;
            user.encry_password=undefined;
            user.createdAt=undefined;
            user.updatedAt=undefined;
            res.json(user)
        }
    )
}

exports.addBook=(req,res)=>{
  User.findByIdAndUpdate(
    {_id:req.profile._id},
    {$push:{books:req.body}},
    {new:true,useFindAndModify:false},
    (err,book)=>{
        if(err ||!book){
            return res.status(400).json({
                error:"Book not added to DB"
            })
        }
        res.json(book)
      }
  )}


  exports.viewBook=(req,res)=>{
    return res.json(req.profile.books)
    
  }
               