import {useState} from 'react'
import authService from '../appwrite/auth'
import { Link,useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
function Signup() {
    const navigate = useNavigate();
     const {register,handleSubmit,formState:{ errors }}=useForm()
     const [error,setError]=useState(null)
      const dispatch=useDispatch()
      const Signup=async(data)=>{
          setError(" ")
          try{
               const createSignup= await authService.createAccount(data)
               console.log(createSignup,"createSignup!!!")
               if(createSignup) {
                    const userData =await authService.getCurrentUser()
                    if(userData) dispatch(login(userData));
                    navigate('/')

               } 
          }
      catch(error){
          console.log(error,"error!!!!!!")
          
          setError(error.message="A user with the same  email, already exists in this app try different email")
      }
     }
  return (
    <div className="flex items-center justify-center">
          <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
               <div className="mb-2 flex justify-center">
                         <span className="inline-block w-full max-w-[100px]">
                         <Logo width="100%" />
                         </span>
               </div>
               <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
               <p className="mt-2 text-center text-base text-black/60">
                    if Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all text-gray-600 duration-200 hover:underline"
                    >
                    Login
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center text-lg">{error} </p>}
                <form onSubmit={handleSubmit(Signup)}>
                    <div className='space-y5'>
                         <Input
                              label="Name"
                              placeholder="Enter your name"
                              type="text"
                              {...register('name',{
                                   required:"Name is required",
                                    minLength:{
                                        value:3,
                                        message:"Name must be at least 3 characters"
                                    }  
                              })}
                         />
                          {errors.name && <p className="text-red-600 mt-2 text-sm">{errors.name.message}</p>}    
                         <Input
                              label="Email"
                              placeholder="Enter your email"
                              type="email"
                              {...register('email',{
                                   required:"email is required",
                                   validate: {
                                   matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                   "Email address must be a valid address",

                              }
                              })}   
                         />
                         {errors.email && <p className="text-red-600 mt-2 text-sm">{errors.email.message}</p>}
                         <Input
                              label="Password: "
                              type="password" 
                               name="password"
                              placeholder="Enter your password"
                              {...register("password", {

                              required: "password is required",
                              minLength: {
                                   value: 8,
                                   message: "Password must have at least 8 characters"
                              }
                              })}
                         />
                          {/* <Input type="password" id="pass" name="password" minlength="8" required /> */}
                          {errors.password && <p className="text-red-600 mt-2 text-sm">{errors.password.message}</p>}  
                         <Button
                              type='submit'
                              className='w-full mt-8'
                         >Create  Account</Button>
                    </div>          
               </form>
          </div>
     </div>
  )
}

export default Signup