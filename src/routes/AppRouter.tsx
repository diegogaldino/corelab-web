import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddEditCar } from "../components/AddEditCar.tsx";
import { Header } from "../components/Header";
import { Car } from "../pages/Car";

export function AppRouter() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Car/>}/>
        <Route path="/car" element={<Car/>}/>
        <Route path="/addEdit" element={<AddEditCar/>}/>
        <Route path="/addEdit/:id" element={<AddEditCar/>}/>
      </Routes>
    </BrowserRouter>
  )
}

