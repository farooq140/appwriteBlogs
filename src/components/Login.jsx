import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { login as  authLogin } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth' 
import {useForm} from 'react-hook-form'     

function Login() {
     const {register,handleSubmit,formState: { errors }} = useForm()
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const [error,setError] = useState("")
     console.log("error",errors)
     const login= async(data)=>{
          setError("")
          try{
               const session = await authService.login(data)
               if(session){
                    const userData =await authService.getCurrentUser() 
                    if(userData) console.log("go hello"), dispatch(authLogin(userData));
                    navigate("/")
                    
                    console.log("hello",userData) 
                    
               }
          }
          catch(e){

               setError(e.message)
               console.log("error!!!!",e.status,e.message,e)
               setTimeout(()=>{setError("")},5000)
          }
     }
      
  return (
    <div className='flex items-center justify-center w-full'>
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error &&  <p className="text-red-600 mt-8 text-center">{error}</p>}
     <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
               <Input
               label="Email"
               placeholder="Enter your email"
               type="email"
               {...register('email',{
                    required:"Email is required",
                    validate: {
                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                         "Email address must be a valid address",
                     }
               })}   
               />
               {errors.email && <p className="text-red-600">{errors.email.message}</p>}
               <Input
               label="Password"
               placeholder="Enter your password"
               type="password"
               {...register('password',{
                    required:"Password is required",
                    minLength: {
                         value: 6,
                         message: "Password must have at least 6 characters"
                    }
               })}
               />
               { errors.password && <p className="text-red-600">{errors.password.message}</p>}
               <Button 
                    type='submit'
                    className='w-full'
                    
               >Sign in</Button>
               <p className='text-sm text-slate-500 '>for test use 
                    <span className='text-slate-600'> Email: one@one.com</span>
                    <span className='text-slate-600'> password: password123</span>


               </p>
          </div>
     </form>          
    
    </div>
    </div>
  )
}

export default Login