import React,{useState, useEffect,useContext} from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
const HomeSub=()=>{
    const [data, setData]=useState([])
    const{state, dispatch}=useContext(UserContext)
    // console.log(state);
    useEffect(()=>{
        fetch('/fetchSubPosts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setData(result.posts)
        })

    },[])
    const likePost=(id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")


            },
            body:JSON.stringify({
                postid:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }
    const unlikePost=(id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")


            },
            body:JSON.stringify({
                postid:id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err);
        })
    }
    const makeComment=(text, postid)=>{
        fetch('/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")


            },
            body:JSON.stringify({
                postid,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData=data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err);
        })
    }
    // const deletePost=(postid)=>{
    //     fetch(`/deletePost/${postid}`,{
    //         method:"delete",
    //         headers:{
    //             "Authorization":"Bearer "+localStorage.getItem("jwt")
    //         }
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         console.log(result);
            
    //         const newData=data.filter(item=>{
    //             // console.log(item)
    //             // return (item._id)!=(result._id)
    //             if(item._id!=result._id){
    //                 return result
    //             }
    //         })
    //         setData(newData)
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // }
    const deletePost = (postid)=>{
        fetch(`/deletePost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                // return item._id !== result._id
                if(item._id!=result._id){
                    return result
                }
            })
            setData(newData)
        })
    }




    return(
        // <h1>This is home page</h1>
        
        <div className="home">
            {   
                
                data.slice(0)
                .reverse().map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5 style={{marginBottom:"20px"}}><Link to={item.postedBy._id!==state._id ?`/myPost/${item.postedBy._id}` :'/myPost'}>{item.postedBy.name}  </Link>
                            
                            {item.postedBy._id==state._id &&
                            <i className="material-icons" style={{float:"right", cursor:"pointer"}} 
                            onClick={()=>deletePost(item._id)}>delete</i> }
                            </h5>
                            <div className="card-image" style={{backgroundColor:"black"}}>
                                <img style={{width:"100%",display: "block", margin:"0px auto"}} src={item.photo} alt="" />
                            </div>

                            <div className="card-content">
                                {/* <i className="material-icons">favorite_border</i> */}

                                {   item.Like.includes(state._id)
                                ? 
                                <i className="material-icons" style={{color:"#e53935",cursor:"pointer"}}
                                onClick={()=>{unlikePost(item._id)}}
                                >favorite</i>
                                :
                                <i className="material-icons " style={{cursor:"pointer"}}
                                onClick={()=>{likePost(item._id)}}
                                >favorite_border</i>

                                }
                            
                                

                                <p>{item.Like.length} likes</p>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                {   item.Comment.length>0
                                    ?
                                    item.Comment.map(records=>{
                                        return(
                                            <p>
                                                <span key={records.postedBy} style={{fontWeight:"bold"}}> {records.postedBy.name}  </span>{records.text}
                                            </p>
                                        )
                                    })
                                
                                    :<small>no comments yet...</small>
                                    
                                
                                }
                                <form 
                                        onSubmit={(e)=>{
                                        e.preventDefault()
                                        console.log(e.target);
                                        makeComment(e.target[0].value, item._id)
                                        e.target[0].value=""
                                    }}
                                    >
                                
                                    <input  type="text" placeholder="Comments" />
                                    {/* <spam><submit style={{float:"right"}}><i class="material-icons">send</i></submit></spam> */}
                                </form> 

                                
                            </div>
                        </div>

                    )
                })
            }
        </div>
        
        );
}
export default HomeSub;



// {
//     data.map(item=>{
//         return(
//             <div className="card home-card">
//                 <h5 style={{marginBottom:"20px"}}>Sagnik Banerjee</h5>
//                 <div className="card-image" style={{backgroundColor:"black"}}>
//                     <img style={{width:"100%",display: "block", margin:"0px auto"}} src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
//                 </div>

//                 <div className="card-content">
//                     <i className="material-icons">favorite_border</i>
//                     <p>likes</p>
//                     <h6>First post</h6>
//                     <p>this is my first trial post</p>

//                 </div>
//             </div>

//         )
//     })
// }





{/* <div className="card home-card">
<h5 style={{marginBottom:"20px"}}>Sagnik Banerjee</h5>
<div className="card-image" style={{backgroundColor:"black"}}>
    <img style={{width:"100%",display: "block", margin:"0px auto"}} src="https://images.unsplash.com/photo-1561495376-dc9c7c5b8726?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
</div>

<div className="card-content">
    <i className="material-icons">favorite_border</i>
    <p>likes</p>
    <h6>First post</h6>
    <p>this is my first trial post</p>

</div>
</div>
<div className="card home-card">
<h5 style={{marginBottom:"20px"}}>Sagnik Banerjee</h5>
<div className="card-image"  style={{backgroundColor:"black"}}>
    <img style={{width:"100%",display: "block", margin:"0px auto"}} src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
</div>
<div className="card-content">
    <i className="material-icons">favorite_border</i>
    <p>likes</p>
    <h6>2nd post post</h6>
    <p>this is my second trial post</p>

</div>
</div> */}