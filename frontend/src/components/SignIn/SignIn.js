import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from '../../img/Logo-Instagram.png'
import './styles.css'
import { LoginContext } from '../../context/LoginContext';

export default function SignIn() {
  const {setUserLogin} = useContext(LoginContext)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Tost function
  const notify_error = (msg) => toast.error(msg)
  const notify_success = (msg) => toast.success(msg)

  // Navigate
  const navigate = useNavigate()

  // var for regex email
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () =>  {

    // Checking Email
    if (!emailRegex.test(email)) {
      notify_error("Please enter valid email address.")
      return 
    }

    // Seding dta to server
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data => { 
      if(data.error){
        notify_error(data.error)}
      else{
        navigate("/")
        // notify_success(data.message)
        notify_success("Signin Successfully")
        // console.log(data)
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        setUserLogin(true)
      }
      // console.log(data)
    })
  }

  return (
    <div className='signIn'>
      <div className="form-container">
        <div className="form">
          <img className='signinLogo' src={logo} alt=''/>
          <div>
            {/* <input type='email' name='email' placeholder='Email' /> */}
            <input type='email' name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' />
          </div> 
          <div>
            {/* <input type='password' name='password' placeholder='Password' /> */}
            <input type='password' name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' />
          </div>               
          <input type='submit' id='submit-btn' value='Sign in' onClick={() => { postData()}} />
        </div>
        <div className='form2'>
          Don't have an account ? <Link to='/signup'> <span style={{color: 'blue', cursor: 'pointer'}}> Sign Up </span> </Link>
        </div>
      </div>      
    </div>
  )
}
