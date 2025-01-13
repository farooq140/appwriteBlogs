import {useEffect,useState} from 'react'
import service from '../appwrite/config'
import { Container,PostCard} from '../components'
 
function Home() {
     const [posts,setPosts] = useState([])
     useEffect(()=>{
          service.getPosts()
          .then((posts)=>{
               console.log("Home.js:: getPosts() home line no 11  ",posts.total,posts.documents[0],posts.documents.length)
               setPosts(posts.documents)
          })
          

     },[])
     if(posts.length===0){
          return  (
               <div className="w-full py-8 mt-4 text-center">
                   <Container>
                       <div className="flex flex-wrap">
                           <div className="p-2 w-full">
                               <h1 className="text-2xl font-bold hover:text-gray-500">
                                   Login to read posts
                                   
                               </h1>
                           </div>
                       </div>
                   </Container>
               </div>
           )
      }     
     //pagination
      
         
             
                   
           
      

               
      
 return(
     <div className='w-full py-8 '>
          <Container>
               <div className="flex flex-wrap "  >
                   
               {posts.map((post)=>{
               return(
               <div key={post.$id} className=' p-4 w-3/12  '>

                    <PostCard  {
                         
                         ...post}/>
     
               </div>
               )
           })}

               </div>
              
          </Container>

     </div>

 )
}

export default Home