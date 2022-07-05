const expree=require('express');
const router=expree.Router();// use express in router app

const mongoose=require('mongoose') // import mongoose
const User=mongoose.model('User');// import User Schema

const bcrypt=require('bcrypt') 

const jwt =require ('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')//.. -> as we hv to shift 1 folder back



const requareLogin=require('../middleware/requareLogin')


router.get('/boss',(req,res)=>{
    res.send("This is site of Sagnik");
})


router.get('/protected',requareLogin,(req,res)=>{
    res.send("hello user, welcome to this protected resource by using your token")
})



router.post('/signUp',(req,res)=>{
    console.log(req.body);
    const {name,email,password, photo}=req.body;
    if(!email || !name || !password){
        return res.status(422).json({error:"please give all info"}) // router response
        
    }
    // res.json({msg:"successfully send all responses"})
    // initial step to chk response
    User.findOne({email:email})
    .then((savedUser)=>{//if we got that in out db return error
        if(savedUser){
            return res.status(422).json({error:"user already exist"})
        }
        // const user=new User({// save response to database
        //     email,
        //     password:hashedpassword,
        //     name
        // })
        // above step is follow if no encrytn needed;



        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user=new User({// save response to database
                email,
                password:hashedpassword,
                name,
                photo
            })
            user.save()
            .then(user=>{
                res.json({msg:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
    .catch(err=>{
        console.log(err)
    })

        
    

})


router.post('/signIn',(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({msg:"user sign in successfully"})
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email, followers, followings, photo}=savedUser
                res.json({token,user:{_id,name,email,followers, followings, photo}})// generate token
            }
            else {
                return res.status(422).json({error:"invalid password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})


module.exports=router; // export router