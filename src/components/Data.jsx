import { useState, useEffect, useRef } from "react";
import DeletePopUp from "./DeletePopUp";
import "/src/Popup.css";
import imageCompression from "browser-image-compression";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
// let url = "https://crudcrud.com/api/1fd204b998a246b6b101124eabebdada/data/";

export default function Data({
  fetchData,
  editData,
  setAdd,
  edit,
  setEdit,
  setEditData,
  cancel,
  setCancel,
  url,
  message,
  setMessage,
}) {
  const [btn, setBtn] = useState("Submit");
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    type: "",
    phone: "",
    email: "",
    file: {},
    logo: "",
    fileName: "",
  });
  const [error, setError] = useState({
    name: "",
    companyName: "",
    type: "",
    phone: "",
    email: "",
    file: {},
    logo: "",
    fileName: "",
  });

  const [logoFileName, setLogoFileName] = useState("");
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (fileInputRef && formData.fileName)
      fileInputRef.current.value = formData.fileName;
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        companyName: editData.companyName,
        type: editData.type,
        phone: editData.phone,
        email: editData.email,
        file: editData.file,
        logo: editData.logo,
        fileName: editData.fileName || "",
      });
      setBtn("Update");
    } else {
      setBtn("Submit");
      setFormData({
        name: "",
        companyName: "",
        type: "",
        phone: "",
        email: "",
        file: {},
        logo: "",
        fileName: "",
      });
    }
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    // fetchData();                                             // Temporary Change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const options = {
      method: editData ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const prevUrl = url;
    url = editData ? url + "/" + editData.id : url;
    setMessage(editData ? "Updated" : "Added");
    await fetch(url, options);
    fetchData();
    if (editData) {
      setEdit(false);
    }
    url = prevUrl;
    setFormData({
      name: "",
      companyName: "",
      type: "",
      phone: "",
      email: "",
      file: {},
      logo: "",
      fileName: "",
    });

    closePopup();
  };

  const handleLogoInputChange = (e) => {
    // setFormData({...formData, file:e.target.files[0]});
    // setFormData({...formData, logo:URL.createObjectURL(e.target.files[0]), fileName:e.target.files[0].name})

    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          logo: reader.result,
          fileName: e.target.files[0].name,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const { name, companyName, type, phone, email } = formData;

    if (!name || !type || !phone || !email) {
      alert("Please fill in all required fields.");
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert("Name should only contain alphabetic characters.");
      return false;
    }

    if (name.length > 150) {
      alert("Name can have length a maximum of 150");
      return false;
    }

    if (companyName && !/^[A-Za-z\s.]+$/.test(companyName)) {
      alert(
        "Company name should only contain alphabetic characters, spaces, and dots"
      );
      return false;
    }

    if (companyName.length > 150) {
      alert("Company name can have length a maximum of 150");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number should contain exactly 10 digits.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    setEdit(null);
    closePopup();
    setCancel(true);
    setFormData({
      name: "",
      companyName: "",
      type: "",
      phone: "",
      email: "",
      file: {},
      logo: "",
      fileName: "",
    });
    fetchData();
  };

  const closePopup = () => {
    setAdd(false);
    setFormData({
      name: "",
      companyName: "",
      type: "",
      phone: "",
      email: "",
      file: {},
      logo: "",
      fileName: "",
    });
    setEdit(false);
    fileInputRef.current.value = "";
    // setLogoFileName("");
  };

  return (
    <div
      className="popup-overlay text-center shadow-lg"
      style={{ zIndex: "100" }}
    >
      <div
        className="relative popup-content bg-white shadow-lg rounded-lg px-8 py-6 pb-3 w-2/5"
        style={{ zIndex: "100" }}
      >
        <div className="absolute top-2 right-2">
            <button
              className="block text-1xl px-2 py-1 float-right ml-5  rounded-full border-gray-800  hover:bg-gray-800 hover:text-gray-200 ease-in-out"
              onClick={closePopup}
            >
              <FontAwesomeIcon className="transition duration-300 ease-in-out hover:scale-110" icon={faTimes} size="md" />
            </button>
          </div>
        <div className="flex justify-center items-center tracking-widest">
          <div className="text-3xl inline p-3 py-0 text-gray-800">
            {editData ? "Edit Information" : "Add Information"}
          </div>

          
        </div>
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="mb-2">
            <div className="mb-1 flex justify-start">
              <label className="font-bold text-md" htmlFor="name">
                Name
              </label>
            </div>
            <div>
              <input
                className="border-2 border-gray-800 bg-gray-200 p-1 rounded-lg placeholder-gray-400 shadow-lg"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-1 flex justify-start">
              <label className="font-bold text-md" htmlFor="companyName">
                Company Name
              </label>
            </div>
            <div>
              <input
                className="border-2 border-gray-800 bg-gray-200 p-1 rounded-lg placeholder-gray-400 shadow-lg"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Enter the name of your company"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-1 flex justify-start">
              <label className="font-bold text-md" htmlFor="type">
                Type
              </label>
            </div>
            <div>
              <select
                className="w-full border-2 border-gray-800 bg-gray-200 p-1 rounded-lg placeholder-gray-400 shadow-lg"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option className="bg-gray-400" value="">
                  Select
                </option>
                <option className="bg-gray-400" value="Employee">
                  Employee
                </option>
                <option className="bg-gray-400" value="Temp. Employee">
                  Temp. Employee
                </option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-1 flex justify-start">
              <label className="font-bold text-md" htmlFor="phone">
                Contact No
              </label>
            </div>
            <div>
              <input
                className="border-2 border-gray-800 bg-gray-200 p-1 rounded-lg placeholder-gray-400 shadow-lg"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                inputMode="numeric"
                pattern="[0-9]*"
                minLength={10}
                maxLength={10}
                placeholder="Enter your contact number"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="mb-1 flex justify-start">
              <label className="font-bold text-md" htmlFor="email">
                Email ID
              </label>
            </div>
            <div>
              <input
                className="border-2 border-gray-800 bg-gray-200 p-1 rounded-lg placeholder-gray-400 shadow-lg"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ width: "100%" }}
                placeholder="Enter your Email ID"
              />
            </div>
          </div>

          <div className="mb-3">
            <div className="mb-1 flex justify-start">
              <label className="font-bold text-md" htmlFor="logo">
                Company Logo
              </label>
            </div>
            <div>
              <input
                className="border-2 border-gray-800 bg-gray-200 p-1 rounded-lg placeholder-gray-400 shadow-lg"
                type="file"
                name="logo"
                ref={fileInputRef}
                onChange={handleLogoInputChange}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="flex justify-center gap-12 mt-8 mb-2">
            <button
              className="border-2 border-gray-800 px-3 py-1 rounded-md bg-gray-800 shadow-lg hover:bg-gray-600 text-gray-100 transition duration-300 ease-in-out"
              onClick={handleCancel}
              type=""
            >
              Cancel
            </button>
            <button
              className="subedit border-2 border-gray-800 px-3 py-1 rounded-md bg-gray-800 shadow-lg hover:bg-gray-600 text-gray-100 transition duration-300 ease-in-out"
              type="submit"
              // onClick={handleSubmit}
            >
              {btn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
