import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import  PostCard  from '../components/PostCard';
import  Container  from '../components/container/Container';
import ReactPaginate from 'react-paginate' 
import { Link } from 'react-router-dom';
function Profiles() {
  const authStatus = useSelector(state => state.auth.status);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [myUserPosts, setMyUserPosts] = useState(null);
  const [blog, setBlog] = useState(null);
  const [pageNumber, setPageNumber] = useState(0)
  
  const auth = async function () {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
        setCurrentUser(userData.$id);
      }
      console.log("Profiles.jsx::line no 24", userData);
    } catch (e) {
      console.log(e, "error!!!!!!");
    }
  };

  const getPostsUser = async function () {
    try {
      const posts = await service.getPosts();
      setMyUserPosts(posts.documents);
      const userPosts = posts.documents.filter(post => post?.userId === currentUser);
      if (userPosts.length > 0) {
        setBlog(userPosts); // Assuming you want the first post as the blog
      }
      console.log("profiles:: line no 35 mappost", userPosts);
    } catch (e) {
      console.log(e, "error!!!!!!");
    }
  };

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    if (currentUser) {
      getPostsUser();
    }
  }, [currentUser]);

  useEffect(() => {
    if (myUserPosts && blog) {
      console.log("Profiles.jsx::line no 41", blog);
    }
  }, [myUserPosts, blog]);
  
  const ItemPerPage=3   
  const pagesVisited=pageNumber*ItemPerPage
  console.log('AllPosts:: line no 52',)
  const displayItems=blog?.slice(pagesVisited,pagesVisited+ItemPerPage)
  .map((post)=>{
      return(
      <div key={post.$id} className=' w-3/12'> 
           <PostCard  {...post}/>

      </div>
      )
  })
  const pageCount=Math.ceil(blog?.length/ItemPerPage)
  const changePage=({selected})=>{
       setPageNumber(selected)
  }
  console.log(user, "userEnddddd");
  console.log(authStatus, "authStatus");

  return (
    <>
      <h1 className='font-bold text-lg mx-4'>Profiles </h1>
      <ul className='mx-5 '>
        <li className='mb-4'>
          name: {user?.name}
        </li>
        <li className='mb-4'>
          email: {user?.email}
        </li>
        <li className='mb-4'>
          id: {user?.$id}
        </li>
      </ul>
      
{ blog?.length>0?
  <div className='w-full py-8'>
  <Container >
       <div className='flex flex-wrap gap-5 justify-center'>
  
           {displayItems}
               
       </div>
  
       <div className='  flex  justify-center ' >
            <ReactPaginate className=' gap-4 bg-slate-800 text-white rounded-lg mt-28 py-3 flex justify-center
              align-center flex-direction-col w-40 '
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
  
  :<div className="w-full py-8 mt-4 text-center">
      <p>No posts found  
        { <Link to="/add-post"
                        className="font-medium mx-2 text-purple-500 transition-all duration-200   hover:underline"
                    >
                        Add New Post
                    </Link>
}
        
         </p> 
    </div>
}
        
        
      
    </>
  );
}

export default Profiles;