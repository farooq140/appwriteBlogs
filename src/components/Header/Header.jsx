import {useState,useEffect} from 'react'
import {Container,Logo,LogoutBtn} from "../index"
import {Link,NavLink} from "react-router-dom"
import authService from "../../appwrite/auth"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus=useSelector((state)=>state.auth.status)
  const [user, setUser] = useState(" ")
// console.log(authStatus,"authStatussssss")
  useEffect(() => {
    setUser(" ")  
    const fetchUser = async () => {
      const userCheck = await authService.getCurrentUser();
      if(userCheck) setUser(userCheck.name);
      
    };
    fetchUser();  
  }, [authStatus]);
   console.log(user,"userrrr")
 
  const navigate=useNavigate()
  const navItem=[
    {
      name: user,
      slug: "/profile",
      active: authStatus,

    },
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  
 
  
  ]
  // const isActive=item=>item.slug===window.location.pathname
  
  return (
    <header>
      <Container/>
      <nav className='flex top-0   py-8 p-2 bg-slate-200'>
        <div className='mr-4 '>
          <Link to='/'>
            <Logo width='80px'/>
          </Link>
        </div>
        <ul className='flex ml-auto'>
          {navItem.map((item)=>item.active ?(
          <NavLink to={item.slug} key={item.name} className={(isActive )=>`block py-2 pr-4 pl-3 duration-200 
              ${item.slug===window.location.pathname && isActive?"text-orange-600   ":"text-gray-500"}
             border-b-2 border-red-600  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
 }>
            <li key={item.name}>
              <button onClick={()=>navigate(item.slug)} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                {item?.name?item?.name:undefined}
              </button>
            </li>
            </NavLink>
          ):null
          )}
          {authStatus && (
            <li >   
              <LogoutBtn/>
            </li>
          )}
        </ul>
      </nav>

    </header>
  )
}

export default Header