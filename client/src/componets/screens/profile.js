import React ,{useState,useEffect,useContext}from "react";
import { UserContext } from "../../App";
const Profile=()=>{
    const [pic, setPic]=useState([])
    const {state, dispatch}=useContext(UserContext)
    const[img, setImg]=useState("")
    
    // const[URL, setURL]=useState(undefined)
    console.log(state);
    
    console.log(typeof state);
    if(typeof state=="string") {
        window.location.reload()
    }
    useEffect(()=>{
        fetch('/myPost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setPic(result.mypost)

        })
        
    },[])
    useEffect(()=>{
        if(img){
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
                
                
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        photo:data.url  
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result);
                    localStorage.setItem("user", JSON.stringify({...state, photo:result.photo}))
                    dispatch({type:"UPDATEPIC", payload:result.photo})
                })
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[img])
    const UpdatePhoto=(file)=>{
            setImg(file)
            
            
        
    }
    return(
        // <h1>This is profile page</h1>
        <>
        {
            state ?

            <div className="container-fluid" style={{maxWidth:"900px",margin:" 0px auto"}}>
                <div style={{margin:"25px 10px",padding:"0px 0px 10px", borderBottom:"1px solid grey"}}>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        {/* top part */}
                        <div>

                            <div>
                                {/* for profile photo */}
                                <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={state?state.photo:"loading"} alt="" />




                            </div>
                        
                            <div style={{ margin: "5px 65px 5px", backgroundColor: "#ffffff" }}>
                                <label>

                                        <i style={{color:"black",cursor:"pointer"}} className="material-icons">add_a_photo</i>
                                        <input type="file" 
                                        //onChange={(e)=>console.log(e.target.files[0])}// file what we upload that path will be taken
                                        onChange={(e)=>UpdatePhoto(e.target.files[0])}
                                        /> 
                                </label>
                                
                                
                            </div>
                            
                        </div>
                        <div>
                            {/* for name followers post */}
                            <h4>{state?state.name:"laoding"}</h4>
                            {/* <h4>Sagnik Banerjee</h4> */}
                            <h6>{state?state.email:"laoding"}</h6>
                            <div style={{display:"flex", justifyContent:"space-between", width:"130%"}}>
                                <h6>{pic.length} posts</h6>
                                <h6>{state?state.followers.length:"0"} Followers</h6>
                                <h6>{state?state.followings.length:"0"} followings</h6>

                            </div>
                        
                        </div>

                    </div>
                </div>


                <div className="gallery">
                    {

                        pic.map(item=>{
                            return(
                                <img key={item._id} className="item" src={item.photo} alt={item.title} />

                            )
                        })
                    }

                    {/* <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" /> */}
                    {/* <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                    <img className="item" src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" /> */}

                    </div>

                </div>
        :
            
            <h2> Loading... </h2>


        }

        </>

    );
}
export default Profile;