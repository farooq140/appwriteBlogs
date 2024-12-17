import React from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom'     
function PostCard({$id, title, content,featuredImage}) {
  console.log(service.getFilePreview(featuredImage),"featuredImage")
  return (
    <Link to={`/post/${$id}`} className="w-full h-1/6 ">
          <div className='w-full bg-gray-100 rounded-xl p-4   '>
              <div className='w-full justify-center '>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl text-center mb-4  mx-auto ' />

               </div>
               <h2 className='text-xl text-gray-700 font-bold'>
                    {title}
                    </h2> 
          </div>
     </Link>

  )
}

export default PostCard