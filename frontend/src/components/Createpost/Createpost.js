import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';


import "./styles.css"
import { useNavigate } from 'react-router-dom';

export default function Createpost() {
  
  const navigate = useNavigate()
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

   // Tost function
  const notify_error = (msg) => toast.error(msg)
  const notify_success = (msg) => toast.success(msg)


    // saving post to mongodb    
  useEffect(() => {
    
    if (url) {
        fetch("/createPost",
    {
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+ localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        body,
        pic:url
      })
    }).then(res=> res.json())
    .then(data=>{if(data.error){
      notify_error(data.error)
    }else{
      notify_success("Successfully Posted")
      navigate("/")
    }
    })
    .catch(err=> console.log(err))
      
    }
  }, [url])
  

  // Posting image to cloudinary
  const postDetails = () =>{
    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "a2instaclone")
    data.append("cloud_name", "a2instacloud0")
    fetch(
      "https://api.cloudinary.com/v1_1/a2instacloud0/image/upload",
      // "https://api.cloudinary.com/v1_1/a2instacloud0/video/upload",
    {
      method: "post",
      body:data
    }).then(res=> res.json())
    .then(data=> setUrl(data.url))
    .catch(err=>console.log(err))

    // saving post to mongodb
    
  }

  const loadfile = (event) => {
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
  }}

  
  return (
    <div className='createPost'>
      {/* Header */}
      <div className="post-header">
        <h4 style={{margin:"3px auto"}}>creat new post</h4>
        <button id='post-btn' onClick={()=>{postDetails()}}>Share</button>
      </div> 
      {/* Image Preview */}
      <div className="main-div">
        <img id="output" src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Circle-icons-image.svg/512px-Circle-icons-image.svg.png'/>
        <input 
        type='file' 
        accept='image/*' 
        onChange={(event) => {
          loadfile(event);
          setImage(event.target.files[0])}}/>
      </div>
      {/* Details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src="https://math-media.byjusfutureschool.com/bfs-math/2022/07/04185628/Asset-1-8-300x300.png" alt="" />
          </div>
          <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>
        </div>
        <textarea type="text" onChange={(e)=>{setBody(e.target.value)}} placeholder='write a caption'></textarea>
      </div>
      
    </div>
  )
}
