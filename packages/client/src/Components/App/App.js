import React from "react";
import "./App.css";
import { Content } from "../Content";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "../LoginPage";
import { SignUpPage } from "../SignupPage/SignUpPage";
import { ForgotPassword } from "../ForgotPassword";
import { MainPage } from "../Content/MainPage";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/content" element={<MainPage />}></Route>
      </Routes>
    </Router>

    // <div className="App">

    //   <Content />
    // </div>
  );
}
