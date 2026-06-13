import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router";

import App from "./App.tsx";
import Loging from "./Pages/Login.tsx";
import Services from "./Pages/Services.tsx";
import Signup from "./Pages/Signup.tsx";
import About from "./Pages/About.tsx";
import RootLayout from "./Pages/RootLayout.tsx";
import Userlayout from "./Pages/users/Userlayout.tsx";
import Userhome from "./Pages/users/Userhome.tsx";
import Userprofile from "./Pages/users/Userprofile.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout/>}>
          <Route index element={<App />} />
          <Route path="/login" element={<Loging />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Userlayout/>} >
            <Route index element={<Userhome/>} />
            <Route path="/dashboard/profile" element={<Userprofile/>} /> 
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);