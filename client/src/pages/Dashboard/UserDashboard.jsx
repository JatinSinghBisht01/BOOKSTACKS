import React, { useEffect, useState } from 'react'

export default function UserDashboard() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async()=>{
    try{
      const res = await fetch("/api/user/borrowed-books", {
        method:"GET",
        headers: {
          "Content-Type" : "application/json"
      },
      })
      const data = await res.json()
      setBooks(data)
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchBooks();
  }, []);

  return (
    <>
    <div className='text-center px-2 mt-20 md:m-10 md:p-10'>
     {
      books.length === 0 && (
        <h4 className='text-4xl my-20'>No Books Found!!!</h4>
      )
     }
     {
      books.length>0 && (
        <div className='w-full '>
        <table className=" flex-col shadow-lg bg-white border-collapse text-sm md:text-lg">
  <tr>
    <th className="bg-blue-100 border text-center px-1 py-2 md:px-8 md:py-4">Book</th>
    {/* <th className="bg-blue-100 border text-center px-1 py-2 md:px-8 md:py-4">Author</th> */}
    <th className="bg-blue-100 border text-center px-1 py-2 md:px-8 md:py-4">ISBN:</th>
    <th className="bg-blue-100 border text-center px-1 py-2 md:px-8 md:py-4">Issued On</th>
    <th className="bg-blue-100 border text-center px-1 py-2 md:px-8 md:py-4">Returned On</th>
  </tr>
  {books.map((book)=>(
     <tr
     class="hover:bg-gray-50 focus:bg-gray-300 active:bg-pink-100"
     tabindex="0"
   >
     <td className="border px-1 py-2 md:px-8 md:py-4">
       {book.bookname}
       {book.author}
       </td>
     {/* <td className="border px-1 py-2 md:px-8 md:py-4">{book.author}</td> */}
     <td className="border  text-center px-1 py-2 md:px-8 md:py-4">{book.isbn}</td>
     <td className="border  text-center px-1 py-2 md:px-8 md:py-4">{book.issuedon}</td>
     <td className="border  text-center px-1 py-2 md:px-8 md:py-4">{book.returnedon}</td>
   </tr>

  ))
  }
 
  
</table>
        </div>

      )
     }
    </div>
    </>
  )
}
