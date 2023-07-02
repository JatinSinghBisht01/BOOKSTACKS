import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home'
import About from './pages/About/About'
import BookList from './components/BookList/BookList'
import BookDetails from './components/BookDetails/BookDetails'
import { createContext, useReducer } from "react";
import Join from "./components/Join/Join";
import Navbar from "./components/Navbar/Navbar";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import {reducer, initialState} from "./reducer/UseReducer"
import Logout from "./components/Logout/Logout";
import Errorpage from "./components/errorpage/Errorpage";
import Footer from "./components/footer/Footer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopBooks from "./components/Charts/TopBooks";

//1: contextApi
export const UserContext = createContext();
//notifications
export const notifyLogin = () => {
  toast.success('You are logged in', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

};
export const notifyUserNotFound = () => {
  toast.info('User not Found', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

};

export const notifyLoginFail = () => {
    toast.warn('Invalid Credentials', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });

};
export const notifyError = () => {
  toast.error('There might be some error, try after sometime or contact admin', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
};
export const notifyFieldEmpty = () => {
  toast.warn("Fields can't be empty", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
};

export const notifyRegister = ()=>{
  toast.success('Account Created', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
export const notifyUserExist = ()=>{
  toast.info('Username already taken', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
export const notifyBookadded = ()=>{
  toast.success('Book added', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
export const notifyBookreturned = ()=>{
  toast.success('Book returned', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
export const notifyBookAlreadyBorrowed = ()=>{
  toast.warn('Book Already borrowed', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}
export const notifyBooknotborrowed = ()=>{
  toast.info('Book not found', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}

export const notifyLoggedOut = ()=>{
  toast.success('Your are signed out', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
}


  const Routing = ()=>{
    return(
      <switch>
        <Routes>
       <Route exact path="/" element={<Home />} >
      <Route exact path="about" element={<About />} />
      <Route exact path="book" element={<BookList />} />
      <Route exact path="/book/:id" element={<BookDetails />} />
      {/* <Route exact path="join" element={<Join/>}/> */}
      </Route>
      <Route exact path="join" element={<Join/>}/>
      <Route exact path="/user/books-borrowed" element={<UserDashboard />} />
      <Route exact path="/books/mostpreffered" element={<TopBooks/>}/>
      <Route exact path="/user/logout" element={<Logout />} />
      <Route exact path="*" element={<Errorpage/>}/>
      </Routes>

      </switch>
      
    )
  }


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <Navbar/>
    <Routing/>
    <Footer/>
    </UserContext.Provider>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
   
    </>
  );
}

export default App;
