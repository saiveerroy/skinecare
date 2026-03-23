// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomeScreen from "./homescreen/HomeScreen";
import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Profile from "./homescreen/Profile";
import ProtectedRoute from "./ProtectedRoute";
import { enableNetwork } from "firebase/firestore";
import { db } from "./firebase";
import SkinAssessment from "./skin/SkinAssessment";
import SkinAssessmentResult from "./skin/SkinAssessmentResult";
import SkinType from "./skin/SkinType";
import SkinConcern from "./skin/SkinConcern";
import SkinImageScan from "./skin/SkinImageScan";
import SkinConditions from "./pages/SkinConditions";

import SkincareLanding from './SkincareLanding';
import SkinHistory from './skin/SkinHistory';


export default function App() {

  // ✅ Enable Firestore network safely
  useEffect(() => {
    enableNetwork(db).catch(() => {
      console.log("Firestore network already enabled");
    });
  }, []);

  return (
    <Router>
      <Routes>

        {/* ✅ PUBLIC HOME (opens first) */}
        <Route path="/" element={<HomeScreen />} />

        {/* ✅ Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/skincarelanding" element={<SkincareLanding />} />

  
        {/* 🔐 Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skin-assessment"
          element={
            <ProtectedRoute>
              <SkinAssessment />
            </ProtectedRoute>
          }
        />
        <Route path="/skin-assessment/type" element={<SkinType />} />
        <Route path="/skin-assessment/concerns" element={<SkinConcern />} />
        <Route path="/skin-assessment/scan" element={<SkinImageScan />} />
        <Route path="/skin-assessment/result" element={<SkinAssessmentResult />} />
        <Route path="/skin-conditions" element={<SkinConditions />} />


+



        <Route
          path="/skin-history"
          element={
            <ProtectedRoute>
              <SkinHistory />
            </ProtectedRoute>
          }
        />


        {/* 🔁 Redirect old /home to / */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* 🚫 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}
