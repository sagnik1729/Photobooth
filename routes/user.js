const expree=require('express');
const router=expree.Router();// use express in router app

const mongoose=require('mongoose') // import mongoose
const User=mongoose.model('User');// import User Schema
const Post=mongoose.model('Post');

const bcrypt=require('bcrypt') 

// const jwt =require ('jsonwebtoken')
// const {JWT_SECRET}=require('../config/keys')//.. -> as we hv to shift 1 folder back



const requareLogin=require('../middleware/requareLogin')


router.get('/user/:id',requareLogin, (req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err, posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            else{
                return res.json({user, posts})
            }
        })
    }).catch(err=>{
        return res.status(402).json({error:"user not found"})
    })
})

router.put('/follow',requareLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followid,{
        $push:{followers:req.user._id}
    },{
        new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }

            User.findByIdAndUpdate(req.user._id,{
                $push:{followings:req.body.followid}
            },{
                new:true
            })
            .select("-password")
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                return res.status(422).json({error:err})
            })
        }
    
    )
})
router.put('/unfollow',requareLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowid, {
        $pull:{followers:req.user._id}
    },{
        new:true},
        (err,result)=>{
            if(err){
                return res.status(422).json({error:err})
            }

            User.findByIdAndUpdate(req.user._id,{
                $pull:{followings:req.body.unfollowid}
            },{
                new:true
            })
            .select("-password")
            .then(result=>{
                res.json(result)
            }).catch(err=>{
                return res.status(422).json({error:err})
            })
        }
    
    )
})
router.put('/updatepic',requareLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{photo:req.body.photo}},{new:true},
        (err, result)=>{
            if(err){
                return res.status(422).json({err:"pic cant update"})
            }
            else{
                res.json(result)
            }
        })
})




module.exports=router