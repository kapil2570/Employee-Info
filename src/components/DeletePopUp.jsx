import React, {useState} from "react";
import '/src/DeletePopup.css';

export default function DeletePopUp({_deleteId, setDeleteData, deleteItem, closeDeletePopup, handleLeft}) {

    const handleYes = () => {
        deleteItem(_deleteId);
    }   

    const handleNo = () => {
        setDeleteData(false);
    }

    return (
        <div className={`delete-popup-overlay`} style={{zIndex:"100"}}>
            <div className={`delete-popup-content`}>
                <p className="p-5">Are you sure you want to delete the item?</p>
                <div className="flex justify-center gap-x-8 mb-3">
                    <div><button className="bg-green-300 px-2 py-1 border rounded hover:bg-green-500 transition duration-300 ease-in-out" onClick={handleYes}>Yes</button></div>
                    <div><button className="bg-red-300 px-2 py-1 border rounded hover:bg-red-500 transition duration-300 ease-in-out" onClick={handleNo}>No</button></div>
                </div>
            </div>
        </div>
    )
}