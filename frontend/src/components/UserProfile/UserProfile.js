import React,{useEffect, useState} from 'react'
// import PostDetail from "../PostDetail/PostDetail"
import './styles.css'
import { useParams } from "react-router-dom"

export default function UserProfile() {
    const{ userid } = useParams()
    // console.log(userid)
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])
 
  useEffect(() => {
    fetch(`/user/${userid}`,{
      headers:{
        Authorization: "Bearer "+localStorage.getItem("jwt")
        }
    })
    .then((res) => res.json())
    .then((result) => {
        console.log(result)
      setUser(result.user)
      setPosts(result.post)

    //   console.log(posts)
    // console.log(result.user)
    });
  }, []);
  
  return (
    <div className='profile'>
      {/* Profile frame */}
      <div className="profile-frame">
        
        {/* Profile Pic */}
        <div className="profile-pic">
          <img src="https://math-media.byjusfutureschool.com/bfs-math/2022/07/04185628/Asset-1-8-300x300.png" alt="" />
        </div>

        {/* Profile data */}
        <div className="profile-data">
          <h1> {user.name} </h1>
          
          <div className="profile-info" style={{display:'flex'}}>
            <p>{posts.length} post</p>
            <p>5 follower</p>
            <p>5 following</p>
          </div>
        </div>
      </div>
<hr style={{
  width:"95%",
  opacity:"0.75",
  margin: "25px auto"
}} 
/>
      {/* Gallery */}
      <div className="gallery">
        {posts.map((pic)=>{
          return <img key={pic._id} src={pic.photo} 
        //   onClick={() => {toggleDetails(pic)}}
          className='item'>
          </img>
        })}
      </div>
      {/* {show &&
      <PostDetail item={posts} toggleDetails={toggleDetails}/>} */}

    </div>
  )
}
