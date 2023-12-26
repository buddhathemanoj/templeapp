import { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import Booking from "./Booking/Booking";
import "react-toastify/dist/ReactToastify.css";
import ConfirmBooking from "./Booking/Confirm";
import Sucess from "./Sucess";
import Signup from "./Signup/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/bookticket" element={<Booking />} />
          <Route path="/confirmbook" element={<ConfirmBooking />} />
          <Route path="/success" element={<Sucess />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
