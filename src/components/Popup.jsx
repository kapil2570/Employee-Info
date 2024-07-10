// Popup.jsx
import React from "react";
import "../Popup.css";

const Popup = ({ isOpen, onClose, formData, handleInputChange, handleSubmit, btnText, add}) => {
  if (!isOpen) return null;

  return (
    <div className={`popup-overlay`}>
      <div className={`popup-content`}>
        <h1 className="text-3xl mb-5">{btnText === "Update" ? "Edit Information" : "Add Information"}</h1>
        <form onSubmit={handleSubmit}>
        <div className="mb-5">
            <div className="mb-2">
              <label className="font-bold" htmlFor="name">
                Name
              </label>
            </div>
            <div>
              <input className="border border-gray-600 p-1 rounded" type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2">
              <label className="font-bold" htmlFor="companyName">
                Company Name
              </label>
            </div>
            <div>
              <input className="border border-gray-600 p-1 rounded" type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2">
              <label className="font-bold" htmlFor="type">
                Type
              </label>
            </div>
            <div>
              <select className="border border-gray-600 px-20 p-1 rounded" name="type" value={formData.type} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Employee">Employee</option>
                <option value="Employer">Employer</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2">
              <label className="font-bold" htmlFor="phone">
                Contact No
              </label>
            </div>
            <div>
              <input className="border border-gray-600 p-1 rounded" type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
          </div>

          <div className="mb-5">
            <div className="mb-2">
              <label className="font-bold" htmlFor="email">
                Email ID
              </label>
            </div>
            <div>
              <input className="border border-gray-600 p-1 rounded" type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </div>
          </div>
          <button type="submit">{btnText}</button>
          <button onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
