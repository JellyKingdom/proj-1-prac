import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Layout from "../components/ui/Layout";
import Header from "../components/ui/Header";

const Router = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/signin' element={<Signin />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default Router;
