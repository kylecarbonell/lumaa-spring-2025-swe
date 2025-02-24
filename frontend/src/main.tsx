import React from "../$node_modules/@types/react/index.js";
import ReactDOM from "../$node_modules/@types/react-dom/client.js";
import { BrowserRouter, Routes, Route } from "../$node_modules/react-router/dist/development/index.js";
import App from "./App.js";
import Home from "./Home.js";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes >
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
);