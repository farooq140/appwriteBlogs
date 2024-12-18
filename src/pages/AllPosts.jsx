import React,{useEffect,useState} from 'react'
import service from "../appwrite/config"
import ReactPaginate from 'react-paginate'
import { PostCard,Container } from '../components'
function AllPosts() {
     const [posts, setPosts] = useState([])
  
     useEffect(()=>{
          service.getPosts([])        
          .then((post)=>{
               
               
               if(post){     
                    setPosts(post.documents)
                    // items.push(posts.slice(0,3))
               }
          })
     },[])
     //pagination
     const items=posts?.slice(0,3)
     const [pageNumber, setPageNumber] = useState(0)
     const ItemPerPage=3   
      const pagesVisited=pageNumber*ItemPerPage
      const displayItems=posts?.slice(pagesVisited,pagesVisited+ItemPerPage)
      .map((post)=>{
          return(
          <div key={post.$id} className=' p-2 w-1/4'> 
               <PostCard  {...post}/>

          </div>
          )
      })             
      const pageCount=Math.ceil(posts?.length/ItemPerPage)
          const changePage=({selected})=>{
               setPageNumber(selected)
          }
  return (
    <div className='w-full py-8'>
          <Container>
               <div className='flex flex-wrap'>
                    {/* {displayItems.map((post)=>(
                         <div key={post.$id} className=' p-2 w-1/4'> 
                              <PostCard  {...post}/>

                         </div>
                    ))} */}
                   {displayItems}
                        
               </div>

               <div className='  flex  justify-center ' >
                    <ReactPaginate className=' gap-3 bg-slate-800 text-white rounded-lg mt-4 py-3 flex justify-center
               align-center flex-direction-col w-72'
                         previousLabel={"<Previous"}
                         nextLabel={"Next>"}
                         pageCount={pageCount}
                         onPageChange={changePage}
                         containerClassName={"paginationBttns"}
                         previousLinkClassName={"previousBttn"}
                         nextLinkClassName={"nextBttn"}
                         disabledClassName={"paginationDisabled"}
                         activeClassName={"paginationActive"}
                         />
                    </div>
          </Container>
    </div>
  )
}

export default AllPosts