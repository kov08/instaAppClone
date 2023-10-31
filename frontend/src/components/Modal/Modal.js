import React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import{ useNavigate } from 'react-router-dom'
import "./styles.css"


export default function Modal({setModalOpen}) {
    const navigate = useNavigate()
    
    return (
    <div className="darkBg" onClick={()=>setModalOpen(false)}>

    <dev className="centered">
        <div className="modal">
            {/* Modal header */}
            <div className="modalHeader">                
                <h5 className="heading">Confirm</h5>
            </div>
            <button className="closeBtn">
                <RiCloseLine>

                </RiCloseLine>
            </button>
            {/* model content */}
            <div className="modalContent">
                Are you really want to ogOut ?
            </div>
            <div className="modalActions">
                <div className="actionContainer">
                    <button className="logOutBtn" onClick={()=>{setModalOpen(false); localStorage.clear(); navigate("./signin")}}>LogOut</button>
                    <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    </dev>
    </div>
  )
}
