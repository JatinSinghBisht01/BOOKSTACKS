import React, { useContext, useState } from 'react'
import {FaUser, FaLock} from 'react-icons/fa'
import {UserContext, notifyError, notifyFieldEmpty, notifyLogin, notifyLoginFail, notifyRegister, notifyUserExist, notifyUserNotFound} from "../../App"
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate()
    const [member, setMember] = useState(false);

    //register
    const [newUser, setNewUser] = useState({
        username:"", password:"", cpassword:""
    })
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') {
          setNewUser((prevUser) => {
            return {
              ...prevUser,
              [name]: value.toLowerCase() // Convert username to lowercase
            };
          });
        } else {
          setNewUser((prevUser) => {
            return {
              ...prevUser,
              [name]: value
            };
          });
        }
      };
      
    const postData = async(e)=>{
        e.preventDefault()
        const {username, password, cpassword} = newUser;
        if(username==="" || password==="" || cpassword===""){
            notifyFieldEmpty()

        }
        else{
            const res = await fetch("/api/auth/register", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username, password, cpassword
                })
            })
            const registerData = await res.json()
            if(!registerData || res.status===422 || res.status===400 || res.status===500 ){
                if(res.status === 422){
                    notifyLoginFail();
                }
                if(res.status === 400){
                    notifyUserExist()
                }
                if(res.status === 500){
                    notifyError();
                }
                console.log("Invalid Registration");
            }
            else{
                // window.alert("Registration Successful");
                console.log("Registration Successful");
                setMember(true);
                notifyRegister()
            }
        }
        
    }

    //login
    const {state, dispatch} =useContext(UserContext);
    const [user, setUser] = useState({
        username:"", password:""
    })

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => {
          return {
            ...prevUser,
            [name]: name === 'username' ? value.toLowerCase() : value
          };
        });
      };

    const postLoginData = async(e)=>{
        e.preventDefault()
        const {username, password} = user;
        if(username==="" || password==="" ){
            notifyFieldEmpty()

        }
        else{
            const response = await fetch("/api/auth/signin", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    username, password
                })
            })
            const loginData = await response.json()
            if(!loginData || response.status === 400 || response.status === 404){
               if(response.status === 400){
                notifyLoginFail()
               }
               if(response.status === 404){
                notifyUserNotFound()
               }
                console.log("Invalid Login");
            }
            else{
                dispatch({type:"USER", payload:true});
                if (response.ok) {
                    const { token } = loginData
                    localStorage.setItem('token', token);
                     // Store the token in localStorage
                    // Redirect the user or perform any other actions
                  }
                notifyLogin()
                console.log("Login Successful");
                navigate("/user/books-borrowed")
                
                
            }

        }
       

    }

  return (
   <>
   {/* Register */}
   {member===false && (
            <form id='register' method="POST" className='md:px-20 md:w-fit'>
            <h2 className=' underline p-2 md:p-5 md:text-4xl font-bold text-2xl mb-5  md:mb-10'>Register</h2>
            <div className=' border-b  hover:border-purple-500  p-5 flex gap-2 md:gap-4'>
                <FaUser className='text-purple-400' />
                <input className=' placeholder:text-slate-500 rounded-lg block bg-white font-thin text-black pl-3 md:text-2xl md:pl-9 md:pr-3  focus:outline-none focus:border-none '
                placeholder="Username" type="email" onChange={handleRegisterChange} name="username" value={newUser.username}  />

            </div>
            <div className='border-b  hover:border-purple-500  p-5 flex gap-2 md:gap-4'>
                <FaLock className='text-purple-400' />
                <input className=' placeholder:text-slate-500 rounded-lg block bg-white font-thin text-black pl-3 md:text-2xl md:pl-9 md:pr-3  focus:outline-none focus:border-none '
                placeholder="Password" type="password" onChange={handleRegisterChange} name="password" value={newUser.password}  />

            </div>
            <div className=' border-b  hover:border-purple-500 p-5 flex gap-2 md:gap-4'>
                <FaLock className='text-purple-400' />
                <input className=' placeholder:text-slate-500 rounded-lg block bg-white font-thin text-black pl-3 md:text-2xl md:pl-9 md:pr-3  focus:outline-none focus:border-none '
                placeholder="Confirm Password" type="password" onChange={handleRegisterChange} name="cpassword" value={newUser.cpassword}  />

            </div>
           <div>
                <input type='submit' onClick={postData} className=' my-3 cursor-pointer bg-purple-400 rounded-lg transition ease-in-out duration-700 hover:bg-purple-500 w-full text-white p-3' value={'Create Account'} />
                 <p className='text-sm md:text-lg'>Already a member? <a href='#login' onClick={()=>{setMember(!member)}} className='text-purple-500 hover:underline'>Login here</a>
                </p>
           </div>
            
            </form>
   )}
     {/* login */}
   {member===true && (
            <form id='login' method='POST' className='md:px-20 md:w-fit'>
                 <h2 className='underline p-2 md:p-5 md:text-4xl font-bold text-2xl mb-5  md:mb-10'>Login</h2>
                 <div className=' rounded-md  p-5 flex gap-2 md:gap-4 border-b  hover:border-purple-500'>
                <FaUser className='text-purple-400' />
                <input className=' placeholder:text-slate-500 rounded-lg block bg-white font-thin text-black pl-3 md:text-2xl md:pl-9 md:pr-3 focus:outline-none focus:border-none '
                placeholder=" Username" type="email" onChange={handleLoginChange} name="username" value={user.username}  />

            </div>
                 <div className=' rounded-md  p-5 flex gap-2 md:gap-4 border-b  hover:border-purple-500'>
                     <FaLock className='text-purple-400' />
                     <input className=' placeholder:text-slate-500 rounded-lg block bg-white font-thin text-black pl-3 md:text-2xl md:pl-9 md:pr-3  focus:outline-none focus:border-none '
                     placeholder="Password" type="password" onChange={handleLoginChange} name="password" value={user.password}  />
     
                 </div>
                <div>
                     <input type='submit' onClick={postLoginData} className=' my-3 cursor-pointer bg-purple-400 rounded-lg transition ease-in-out duration-700 hover:bg-purple-500 w-full text-white p-3' value={'Log in'} />
                      <p className='text-sm md:text-lg'>Not a registered member? <a href='#register' onClick={()=>{setMember(!member)}} className='text-purple-500 hover:underline'>Register here</a>
                     </p>
                </div>
                 
            </form>
   
   )}

   </>
  )
}
