import React,{useEffect} from 'react'
import service from "../appwrite/config"
import { PostCard,Container } from '../components'
function AllPosts() {
     const [posts, setPosts] = React.useState([])
     useEffect(()=>{
          service.getPosts([])
          .then((post)=>{
               console.log(posts,"PPPPPPPPPPPPPPPPPPPP")
               
               if(post){
                    
                    setPosts(post.documents)
                    console.log(post.documents,"after")
               }
          })
     },[])
     posts.map((post)=>console.log(post.$id,post.content,post.title,post.featuredImage))
     console.log(posts,"after useEffect")
  return (
    <div className='w-full py-8'>
          <Container>
               <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                         <div key={post.$id} className=' p-2 w-1/4'> 
                              <PostCard  {...post}/>

                         </div>
                    ))}
               </div>
          </Container>
    </div>
  )
}

export default AllPosts