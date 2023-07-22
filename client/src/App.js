import React, {useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Newnavbar from './components/newnavbar/Newnavbar';
import Maincomponent from './components/home/Maincomponent';
import Footer from './components/footer/Footer';
import SignIn from "./components/signup_signin/SignIn";
import SignUp from "./components/signup_signin/SignUp";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import {Routes,Route} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";


function App() {
  
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 3000);
  }, []);

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnavbar />
          <Routes>
            <Route path="/" element={<Maincomponent />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />{" "}
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2> Loading....</h2>
        </div>
      )}
    </>
  );
}

export default App;
