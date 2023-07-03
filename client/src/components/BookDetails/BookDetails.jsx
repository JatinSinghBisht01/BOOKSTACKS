import React, {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {UserContext, notifyBookAlreadyBorrowed, notifyBookadded, notifyBooknotborrowed, notifyBookreturned, notifyError, notifyLoginnotFound} from "../../App"

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const {state, dispatch} = useContext(UserContext)
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  const [bookOnRent, setBookOnRent] = useState({
    bookname:"", author:"", isbn:""
  })

  useEffect(() => {
    setLoading(true);
    async function getBookDetails(){
      try{
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data);

        if(data){
          const {description, title, covers, subject_places, subject_times, subjects} = data;
          const newBook = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times : subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found"
          };
          setBook(newBook);
          setBookOnRent({bookname: data.title, author:data.author, isbn: id});
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error){
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  //renting book;
  const postRentalBook = async(e)=>{
    e.preventDefault()
    const {bookname, author, isbn} = bookOnRent;
    const res = await fetch("/api/user/borrow",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        bookname, author, isbn
      })
    })
    const rentdata = await res.json()
    if(!rentdata || res.status === 400 || res.status === 409){
      console.log("Adding to cart failed");
      if(res.status === 409){
        notifyBookAlreadyBorrowed()
      }
      if(res.status===400){
        notifyError()
      }
    
    }
    else{
      notifyBookadded()
    }

  }

  //returning book
  const returnRentedBook = async(e)=>{
    e.preventDefault()
    const {bookname, isbn} = bookOnRent;
    const res = await fetch("/api/user/return",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        bookname, isbn
      })
    })
    const rentdata = await res.json()
    if(!rentdata || res.status === 400 || res.status === 404){
      console.log("Book return failed");
      if(res.status === 404){
        notifyBooknotborrowed();
      }
      if(res.status===400){
        notifyError()
      }
    
    }
    else{
      notifyBookreturned()
    }

  }

  if(loading) return <Loading />;

  return (
    <section className='book-details p-12'>
      <div className=''>
        <div className='mb-5 font-semibold hover:text-purple-900'>
          <button type='button' className='flex ' 
          onClick={() => navigate("/book")}
          >
            <FaArrowLeft size = {22} />
            <span className='ml-2'>GO BACK</span>
          </button>
        </div>
       

        <div className='md:grid  grid-cols-3 gap-12 '>
          <div className='col-span-1'>
            <img className='h-full w-full' src = {book?.cover_img} alt = "cover img" />
          </div>
          <div className='col-span-2 mt-10 mb-3 md:mb-5 md:mt-0 '>
            <div className='text-lg md:text-2xl font-semibold '>
              <span className=''>{book?.title}</span>
            </div>
            <div className=''>
              <span>{book?.description}</span>
            </div>
            <div className='my-2 md:text-lg'>
              <span className='font-semibold '>Subject Places: </span>
              <span className='italic'>{book?.subject_places}</span>
            </div>
            <div className='my-2 md:text-lg'>
              <span className='font-semibold '>Subject Times: </span>
              <span className='italic'>{book?.subject_times}</span>
            </div>
            <div className='my-2 md:text-lg overflow-y-scroll scroll-smooth max-h-[400px] '>
              <span className='font-semibold '>Subjects: </span>
              <span className=''>{book?.subjects}</span>
            </div>
           <div className='flex gap-4'>
           <button className='my-5 p-2 px-4 rounded-md text-white font-semibold text-lg bg-purple-500 hover:bg-purple-800 transition ease-in-out delay-300 w-fit'
              onClick={state?postRentalBook:notifyLoginnotFound}>BORROW</button>
           <button className='my-5 p-2 px-4 rounded-md text-white font-semibold text-lg bg-purple-500 hover:bg-purple-800 transition ease-in-out delay-300 w-fit'
              onClick={state?returnRentedBook:notifyLoginnotFound}>RETURN</button>
           </div>
           
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails