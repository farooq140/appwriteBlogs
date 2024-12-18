import React from 'react'
import service from "../appwrite/config"
import { Link } from 'react-router-dom'     
function PostCard({$id, title, content,featuredImage}) {
  console.log(service.getFilePreview(featuredImage),"featuredImage")
  const cleanContent=content.replace(/<[^>]*>/g, "")
   const subStr= cleanContent.substr(0, 70)
   
  return (
    <Link to={`/post/${$id}`} className="w-full  ">
          <div className='w-full  rounded-xl p-4 h-80 bg-slate-50 '>
              <div className='w-full justify-center '>
                <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl h-36 text-center mb-4  mx-auto ' />

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