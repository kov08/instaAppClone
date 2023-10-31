import React from 'react'
import "./styles.css"

export default function ProfilePic() {
  return (
    <div className='profilePic darkBg' >
        <div className="changePic centered">
            <div>
                <h2>Change Profile Photo</h2>
            </div>
            <div>
                <button className="upload-btn">Upload Photo</button>
            </div>
        </div>
    </div>
  )
}
