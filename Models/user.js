const mongoose=require('mongoose');
const { type } = require("express/lib/response");
const {ObjectId}=mongoose.Schema.Types

//build a user schema 
// for authentication
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"https://res.cloudinary.com/sazz20/image/upload/v1654798414/no_dp_i1ctm6.webp"
    },
    followers:[
        {
            type:ObjectId, ref:"User"
        }
    ],
    followings:[
        {
            type:ObjectId, ref:"User"
        }
    ]
    



})
mongoose.model("User",userSchema)// Model build in mongoose