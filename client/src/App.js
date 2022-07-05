
import React,{useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './componets/navbar';
import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Home from './componets/screens/home';
import SignUp from './componets/screens/signup';
import LogIn from './componets/screens/login';
import Profile from './componets/screens/profile';
import CreatePost from './componets/screens/createpost';
import UserProfile from './componets/screens/userprofile';
import HomeSub from './componets/screens/subuserpost';
import{initialState,reducer} from './reducer/userReducer'


export const UserContext=createContext()
const Routing=()=>{
const nevigate=useNavigate()
const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      // nevigate('/')// after getting reload  it will always show this page
      dispatch({type:"USER", payload:user})
    }
    else{
      nevigate('/signUp')
    }


  },[])
  return (

    <Routes>
        <Route path="/" element={<Home/>}/>  // previously we need to write exact path="/" .. else home page will ocour in every page

        <Route path="/signIn" element={<LogIn />} />
        <Route path="/myPost" element={<Profile />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/myPost/:userid" element={<UserProfile />} />
        <Route path="/fetchSubPosts" element={<HomeSub />} />
        
      </Routes>


  )
}
function App() {
  const [state, dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
      
        <NavBar/>
        <Routing/>

        

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
