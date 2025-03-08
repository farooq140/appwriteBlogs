import {useCallback, useEffect, useState} from 'react'
import {Input,Button,RTE,Select} from '../index'

import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'    

function PostForm({post}) {
     const [error,setError]=useState("")
     const {register,handleSubmit,watch,setValue,control,getValues,formState:{errors}}=useForm({
          defaultValues:{
               title:post?.title || "",
               slug:post?.$id || "",
               content:post?.content || "",
               status:post?.status || "active",
               errors:post?.errors || "",
               
          },

     })
     const navigate=useNavigate()
     const userData=useSelector(state=>state.auth.userData)
     console.log('postForm::line no 23data',userData)
     const submit=async(data)=>{
          if (post) {
               const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
   
               if (file) {
                  await appwriteService.deleteFile(post.featuredImage);
               }
   
               const dbPost = await appwriteService.updatePosts(post?.$id, {
                   ...data,
                   featuredImage: file ? file.$id : undefined,
               });
   
               if (dbPost) {
                   navigate(`/post/${dbPost.$id}`);
               }
           } else {
               const file = await appwriteService.uploadFile(data.image[0]);
   
               if (file) {
                   const fileId = file.$id;
                   data.featuredImage = fileId;
                   const dbPost = await appwriteService.createPost({ ...data,
                     userId: userData?.userData?userData?.userData.$id:userData.$id });
                     console.log(userData,"user data")
                    // ten user 6760ff900033634704a1 675d743400334179ccc7 one

                   if (dbPost) {
                       navigate(`/post/${dbPost.$id}`);
                   }
               }
           }
     }
    
     const slugTransform=useCallback((value)=>{
          if(value && typeof value==="string")
               return value
               .trim()
               .toLowerCase() 
               .replace(/[^a-zA-Z\d\s]+/g, "-")
               .replace(/\s/g, "-");
               
               return ""
          
     },[])
     useEffect(()=>{
          const subscription=watch((value,{name})=>{
               if(name==="title"){
                     setValue("slug",slugTransform(value.title),{shouldValidate:true})}
          })
          return ()=>{
               subscription.unsubscribe()
              }
     },[watch,slugTransform,setValue])

 console.log(errors,"errors!!!!") 
return (
 <div className='w-full p-4'> 
     
    <form onSubmit={handleSubmit(submit)}  className="flex  flex-row ">
   
     
     <div className='w-2/3 p-2 flex-wrap'>
          <Input
               label="Title"
               placeholder="Enter the Title"
               className="mb-4"
               {...register("title",{required:true})}
          />
          <Input
               label="slug"
               // disabled={post?.$id}
               placeholder="slug"
               className="mb-4"
               {...register("slug",{required:true})}
               onInput={(e)=>{
               setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
          }}
          />
          <RTE
             label="content"
             name="content"
             control={control}
             className="m-15 z-30"
             defaultValue={getValues("content")}
          
          />
     </div>

     <div className=' py-2 flex-wrap'>
          
           <Input
                    label="FeaturedImage "
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
          {post &&(
               <div className="w-full mb-4">
                    <img 
                         src={appwriteService.getFilePreview(post?.featuredImage)}
                         alt={post?.title}
                         className="mb-4"
                    />
               </div>
          )}
          <Select
               options={["active","inactive"]}
               label="status"
               className="mb-4"
               {...register("status")}
          />
          <Button type="submit"  bgColor={post ? "bg-green-500" : undefined} className="w-full">
               {post?"Update":"Create"}
          </Button>
     </div>
    </form>
    </div>
  )
}

export default PostForm