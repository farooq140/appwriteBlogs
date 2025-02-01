import {useEffect,useState} from 'react'
import service from '../appwrite/config'
import { Container,PostCard} from '../components'
// import authService from '../appwrite/auth'
import ReactPaginate from 'react-paginate' 
function Home() {
   
    const [posts, setPosts] = useState([])
     
    
    useEffect(()=>{
         service.getPosts([])        
         .then((post)=>{

              if(post){     
                   setPosts(post.documents)
                
              }
         })
    },[])
    console.log("AllPost::line no 19",posts)
    //pagination
    const [pageNumber, setPageNumber] = useState(0)
    const ItemPerPage=4   
     const pagesVisited=pageNumber*ItemPerPage
     console.log('AllPosts:: line no 52',)
     const displayItems=posts?.slice(pagesVisited,pagesVisited+ItemPerPage)
     .map((post)=>{
         return(
         <div key={post.$id} className=' w-3/12'> 
              <PostCard  {...post}/>

         </div>
         )
     })   
             
     const pageCount=Math.ceil(posts?.length/ItemPerPage)
         const changePage=({selected})=>{
              setPageNumber(selected)
         }
 if(posts.length===0){
          return  (
               <div className="w-full py-8 mt-4 text-center">
                   <Container>
                       <div className="flex flex-wrap">
                           <div className="p-2 w-full">
                               <h1 className="text-2xl font-bold hover:text-gray-500">
                                   <p>Login to read posts</p> 
                                   
                               </h1>
                           </div>
                       </div>
                   </Container>
               </div>
           )
      }     

 return (
   <div className='w-full py-8'>
         <Container >
              <div className='flex flex-wrap gap-5 justify-center'>
    
                  {displayItems}
                      
              </div>

              <div className='  flex  justify-center  ' >
                   <ReactPaginate className=' gap-4 bg-slate-800 text-white rounded-lg mt-28 py-3 flex justify-center
              align-center flex-direction-col w-44 mx-auto'
                        previousLabel={"<"}
                        nextLabel={">"}
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

export default Home