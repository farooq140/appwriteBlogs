import { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authServices from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { Outlet } from 'react-router-dom'
import './App.css'
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
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
    <Header />
    <main>
     <Outlet />
    Todo
    </main>
    <Footer />
  </div>
</div>
):null
 
}

export default App