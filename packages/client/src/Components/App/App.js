import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginPage } from "../LoginPage";
import { SignUpPage } from "../SignupPage/SignUpPage";
import { ForgotPassword } from "../ForgotPassword";
import { DashBoard } from "../DashBoard";
import { Activities } from "../Activities";
import { MonthlyActivities } from "../MonthlyActivities";
import { Graphs } from "../Graphs";

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashBoard />}></Route>
        <Route path="/activities" element={<Activities />}></Route>
        <Route
          path="/monthlyActivities"
          element={<MonthlyActivities />}
        ></Route>
        <Route path="/graphs" element={<Graphs />}></Route>
      </Routes>
    </Router>

    // <div className="App">

    //   <Content />
    // </div>
  );
}
