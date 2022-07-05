

const express = require("express"); // req expree

const app=express();//creating app
const PORT=process.env.PORT || 5000
const mongoose=require("mongoose"); //req mongoose

const {MONGOURI}=require('./config/keys') // req from other file


const customMiddleWare=(req,res,next)=>{
    console.log("middle ware executed");
    next();// use to go to the nxt fn
} //middle ware func created


// mongoose.connect(MONGOURI,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true

// })
// mongoose.connection.on('connected',()=>{
//     console.log("connected with the database");
// })
// mongoose.connection.on('error',(err)=>{
//     console.log("error is",err);
// })
// connecting db long process


mongoose.connect(MONGOURI) // connect mongoose to database
.then(function(db){console.log("db connected");})
.catch(function (err) {
    console.log("err", err);
})     //conmectinng db  most easy way


require('./Models/user')
require('./Models/post')
app.use(express.json()); // its an middleware
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))




// app.use(customMiddleWare); // to run customMiddleWare function when ever page is refresh
// i.e. it is run for all the routes



// this is called Route handler
// app.get('/',(req,res)=>{
//     console.log("home page run");
//     res.send("hello world");
// })// get home page

// app.get('/about',customMiddleWare,(req,res)=>{
//     console.log('about page run');
//     res.send("About Page");
// })// get about page


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path =require('path')
    app.get("*", (req, res)=>{//* -> mean any request client do
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}


app.listen(PORT,()=>{

    console.log("server is running in port 5000");
})// listening server