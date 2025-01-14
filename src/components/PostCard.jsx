import {useState} from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom' 
import  authService from '../appwrite/auth'

       

function PostCard({$id, title, content,featuredImage}) {
  console.log(service.getFilePreview(featuredImage),"featuredImage")
  const cleanContent=content.replace(/<[^>]*>/g, "")
   const subStr= cleanContent.substr(0, 68)
   const [users,setUsers]=useState([])
   const authStatus=async function(){
    try{
      const user= await authService.getCurrentUser()
      if(user){
        setUsers(user)
      }
    } catch(e) {
        console.log(e,"error!!!!!!")
    }
     
   }
   console.log(users,"user go yar",authStatus)   
  return (
    <Link to={`/post/${$id}`}>
          <div className=' bg-gray-100 rounded-xl p-4 w-60 h-80  '>
              <div className='w-full justify-center '>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl w-44 h-48    ' />

               </div>
               <h2 className='text-xl text-gray-700 font-bold'>
                    {title}
              </h2> 
              <div className='text-gray-500'>
                {subStr}
              </div>


          </div>
     </Link>

  )
}

export default PostCard