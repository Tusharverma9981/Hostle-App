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

function App() {
  
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
        <ProtectedRoute>
            <Home/>
        </ProtectedRoute>
        }  />
        <Route
          path="/addlisting"
         element={
          <AddListing />
      }
      />
          <Route
        path="/editlisting/:id"
        element={
            <EditListing />
        }
      />
          
      <Route
        path="/listing/:id"
        element={
            <ListingDetail />
        }
      />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
