import { useState, useEffect, useRef } from "react";
import Data from "./components/Data";
import "./index.css";
import DeletePopUp from "./components/DeletePopUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTrash, faCheck} from "@fortawesome/free-solid-svg-icons";
import { FaDownload } from 'react-icons/fa';
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./components/Pagination";
import Notification from "./components/Notification";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Logo from "./components/Logo";

let url = "https://crudcrud.com/api/36e3a46592134d7da5a727fb07407e2c/data/";

function App() {
  const [add, setAdd] = useState(false);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filter, setFilter] = useState(data);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const[message, setMessage] = useState("");
  const[logoClick, setLogoClick] = useState(false);
  const[logoSrc, setLogoSrc] = useState("https://st2.depositphotos.com/1874273/6920/v/450/depositphotos_69209063-stock-illustration-easy-payment-abstract-sign.jpg");
  const fileInputRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch(url);
    const result = await response.json();
    setData(result);
    setFilter(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClick = () => {
    // setPopUpOpen(true);
    setEditData(null);
    setEdit(true);
    setAdd(true);
    openPop();
    // setBtn("Submit");
    setCancel(false);
  };

  const handleEditClick = (item) => {
    setEditData(item);
    setAdd(true);
    openPop();
    setEdit(true);
    setCancel(false);
    fetchData();
  };

  const handleDeleteClick = (id) => {
    setDeleteData(true);
    // openDeletePopup();
    setDeleteId(id);
  };

  const deleteItem = async (id) => {
    console.log(url + id);
    await fetch(url + id, {
      method: "DELETE",
    });
    fetchData();
    setDeleteData(false);
    handleLeft();
    setMessage("Deleted");
  };

  const openPop = () => {
    const form = document.querySelector(".popup-overlay");
    const formContent = document.querySelector(".popup-content");
    form.style.display = "flex";
  };

  const openDeletePopup = () => {
    const deletePop = document.querySelector(".delete-popup-overlay");
    deletePop.display.style = flex;
  };

  const closeDeletePopup = () => {
    const deletePop = document.querySelector(".delete-popup-overlay");
    deletePop.display.style = "none";
  };

  let len = 0;

  const handleSearch = (val) => {
    const filteredRows = data.filter((row) => {
      len = val.length;
      return (
        row.name.toString().toLowerCase().slice(0, len) ===
        val.toString().toLowerCase()
      );
    });
    if (val.length < 1) setFilter(data);
    else setFilter(filteredRows);
  };

  const handleLeft = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('table-to-pdf');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('table_data.pdf');
    });
  };

  const handleLogoClick = (e) => {
    setLogoClick(true);
    setLogoSrc(e.target.src);
  }

  const totalPosts = filter.length;
  const totalDataLen = data.length;
  const lastPageIndex = postsPerPage * currentPage;
  const firstPageIndex = lastPageIndex - postsPerPage;
  const currentPosts = filter.slice(firstPageIndex, lastPageIndex);

  return (
    <div className="mb-5">
      <div className="shadow-lg">
        <h1 className="text-white text-center my-10 text-4xl bg-purple-800 p-5" style={{backgroundColor:"#244855"}}>
          Employee Information
        </h1>
      </div>

      <div className="flex justify-center">
        <button
          className="text-white text-2xl border-2 border-gray-800 bg-[#3A3A3A] px-4 py-2 mb-10 rounded-lg  transition duration-300 ease-in-out transform-gpu scale-100 hover:transform hover:scale-90 hover:text-white hover:shadow-lg hover:bg-gray-800"
          style={{transformOrigin:'center'}}
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>

      <div>
        {add && (
          <Data
            fetchData={fetchData}
            editData={editData}
            setAdd={setAdd}
            edit={edit}
            setEdit={setEdit}
            setEditData={setEditData}
            cancel={cancel}
            setCancel={setCancel}
            add={add}
            url={url}
            message={message}
            setMessage={setMessage}
            fileInputRef={fileInputRef}
          />
        )}
      </div>

      <div>
        {deleteData && (
          <DeletePopUp
            deleteId={deleteId}
            setDeleteData={setDeleteData}
            deleteItem={deleteItem}
            closeDeletePopup={closeDeletePopup}
            handleLeft={handleLeft}
          />
        )}
      </div>
      <div>
        {
          (message!="") && (
            <Notification message={message} setMessage={setMessage}/>
          )
        }
      </div>
      <div>
        {
          (logoClick && (<Logo logoSrc={logoSrc} setLogoClick={setLogoClick}/>))
        }
      </div>
      <div className="flex flex-col">
        {totalDataLen > 0 && (
          <div className="mr-20 mb-2">
            {/* <span className="float-right ml-3 mt-2">
              <button onClick={handleDownloadPDF}><FaDownload /></button>
            </span> */}
            <span className="float-right">
              <input
                className="border-2 border-gray-800 mr-2 w-full rounded-lg px-2 py-1 placeholder-gray-500"
                type="text"
                placeholder="Search....."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </span>
          </div>
        )}
        <div className="flex justify-center items-center mx-5">
          <table id="table-to-pdf">
            <thead>
              <tr className="bg-gray-600 text-white">
                <th className="px-7 py-2">S.No.</th>
                <th className="px-3 py-2">Company Logo</th>
                <th className="px-10 py-2">Name</th>
                <th className="px-10 py-2">Company Name</th>
                <th className="px-10 py-2">Type</th>
                <th className="px-10 py-2">Contact Number</th>
                <th className="px-10 py-2">Email ID</th>
                <th className="px-10 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(
                (
                  item,
                  index //data -> filter
                ) => (
                  <tr
                    key={item._id}
                    className="bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out shadow-lg"
                  >
                    <td className="px-10 py-2 text-center">
                      {index + firstPageIndex + 1}
                    </td>
                    <td className="px-1 py-2 text-center max-w-xs">
                      <img className="logo-img mx-auto border-2 border-gray-300 rounded-full transition duration-300 ease-in-out hover:scale-90 hover:shadow-md" src={item.logo ? item.logo : "https://st2.depositphotos.com/1874273/6920/v/450/depositphotos_69209063-stock-illustration-easy-payment-abstract-sign.jpg"} alt="" width={"40px"} height={"40px"} onClick={handleLogoClick}/>
                    </td>
                    <td className="px-1 py-2 text-center max-w-xs break-words">
                      {item.name}
                    </td>
                    <td className="px-5 py-2 text-center max-w-xs break-words">
                      {item.companyName}
                    </td>
                    <td className="px-1 py-2 text-center">{item.type}</td>
                    <td className="px-1 py-2 text-center">{item.phone}</td>
                    <td className="px-6 py-2 text-center">{item.email}</td>
                    <td className="px-1 py-2 text-center">
                      <div className="mx-auto flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mr-4 text-blue-300 hover:text-blue-500 cursor-pointer"
                          size="lg"
                          onClick={() => handleEditClick(item)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-300 hover:text-red-500 cursor-pointer"
                          size="lg"
                          onClick={() => handleDeleteClick(item._id)}
                        />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-5 mx-auto flex gap-x-3">
          {totalPosts > 0 && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-2xl text-gray-500 cursor-pointer transition scale-100 duration-300 hover:text-gray-800 hover:tranform hover:scale-110 px-2 py-1"
              // onClick={() => setCurrentPage((prev) => prev>1 ? prev-1 : 1)}
              onClick={handleLeft}
            />
          )}
          <div>
            {totalPosts > 0 && (
              <Pagination
                totalPosts={totalPosts}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                message={message}
                add={add}
                edit={edit}
              />
            )}
          </div>
          {totalPosts > 0 && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-2xl text-gray-500 cursor-pointer transition scale-100 duration-300 hover:text-gray-800 hover:tranform hover:scale-110 px-2 py-1"
              onClick={() =>
                setCurrentPage((prev) =>
                  prev < Math.ceil(totalPosts / postsPerPage)
                    ? prev + 1
                    : Math.ceil(totalPosts / postsPerPage)
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
