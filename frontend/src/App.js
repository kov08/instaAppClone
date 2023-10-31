import './App.css';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import Profile from './components/Profile/Profile'
import Navbar from './components/Navbar/Navbar';
import Createpost from './components/Createpost/Createpost';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {createContext, useState} from 'react';

import Modal from "./components/Modal/Modal"
import { LoginContext } from './context/LoginContext';
import UserProfile from './components/UserProfile/UserProfile';

function App() {

  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin, setModalOpen}}>

        <Navbar login ={userLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route exact path='/profile' element={<Profile/>}></Route>
          <Route path='/createPost' element={<Createpost/>}></Route>
          <Route path='/profile/:userid' element={<UserProfile/>}></Route>
          </Routes>
        <ToastContainer
        theme='dark' />
        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        {/* <Modal></Modal> */}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
