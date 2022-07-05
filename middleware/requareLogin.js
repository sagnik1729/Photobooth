const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const mongoose=require('mongoose')
const User=mongoose.model("User")
module.exports=(req,res,next)=>{// export the function

    //authorization=== Bearer + token
    const{authorization}=req.headers
    if(!authorization){
       return res.status(401).json({error:"you musr to logged in"})

    }
    const token=authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{// varify the token
        if(err){
            return res.status(401).json({error:"you musr to logged in completely"})
        }
        const{_id}=payload
        User.findById(_id).then(userdata=>{
            req.user=userdata
            console.log(req.user)
            next();
        })
        
    })
}