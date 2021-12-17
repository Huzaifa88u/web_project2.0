const mongoose = require("mongoose");

const blog = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   Title:{
    type: String,
   },
   body:{
      type:String
   }

}); 
mongoose.exports=mongoose.model("blog",blog);