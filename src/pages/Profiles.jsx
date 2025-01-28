import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { data, useNavigate } from 'react-router-dom'
import {login,logout} from "../store/authSlice"
import  authService from '../appwrite/auth'
import service from '../appwrite/config'
function Profiles() {
  const authStatus=useSelector(state=>state.auth.status)
const navigate = useNavigate()
const [loading,setLoading] = useState(true)
const [user,setUser] = useState(null)
const [currentUser,setCurrentUser] = useState(null)
const[postTitle,setPostTitle]=useState(null)
const [error,setError] = useState(null)
let userData
const auth= async function (id){
  console.log("Profiles.jsx::line no 15",authStatus)
  setError("")
  try{
     
          userData =await authService.getCurrentUser(id) 
           if(userData) 
            setUser( userData);
          setCurrentUser(userData.$id)
      }
  catch(e){
    console.log(e,"error!!!!!!")
       setError(e.message)

     
  }
}
console.log("profiles.js line no 33 user and userId",user,currentUser)       

let myUserPosts
const getPostsUser=async function (){
    try{
       myUserPosts= await service.getPosts()
       const userPosts=myUserPosts.documents.map((posts)=>posts.userId===currentUser?posts.title:"")      
      console.log("profiles:: line no 35",userPosts)
      return userPosts
    }catch(e){
      console.log(e,"error!!!!!!")
    }
}
console.log("Profiles.jsx::line no 41",myUserPosts,getPostsUser(data).then((data)=>data))
let userPost
useEffect(()=>{
  getPostsUser()
  if(authStatus){
    auth()
    
    service.getPostsUserId([])
    .then((post)=>{
      if(post){     
         userPost= post?.documents.map((posts)=>(<div>  {posts?.content}</div>))
        console.log("hellooooo")        
           
         }
    })
    // const users=auth().then((user)=>user)
    console.log("hello world user Data",userData?.$id)
    

  }
  else{
    navigate("/login")
  }  
},[])
 
console.log(user,"userEnddddd")
  console.log(authStatus,"authStatus",)
  return (
    <>
       
      <div>Profiles </div>
      <ul className='mx-5 '>
        <li className='mb-4'>
          name: {user?.name}
        </li>
        <li className='mb-4'>
          email: {user?.email}
        </li>
        <li className='mb-4'>
          id: {user?.$id}
        </li>
      </ul>
      {userPost}
    </>
    
  )
}

export default Profiles