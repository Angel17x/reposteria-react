import React,{ lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
const Home = lazy(() => import("../pages/home/Home"));

export default function Router(){
        return(
            <BrowserRouter>
            <Navbar/>
                <Routes>
                    <Route path="/home" element={
                        <Suspense fallback={"loading...."}>
                            <Home/>
                        </Suspense>
                    }/>
                    <Route path="*" element={<h1>404 Not found</h1>}/>
                </Routes>
            </BrowserRouter>
        );
}