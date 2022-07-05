const { type } = require("express/lib/response");
const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types
const postSchema=new mongoose.Schema({
    title:{
        type:String,
        requare:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"no photo"
    },
    postedBy:{
        type: ObjectId,//id of the user who posted the post
        
        ref:"User"
    },
    Like:[{// its an array
        type: ObjectId,//id of the user who posted the post
        
        ref:"User"
    }],
    Comment:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    
})
mongoose.model("Post",postSchema)