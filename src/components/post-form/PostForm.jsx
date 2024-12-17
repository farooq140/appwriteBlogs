import React,{useCallback, useEffect} from 'react'
import {Input,Button,RTE,Select} from '../index'

import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'    

function PostForm({post}) {
     const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
          defaultValues:{
               title:post?.title || "",
               slug:post?.$id || "",
               content:post?.content || "",
               status:post?.status || "active",
               
          },

     })
     const navigate=useNavigate()
     const userData=useSelector(state=>state.auth.userData)
     const submit=async(data)=>{
          if (post) {
               const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
   
               if (file) {
                   appwriteService.deleteFile(post.featuredImage);
               }
   
               const dbPost = await appwriteService.updatePosts(post.$id, {
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
                   const dbPost = await appwriteService.createPost({ ...data, userId: userData?.userData?userData?.userData.$id:userData.$id });

                   if (dbPost) {
                       navigate(`/post/${dbPost.$id}`);
                   }
               }
           }
     }
    
     const slugTransform=useCallback((value)=>{
          if(value && typeof value==="string"){
               return value
               .trim()
               .toLowerCase() 
               .replace(/[^a-zA-Z\d\s]+/g, "-")
               .replace(/\s/g, "-");
               
               return ""
          }
     },[])
     useEffect(()=>{
          const subscription=watch((value,{name})=>{
               if(name==="title"){
                    let ch= setValue("slug",slugTransform(value.title),
                              {shouldValidate:true}
                           )
                           
                    
                      }
          })
          return ()=>{
               subscription.unsubscribe()
              }
     },[watch,slugTransform,setValue])
  return (
    <form onSubmit={handleSubmit(submit)}  className="flex flex-wrap ">
     <div className='w-2/3 p-2'>
          <Input
               label="title"
               placeholder="Enter the title"
               className="mb-4"
               {...register("title",{required:true})}
          />
          <Input
               label="slug"
               disabled={post?.$id}
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
             defaultValue={getValues("content")}
          
          />
     </div>

     <div className='w-1/3 py-2'>
          
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
  )
}

export default PostForm