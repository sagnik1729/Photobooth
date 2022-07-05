import React ,{useState, useEffect}from "react";
import { useNavigate ,Link} from "react-router-dom";

import M from 'materialize-css'
const SignUp=()=>{
    
    const[name,setName]=useState("")
    const[password,setPassword]=useState("")
    const navigate=useNavigate()
    const[email,setEmail]=useState("")
    const[img, setImg]=useState("")
    const[URL, setURL]=useState(undefined)


    useEffect(()=>{
        if(URL){
            uploadFields()

        }
    },[URL])

    const UploadPic=()=>{
        const data=new FormData()
        data.append("file", img)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name", "sazz20")
        fetch("https://api.cloudinary.com/v1_1/sazz20/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setURL(data.URL)
        }).catch(err=>{
            console.log(err);
        })
        
    }
    const  uploadFields=()=>{
        if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invail email"})
            return;
        }
        fetch("signUp",{
            method:"post",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                name,
                email,
                password,
                photo:URL
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html: data.msg})
                navigate('/signIn')
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    const PostData=()=>{
        if(img){
            UploadPic()
        }else{
            uploadFields()
        }
        
    }
    return(
        // <h1>This is signup page</h1>
        <div className="mycard">
            <div className="card authcard input-field">
            <h3 > Photobooth</h3>
            <input 
            type="text" 
            placeholder="enter your name" 
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input 
            type="text" 
            placeholder="enter your email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input 
            type="password" 
            placeholder="enter your password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <div className="file-field input-field">
                <div>
                    <label className="btn waves-effect #5e35b1 deep-purple darken-1 ">
                            <i className="material-icons" style={{marginRight:"10px"}}>cloud_upload</i> upload profile pic
                            <input type="file" 
                            //onChange={(e)=>console.log(e.target.files[0])}// file what we upload that path will be taken
                            onChange={(e)=>setImg(e.target.files[0])}
                            /> 
                    </label>
                    
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>

            <button onClick={()=>PostData()} className="btn waves-effect #5e35b1 deep-purple darken-1 ">Sign Up
            </button>

            
            <br/>

            <small><Link to="/signIn">already have an account?</Link></small>

            </div>
        </div>





    );
}
export default SignUp