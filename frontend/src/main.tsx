import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.js";
import Home from "./Home.js";
import ReactDOM from "react-dom/client";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes >
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
);