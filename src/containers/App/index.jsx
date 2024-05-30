import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import MainLayout from "@layouts/MainLayout";
import MainPage from "@containers/MainPage";

import 'react-toastify/dist/ReactToastify.css';
import "@styles/main.css";
import "@styles/font-awesome.css";

const ErrorPage = React.memo(({code}) => {
    let msg;

    switch (code) {
        case 404:
            msg = '404 not found';
        break;

        default:
            msg = '001 unknown error';
        break;
    }

    return (
        <div><h1>{msg}</h1></div>
    );
});

const App = () => {
    return (
        <div className="page_wrap">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainLayout header footer element={MainPage} />} />
                    <Route path="/top" element={<MainLayout header element={MainPage} />} />
                    <Route path="/404" element={<ErrorPage code={404} />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;