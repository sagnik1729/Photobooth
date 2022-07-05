const express=require('express')
const res = require('express/lib/response')
const router=express.Router()
const mongoose =require('mongoose')
const Post=mongoose.model('Post')
const requareLogin=require('../middleWare/requareLogin')


router.get('/fetchPosts',requareLogin, (req, res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("Comment.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/fetchSubPosts',requareLogin, (req, res)=>{
    // posted by In the following
    Post.find({postedBy:{$in:req.user.followings}})
    .populate("postedBy","_id name")
    .populate("Comment.postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/myPost', requareLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy", "_id name")
    .populate("Comment.postedBy","_id name")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like',requareLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postid,{
        $push:{Like:req.user._id}
    },{
        new:true
    })
    .populate("Comment.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})

        }
        else{
            res.json(result)
        }
    })
})
router.put('/unlike',requareLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postid,{
        $pull:{Like:req.user._id}
    },{
        new:true
    })
    .populate("Comment.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})

        }
        else{
            res.json(result)
        }
    })
})
router.put('/comment',requareLogin,(req,res)=>{
    const comments={
        text:req.body.text,
        postedBy:req.user._id

    }
    console.log(typeof comments)
    Post.findByIdAndUpdate(req.body.postid,{
        $push:{Comment:comments}
    },{
        new:true
    })
    .populate("Comment.postedBy","_id name")
    .populate("postedBy","_id name")
    
    .exec((err, result)=>{
        console.log(result);
        if(err){
            return res.status(422).json({error:err})

        }
        else{
            res.json(result)
        }
    })
})
router.delete('/deletePost/:postid', requareLogin,(req,res)=>{
    Post.findOne({_id:req.params.postid})
    .populate("postedBy","_id name")
    .populate("Comment.postedBy","_id name")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})

        }
        if(post.postedBy._id.toString()===req.user._id.toString()){
            post.remove()
            .then(result=>{
                res.json({result})
            }).catch(err=>{
                console.log(err);
            })
        }
    })
})


router.post('/createPost',requareLogin,(req,res)=>{
    console.log(req.body);
    const{title,body, photo}=req.body
    if(!body ||!title || !photo){
        return res.status(422).json({error:"please provide all info"})

    }
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        photo,
        postedBy:req.user
        // postedBy:req.user._id // we can save it by _id or name .. no issue
        
    })
    post.save()
    .then(result=>{
        res.json({post:result})

    })
    .catch(err=>{
        console.log(err);
    })
})




module.exports=router