import{useEffect,useState} from 'react'
import service from "../../appwrite/config"
import { PostCard } from '../index'
function Item() {
     const [posts, setPosts] = useState([])
  
     useEffect(()=>{
          service.getPosts([])        
          .then((post)=>{
               if(post){     
                    setPosts(post.documents)
                 
               }
          })
     },[])
     const [pageNumber, setPageNumber] = useState(0)
     const ItemPerPage=6   
      const pagesVisited=pageNumber*ItemPerPage
       const displayItems=posts?.slice(pagesVisited,pagesVisited+ItemPerPage)
      .map((post)=>{
          return(
          <div key={post.$id} className=' w-64'> 
               <PostCard  {...post}/>

          </div>
          )
      })
  
}

export default Item