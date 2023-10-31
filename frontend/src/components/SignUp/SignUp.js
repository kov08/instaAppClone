import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import logo from '../../img/Logo-Instagram.png'
import './styles.css'

export default function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Tost function
  const notify_error = (msg) => toast.error(msg)
  const notify_success = (msg) => toast.success(msg)

  // Navigate
  const navigate = useNavigate()

  // var for regex email | password
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

  const postData = () =>  {

    // Checking Email
    if (!emailRegex.test(email)) {
      notify_error("Please enter valid email address.")
      return 
    } else if (!passRegex.test(password)){
      notify_error("Password must contains at least 8 characters including one number, one lowercase, one uppercase letter and one special character.")
      return
    }

    // Seding dta to server
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        userName:userName,
        password:password
      })
    }).then(res=>res.json())
    .then(data => { 
      if(data.error){
        notify_error(data.error)}
      else{
        notify_success(data.message)
        navigate("/signin")
      }
      console.log(data)})
  }


  return (
    <div className='signUp'>
      <div className="form-container">
        <div className="form">
            <img className='signUpLogo' src={logo} alt=''/>
            <p className='logInPara'>
              Sign up to share and explore <br /> photos and videos
            </p>
            <div> <input type='text' name='name' id='name' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Full Name' /> </div>
            <div> <input type='text' name='username' id='username' value={userName} onChange={(e)=>{setUserName(e.target.value)}} placeholder='Username' /> </div>
            <div> <input type='email' name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' /> </div>
            <div> <input type='password' name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' /> </div>
            <p className='logInPara' style={{fontSize:'12px', margin:'3px 0px'}}>
              By signing up you agree to our terms <br /> and policy policy and cookies policy
            </p>
            <input type='submit' id='submit-btn' onClick={() => {postData()}} value='Sign Up'/>      
          </div>
          <div className="form2">
            Already have an account ? <Link to='/signin'> <span style={{color:'blue', cursor: 'pointer'}}> Sign In </span> </Link>
          </div>
        </div>
    </div>
  )
}
