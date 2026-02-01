import { useEffect, useState } from "react";
import api from "./api/axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home"
import ProtectedRoute from "./pages/ProtectedRoute";
import AddListing from "./pages/AddListing";
import EditListing from "./pages/EditListing";
import ListingDetail from "./pages/Listingdetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/" element={
        
            <Home/>
      
        }  />
        <Route
          path="/addlisting"
         element={
          <ProtectedRoute> <AddListing /></ProtectedRoute>
         
      }
      />
          <Route
        path="/editlisting/:id"
        element={
        <ProtectedRoute> 
            <EditListing />
            </ProtectedRoute>
        }
      />
          
      <Route
        path="/listing/:id"
        element={
            <ListingDetail />
        }
      />

      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
    
  );
}

export default App;
