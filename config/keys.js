//sazz_20
// http://192.168.0.172:3000
// kYB5DoWgBh4CDzkV
//iamsanai1729@gmail.com
//  Cloudinary -  imsanai1729@gmail.com Sanai@2001 sazz20 //insta-clone
// api -CLOUDINARY_URL=cloudinary://135673225129424:5-O9poEGhZ1JYoDLQDXlXW97frY@sazz20
// module.exports={
//     MONGOURI:"mongodb+srv://sazz_20:kYB5DoWgBh4CDzkV@cluster0.hltx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"abfuyqgfgw"// any random string
// }

// "start": "node App.js",
//    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

// "proxy": "http://localhost:5000",
if(process.env=="production"){
    module.exports=require('./prodprod')
}
else{
    module.exports=require('./dev')
}