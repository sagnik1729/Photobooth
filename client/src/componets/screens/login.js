import React ,{useState,useEffect, useContext}from "react";
import { useNavigate ,Link} from "react-router-dom";
import {UserContext} from '../../App'

import M from 'materialize-css'


const LogIn=()=>{
    const {state, dispatch}=useContext(UserContext)
    const[password,setPassword]=useState("")
    const navigate=useNavigate()
    const[email,setEmail]=useState("")
    console.log(typeof state);
    if(typeof state=="string") {
        window.location.reload()
    }
    const PostData=()=>{
        

        fetch("/signIn",{
            method:"post",
            headers:{
                "Content-Type":"application/json"

            },
            body:JSON.stringify({
                email,
                password
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER", payload:JSON.stringify(data.user)})
                M.toast({html: "signin successfully"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        // <h1>This is login page</h1>

        <div className="mycard">
            <div className="card authcard input-field">
            <h3 > Photobooth</h3>
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

            <button  onClick={()=>PostData()} className="btn waves-effect #5e35b1 deep-purple darken-1 ">Log In
            </button>

            
            <br/>

            <small><Link to="/signUp">Don'thave an account?</Link></small>

            </div>
        </div>
    );
}
export default LogIn;