import React from 'react'
import '/src/Notification.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

function Notification({message, setMessage}) {
    return (
    <div>
        <div className="notification-popup-overlay" style={{zIndex:"100"}}>
            <div className="notification-popup-content">
                <div className='mb-5 pt-2'>
                    <h3 className='text-3xl' >Data {message} Successfully!</h3>
                </div>
                <div className='flex justify-center items-center mb-5'>
                    <FontAwesomeIcon className='text-4xl border-2 border-gray-800 rounded-full p-3 bg-green-400' icon={faCheck} />
                </div>
                <div className='flex justify-center items-center'>
                    <button className='border-2 bg-gray-400 rounded-lg px-8 py-1 transition duration-300 hover:bg-gray-800 transform ease-in-out hover:text-gray-200' style={{zIndex:"100"}} onClick={() => setMessage("")}>Ok</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Notification