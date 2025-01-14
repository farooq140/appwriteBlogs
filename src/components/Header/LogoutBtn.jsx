
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
function LogoutBtn() {
     const dispatch = useDispatch()
     const logoutHandler=()=>{
          console.log('logoutBtn:: line no 8 logoutHandler',authService)          
          authService.logout().then(()=>{
          console.log('logoutBtn:: line no 9 logoutHandler',authService)          

               dispatch(logout())
              setTimeout(()=>{
                   window.location.reload()
              })

          })
     }


     return (
          <button
               className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
               onClick={logoutHandler}
               >Logout
          </button>
        )
}

export default LogoutBtn