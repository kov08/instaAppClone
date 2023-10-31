import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../img/Logo-Instagram.png'
import { LoginContext } from '../../context/LoginContext'
import './styles.css'


export default function Navbar({login}) {

  const {setModalOpen} = useContext(LoginContext)
  const loginStatus = () => {
    const token = localStorage.getItem("jwt")
    // console.log(token)
    if(login || token){
      return[
        <>
        <Link to="./"><li>Feed</li></Link>
        <Link to="./createPost"><li>Create Post</li></Link>
        <Link to="./profile"><li>Profile</li></Link>
        
        <Link to={""}>
          <button className="primaryBtn" onClick={()=>setModalOpen(true)}>
            Log out
          </button>
        </Link>
        </>
      ]
    }else{
      return[
        <>
        <Link to="/signin"><li>Sign In</li></Link>
        <Link to="/signup"><li>Sign Up</li></Link>
        </>
      ]
    }
  }

  return (
    <div className='navbar'>
        <img src ={logo} alt=''/>
        <ul className='nav-menu'>
          {loginStatus()}            
        </ul>        
    </div>
  )
}
