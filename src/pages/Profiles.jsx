import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login,logout} from "../store/authSlice"
import  authService from '../appwrite/auth'
import service from '../appwrite/config'
import { use } from 'react'
function Profiles() {
  const authStatus=useSelector(state=>state.auth.status)
const navigate = useNavigate()
const [loading,setLoading] = useState(true)
const [user,setUser] = useState(null)
const [error,setError] = useState(null)
let userData
const auth= async function (data){
  setError("")
  try{
     
          userData =await authService.getCurrentUser(data) 
          console.log(user,"user go yar")       
           if(userData) 
            setUser( userData);
      }
  catch(e){
    console.log(e,"error!!!!!!")
       setError(e.message)

      //  userId auth one 6760ff900033634704a1 two 675d756100339300a0fc three 675d743400334179ccc7
  }
} 
let hello
const getPostsUser=async function (data){
    try{
      const userPosts= await service.getPostsUserId(data)
      console.log(userPosts?.documents,"userPosts",data,"dataaa")
    }catch(e){
      console.log(e,"error!!!!!!")
    }
}
let userPost
useEffect(()=>{
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