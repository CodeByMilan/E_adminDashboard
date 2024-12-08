import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import  { login } from '../../store/authSlice'
import { authStatus } from '../../types/status'

interface UserDataTypes {
  email: string,
  password: string
}
const Login = () => {
  const dispatch = useAppDispatch()
  const navigate =useNavigate()
  const {status}=useAppSelector((state)=>state.auth)
  console.log(status)
  const [userData, setUserData] = useState<UserDataTypes>({
    email: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login(userData)).then(()=>{
      navigate('/')
    })
  }

  // useEffect(()=>{
  //   if(status===authStatus.success){
  //     navigate("/")
  //   }
  //   else{
  //     navigate("/login")
  //   }

  // },[status,dispatch])

  return (
    <>
      <div className="flex items-center mt-0 justify-center h-screen">
        <div className="shadow-md p-10 w-[60%] max-w-md">
          <h1 className="text-center font-serif font-bold text-3xl mb-10">
            Login
          </h1>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleChange}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                onChange={handleChange}
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Login
              </button>
            </div>
            <div className="flex justify-center">
              <p className="text-l  text-center pt-5 font-serif px-2 tracking-wider">

              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login