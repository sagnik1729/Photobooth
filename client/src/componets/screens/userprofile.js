import React ,{useState,useEffect,useContext}from "react";
import { UserContext } from "../../App";
import { useParams} from "react-router-dom";
const UserProfile=()=>{
    const [userProfile, setProfile]=useState(null)
    const {state, dispatch}=useContext(UserContext)
    const {userid}=useParams()
    const [showfollow, setShowfollow]=useState(state)
    // setShowfollow(state?!state.followings.includes(userid):true)
    console.log(userid);
    // console.log(state);
    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
           
            setProfile(result)

        })
    },[])
    const followUser=()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followid:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch({type:"UPDATE", payload:{followings:data.following, followers:data.follower}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState)=>{
                return{

                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }

                }
            })
            setShowfollow(false)
        })
    }
    const unfollowUser=()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowid:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch({type:"UPDATE", payload:{followings:data.following, followers:data.follower}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile((prevState)=>{
                const newFollowers=prevState.user.followers.filter(item=>item!=data._id)
                return{

                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollowers
                    }

                }
            })
            setShowfollow(true)
        }) 
        
    }
    return(
        // <h1>This is profile page</h1>
        <>
        {
            userProfile?
            <div className="container-fluid" style={{maxWidth:"900px",margin:" 0px auto"}}>
            <div style={{margin:"25px 10px",padding:"0px 0px 10px", borderBottom:"1px solid grey"}}>
                <div style={{display:"flex", justifyContent:"space-around"}}>
                    {/* top part */}
                    <div>
                        {/* for profile photo */}
                        <img style={{width:"160px", height:"160px", borderRadius:"80px"}} src={userProfile.user.photo} alt="" />




                    </div>
                    <div>
                        {/* for name followers post */}
                        <h4>{userProfile.user.name}</h4>
                        {/* <h4>Sagnik Banerjee</h4> */}
                        <h6>{userProfile.user.email}</h6>
                        <div style={{display:"flex", justifyContent:"space-between", width:"130%"}}>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>{userProfile.user.followers.length} followers</h6>
                            <h6>{userProfile.user.followings.length}  followings</h6>

                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", width:"130%"}}>
                        {
                        showfollow
                        ?
                    
                        <button className="btn waves-effect waves-light" 
                        onClick={()=>followUser()}
                        >Follow
                        </button>

                        :

                        <button className="btn waves-effect waves-light" 
                        onClick={()=>unfollowUser()}
                        >Unfollow
                        </button>
                        

                        }  
                        </div>         
                    
                    </div>

                </div>
            </div>


            <div className="gallery">
                {

                userProfile.posts.map(item=>{
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
            <h2>Loading...</h2>
        }
        

    </>
    );
}
export default UserProfile;