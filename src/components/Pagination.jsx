import React from 'react'
import '/src/Pagination.css'

function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage, message, add, edit}) {

    let pages = [];
    for(let i=1 ; i<=Math.ceil(totalPosts/postsPerPage) ; i++)
        pages.push(i);

  return (
    <div className='flex gap-x-3'>
        {
            pages.map((page,index) => {
                return <button key={index} className={`cursor-pointer border border-gray-600 rounded px-2 py-1 text-md hover:bg-gray-800 hover:text-white transition duration-100 scale-100 hover:transform hover:scale-110 ease-in-out ${page===currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination