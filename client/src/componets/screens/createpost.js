import React ,{useState, useEffect}from "react";
import { useNavigate} from "react-router-dom";

import M from 'materialize-css'
const CreatePost=()=>{
    const navigate=useNavigate()
    const[title,setTitle]=useState("")
    const[body,setBody]=useState("")
    const[image,setImage]=useState("")
    const[URL,setURL]=useState("")
    useEffect(()=>{
        if(URL){fetch('/createPost',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                photo:URL
                
                
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html:data.error})

            }
            else{
                M.toast({html: "post created successfully"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err);
        })}

    },[URL])//dependencies
    const PostDetails=()=>{
        const data=new FormData()
        data.append("file", image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name", "sazz20")
        fetch("https://api.cloudinary.com/v1_1/sazz20/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setURL(data.url)
        }).catch(err=>{
            console.log(err);
        })
        
        
        
    }
    
    return(
        // <h1>This is create post page</h1>
        <div className="mycard">
            <div  className="card input-field authcard">
                <h2> Photobooth</h2>
                <h6 style={{textAlign: "left", fontFamily: "'Grand Hotel', cursive"}}> Upload your photoes :)</h6>

                <input 
                type="text" 
                placeholder="title" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />

                <input 
                type="text" 
                placeholder="content" 
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                
                />
                <div className="file-field input-field">
                    <div>
                        <label className="btn waves-effect #5e35b1 deep-purple darken-1 ">
                                <i className="material-icons" style={{marginRight:"10px"}}>cloud_upload</i> upload
                                <input type="file" //onChange={(e)=>console.log(e.target.files[0])}// file what we upload that path will be taken
                                onChange={(e)=>setImage(e.target.files[0])}
                                /> 
                        </label>
                        
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button className="btn waves-effect waves-light #5e35b1 deep-purple darken-1 "
                    onClick={()=>PostDetails()}>
                        Submit post
                </button>
                
            </div>
        </div>
    
    );
}
export default CreatePost;