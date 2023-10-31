import React from 'react'
import { toast } from 'react-toastify';
import './styles.css'
import { useNavigate } from 'react-router-dom';


export default function PostDetail({ item, toggleDetails }) {
  const navigate = useNavigate()
  
    // Tost function
  // const notify_error = (msg) => toast.error(msg)
  const notify_success = (msg) => toast.success(msg)


  const removePost = (postId) => {
    // console.log(postId)
    if(window.confirm("Do you really want to delete this post?")){
      fetch(`/deletePost/${postId}`,{
        method:"delete",
        headers: {
          Authorization: "Bearer "+ localStorage.getItem("jwt"), 
        },
      })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toggleDetails()
        navigate("/")
        notify_success(result.message)
      });
    }
  }
  
  return (
    <div className="showComment">
         <div className="container">
           <div className="postPic">
             <img src={item.photo} alt="" />          
           </div>
            <div className="details">
               <div className="card-header" 
               style={{borderBottom: "1px solid #00000029" }}>
                 <div className="card-pic">
                   <img src="https://math-media.byjusfutureschool.com/bfs-math/2022/07/04185628/Asset-1-8-300x300.png" alt="" />
                 </div>
                   <h5>{item.postedBy.name}</h5>
                   <div className="deletePost" onClick={()=>{removePost(item._id)}}>
                    <span className="material-symbols-outlined">
                      delete_forever
                    </span>
                   </div>
               </div>
               {/* CommentSection */}
               <div className="comment-section" 
               style={{borderBottom: "1px solid #00000029" }}>
                 {
                 item.comments.map((comment)=>{
                   return(
                   <p className='comm' >
                   <span className='commenter' style={ {fontWeight: "bolder"}}>
                     {comment.postedBy.name}
                     {" "} 
                     </span>
                   <span className='commentText'>
                     { comment.comment}
                   </span>
                 </p>
                 )})}
               </div>
                    
               {/* card content */}
               <div className="card-content">               
                 <p> {item.likes.length} Likes</p>
                 <p> {item.body}</p>
               </div>
                    
               {/* Add comment */}
               <div className="add-comment">
                 <span className="material-symbols-outlined">mood</span>
                 <input 
                  type='text' 
                  placeholder='Add a Comment' 
                  // value={comment} 
                  // onChange={(e)=>{
                  //   setComment(e.target.value)
                  //   }} 
                  />
                 <button className='comment' 
                //  onClick={()=>{
                //    makeComment(comment, item._id);
                //    toggleComment()
                //  }}
                 >Post</button>
               </div>
             </div>
         </div>
         <div className="close-comment" 
          onClick={()=>{toggleDetails()}}
          >
           <span className="material-symbols-outlined material-symbols-outlined-comment">
           close
           </span>
         </div>
       </div>
  )
}

