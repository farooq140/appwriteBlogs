import {useState} from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom' 
import  authService from '../appwrite/auth'


       

function PostCard({$id, title, content,featuredImage}) {
  console.log(service.getFilePreview(featuredImage),"featuredImage")
  const cleanContent=content.replace(/<[^>]*>/g, "")
   const subStr= cleanContent.substr(0, 58)
  

    
     
  return (
   
    <Link to={`/post/${$id}`} className='p-0     ' >
          <div className='card   bg-gray-100 rounded-xl  min-w-80px  max-w-80px  justify-center flex-col  '>                
             <figure className=' p-0   '>
                  <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl     ' />

                </figure>
              <div className='card-body'>
                <h2 className='card-title text-xl text-gray-700 font-bold p-3' >
                    {title}
                </h2> 
                <div className='card-action text-gray-500   p-2 flex   '>
                  {subStr}<span className='text-blue-500'>...</span>

                </div>
              </div>      
              


          </div>
     </Link>

  )
}

export default PostCard