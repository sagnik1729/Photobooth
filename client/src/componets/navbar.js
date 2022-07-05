import React ,{useContext}from "react";
import { Link , useNavigate} from "react-router-dom";
import { UserContext } from "../App";
const NavBar=()=>{
    const navigate=useNavigate()
    const {state, dispatch}=useContext(UserContext)
    const render=()=>{
        // console.log(state)
        if(state){
            return[
                <li><Link to="/fetchSubPosts">My Following Post </Link></li>,
                <li><Link to="/createPost"><i className="material-icons">control_point</i></Link></li>,
                <li><Link to="/myPost">My Profile</Link></li>,
                <li><button
                onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    navigate('/signIn')
                }}>
                    Log Out
                </button>
                </li>
            ]
        }else{
            return[
                <li><Link to="/signIn">LogIn</Link></li>,
                <li><Link to="/signUp">SignUp</Link></li>
            ]
        }
    }
    return(
        <nav>
        <div className="nav-wrapper white">
            <Link to={state?'/':'signUp'} className="brand-logo left">Photobooth</Link> // Link is use; in place of anchor tag not to refresh the page while routing
            <ul id="nav-mobile" className="right">
            
                {render()}
            
            
            </ul> 
        </div>      
        </nav>
    );
}
export default NavBar;
