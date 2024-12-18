import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authServices from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
// import './App.css'
import { Footer, Header } from './components'

function App() {
const [loading, setLoading] = useState(true)
const dispatch = useDispatch()
useEffect(() => {
  authServices.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=> setLoading(false))
},[])

return !loading?(
  <div className='h- flex flex-col  m-0 p-0 bg-gray-300 h-lvh justify-between ' >
  <div className='w-full  m-0 p-0 flex flex-col '>
    <Header />
    <main>
     <Outlet />
    
    </main>
    <Footer />
  </div>
</div>
):null
 
}

export default App
